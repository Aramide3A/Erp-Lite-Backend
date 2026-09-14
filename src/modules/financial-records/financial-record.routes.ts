import { Router } from "express";
import type { RequestHandler } from "express";
import { Direction } from "../../common/enums";
import { validate } from "../../common/middleware/validate";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { financialRecordController } from "./financial-record.controller";
import {
  createFinancialRecordSchema,
  updateFinancialRecordSchema,
} from "./financial-record.schemas";
import { requireAnyPermission, requirePermission } from "../auth/auth.middleware";

export const financialRecordRouter = Router();

const requireFinancialRecordWrite: RequestHandler = (req, res, next) => {
  if (req.body.direction === Direction.In)
    return requirePermission("income", "create")(req, res, next);
  return requirePermission("expenses", "create")(req, res, next);
};

const requireFinancialRecordUpdate: RequestHandler = (req, res, next) => {
  if (req.body.direction === Direction.In)
    return requirePermission("income", "update")(req, res, next);
  if (req.body.direction === Direction.Out)
    return requirePermission("expenses", "update")(req, res, next);
  return requireAnyPermission([
    { module: "income", action: "update" },
    { module: "expenses", action: "update" },
  ])(req, res, next);
};

financialRecordRouter.get(
  "/",
  requireAnyPermission([
    { module: "income", action: "view" },
    { module: "expenses", action: "view" },
    { module: "reports", action: "view" },
  ]),
  validate({ query: paginationQuerySchema }),
  financialRecordController.list,
);
financialRecordRouter.post(
  "/",
  validate({ body: createFinancialRecordSchema }),
  requireFinancialRecordWrite,
  financialRecordController.create,
);
financialRecordRouter.get(
  "/:id",
  requireAnyPermission([
    { module: "income", action: "view" },
    { module: "expenses", action: "view" },
    { module: "reports", action: "view" },
  ]),
  validate({ params: uuidParamSchema }),
  financialRecordController.get,
);
financialRecordRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updateFinancialRecordSchema }),
  requireFinancialRecordUpdate,
  financialRecordController.update,
);
financialRecordRouter.delete(
  "/:id",
  requireAnyPermission([
    { module: "income", action: "delete" },
    { module: "expenses", action: "delete" },
  ]),
  validate({ params: uuidParamSchema }),
  financialRecordController.remove,
);
