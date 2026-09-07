import { Column, Entity } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";

@Entity({ name: "audit_logs" })
export class AuditLog extends AppBaseEntity {
  @Column({ type: "varchar", length: 150 })
  actor!: string;

  @Column({ type: "varchar", length: 10 })
  initials!: string;

  @Column({ type: "varchar", length: 120 })
  action!: string;

  @Column({ type: "varchar", length: 180 })
  entity!: string;

  @Column({ name: "occurred_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  occurredAt!: Date;

  @Column({ type: "jsonb", nullable: true })
  metadata?: Record<string, unknown> | null;
}
