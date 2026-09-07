import { z } from "zod";
import { JournalEntryStatus } from "./journal-entry.entity";

const journalLineSchema = z.object({
  accountId: z.string().uuid(),
  debit: z.coerce.number().nonnegative().default(0),
  credit: z.coerce.number().nonnegative().default(0),
});

export const createJournalEntrySchema = z.object({
  entryCode: z.string().trim().min(1).max(40),
  date: z.coerce.date(),
  description: z.string().trim().min(1).max(220),
  reference: z.string().trim().min(1).max(100),
  sourceType: z.string().trim().min(1).max(80),
  sourceId: z.string().trim().min(1).max(80),
  status: z.nativeEnum(JournalEntryStatus).default(JournalEntryStatus.Posted),
  lines: z.array(journalLineSchema).min(2),
});

export type CreateJournalEntryInput = z.infer<typeof createJournalEntrySchema>;
