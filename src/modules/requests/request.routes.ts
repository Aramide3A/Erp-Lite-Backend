import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { requirePermission } from "../auth/auth.middleware";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { requestController } from "./request.controller";
import {
  createRequestSchema,
  updateRequestSchema,
  updateRequestStatusSchema,
} from "./request.schemas";

export const requestRouter = Router();

requestRouter.get("/", validate({ query: paginationQuerySchema }), requestController.list);
requestRouter.post(
  "/",
  requirePermission("requests", "create"),
  validate({ body: createRequestSchema }),
  requestController.create,
);
requestRouter.get("/:id", validate({ params: uuidParamSchema }), requestController.get);
requestRouter.patch(
  "/:id",
  requirePermission("requests", "update"),
  validate({ params: uuidParamSchema, body: updateRequestSchema }),
  requestController.update,
);
requestRouter.patch(
  "/:id/status",
  requirePermission("approvals", "approve"),
  validate({ params: uuidParamSchema, body: updateRequestStatusSchema }),
  requestController.updateStatus,
);
requestRouter.delete(
  "/:id",
  requirePermission("requests", "delete"),
  validate({ params: uuidParamSchema }),
  requestController.remove,
);
