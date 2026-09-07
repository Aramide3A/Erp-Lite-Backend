import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { financialRecordService } from "./financial-record.service";

export const financialRecordController = {
  list: asyncHandler(async (req, res) => {
    const result = await financialRecordService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const record = await financialRecordService.findOne(req.params.id);
    res.json({ data: record });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const record = await financialRecordService.create(req.body);
    res.status(201).json({ data: record });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const record = await financialRecordService.update(req.params.id, req.body);
    res.json({ data: record });
  }) as RequestHandler,

  remove: asyncHandler(async (req, res) => {
    await financialRecordService.remove(req.params.id);
    res.status(204).send();
  }) as RequestHandler,
};
