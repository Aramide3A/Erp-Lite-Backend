import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/app-error";
import { asyncHandler } from "../../common/middleware/async-handler";
import { authCookieName, verifySession } from "./auth.helpers";
import { authService } from "./auth.service";
import type { PermissionAction, PermissionModule } from "./permissions";

export const requireAuth: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.[authCookieName];
  if (!token) throw new AppError("Authentication is required.", 401);

  try {
    const payload = verifySession(token);
    req.authUser = await authService.findSessionUser(payload.sub);
    next();
  } catch {
    throw new AppError("Authentication is required.", 401);
  }
});

export function requirePermission(
  module: PermissionModule,
  action: PermissionAction,
): RequestHandler {
  return (req, _res, next) => {
    const permissions = req.authUser?.role.permissions ?? [];
    if (permissions.includes(`${module}:${action}`) || permissions.includes(`${module}:manage`)) {
      next();
      return;
    }

    next(
      new AppError("You do not have permission to perform this action.", 403, { module, action }),
    );
  };
}

export function requireAnyPermission(
  allowed: Array<{ module: PermissionModule; action: PermissionAction }>,
): RequestHandler {
  return (req, _res, next) => {
    const permissions = req.authUser?.role.permissions ?? [];
    const canAccess = allowed.some(
      ({ module, action }) =>
        permissions.includes(`${module}:${action}`) || permissions.includes(`${module}:manage`),
    );

    if (canAccess) {
      next();
      return;
    }

    next(new AppError("You do not have permission to perform this action.", 403, { allowed }));
  };
}
