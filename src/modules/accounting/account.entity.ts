import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { AccountType } from "../../common/enums";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { JournalLine } from "./journal-line.entity";

export enum AccountStatus {
  Active = "Active",
  Inactive = "Inactive",
}

@Entity({ name: "accounts" })
export class Account extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30 })
  code!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "enum", enum: AccountType })
  type!: AccountType;

  @ManyToOne(() => Account, (account) => account.children, { nullable: true, onDelete: "SET NULL" })
  parent?: Account | null;

  @OneToMany(() => Account, (account) => account.parent)
  children!: Account[];

  @Column({ type: "text" })
  description!: string;

  @Column("numeric", { precision: 14, scale: 2, default: 0, transformer: numericTransformer })
  balance!: number;

  @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.Active })
  status!: AccountStatus;

  @Column({ name: "has_transactions", type: "boolean", default: false })
  hasTransactions!: boolean;

  @OneToMany(() => JournalLine, (line) => line.account)
  journalLines!: JournalLine[];
}
