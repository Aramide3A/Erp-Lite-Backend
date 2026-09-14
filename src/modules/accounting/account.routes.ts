import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { requirePermission } from "../auth/auth.middleware";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { accountController } from "./account.controller";
import { createAccountSchema, updateAccountSchema } from "./account.schemas";

export const accountRouter = Router();

accountRouter.get("/", validate({ query: paginationQuerySchema }), accountController.list);
accountRouter.post(
  "/",
  requirePermission("accounting", "create"),
  validate({ body: createAccountSchema }),
  accountController.create,
);
accountRouter.get("/:id", validate({ params: uuidParamSchema }), accountController.get);
accountRouter.patch(
  "/:id",
  requirePermission("accounting", "update"),
  validate({ params: uuidParamSchema, body: updateAccountSchema }),
  accountController.update,
);
