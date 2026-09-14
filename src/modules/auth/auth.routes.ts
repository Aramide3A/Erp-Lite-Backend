import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { authController } from "./auth.controller";
import { requireAuth } from "./auth.middleware";
import { loginSchema } from "./auth.schemas";

export const authRouter = Router();

authRouter.post("/login", validate({ body: loginSchema }), authController.login);
authRouter.get("/me", requireAuth, authController.me);
authRouter.post("/logout", requireAuth, authController.logout);
