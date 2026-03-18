import { generateClient } from 'aws-amplify/api';
import { v4 as uuidv4 } from 'uuid';
import type { Role, Permission, PermissionPerRole } from './types';

const client = generateClient();

// ─── GraphQL ──────────────────────────────────────────────────────────────────

const LIST_ROLES = /* GraphQL */`
  query ListV2Roles($limit: Int) {
    listV2Roles(limit: $limit) {
      items { id name displayName icon createdAt updatedAt }
    }
  }
`;

const CREATE_ROLE = /* GraphQL */`
  mutation CreateV2Roles($input: CreateV2RolesInput!) {
    createV2Roles(input: $input) { id name displayName icon createdAt updatedAt }
  }
`;

const UPDATE_ROLE = /* GraphQL */`
  mutation UpdateV2Roles($input: UpdateV2RolesInput!) {
    updateV2Roles(input: $input) { id name displayName icon createdAt updatedAt }
  }
`;

const DELETE_ROLE = /* GraphQL */`
  mutation DeleteV2Roles($input: DeleteV2RolesInput!) {
    deleteV2Roles(input: $input) { id }
  }
`;

const LIST_PERMISSIONS = /* GraphQL */`
  query ListV2Permissions($limit: Int) {
    listV2Permissions(limit: $limit) {
      items {
        id name displayName icon isVisible isLeaf order padreId createdAt updatedAt
      }
    }
  }
`;

const CREATE_PERMISSION = /* GraphQL */`
  mutation CreateV2Permissions($input: CreateV2PermissionsInput!) {
    createV2Permissions(input: $input) {
      id name displayName icon isVisible isLeaf order padreId createdAt updatedAt
    }
  }
`;

const UPDATE_PERMISSION = /* GraphQL */`
  mutation UpdateV2Permissions($input: UpdateV2PermissionsInput!) {
    updateV2Permissions(input: $input) {
      id name displayName icon isVisible isLeaf order padreId createdAt updatedAt
    }
  }
`;

const DELETE_PERMISSION = /* GraphQL */`
  mutation DeleteV2Permissions($input: DeleteV2PermissionsInput!) {
    deleteV2Permissions(input: $input) { id }
  }
`;

const LIST_ROL_PERMISSIONS = /* GraphQL */`
  query ListV2RolPermissions($filter: Modelv2RolPermissionsFilterInput, $limit: Int) {
    listV2RolPermissions(filter: $filter, limit: $limit) {
      items { id roleId permissionId createdAt updatedAt }
    }
  }
`;

const CREATE_ROL_PERMISSION = /* GraphQL */`
  mutation CreateV2RolPermissions($input: CreateV2RolPermissionsInput!) {
    createV2RolPermissions(input: $input) { id roleId permissionId }
  }
`;

const DELETE_ROL_PERMISSION = /* GraphQL */`
  mutation DeleteV2RolPermissions($input: DeleteV2RolPermissionsInput!) {
    deleteV2RolPermissions(input: $input) { id }
  }
`;

// ─── Mappers ──────────────────────────────────────────────────────────────────

const mapRole = (r: any): Role => ({
  roleId: r.id,
  name: r.name,
  displayName: r.displayName,
  icon: r.icon,
  createdAt: r.createdAt ?? undefined,
  updatedAt: r.updatedAt ?? undefined,
});

const mapPermission = (r: any): Permission => ({
  permissionId: r.id,
  name: r.name,
  displayName: r.displayName,
  icon: r.icon,
  isVisible: r.isVisible ?? true,
  isLeaf: r.isLeaf ?? true,
  order: r.order ?? 99,
  padreId: r.padreId ?? undefined,
  createdAt: r.createdAt ?? undefined,
  updatedAt: r.updatedAt ?? undefined,
});

const mapPPR = (r: any): PermissionPerRole => ({
  id: r.id,
  roleId: r.roleId,
  permissionId: r.permissionId,
  createdAt: r.createdAt ?? undefined,
  updatedAt: r.updatedAt ?? undefined,
});

// ─── Roles ────────────────────────────────────────────────────────────────────

export const fetchRoles = async (): Promise<Role[]> => {
  const res: any = await client.graphql({ query: LIST_ROLES, variables: { limit: 500 } });
  return (res.data?.listV2Roles?.items ?? []).map(mapRole);
};

export const createRole = async (
  input: Omit<Role, 'roleId' | 'createdAt' | 'updatedAt'>
): Promise<Role> => {
  const res: any = await client.graphql({
    query: CREATE_ROLE,
    variables: { input: { id: uuidv4(), ...input } },
  });
  return mapRole(res.data?.createV2Roles);
};

export const updateRole = async (input: Role): Promise<Role> => {
  const res: any = await client.graphql({
    query: UPDATE_ROLE,
    variables: { input: { id: input.roleId, name: input.name, displayName: input.displayName, icon: input.icon } },
  });
  return mapRole(res.data?.updateV2Roles);
};

export const deleteRole = async (roleId: string): Promise<void> => {
  await client.graphql({ query: DELETE_ROLE, variables: { input: { id: roleId } } });
};

// ─── Permissions ──────────────────────────────────────────────────────────────

export const fetchPermissions = async (): Promise<Permission[]> => {
  const res: any = await client.graphql({ query: LIST_PERMISSIONS, variables: { limit: 500 } });
  const perms: Permission[] = (res.data?.listV2Permissions?.items ?? []).map(mapPermission);
  return perms.sort((a, b) => {
    if (!a.padreId && b.padreId) return -1;
    if (a.padreId && !b.padreId) return 1;
    return (a.order ?? 99) - (b.order ?? 99);
  });
};

export const createPermission = async (
  input: Omit<Permission, 'permissionId' | 'createdAt' | 'updatedAt'>
): Promise<Permission> => {
  const res: any = await client.graphql({
    query: CREATE_PERMISSION,
    variables: { input: { id: uuidv4(), ...input } },
  });
  return mapPermission(res.data?.createV2Permissions);
};

export const updatePermission = async (input: Permission): Promise<Permission> => {
  const { permissionId, createdAt, updatedAt, ...rest } = input;
  const res: any = await client.graphql({
    query: UPDATE_PERMISSION,
    variables: { input: { id: permissionId, ...rest } },
  });
  return mapPermission(res.data?.updateV2Permissions);
};

export const deletePermission = async (permissionId: string): Promise<void> => {
  await client.graphql({ query: DELETE_PERMISSION, variables: { input: { id: permissionId } } });
};

// ─── PermissionPerRole ────────────────────────────────────────────────────────

export const fetchPermissionsPerRole = async (roleId: string): Promise<PermissionPerRole[]> => {
  const res: any = await client.graphql({
    query: LIST_ROL_PERMISSIONS,
    variables: { filter: { roleId: { eq: roleId } }, limit: 500 },
  });
  return (res.data?.listV2RolPermissions?.items ?? []).map(mapPPR);
};

export const assignPermission = async (
  roleId: string,
  permissionId: string
): Promise<PermissionPerRole> => {
  const res: any = await client.graphql({
    query: CREATE_ROL_PERMISSION,
    variables: { input: { roleId, permissionId } },
  });
  return mapPPR(res.data?.createV2RolPermissions);
};

export const revokePermission = async (
  roleId: string,
  permissionId: string
): Promise<void> => {
  // Buscar el id del registro para poder eliminarlo
  const res: any = await client.graphql({
    query: LIST_ROL_PERMISSIONS,
    variables: {
      filter: { and: [{ roleId: { eq: roleId } }, { permissionId: { eq: permissionId } }] },
      limit: 1,
    },
  });
  const item = res.data?.listV2RolPermissions?.items?.[0];
  if (item?.id) {
    await client.graphql({ query: DELETE_ROL_PERMISSION, variables: { input: { id: item.id } } });
  }
};

// ─── Fetch permissions for a role (used in login flow) ───────────────────────

const LIST_ROL_PERMISSIONS_WITH_DETAIL = /* GraphQL */`
  query ListV2RolPermissionsWithDetail($filter: Modelv2RolPermissionsFilterInput, $limit: Int) {
    listV2RolPermissions(filter: $filter, limit: $limit) {
      items {
        roleId
        permissionId
        permission {
          id name displayName icon isVisible isLeaf order padreId
        }
      }
    }
  }
`;

export const fetchPermissionsForRole = async (roleId: string): Promise<Permission[]> => {
  try {
    const res: any = await client.graphql({
      query: LIST_ROL_PERMISSIONS_WITH_DETAIL,
      variables: { filter: { roleId: { eq: roleId } }, limit: 500 },
    });
    return (res.data?.listV2RolPermissions?.items ?? [])
      .map((item: any) => item.permission)
      .filter(Boolean)
      .map(mapPermission);
  } catch {
    return [];
  }
};
