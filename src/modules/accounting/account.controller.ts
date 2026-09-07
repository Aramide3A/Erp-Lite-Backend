import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { accountService } from "./account.service";

export const accountController = {
  list: asyncHandler(async (req, res) => {
    const result = await accountService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const account = await accountService.findOne(req.params.id);
    res.json({ data: account });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const account = await accountService.create(req.body);
    res.status(201).json({ data: account });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const account = await accountService.update(req.params.id, req.body);
    res.json({ data: account });
  }) as RequestHandler,
};
