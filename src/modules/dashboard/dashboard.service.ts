import { Direction, PaymentStatus, RequestStatus } from "../../common/enums";
import { AppDataSource } from "../../config/data-source";
import { Account } from "../accounting/account.entity";
import { FinancialRecord } from "../financial-records/financial-record.entity";
import { Payment } from "../payments/payment.entity";
import { ErpRequest } from "../requests/request.entity";

const sumAmount = async (
  alias: string,
  repositoryTarget: typeof Payment | typeof FinancialRecord,
  where: string,
  params: Record<string, unknown>,
) => {
  const row = await AppDataSource.getRepository(repositoryTarget)
    .createQueryBuilder(alias)
    .select(`COALESCE(SUM(${alias}.amount), 0)`, "total")
    .where(where, params)
    .getRawOne<{ total: string }>();

  return Number(row?.total ?? 0);
};

export const dashboardService = {
  async getSummary() {
    const [pendingRequests, paidPayments, income, expenses, accountCount] = await Promise.all([
      AppDataSource.getRepository(ErpRequest).count({
        where: [
          { status: RequestStatus.Submitted },
          { status: RequestStatus.UnderReview },
          { status: RequestStatus.PaymentPending },
        ],
      }),
      sumAmount("payment", Payment, "payment.status = :status", { status: PaymentStatus.Paid }),
      sumAmount("record", FinancialRecord, "record.direction = :direction", { direction: Direction.In }),
      sumAmount("record", FinancialRecord, "record.direction = :direction", { direction: Direction.Out }),
      AppDataSource.getRepository(Account).count(),
    ]);

    return {
      pendingRequests,
      paidPayments,
      income,
      expenses,
      netCashFlow: income - expenses,
      accountCount,
    };
  },
};
