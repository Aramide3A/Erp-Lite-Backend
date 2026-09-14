import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { requirePermission } from "../auth/auth.middleware";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { journalEntryController } from "./journal-entry.controller";
import { createJournalEntrySchema } from "./journal-entry.schemas";

export const journalEntryRouter = Router();

journalEntryRouter.get(
  "/",
  validate({ query: paginationQuerySchema }),
  journalEntryController.list,
);
journalEntryRouter.post(
  "/",
  requirePermission("accounting", "create"),
  validate({ body: createJournalEntrySchema }),
  journalEntryController.create,
);
journalEntryRouter.get("/:id", validate({ params: uuidParamSchema }), journalEntryController.get);
