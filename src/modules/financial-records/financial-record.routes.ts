import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { financialRecordController } from "./financial-record.controller";
import {
  createFinancialRecordSchema,
  updateFinancialRecordSchema,
} from "./financial-record.schemas";

export const financialRecordRouter = Router();

financialRecordRouter.get(
  "/",
  validate({ query: paginationQuerySchema }),
  financialRecordController.list,
);
financialRecordRouter.post(
  "/",
  validate({ body: createFinancialRecordSchema }),
  financialRecordController.create,
);
financialRecordRouter.get("/:id", validate({ params: uuidParamSchema }), financialRecordController.get);
financialRecordRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updateFinancialRecordSchema }),
  financialRecordController.update,
);
financialRecordRouter.delete(
  "/:id",
  validate({ params: uuidParamSchema }),
  financialRecordController.remove,
);
