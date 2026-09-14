import bcrypt from "bcryptjs";
import { In, Not } from "typeorm";
import { AppError, NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { auditLogService } from "../audit/audit-log.service";
import type { AuthUser } from "./auth.types";
import type {
  CreateRoleInput,
  CreateUserInput,
  UpdateRoleInput,
  UpdateUserInput,
} from "./auth.schemas";
import { allPermissionKeys, permissionActions, permissionModules } from "./permissions";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

const permissionRepository = () => AppDataSource.getRepository(Permission);
const roleRepository = () => AppDataSource.getRepository(Role);
const userRepository = () => AppDataSource.getRepository(User);

function actorName(actor?: AuthUser) {
  return actor?.name ?? "System";
}

function actorInitials(actor?: AuthUser) {
  return actor?.initials ?? "SY";
}

function toUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    role: {
      id: user.role.id,
      name: user.role.name,
      permissions: user.role.permissions.map(
        (permission) => `${permission.module}:${permission.action}`,
      ),
    },
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function toRoleResponse(role: Role) {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    isSystem: role.isSystem,
    permissions: role.permissions.map((permission) => `${permission.module}:${permission.action}`),
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
  };
}

async function resolvePermissions(keys: string[]) {
  const uniqueKeys = [...new Set(keys)];
  const invalid = uniqueKeys.filter((key) => !allPermissionKeys.includes(key));
  if (invalid.length) {
    throw new AppError("One or more permissions are invalid.", 422, { permissions: invalid });
  }

  if (!uniqueKeys.length) return [];

  const [modules, actions] = uniqueKeys.reduce<[string[], string[]]>(
    (current, key) => {
      const [module, action] = key.split(":");
      current[0].push(module);
      current[1].push(action);
      return current;
    },
    [[], []],
  );

  const rows = await permissionRepository().find({
    where: { module: In([...new Set(modules)]), action: In([...new Set(actions)]) },
  });

  return rows.filter((row) => uniqueKeys.includes(`${row.module}:${row.action}`));
}

export const rbacService = {
  async ensurePermissionsAndAdmin(adminEmail: string, adminPassword: string) {
    await AppDataSource.transaction(async (manager) => {
      const permissions = manager.getRepository(Permission);
      const roles = manager.getRepository(Role);
      const users = manager.getRepository(User);

      for (const module of permissionModules) {
        for (const action of permissionActions) {
          const exists = await permissions.findOneBy({ module, action });
          if (!exists) await permissions.save(permissions.create({ module, action }));
        }
      }

      const allPermissions = await permissions.find();
      let adminRole = await roles.findOne({
        where: { name: "Admin" },
        relations: { permissions: true },
      });
      if (!adminRole) {
        adminRole = roles.create({
          name: "Admin",
          description: "Full system access",
          isSystem: true,
          permissions: allPermissions,
        });
      } else {
        adminRole.permissions = allPermissions;
        adminRole.isSystem = true;
      }
      await roles.save(adminRole);

      const normalizedEmail = adminEmail.toLowerCase();
      const adminExists = await users.findOneBy({ email: normalizedEmail });
      if (!adminExists) {
        await users.save(
          users.create({
            name: "System Admin",
            email: normalizedEmail,
            passwordHash: await bcrypt.hash(adminPassword, 12),
            status: "Active",
            role: adminRole,
          }),
        );
      }
    });
  },

  listPermissions() {
    return permissionRepository().find({ order: { module: "ASC", action: "ASC" } });
  },

  async listRoles() {
    const roles = await roleRepository().find({ order: { isSystem: "DESC", name: "ASC" } });
    return roles.map(toRoleResponse);
  },

  async createRole(input: CreateRoleInput, actor?: AuthUser) {
    const existing = await roleRepository().findOneBy({ name: input.name });
    if (existing) throw new AppError("A role with this name already exists.", 409);
    const role = roleRepository().create({
      name: input.name,
      description: input.description,
      isSystem: false,
      permissions: await resolvePermissions(input.permissions),
    });
    const saved = await roleRepository().save(role);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "created role",
      entity: saved.name,
      metadata: { permissions: input.permissions },
    });
    return toRoleResponse(saved);
  },

  async updateRole(id: string, input: UpdateRoleInput, actor?: AuthUser) {
    const role = await roleRepository().findOne({
      where: { id },
      relations: { permissions: true },
    });
    if (!role) throw new NotFoundError("Role");
    if (role.isSystem && input.name && input.name !== role.name) {
      throw new AppError("System role names cannot be changed.", 400);
    }
    if (input.name && input.name !== role.name) {
      const duplicate = await roleRepository().findOne({
        where: { name: input.name, id: Not(id) },
      });
      if (duplicate) throw new AppError("A role with this name already exists.", 409);
      role.name = input.name;
    }
    if (input.description !== undefined) role.description = input.description;
    if (input.permissions) role.permissions = await resolvePermissions(input.permissions);
    const saved = await roleRepository().save(role);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "updated role",
      entity: saved.name,
      metadata: input,
    });
    return toRoleResponse(saved);
  },

  async removeRole(id: string, actor?: AuthUser) {
    const role = await roleRepository().findOne({ where: { id }, relations: { users: true } });
    if (!role) throw new NotFoundError("Role");
    if (role.isSystem) throw new AppError("System roles cannot be deleted.", 400);
    if (role.users?.length) throw new AppError("Roles assigned to users cannot be deleted.", 409);
    await roleRepository().remove(role);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "deleted role",
      entity: role.name,
    });
  },

  async listUsers(query: PaginationQuery) {
    const [users, total] = await userRepository().findAndCount({
      relations: { role: { permissions: true } },
      order: { createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return {
      data: users.map(toUserResponse),
      meta: toPaginationMeta(query.page, query.limit, total),
    };
  },

  async createUser(input: CreateUserInput, actor?: AuthUser) {
    const email = input.email.toLowerCase();
    const existing = await userRepository().findOneBy({ email });
    if (existing) throw new AppError("A user with this email already exists.", 409);
    const role = await roleRepository().findOne({
      where: { id: input.roleId },
      relations: { permissions: true },
    });
    if (!role) throw new NotFoundError("Role");
    const user = userRepository().create({
      name: input.name,
      email,
      passwordHash: await bcrypt.hash(input.password, 12),
      status: input.status,
      role,
    });
    const saved = await userRepository().save(user);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "created user",
      entity: saved.email,
      metadata: { role: role.name, status: saved.status },
    });
    return toUserResponse(saved);
  },

  async updateUser(id: string, input: UpdateUserInput, actor?: AuthUser) {
    const user = await userRepository().findOne({
      where: { id },
      relations: { role: { permissions: true } },
    });
    if (!user) throw new NotFoundError("User");
    if (input.name !== undefined) user.name = input.name;
    if (input.email !== undefined) {
      const email = input.email.toLowerCase();
      if (email !== user.email) {
        const duplicate = await userRepository().findOne({ where: { email, id: Not(id) } });
        if (duplicate) throw new AppError("A user with this email already exists.", 409);
        user.email = email;
      }
    }
    if (input.password) user.passwordHash = await bcrypt.hash(input.password, 12);
    if (input.status) user.status = input.status;
    if (input.roleId) {
      const role = await roleRepository().findOne({
        where: { id: input.roleId },
        relations: { permissions: true },
      });
      if (!role) throw new NotFoundError("Role");
      user.role = role;
    }
    const saved = await userRepository().save(user);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "updated user",
      entity: saved.email,
      metadata: { status: saved.status, role: saved.role.name },
    });
    return toUserResponse(saved);
  },

  async removeUser(id: string, actor?: AuthUser) {
    const user = await userRepository().findOne({
      where: { id },
      relations: { role: { permissions: true } },
    });
    if (!user) throw new NotFoundError("User");
    user.status = "Inactive";
    const saved = await userRepository().save(user);
    await auditLogService.create({
      actor: actorName(actor),
      initials: actorInitials(actor),
      action: "deactivated user",
      entity: saved.email,
    });
    return toUserResponse(saved);
  },
};
