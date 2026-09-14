export const permissionModules = [
  "dashboard",
  "requests",
  "approvals",
  "payments",
  "expenses",
  "income",
  "employees",
  "salaries",
  "accounting",
  "assets",
  "liabilities",
  "capital",
  "budgets",
  "vendors",
  "reports",
  "audit-log",
  "settings",
  "users",
  "roles",
] as const;

export const permissionActions = [
  "view",
  "create",
  "update",
  "delete",
  "approve",
  "pay",
  "manage",
] as const;

export type PermissionModule = (typeof permissionModules)[number];
export type PermissionAction = (typeof permissionActions)[number];

export const allPermissionKeys = permissionModules.flatMap((module) =>
  permissionActions.map((action) => `${module}:${action}`),
);
