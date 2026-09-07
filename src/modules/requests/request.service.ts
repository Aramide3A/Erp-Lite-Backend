import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { RequestItem } from "./request-item.entity";
import { ErpRequest } from "./request.entity";
import type {
  CreateRequestInput,
  UpdateRequestInput,
  UpdateRequestStatusInput,
} from "./request.schemas";

const requestRepository = () => AppDataSource.getRepository(ErpRequest);
const requestItemRepository = () => AppDataSource.getRepository(RequestItem);

export const requestService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [
          { title: ILike(`%${query.search}%`) },
          { requester: ILike(`%${query.search}%`) },
          { department: ILike(`%${query.search}%`) },
          { requestCode: ILike(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await requestRepository().findAndCount({
      where,
      relations: { items: true },
      order: { createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const request = await requestRepository().findOne({
      where: { id },
      relations: { items: true, payments: true },
    });

    if (!request) {
      throw new NotFoundError("Request");
    }

    return request;
  },

  async create(input: CreateRequestInput) {
    const request = requestRepository().create({
      ...input,
      items: input.items?.map((item) => requestItemRepository().create(item)) ?? [],
    });

    return requestRepository().save(request);
  },

  async update(id: string, input: UpdateRequestInput) {
    const request = await this.findOne(id);
    const { items, ...requestInput } = input;

    requestRepository().merge(request, requestInput);

    if (items) {
      await requestItemRepository().delete({ request: { id } });
      request.items = items.map((item) => requestItemRepository().create(item));
    }

    return requestRepository().save(request);
  },

  async updateStatus(id: string, input: UpdateRequestStatusInput) {
    const request = await this.findOne(id);
    request.status = input.status;
    return requestRepository().save(request);
  },

  async remove(id: string) {
    const request = await this.findOne(id);
    await requestRepository().remove(request);
  },
};
