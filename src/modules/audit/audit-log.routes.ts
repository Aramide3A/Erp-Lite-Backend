import { Router } from "express";
import { z } from "zod";
import { validate } from "../../common/middleware/validate";
import { auditLogController } from "./audit-log.controller";
import { createAuditLogSchema } from "./audit-log.schemas";

const auditLogQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(30),
});

export const auditLogRouter = Router();

auditLogRouter.get("/", validate({ query: auditLogQuerySchema }), auditLogController.list);
auditLogRouter.post("/", validate({ body: createAuditLogSchema }), auditLogController.create);
