import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { requestService } from "./request.service";

export const requestController = {
  list: asyncHandler(async (req, res) => {
    const result = await requestService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const request = await requestService.findOne(req.params.id);
    res.json({ data: request });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const request = await requestService.create(req.body);
    res.status(201).json({ data: request });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const request = await requestService.update(req.params.id, req.body);
    res.json({ data: request });
  }) as RequestHandler,

  updateStatus: asyncHandler(async (req, res) => {
    const request = await requestService.updateStatus(req.params.id, req.body);
    res.json({ data: request });
  }) as RequestHandler,

  remove: asyncHandler(async (req, res) => {
    await requestService.remove(req.params.id);
    res.status(204).send();
  }) as RequestHandler,
};
