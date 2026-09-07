import { AppError, NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { Account } from "./account.entity";
import { JournalEntry } from "./journal-entry.entity";
import { JournalLine } from "./journal-line.entity";
import type { CreateJournalEntryInput } from "./journal-entry.schemas";

const journalEntryRepository = () => AppDataSource.getRepository(JournalEntry);
const accountRepository = () => AppDataSource.getRepository(Account);

const assertBalanced = (input: CreateJournalEntryInput) => {
  const totalDebit = input.lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = input.lines.reduce((sum, line) => sum + line.credit, 0);

  if (totalDebit <= 0 || totalCredit <= 0 || Math.abs(totalDebit - totalCredit) > 0.01) {
    throw new AppError("Journal entry lines must be balanced.", 422, {
      totalDebit,
      totalCredit,
    });
  }
};

export const journalEntryService = {
  async findAll(query: PaginationQuery) {
    const [data, total] = await journalEntryRepository().findAndCount({
      relations: { lines: true },
      order: { date: "DESC", createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const entry = await journalEntryRepository().findOne({
      where: { id },
      relations: { lines: true },
    });

    if (!entry) {
      throw new NotFoundError("Journal entry");
    }

    return entry;
  },

  async create(input: CreateJournalEntryInput) {
    assertBalanced(input);

    const accountIds = input.lines.map((line) => line.accountId);
    const accounts = await accountRepository().findByIds(accountIds);

    if (accounts.length !== new Set(accountIds).size) {
      throw new NotFoundError("One or more accounts");
    }

    const accountById = new Map(accounts.map((account) => [account.id, account]));
    const entry = journalEntryRepository().create({
      ...input,
      lines: input.lines.map((line) => {
        const account = accountById.get(line.accountId);

        if (!account) {
          throw new NotFoundError("Account");
        }

        return AppDataSource.getRepository(JournalLine).create({
          account,
          accountCode: account.code,
          accountName: account.name,
          debit: line.debit,
          credit: line.credit,
        });
      }),
    });

    return journalEntryRepository().save(entry);
  },
};
