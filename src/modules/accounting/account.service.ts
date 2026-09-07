import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { Account } from "./account.entity";
import type { CreateAccountInput, UpdateAccountInput } from "./account.schemas";

const accountRepository = () => AppDataSource.getRepository(Account);

const resolveParent = async (parentId?: string) => {
  if (!parentId) {
    return undefined;
  }

  const parent = await accountRepository().findOneBy({ id: parentId });

  if (!parent) {
    throw new NotFoundError("Parent account");
  }

  return parent;
};

export const accountService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [{ code: ILike(`%${query.search}%`) }, { name: ILike(`%${query.search}%`) }]
      : undefined;

    const [data, total] = await accountRepository().findAndCount({
      where,
      relations: { parent: true },
      order: { code: "ASC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const account = await accountRepository().findOne({
      where: { id },
      relations: { parent: true, children: true },
    });

    if (!account) {
      throw new NotFoundError("Account");
    }

    return account;
  },

  async create(input: CreateAccountInput) {
    const { parentId, ...accountInput } = input;
    const account = accountRepository().create({
      ...accountInput,
      parent: await resolveParent(parentId),
    });

    return accountRepository().save(account);
  },

  async update(id: string, input: UpdateAccountInput) {
    const account = await this.findOne(id);
    const { parentId, ...accountInput } = input;

    accountRepository().merge(account, accountInput);

    if (parentId !== undefined) {
      account.parent = await resolveParent(parentId);
    }

    return accountRepository().save(account);
  },
};
