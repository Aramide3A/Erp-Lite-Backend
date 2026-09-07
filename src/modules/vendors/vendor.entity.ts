import { Column, Entity, Index } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { numericTransformer } from "../../common/transformers/numeric.transformer";

export enum VendorStatus {
  Active = "Active",
  Inactive = "Inactive",
}

@Entity({ name: "vendors" })
export class Vendor extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ name: "vendor_code", type: "varchar", length: 30 })
  vendorCode!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "varchar", length: 120 })
  contact!: string;

  @Column({ type: "varchar", length: 40 })
  phone!: string;

  @Column({ type: "varchar", length: 160 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  bank!: string;

  @Column({ name: "account_number", type: "varchar", length: 30 })
  accountNumber!: string;

  @Column("numeric", { precision: 14, scale: 2, default: 0, transformer: numericTransformer })
  paid!: number;

  @Column({ type: "enum", enum: VendorStatus, default: VendorStatus.Active })
  status!: VendorStatus;
}
