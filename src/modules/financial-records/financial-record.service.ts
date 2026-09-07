import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { FinancialRecord } from "./financial-record.entity";
import type {
  CreateFinancialRecordInput,
  UpdateFinancialRecordInput,
} from "./financial-record.schemas";

const financialRecordRepository = () => AppDataSource.getRepository(FinancialRecord);

export const financialRecordService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [
          { recordCode: ILike(`%${query.search}%`) },
          { description: ILike(`%${query.search}%`) },
          { party: ILike(`%${query.search}%`) },
          { category: ILike(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await financialRecordRepository().findAndCount({
      where,
      order: { date: "DESC", createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const record = await financialRecordRepository().findOneBy({ id });

    if (!record) {
      throw new NotFoundError("Financial record");
    }

    return record;
  },

  async create(input: CreateFinancialRecordInput) {
    const record = financialRecordRepository().create(input);
    return financialRecordRepository().save(record);
  },

  async update(id: string, input: UpdateFinancialRecordInput) {
    const record = await this.findOne(id);
    financialRecordRepository().merge(record, input);
    return financialRecordRepository().save(record);
  },

  async remove(id: string) {
    const record = await this.findOne(id);
    await financialRecordRepository().remove(record);
  },
};
