import "reflect-metadata";
import type {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
} from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Account } from "../modules/accounting/account.entity";
import { JournalEntry } from "../modules/accounting/journal-entry.entity";
import { Employee } from "../modules/employees/employee.entity";
import { Vendor } from "../modules/vendors/vendor.entity";
import { ErpRequest } from "../modules/requests/request.entity";
import { Payment } from "../modules/payments/payment.entity";
import { FinancialRecord } from "../modules/financial-records/financial-record.entity";
import { AuditLog } from "../modules/audit/audit-log.entity";
import {
  Asset,
  Budget,
  CapitalContribution,
  Liability,
  RecurringExpense,
  SalaryRecord,
  WorkspaceSettings,
} from "../modules/workspace/workspace.entity";
import { env } from "../config/env";
import { rbacService } from "../modules/auth/rbac.service";
import { sampleData } from "./sample-data";

async function insertMissing<T extends ObjectLiteral>(
  manager: EntityManager,
  target: EntityTarget<T>,
  key: string,
  input: ObjectLiteral,
) {
  const repository = manager.getRepository(target);
  const existing = await repository.findOneBy({ [key]: input[key] } as FindOptionsWhere<T>);
  if (existing) return existing;
  return repository.save(repository.create(input as DeepPartial<T>));
}

async function seed(manager: EntityManager) {
  // Serialize seed runs and preserve every existing row, including user edits.
  await manager.query("SELECT pg_advisory_xact_lock(482019)");
  await insertMissing(manager, WorkspaceSettings, "key", sampleData.settings);
  for (const row of sampleData.employees)
    await insertMissing(manager, Employee, "employeeCode", row);
  for (const row of sampleData.vendors) await insertMissing(manager, Vendor, "vendorCode", row);
  for (const { parentCode, ...row } of sampleData.accounts) {
    const parent = parentCode
      ? await manager.getRepository(Account).findOneByOrFail({ code: parentCode })
      : undefined;
    await insertMissing(manager, Account, "code", { ...row, parent });
  }
  for (const row of sampleData.requests)
    await insertMissing(manager, ErpRequest, "requestCode", row);
  for (const row of sampleData.payments) {
    const request = await manager
      .getRepository(ErpRequest)
      .findOneBy({ requestCode: row.requestCode });
    await insertMissing(manager, Payment, "paymentCode", { ...row, request });
  }
  for (const row of sampleData.financialRecords)
    await insertMissing(manager, FinancialRecord, "recordCode", row);
  for (const row of sampleData.journalEntries) {
    const lines = [];
    for (const line of row.lines) {
      lines.push({
        ...line,
        account: await manager.getRepository(Account).findOneByOrFail({ code: line.accountCode }),
      });
    }
    await insertMissing(manager, JournalEntry, "entryCode", { ...row, lines });
  }
  for (const row of sampleData.assets) await insertMissing(manager, Asset, "code", row);
  for (const row of sampleData.liabilities) await insertMissing(manager, Liability, "name", row);
  for (const row of sampleData.capital)
    await insertMissing(manager, CapitalContribution, "reference", row);
  for (const row of sampleData.budgets) await insertMissing(manager, Budget, "category", row);
  for (const { employeeCode, ...row } of sampleData.salaries) {
    const employee = await manager.getRepository(Employee).findOneByOrFail({ employeeCode });
    await insertMissing(manager, SalaryRecord, "code", { ...row, employee });
  }
  for (const row of sampleData.recurringExpenses)
    await insertMissing(manager, RecurringExpense, "code", row);
  await insertMissing(manager, AuditLog, "entity", {
    actor: sampleData.settings.currentUser.name,
    initials: sampleData.settings.currentUser.initials,
    action: "loaded sample records",
    entity: "Local development seed",
    occurredAt: new Date(),
  });
}

async function run() {
  try {
    await AppDataSource.initialize();
    await rbacService.ensurePermissionsAndAdmin(env.auth.adminEmail, env.auth.adminPassword);
    await AppDataSource.transaction(seed);
    console.log(
      `Sample data loaded. Existing records were preserved. Local admin: ${env.auth.adminEmail}`,
    );
  } finally {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  }
}
void run().catch((error) => {
  console.error("Database seed failed:", error);
  process.exitCode = 1;
});
