import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  fetchRoles, createRole, updateRole, deleteRole,
  fetchPermissions, createPermission, updatePermission, deletePermission,
  fetchPermissionsPerRole, assignPermission, revokePermission,
} from "./services";
import type { Role, Permission, PermissionPerRole, RolePermissionsState } from "./types";

const initialState: RolePermissionsState = {
  roles: [],
  permissions: [],
  permissionsPerRole: [],
  selectedRoleId: null,
  status: "idle",
  assignStatus: "idle",
  errorMessage: "",
};

// ─── Roles ────────────────────────────────────────────────────────────────────

export const loadRoles = createAsyncThunk(
  "rolePermissions/loadRoles",
  async (_, { rejectWithValue }) => {
    try { return await fetchRoles(); }
    catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

export const saveRole = createAsyncThunk(
  "rolePermissions/saveRole",
  async (input: Partial<Role> & { name: string; displayName: string; icon: string }, { rejectWithValue }) => {
    try {
      if (input.roleId) return await updateRole(input as Role);
      return await createRole(input);
    } catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

export const removeRole = createAsyncThunk(
  "rolePermissions/removeRole",
  async (roleId: string, { rejectWithValue }) => {
    try { await deleteRole(roleId); return roleId; }
    catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

// ─── Permissions ──────────────────────────────────────────────────────────────

export const loadPermissions = createAsyncThunk(
  "rolePermissions/loadPermissions",
  async (_, { rejectWithValue }) => {
    try { return await fetchPermissions(); }
    catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

export const savePermission = createAsyncThunk(
  "rolePermissions/savePermission",
  async (input: Partial<Permission> & { name: string; displayName: string; icon: string }, { rejectWithValue }) => {
    try {
      if (input.permissionId) return await updatePermission(input as Permission);
      return await createPermission(input as any);
    } catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

export const removePermission = createAsyncThunk(
  "rolePermissions/removePermission",
  async (permissionId: string, { rejectWithValue }) => {
    try { await deletePermission(permissionId); return permissionId; }
    catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

// ─── PermissionPerRole ────────────────────────────────────────────────────────

export const loadPermissionsPerRole = createAsyncThunk(
  "rolePermissions/loadPermissionsPerRole",
  async (roleId: string, { rejectWithValue }) => {
    try { return await fetchPermissionsPerRole(roleId); }
    catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

export const togglePermission = createAsyncThunk(
  "rolePermissions/togglePermission",
  async (
    { roleId, permissionId, assigned }: { roleId: string; permissionId: string; assigned: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (assigned) {
        await revokePermission(roleId, permissionId);
        return { roleId, permissionId, action: "revoked" as const };
      } else {
        const ppr = await assignPermission(roleId, permissionId);
        return { roleId, permissionId, action: "assigned" as const, data: ppr };
      }
    } catch (e: any) { return rejectWithValue({ errorMessage: e.message }); }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

export const rolePermissionsSlice = createSlice({
  name: "rolePermissions",
  initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<string | null>) => {
      state.selectedRoleId = action.payload;
      state.permissionsPerRole = [];
    },
    clearError: (state) => {
      state.errorMessage = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Load roles
    builder.addCase(loadRoles.pending, (state) => { state.status = "loading"; });
    builder.addCase(loadRoles.fulfilled, (state, action) => {
      state.status = "idle";
      state.roles = action.payload;
    });
    builder.addCase(loadRoles.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al cargar roles";
    });

    // Save role
    builder.addCase(saveRole.pending, (state) => { state.status = "saving"; });
    builder.addCase(saveRole.fulfilled, (state, action) => {
      state.status = "idle";
      const idx = state.roles.findIndex(r => r.roleId === action.payload.roleId);
      if (idx >= 0) state.roles[idx] = action.payload;
      else state.roles.unshift(action.payload);
    });
    builder.addCase(saveRole.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al guardar rol";
    });

    // Remove role
    builder.addCase(removeRole.pending, (state) => { state.status = "deleting"; });
    builder.addCase(removeRole.fulfilled, (state, action) => {
      state.status = "idle";
      state.roles = state.roles.filter(r => r.roleId !== action.payload);
      if (state.selectedRoleId === action.payload) state.selectedRoleId = null;
    });
    builder.addCase(removeRole.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al eliminar rol";
    });

    // Load permissions
    builder.addCase(loadPermissions.pending, (state) => { state.status = "loading"; });
    builder.addCase(loadPermissions.fulfilled, (state, action) => {
      state.status = "idle";
      state.permissions = action.payload;
    });
    builder.addCase(loadPermissions.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al cargar permisos";
    });

    // Save permission
    builder.addCase(savePermission.pending, (state) => { state.status = "saving"; });
    builder.addCase(savePermission.fulfilled, (state, action) => {
      state.status = "idle";
      const idx = state.permissions.findIndex(p => p.permissionId === action.payload.permissionId);
      if (idx >= 0) state.permissions[idx] = action.payload;
      else state.permissions.unshift(action.payload);
    });
    builder.addCase(savePermission.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al guardar permiso";
    });

    // Remove permission
    builder.addCase(removePermission.pending, (state) => { state.status = "deleting"; });
    builder.addCase(removePermission.fulfilled, (state, action) => {
      state.status = "idle";
      state.permissions = state.permissions.filter(p => p.permissionId !== action.payload);
    });
    builder.addCase(removePermission.rejected, (state, action: any) => {
      state.status = "failed";
      state.errorMessage = action.payload?.errorMessage ?? "Error al eliminar permiso";
    });

    // Load permissions per role
    builder.addCase(loadPermissionsPerRole.pending, (state) => { state.assignStatus = "loading"; });
    builder.addCase(loadPermissionsPerRole.fulfilled, (state, action) => {
      state.assignStatus = "idle";
      state.permissionsPerRole = action.payload;
    });
    builder.addCase(loadPermissionsPerRole.rejected, (state, action: any) => {
      state.assignStatus = "idle";
      state.errorMessage = action.payload?.errorMessage ?? "Error al cargar asignaciones";
    });

    // Toggle permission
    builder.addCase(togglePermission.pending, (state) => { state.assignStatus = "saving"; });
    builder.addCase(togglePermission.fulfilled, (state, action) => {
      state.assignStatus = "idle";
      const { roleId, permissionId, action: act } = action.payload;
      if (act === "revoked") {
        state.permissionsPerRole = state.permissionsPerRole.filter(
          p => !(p.roleId === roleId && p.permissionId === permissionId)
        );
      } else {
        state.permissionsPerRole.push({ roleId, permissionId });
      }
    });
    builder.addCase(togglePermission.rejected, (state, action: any) => {
      state.assignStatus = "idle";
      state.errorMessage = action.payload?.errorMessage ?? "Error al actualizar asignación";
    });
  },
});

export const { setSelectedRole, clearError } = rolePermissionsSlice.actions;
export const selectRolePermissions = (state: RootState) => state.rolePermissions;
export default rolePermissionsSlice.reducer;
