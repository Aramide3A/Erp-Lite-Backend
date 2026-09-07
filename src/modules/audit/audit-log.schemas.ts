import { z } from "zod";

export const createAuditLogSchema = z.object({
  actor: z.string().trim().min(1).max(150),
  initials: z.string().trim().min(1).max(10),
  action: z.string().trim().min(1).max(120),
  entity: z.string().trim().min(1).max(180),
  occurredAt: z.coerce.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type CreateAuditLogInput = z.infer<typeof createAuditLogSchema>;
