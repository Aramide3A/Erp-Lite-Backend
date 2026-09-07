import { z } from "zod";
import { RequestStatus, RequestType } from "../../common/enums";

const requestItemSchema = z.object({
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1),
  quantity: z.coerce.number().int().positive(),
  unitPrice: z.coerce.number().nonnegative(),
});

export const createRequestSchema = z.object({
  requestCode: z.string().trim().min(1).max(40),
  title: z.string().trim().min(1).max(200),
  requester: z.string().trim().min(1).max(150),
  department: z.string().trim().min(1).max(100),
  amount: z.coerce.number().nonnegative(),
  submittedAt: z.coerce.date().optional(),
  status: z.nativeEnum(RequestStatus).default(RequestStatus.Draft),
  type: z.nativeEnum(RequestType).default(RequestType.Other),
  category: z.string().trim().max(100).optional(),
  requiredDate: z.coerce.date().optional(),
  description: z.string().trim().optional(),
  beneficiary: z.string().trim().max(160).optional(),
  vendor: z.string().trim().max(160).optional(),
  paymentType: z.string().trim().max(100).optional(),
  documents: z.array(z.string().trim().min(1)).optional(),
  items: z.array(requestItemSchema).optional(),
});

export const updateRequestSchema = createRequestSchema.partial();

export const updateRequestStatusSchema = z.object({
  status: z.nativeEnum(RequestStatus),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;
