import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { employeeService } from "./employee.service";

export const employeeController = {
  list: asyncHandler(async (req, res) => {
    const result = await employeeService.findAll(req.query as unknown as PaginationQuery);
    res.json(result);
  }) as RequestHandler,

  get: asyncHandler(async (req, res) => {
    const employee = await employeeService.findOne(req.params.id);
    res.json({ data: employee });
  }) as RequestHandler,

  create: asyncHandler(async (req, res) => {
    const employee = await employeeService.create(req.body);
    res.status(201).json({ data: employee });
  }) as RequestHandler,

  update: asyncHandler(async (req, res) => {
    const employee = await employeeService.update(req.params.id, req.body);
    res.json({ data: employee });
  }) as RequestHandler,

  remove: asyncHandler(async (req, res) => {
    await employeeService.remove(req.params.id);
    res.status(204).send();
  }) as RequestHandler,
};
