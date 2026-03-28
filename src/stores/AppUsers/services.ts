import { generateClient } from 'aws-amplify/api';
import { listAppV2Users, listAppV2Roles, getCognitoUser } from './queries';
import { createAppUser, updateAppUser, deleteAppUser, cognitoSetPassword, cognitoSetStatus, cognitoCreateUser } from './mutations';
import type { AppUser, AppRole, UserFormData } from './types';

const client = generateClient();

export const fetchAppUsers = async (): Promise<AppUser[]> => {
  const allItems: AppUser[] = [];
  let nextToken: string | null = null;
  do {
    const result: any = await client.graphql({
      query: listAppV2Users,
      variables: { limit: 1000, nextToken },
    });
    const page = result?.data?.listV2Users;
    allItems.push(...(page?.items ?? []));
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
  return allItems;
};

export const fetchAppRoles = async (): Promise<AppRole[]> => {
  const result: any = await client.graphql({ query: listAppV2Roles });
  return result?.data?.listV2Roles?.items ?? [];
};

export type CognitoUserInfo = {
  sub: string;
  email: string;
  name: string | null;
  enabled: boolean;
  status: string;
  createdAt: string;
};

// Busca el estado Cognito de un usuario por email (filter sintaxis Cognito)
export const fetchCognitoUser = async (email: string): Promise<CognitoUserInfo | null> => {
  const result: any = await client.graphql({
    query: getCognitoUser,
    variables: { filter: `email = "${email}"` },
  });
  const users: CognitoUserInfo[] = result?.data?.v2ListCognitoUsers?.users ?? [];
  return users[0] ?? null;
};

export const createUser = async (data: UserFormData): Promise<AppUser> => {
  const result: any = await client.graphql({
    query: createAppUser,
    variables: {
      input: {
        id: data.id,
        email: data.id,
        name: data.name,
        contactPhone: data.contactPhone,
        roleId: data.roleId || null,
        isEmployed: data.isEmployed,
        isActive: data.isActive,
        isAcademyStudent: data.isAcademyStudent,
        validated: data.validated,
        firstContact: false,
        ig: '',
      },
    },
  });
  return result.data.createV2Users;
};

export const updateUser = async (id: string, data: Partial<UserFormData>): Promise<AppUser> => {
  const result: any = await client.graphql({
    query: updateAppUser,
    variables: {
      input: {
        id,
        name: data.name,
        contactPhone: data.contactPhone,
        roleId: data.roleId || null,
        isEmployed: data.isEmployed,
        isActive: data.isActive,
        isAcademyStudent: data.isAcademyStudent,
        validated: data.validated,
      },
    },
  });
  return result.data.updateV2Users;
};

export const deleteUser = async (id: string): Promise<void> => {
  await client.graphql({
    query: deleteAppUser,
    variables: { input: { id } },
  });
};

// ── Cognito management ────────────────────────────────────────────────────────

export const setCognitoPassword = async (
  email: string,
  password: string,
  permanent: boolean
): Promise<void> => {
  const result: any = await client.graphql({
    query: cognitoSetPassword,
    variables: { email, password, permanent },
  });
  if (!result?.data?.v2CognitoSetPassword) {
    throw new Error('No se pudo cambiar la contraseña');
  }
};

export const setCognitoStatus = async (email: string, enabled: boolean): Promise<void> => {
  const result: any = await client.graphql({
    query: cognitoSetStatus,
    variables: { email, enabled },
  });
  if (!result?.data?.v2CognitoSetStatus) {
    throw new Error('No se pudo cambiar el estado');
  }
};

export interface CreateCognitoUserParams {
  email: string;
  name: string;
  temporaryPassword: string;
  contactPhone?: string;
  roleId?: string;
  isEmployed?: boolean;
}

export const createCognitoUser = async (params: CreateCognitoUserParams): Promise<AppUser> => {
  const result: any = await client.graphql({
    query: cognitoCreateUser,
    variables: params,
  });
  return result?.data?.v2CognitoCreateUser;
};
