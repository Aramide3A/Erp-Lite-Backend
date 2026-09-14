import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { requirePermission } from "../auth/auth.middleware";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { paymentController } from "./payment.controller";
import {
  createPaymentSchema,
  updatePaymentSchema,
  updatePaymentStatusSchema,
} from "./payment.schemas";

export const paymentRouter = Router();

paymentRouter.get("/", validate({ query: paginationQuerySchema }), paymentController.list);
paymentRouter.post(
  "/",
  requirePermission("payments", "create"),
  validate({ body: createPaymentSchema }),
  paymentController.create,
);
paymentRouter.get("/:id", validate({ params: uuidParamSchema }), paymentController.get);
paymentRouter.patch(
  "/:id",
  requirePermission("payments", "update"),
  validate({ params: uuidParamSchema, body: updatePaymentSchema }),
  paymentController.update,
);
paymentRouter.patch(
  "/:id/status",
  requirePermission("payments", "pay"),
  validate({ params: uuidParamSchema, body: updatePaymentStatusSchema }),
  paymentController.updateStatus,
);
paymentRouter.delete(
  "/:id",
  requirePermission("payments", "delete"),
  validate({ params: uuidParamSchema }),
  paymentController.remove,
);
