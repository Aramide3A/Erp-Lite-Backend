import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { requirePermission } from "../auth/auth.middleware";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { vendorController } from "./vendor.controller";
import { createVendorSchema, updateVendorSchema } from "./vendor.schemas";

export const vendorRouter = Router();

vendorRouter.get("/", validate({ query: paginationQuerySchema }), vendorController.list);
vendorRouter.post(
  "/",
  requirePermission("vendors", "create"),
  validate({ body: createVendorSchema }),
  vendorController.create,
);
vendorRouter.get("/:id", validate({ params: uuidParamSchema }), vendorController.get);
vendorRouter.patch(
  "/:id",
  requirePermission("vendors", "update"),
  validate({ params: uuidParamSchema, body: updateVendorSchema }),
  vendorController.update,
);
vendorRouter.delete(
  "/:id",
  requirePermission("vendors", "delete"),
  validate({ params: uuidParamSchema }),
  vendorController.remove,
);
