import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { ErpRequest } from "../requests/request.entity";
import { Payment } from "./payment.entity";
import type {
  CreatePaymentInput,
  UpdatePaymentInput,
  UpdatePaymentStatusInput,
} from "./payment.schemas";

const paymentRepository = () => AppDataSource.getRepository(Payment);
const requestRepository = () => AppDataSource.getRepository(ErpRequest);

const resolveRequest = async (requestId?: string) => {
  if (!requestId) {
    return undefined;
  }

  const request = await requestRepository().findOneBy({ id: requestId });

  if (!request) {
    throw new NotFoundError("Request");
  }

  return request;
};

export const paymentService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [
          { paymentCode: ILike(`%${query.search}%`) },
          { requestTitle: ILike(`%${query.search}%`) },
          { beneficiary: ILike(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await paymentRepository().findAndCount({
      where,
      relations: { request: true },
      order: { createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const payment = await paymentRepository().findOne({
      where: { id },
      relations: { request: true },
    });

    if (!payment) {
      throw new NotFoundError("Payment");
    }

    return payment;
  },

  async create(input: CreatePaymentInput) {
    const { requestId, ...paymentInput } = input;
    const payment = paymentRepository().create({
      ...paymentInput,
      request: await resolveRequest(requestId),
    });

    return paymentRepository().save(payment);
  },

  async update(id: string, input: UpdatePaymentInput) {
    const payment = await this.findOne(id);
    const { requestId, ...paymentInput } = input;

    paymentRepository().merge(payment, paymentInput);

    if (requestId !== undefined) {
      payment.request = await resolveRequest(requestId);
    }

    return paymentRepository().save(payment);
  },

  async updateStatus(id: string, input: UpdatePaymentStatusInput) {
    const payment = await this.findOne(id);
    paymentRepository().merge(payment, input);
    return paymentRepository().save(payment);
  },

  async remove(id: string) {
    const payment = await this.findOne(id);
    await paymentRepository().remove(payment);
  },
};
