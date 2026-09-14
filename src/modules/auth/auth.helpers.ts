import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import type { AuthUser } from "./auth.types";
import { User } from "./user.entity";

export const authCookieName = "erp_lite_session";

export function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function serializeUser(user: User): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    initials: initialsFor(user.name),
    role: {
      id: user.role.id,
      name: user.role.name,
      permissions: user.role.permissions.map((permission) => `${permission.module}:${permission.action}`),
    },
  };
}

export function signSession(user: AuthUser) {
  return jwt.sign({ sub: user.id }, env.auth.jwtSecret, {
    expiresIn: env.auth.sessionTtl as jwt.SignOptions["expiresIn"],
  });
}

export function verifySession(token: string) {
  return jwt.verify(token, env.auth.jwtSecret) as { sub: string };
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax" as const,
    maxAge: env.auth.sessionCookieMaxAgeMs,
    path: "/",
  };
}
