import { z } from "zod";
import { VendorStatus } from "./vendor.entity";

export const createVendorSchema = z.object({
  vendorCode: z.string().trim().min(1).max(30),
  name: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(160),
  bank: z.string().trim().min(1).max(100),
  accountNumber: z.string().trim().min(1).max(30),
  paid: z.coerce.number().nonnegative().default(0),
  status: z.nativeEnum(VendorStatus).default(VendorStatus.Active),
});

export const updateVendorSchema = createVendorSchema.partial();

export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
