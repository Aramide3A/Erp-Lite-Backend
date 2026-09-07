import { AppDataSource } from "../../config/data-source";
import { AuditLog } from "./audit-log.entity";
import type { CreateAuditLogInput } from "./audit-log.schemas";

const auditLogRepository = () => AppDataSource.getRepository(AuditLog);

export const auditLogService = {
  async findRecent(limit = 30) {
    return auditLogRepository().find({
      order: { occurredAt: "DESC" },
      take: limit,
    });
  },

  async create(input: CreateAuditLogInput) {
    const log = auditLogRepository().create(input);
    return auditLogRepository().save(log);
  },
};
