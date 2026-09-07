import { Column, Entity, Index } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { Direction, RecordStatus } from "../../common/enums";
import { numericTransformer } from "../../common/transformers/numeric.transformer";

@Entity({ name: "financial_records" })
export class FinancialRecord extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ name: "record_code", type: "varchar", length: 40 })
  recordCode!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "varchar", length: 220 })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  department?: string | null;

  @Column({ type: "varchar", length: 160 })
  party!: string;

  @Column("numeric", { precision: 14, scale: 2, transformer: numericTransformer })
  amount!: number;

  @Column({ name: "payment_method", type: "varchar", length: 100 })
  paymentMethod!: string;

  @Column({ type: "varchar", length: 100 })
  reference!: string;

  @Column({ type: "varchar", length: 100 })
  source!: string;

  @Column({ type: "enum", enum: RecordStatus, default: RecordStatus.Draft })
  status!: RecordStatus;

  @Column({ type: "enum", enum: Direction })
  direction!: Direction;

  @Column({ type: "varchar", length: 120 })
  account!: string;

  @Column({ name: "account_code", type: "varchar", length: 30, nullable: true })
  accountCode?: string | null;

  @Column({ name: "payment_status", type: "varchar", length: 40, nullable: true })
  paymentStatus?: string | null;

  @Column({ name: "payment_source", type: "varchar", length: 80, nullable: true })
  paymentSource?: string | null;

  @Column({ name: "payment_date", type: "date", nullable: true })
  paymentDate?: Date | null;

  @Column({ name: "liability_account", type: "varchar", length: 120, nullable: true })
  liabilityAccount?: string | null;

  @Column({ name: "request_code", type: "varchar", length: 40, nullable: true })
  requestCode?: string | null;

  @Column({ name: "payment_code", type: "varchar", length: 40, nullable: true })
  paymentCode?: string | null;

  @Column({ type: "simple-array", nullable: true })
  attachments?: string[] | null;
}
