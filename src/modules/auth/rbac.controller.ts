import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import type { PaginationQuery } from "../../common/pagination";
import { rbacService } from "./rbac.service";

export const rbacController = {
  listPermissions: asyncHandler(async (_req, res) => {
    res.json({ data: await rbacService.listPermissions() });
  }) as RequestHandler,

  listRoles: asyncHandler(async (_req, res) => {
    res.json({ data: await rbacService.listRoles() });
  }) as RequestHandler,

  createRole: asyncHandler(async (req, res) => {
    res.status(201).json({ data: await rbacService.createRole(req.body, req.authUser) });
  }) as RequestHandler,

  updateRole: asyncHandler(async (req, res) => {
    res.json({ data: await rbacService.updateRole(req.params.id, req.body, req.authUser) });
  }) as RequestHandler,

  removeRole: asyncHandler(async (req, res) => {
    await rbacService.removeRole(req.params.id, req.authUser);
    res.status(204).send();
  }) as RequestHandler,

  listUsers: asyncHandler(async (req, res) => {
    res.json(await rbacService.listUsers(req.query as unknown as PaginationQuery));
  }) as RequestHandler,

  createUser: asyncHandler(async (req, res) => {
    res.status(201).json({ data: await rbacService.createUser(req.body, req.authUser) });
  }) as RequestHandler,

  updateUser: asyncHandler(async (req, res) => {
    res.json({ data: await rbacService.updateUser(req.params.id, req.body, req.authUser) });
  }) as RequestHandler,

  removeUser: asyncHandler(async (req, res) => {
    res.json({ data: await rbacService.removeUser(req.params.id, req.authUser) });
  }) as RequestHandler,
};
