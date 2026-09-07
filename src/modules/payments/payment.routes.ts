import { Router } from "express";
import { validate } from "../../common/middleware/validate";
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
paymentRouter.post("/", validate({ body: createPaymentSchema }), paymentController.create);
paymentRouter.get("/:id", validate({ params: uuidParamSchema }), paymentController.get);
paymentRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updatePaymentSchema }),
  paymentController.update,
);
paymentRouter.patch(
  "/:id/status",
  validate({ params: uuidParamSchema, body: updatePaymentStatusSchema }),
  paymentController.updateStatus,
);
paymentRouter.delete("/:id", validate({ params: uuidParamSchema }), paymentController.remove);
