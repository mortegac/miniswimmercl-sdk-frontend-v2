export interface Role {
  roleId: string;      // mapea a v2Roles.id
  name: string;        // e.g. "adminRole", "anfitrion"
  displayName: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Permission {
  permissionId: string; // mapea a v2Permissions.id
  name: string;         // ruta e.g. "/enrollments"
  displayName: string;  // etiqueta e.g. "Matrículas"
  icon: string;
  isVisible: boolean;
  isLeaf: boolean;
  order: number;
  padreId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PermissionPerRole {
  id?: string;          // v2RolPermissions.id (necesario para delete)
  roleId: string;
  permissionId: string;
  createdAt?: string;
  updatedAt?: string;
}

export const emptyRole: Role = {
  roleId: "",
  name: "",
  displayName: "",
  icon: "Layout",
};

export const emptyPermission: Permission = {
  permissionId: "",
  name: "",
  displayName: "",
  icon: "Layout",
  isVisible: true,
  isLeaf: true,
  order: 99,
  padreId: undefined,
};

export interface RolePermissionsState {
  roles: Role[];
  permissions: Permission[];
  permissionsPerRole: PermissionPerRole[];
  selectedRoleId: string | null;
  status: "idle" | "loading" | "saving" | "deleting" | "failed";
  assignStatus: "idle" | "loading" | "saving";
  errorMessage: string;
}
