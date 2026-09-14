import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import { auditLogService } from "../audit/audit-log.service";
import { authCookieName, authCookieOptions, signSession } from "./auth.helpers";
import { authService } from "./auth.service";

export const authController = {
  login: asyncHandler(async (req, res) => {
    const user = await authService.login(req.body);
    res.cookie(authCookieName, signSession(user), authCookieOptions());
    res.json({ data: user });
  }) as RequestHandler,

  me: asyncHandler(async (req, res) => {
    res.json({ data: req.authUser });
  }) as RequestHandler,

  logout: asyncHandler(async (req, res) => {
    if (req.authUser) {
      await auditLogService.create({
        actor: req.authUser.name,
        initials: req.authUser.initials,
        action: "logged out",
        entity: "Authentication",
        metadata: { email: req.authUser.email },
      });
    }
    res.clearCookie(authCookieName, { path: "/" });
    res.status(204).send();
  }) as RequestHandler,
};
