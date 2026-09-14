import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { requirePermission } from "./auth.middleware";
import {
  createRoleSchema,
  createUserSchema,
  updateRoleSchema,
  updateUserSchema,
} from "./auth.schemas";
import { rbacController } from "./rbac.controller";

export const permissionRouter = Router();
permissionRouter.get("/", requirePermission("roles", "view"), rbacController.listPermissions);

export const roleRouter = Router();
roleRouter.get("/", requirePermission("roles", "view"), rbacController.listRoles);
roleRouter.post(
  "/",
  requirePermission("roles", "create"),
  validate({ body: createRoleSchema }),
  rbacController.createRole,
);
roleRouter.patch(
  "/:id",
  requirePermission("roles", "update"),
  validate({ params: uuidParamSchema, body: updateRoleSchema }),
  rbacController.updateRole,
);
roleRouter.delete(
  "/:id",
  requirePermission("roles", "delete"),
  validate({ params: uuidParamSchema }),
  rbacController.removeRole,
);

export const userRouter = Router();
userRouter.get(
  "/",
  requirePermission("users", "view"),
  validate({ query: paginationQuerySchema }),
  rbacController.listUsers,
);
userRouter.post(
  "/",
  requirePermission("users", "create"),
  validate({ body: createUserSchema }),
  rbacController.createUser,
);
userRouter.patch(
  "/:id",
  requirePermission("users", "update"),
  validate({ params: uuidParamSchema, body: updateUserSchema }),
  rbacController.updateUser,
);
userRouter.delete(
  "/:id",
  requirePermission("users", "delete"),
  validate({ params: uuidParamSchema }),
  rbacController.removeUser,
);
