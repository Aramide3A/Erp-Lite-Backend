import { Column, Entity, ManyToOne } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { Account } from "./account.entity";
import { JournalEntry } from "./journal-entry.entity";

@Entity({ name: "journal_lines" })
export class JournalLine extends AppBaseEntity {
  @ManyToOne(() => Account, (account) => account.journalLines, { eager: true, onDelete: "RESTRICT" })
  account!: Account;

  @Column({ name: "account_code", type: "varchar", length: 30 })
  accountCode!: string;

  @Column({ name: "account_name", type: "varchar", length: 160 })
  accountName!: string;

  @Column("numeric", { precision: 14, scale: 2, default: 0, transformer: numericTransformer })
  debit!: number;

  @Column("numeric", { precision: 14, scale: 2, default: 0, transformer: numericTransformer })
  credit!: number;

  @ManyToOne(() => JournalEntry, (entry) => entry.lines, { onDelete: "CASCADE" })
  journalEntry!: JournalEntry;
}
