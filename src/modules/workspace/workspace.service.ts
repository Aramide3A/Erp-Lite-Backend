import { AppDataSource } from "../../config/data-source";
import { NotFoundError } from "../../common/errors/app-error";
import { AuditLog } from "../audit/audit-log.entity";
import { Asset, Budget, CapitalContribution, Liability, RecurringExpense, SalaryRecord, WorkspaceSettings } from "./workspace.entity";

export const workspaceService = {
  async getData() {
    const [settings, assets, liabilities, capital, budgets, salaries, recurringExpenses] = await Promise.all([
      AppDataSource.getRepository(WorkspaceSettings).findOneBy({ key: "default" }),
      AppDataSource.getRepository(Asset).find({ order: { code: "ASC" } }),
      AppDataSource.getRepository(Liability).find({ order: { due: "ASC" } }),
      AppDataSource.getRepository(CapitalContribution).find({ order: { date: "DESC" } }),
      AppDataSource.getRepository(Budget).find({ order: { category: "ASC" } }),
      AppDataSource.getRepository(SalaryRecord).find({ relations: { employee: true }, order: { period: "DESC", code: "ASC" } }),
      AppDataSource.getRepository(RecurringExpense).find({ order: { nextDue: "ASC" } }),
    ]);
    if (!settings) throw new NotFoundError("Workspace settings; run npm run db:seed");
    return { settings, assets, liabilities, capital, budgets, salaries, recurringExpenses };
  },

  async updateCompany(company: WorkspaceSettings["company"]) {
    const repository = AppDataSource.getRepository(WorkspaceSettings);
    const settings = await repository.findOneBy({ key: "default" });
    if (!settings) throw new NotFoundError("Workspace settings");
    settings.company = company;
    return repository.save(settings);
  },

  async markSalaryPaid(id: string, paymentDate: string) {
    return AppDataSource.transaction(async manager => {
      const repository = manager.getRepository(SalaryRecord);
      const salary = await repository.findOne({ where: { id }, lock: { mode: "pessimistic_write" } });
      if (!salary) throw new NotFoundError("Salary");
      if (salary.status !== "Paid") {
        salary.status = "Paid";
        salary.paymentDate = paymentDate;
        await repository.save(salary);
        const settings = await manager.getRepository(WorkspaceSettings).findOneByOrFail({ key: "default" });
        await manager.getRepository(AuditLog).save({
          actor: settings.currentUser.name, initials: settings.currentUser.initials,
          action: "marked salary paid", entity: salary.code, occurredAt: new Date(),
        });
      }
      return repository.findOneOrFail({ where: { id }, relations: { employee: true } });
    });
  },
};
