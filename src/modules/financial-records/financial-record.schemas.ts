import { z } from "zod";
import { Direction, RecordStatus } from "../../common/enums";

export const createFinancialRecordSchema = z.object({
  recordCode: z.string().trim().min(1).max(40),
  date: z.coerce.date(),
  description: z.string().trim().min(1).max(220),
  category: z.string().trim().min(1).max(100),
  department: z.string().trim().max(100).optional(),
  party: z.string().trim().min(1).max(160),
  amount: z.coerce.number().nonnegative(),
  paymentMethod: z.string().trim().min(1).max(100),
  reference: z.string().trim().min(1).max(100),
  source: z.string().trim().min(1).max(100),
  status: z.nativeEnum(RecordStatus).default(RecordStatus.Draft),
  direction: z.nativeEnum(Direction),
  account: z.string().trim().min(1).max(120),
  accountCode: z.string().trim().max(30).optional(),
  paymentStatus: z.string().trim().max(40).optional(),
  paymentSource: z.string().trim().max(80).optional(),
  paymentDate: z.coerce.date().optional(),
  liabilityAccount: z.string().trim().max(120).optional(),
  requestCode: z.string().trim().max(40).optional(),
  paymentCode: z.string().trim().max(40).optional(),
  attachments: z.array(z.string().trim().min(1)).optional(),
});

export const updateFinancialRecordSchema = createFinancialRecordSchema.partial();

export type CreateFinancialRecordInput = z.infer<typeof createFinancialRecordSchema>;
export type UpdateFinancialRecordInput = z.infer<typeof updateFinancialRecordSchema>;
