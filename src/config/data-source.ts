import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { Account } from "../modules/accounting/account.entity";
import { JournalEntry } from "../modules/accounting/journal-entry.entity";
import { JournalLine } from "../modules/accounting/journal-line.entity";
import { AuditLog } from "../modules/audit/audit-log.entity";
import { Employee } from "../modules/employees/employee.entity";
import { FinancialRecord } from "../modules/financial-records/financial-record.entity";
import { Payment } from "../modules/payments/payment.entity";
import { ErpRequest } from "../modules/requests/request.entity";
import { RequestItem } from "../modules/requests/request-item.entity";
import { Vendor } from "../modules/vendors/vendor.entity";

import { Asset, Budget, CapitalContribution, Liability, RecurringExpense, SalaryRecord, WorkspaceSettings } from "../modules/workspace/workspace.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  ssl: env.database.ssl ? { rejectUnauthorized: false } : false,
  synchronize: env.database.synchronize,
  logging: env.nodeEnv === "development" ? ["error", "warn"] : ["error"],
  entities: [
    WorkspaceSettings, Asset, Budget, CapitalContribution, Liability, RecurringExpense, SalaryRecord,
    Account,
    AuditLog,
    Employee,
    ErpRequest,
    FinancialRecord,
    JournalEntry,
    JournalLine,
    Payment,
    RequestItem,
    Vendor,
  ],
  migrations: ["src/database/migrations/**/*.ts"],
});
