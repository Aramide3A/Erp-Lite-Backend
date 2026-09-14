import bcrypt from "bcryptjs";
import { AppError, NotFoundError } from "../../common/errors/app-error";
import { AppDataSource } from "../../config/data-source";
import { auditLogService } from "../audit/audit-log.service";
import type { LoginInput } from "./auth.schemas";
import { serializeUser } from "./auth.helpers";
import { User } from "./user.entity";

const userRepository = () => AppDataSource.getRepository(User);

export const authService = {
  async login(input: LoginInput) {
    const user = await userRepository().findOne({
      where: { email: input.email.toLowerCase() },
      relations: { role: { permissions: true } },
    });

    if (!user || user.status !== "Active") {
      throw new AppError("Invalid email or password.", 401);
    }

    const matches = await bcrypt.compare(input.password, user.passwordHash);
    if (!matches) {
      throw new AppError("Invalid email or password.", 401);
    }

    user.lastLoginAt = new Date();
    await userRepository().save(user);
    await auditLogService.create({
      actor: user.name,
      initials: serializeUser(user).initials,
      action: "logged in",
      entity: "Authentication",
      metadata: { email: user.email },
    });

    return serializeUser(user);
  },

  async findSessionUser(id: string) {
    const user = await userRepository().findOne({
      where: { id },
      relations: { role: { permissions: true } },
    });

    if (!user || user.status !== "Active") {
      throw new NotFoundError("User");
    }

    return serializeUser(user);
  },
};
