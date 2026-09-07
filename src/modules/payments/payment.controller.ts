import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { paymentService } from "./payment.service";

export const paymentController = {
  list: asyncHandler(async (req, res) => {
    const result = await paymentService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const payment = await paymentService.findOne(req.params.id);
    res.json({ data: payment });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const payment = await paymentService.create(req.body);
    res.status(201).json({ data: payment });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const payment = await paymentService.update(req.params.id, req.body);
    res.json({ data: payment });
  }) as RequestHandler,

  updateStatus: asyncHandler(async (req, res) => {
    const payment = await paymentService.updateStatus(req.params.id, req.body);
    res.json({ data: payment });
  }) as RequestHandler,

  remove: asyncHandler(async (req, res) => {
    await paymentService.remove(req.params.id);
    res.status(204).send();
  }) as RequestHandler,
};
