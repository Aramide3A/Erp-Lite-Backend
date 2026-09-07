import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import { auditLogService } from "./audit-log.service";

export const auditLogController = {
  list: asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit ?? 30);
    const data = await auditLogService.findRecent(Math.min(limit, 100));
    res.json({ data });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const log = await auditLogService.create(req.body);
    res.status(201).json({ data: log });
  }) as RequestHandler,
};
