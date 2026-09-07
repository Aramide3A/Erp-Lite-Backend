import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { vendorService } from "./vendor.service";

export const vendorController = {
  list: asyncHandler(async (req, res) => {
    const result = await vendorService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const vendor = await vendorService.findOne(req.params.id);
    res.json({ data: vendor });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const vendor = await vendorService.create(req.body);
    res.status(201).json({ data: vendor });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const vendor = await vendorService.update(req.params.id, req.body);
    res.json({ data: vendor });
  }) as RequestHandler,

  remove: asyncHandler(async (req, res) => {
    await vendorService.remove(req.params.id);
    res.status(204).send();
  }) as RequestHandler,
};
