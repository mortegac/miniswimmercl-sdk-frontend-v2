import { UserPermissions, emptyPermission } from "../UserPermissions/types";

export type Roles = {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  Permissions?: { items: PermissionsRoles[] };
};

export type PermissionsRoles = {
  id: string;
  rolesId: string;
  permissionsId: string;
  roles: Roles;
  permissions: UserPermissions;
  createdAt: string;
  updatedAt: string;
};

export const emptyPermissionRole = {
  id: "",
  rolesId: "",
  permissionsId: "",
  roles: {
    id: "",
    name: "",
    displayName: "",
    icon: "Layout",
  },
  permissions: emptyPermission,
  createdAt: "",
  updatedAt: "",
};

export const emptyRole: Roles = {
  id: "",
  name: "",
  displayName: "",
  icon: "Layout",
  Permissions: { items: [emptyPermissionRole] },
};
