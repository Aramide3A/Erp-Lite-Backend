import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { journalEntryService } from "./journal-entry.service";

export const journalEntryController = {
  list: asyncHandler(async (req, res) => {
    const result = await journalEntryService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const entry = await journalEntryService.findOne(req.params.id);
    res.json({ data: entry });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const entry = await journalEntryService.create(req.body);
    res.status(201).json({ data: entry });
  }) as RequestHandler,
};
