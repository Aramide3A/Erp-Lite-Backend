import { Router } from "express";
import { validate } from "../../common/middleware/validate";
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
requestRouter.post("/", validate({ body: createRequestSchema }), requestController.create);
requestRouter.get("/:id", validate({ params: uuidParamSchema }), requestController.get);
requestRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updateRequestSchema }),
  requestController.update,
);
requestRouter.patch(
  "/:id/status",
  validate({ params: uuidParamSchema, body: updateRequestStatusSchema }),
  requestController.updateStatus,
);
requestRouter.delete("/:id", validate({ params: uuidParamSchema }), requestController.remove);
