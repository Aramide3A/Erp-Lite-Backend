import { Column, Entity, OneToMany } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { JournalLine } from "./journal-line.entity";

export enum JournalEntryStatus {
  Draft = "Draft",
  Posted = "Posted",
  Reversed = "Reversed",
}

@Entity({ name: "journal_entries" })
export class JournalEntry extends AppBaseEntity {
  @Column({ name: "entry_code", type: "varchar", length: 40, unique: true })
  entryCode!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "varchar", length: 220 })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  reference!: string;

  @Column({ name: "source_type", type: "varchar", length: 80 })
  sourceType!: string;

  @Column({ name: "source_id", type: "varchar", length: 80 })
  sourceId!: string;

  @Column({ type: "enum", enum: JournalEntryStatus, default: JournalEntryStatus.Posted })
  status!: JournalEntryStatus;

  @OneToMany(() => JournalLine, (line) => line.journalEntry, { cascade: true })
  lines!: JournalLine[];
}
