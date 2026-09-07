import { z } from "zod";
import { AccountType } from "../../common/enums";
import { AccountStatus } from "./account.entity";

export const createAccountSchema = z.object({
  code: z.string().trim().min(1).max(30),
  name: z.string().trim().min(1).max(160),
  type: z.nativeEnum(AccountType),
  parentId: z.string().uuid().optional(),
  description: z.string().trim().min(1),
  balance: z.coerce.number().default(0),
  status: z.nativeEnum(AccountStatus).default(AccountStatus.Active),
  hasTransactions: z.coerce.boolean().default(false),
});

export const updateAccountSchema = createAccountSchema.partial();

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
