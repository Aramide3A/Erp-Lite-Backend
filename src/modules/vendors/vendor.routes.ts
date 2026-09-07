import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { vendorController } from "./vendor.controller";
import { createVendorSchema, updateVendorSchema } from "./vendor.schemas";

export const vendorRouter = Router();

vendorRouter.get("/", validate({ query: paginationQuerySchema }), vendorController.list);
vendorRouter.post("/", validate({ body: createVendorSchema }), vendorController.create);
vendorRouter.get("/:id", validate({ params: uuidParamSchema }), vendorController.get);
vendorRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updateVendorSchema }),
  vendorController.update,
);
vendorRouter.delete("/:id", validate({ params: uuidParamSchema }), vendorController.remove);
