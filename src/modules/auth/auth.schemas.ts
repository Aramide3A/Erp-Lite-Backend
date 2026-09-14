import { z } from "zod";
import { permissionActions, permissionModules } from "./permissions";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const createRoleSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(250).default(""),
  permissions: z.array(z.string()).default([]),
});

export const updateRoleSchema = createRoleSchema.partial();

export const createUserSchema = z.object({
  name: z.string().trim().min(2).max(140),
  email: z.string().trim().email(),
  password: z.string().min(8).max(120),
  roleId: z.string().uuid(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(140).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(8).max(120).optional(),
  roleId: z.string().uuid().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
});

export const permissionSchema = z.object({
  module: z.enum(permissionModules),
  action: z.enum(permissionActions),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
