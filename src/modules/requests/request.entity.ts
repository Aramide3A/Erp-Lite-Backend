import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { RequestStatus, RequestType } from "../../common/enums";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { Payment } from "../payments/payment.entity";
import { RequestItem } from "./request-item.entity";

@Entity({ name: "requests" })
export class ErpRequest extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ name: "request_code", type: "varchar", length: 40 })
  requestCode!: string;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "varchar", length: 150 })
  requester!: string;

  @Column({ type: "varchar", length: 100 })
  department!: string;

  @Column("numeric", { precision: 14, scale: 2, transformer: numericTransformer })
  amount!: number;

  @Column({ name: "submitted_at", type: "date", nullable: true })
  submittedAt?: Date | null;

  @Column({ type: "enum", enum: RequestStatus, default: RequestStatus.Draft })
  status!: RequestStatus;

  @Column({ type: "enum", enum: RequestType, default: RequestType.Other })
  type!: RequestType;

  @Column({ type: "varchar", length: 100, nullable: true })
  category?: string | null;

  @Column({ name: "required_date", type: "date", nullable: true })
  requiredDate?: Date | null;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "varchar", length: 160, nullable: true })
  beneficiary?: string | null;

  @Column({ type: "varchar", length: 160, nullable: true })
  vendor?: string | null;

  @Column({ name: "payment_type", type: "varchar", length: 100, nullable: true })
  paymentType?: string | null;

  @Column({ type: "simple-array", nullable: true })
  documents?: string[] | null;

  @OneToMany(() => RequestItem, (item) => item.request, { cascade: true })
  items!: RequestItem[];

  @OneToMany(() => Payment, (payment) => payment.request)
  payments!: Payment[];
}
