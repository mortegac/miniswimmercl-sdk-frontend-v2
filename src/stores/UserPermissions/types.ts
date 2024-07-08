import { Users } from "../Users/types";

export type UserPermissions = {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  Submenu?: {
    items: [{ id: string; name: string; displayName: string; icon: string }];
  };
};

export const emptyPermission: UserPermissions = {
  id: "",
  name: "",
  displayName: "",
  icon: "Layout",
  Submenu: {
    items: [{ id: "", name: "", displayName: "", icon: "Layout" }],
  },
};

export type PermissionUsers = {
  id: string;
  usersId: string;
  permissionsId: string;
  users: Users;
  permissions: UserPermissions;
  createdAt: string;
  updatedAt: string;
};
