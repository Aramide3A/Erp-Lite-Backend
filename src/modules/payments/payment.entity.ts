import { Column, Entity, Index, ManyToOne } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { PaymentMethod, PaymentStatus } from "../../common/enums";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { ErpRequest } from "../requests/request.entity";

@Entity({ name: "payments" })
export class Payment extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ name: "payment_code", type: "varchar", length: 40 })
  paymentCode!: string;

  @ManyToOne(() => ErpRequest, (request) => request.payments, {
    nullable: true,
    onDelete: "SET NULL",
  })
  request?: ErpRequest | null;

  @Column({ name: "request_code", type: "varchar", length: 40 })
  requestCode!: string;

  @Column({ name: "request_title", type: "varchar", length: 200 })
  requestTitle!: string;

  @Column({ type: "varchar", length: 160 })
  beneficiary!: string;

  @Column({ type: "varchar", length: 100 })
  bank!: string;

  @Column({ name: "account_number", type: "varchar", length: 30 })
  accountNumber!: string;

  @Column("numeric", { precision: 14, scale: 2, transformer: numericTransformer })
  amount!: number;

  @Column({ type: "enum", enum: PaymentMethod })
  method!: PaymentMethod;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PaymentPending })
  status!: PaymentStatus;

  @Column({ name: "approved_date", type: "date" })
  approvedDate!: Date;

  @Column({ name: "requested_by", type: "varchar", length: 150 })
  requestedBy!: string;

  @Column({ name: "approved_by", type: "varchar", length: 150 })
  approvedBy!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  reference?: string | null;

  @Column({ name: "payment_date", type: "date", nullable: true })
  paymentDate?: Date | null;

  @Column({ type: "text", nullable: true })
  notes?: string | null;
}
