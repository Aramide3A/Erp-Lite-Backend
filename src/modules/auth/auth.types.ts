import type { PermissionAction, PermissionModule } from "./permissions";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
};

export type RequiredPermission = {
  module: PermissionModule;
  action: PermissionAction;
};
