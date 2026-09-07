import { z } from "zod";
import { PaymentMethod, PaymentStatus } from "../../common/enums";

export const createPaymentSchema = z.object({
  paymentCode: z.string().trim().min(1).max(40),
  requestId: z.string().uuid().optional(),
  requestCode: z.string().trim().min(1).max(40),
  requestTitle: z.string().trim().min(1).max(200),
  beneficiary: z.string().trim().min(1).max(160),
  bank: z.string().trim().min(1).max(100),
  accountNumber: z.string().trim().min(1).max(30),
  amount: z.coerce.number().nonnegative(),
  method: z.nativeEnum(PaymentMethod),
  status: z.nativeEnum(PaymentStatus).default(PaymentStatus.PaymentPending),
  approvedDate: z.coerce.date(),
  requestedBy: z.string().trim().min(1).max(150),
  approvedBy: z.string().trim().min(1).max(150),
  reference: z.string().trim().max(100).optional(),
  paymentDate: z.coerce.date().optional(),
  notes: z.string().trim().optional(),
});

export const updatePaymentSchema = createPaymentSchema.partial();

export const updatePaymentStatusSchema = z.object({
  method: z.nativeEnum(PaymentMethod).optional(),
  status: z.nativeEnum(PaymentStatus),
  reference: z.string().trim().max(100).optional(),
  paymentDate: z.coerce.date().optional(),
  notes: z.string().trim().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;
