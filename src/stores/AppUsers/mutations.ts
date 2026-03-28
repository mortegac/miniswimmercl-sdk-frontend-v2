export const createAppUser = /* GraphQL */ `
  mutation CreateV2Users($input: CreateV2UsersInput!) {
    createV2Users(input: $input) {
      id
      name
      email
      contactPhone
      isEmployed
      isActive
      isAcademyStudent
      validated
      roleId
      createdAt
      updatedAt
    }
  }
`;

export const updateAppUser = /* GraphQL */ `
  mutation UpdateV2Users($input: UpdateV2UsersInput!) {
    updateV2Users(input: $input) {
      id
      name
      email
      contactPhone
      isEmployed
      isActive
      isAcademyStudent
      validated
      roleId
      updatedAt
    }
  }
`;

// ── Cognito mutations ─────────────────────────────────────────────────────────

export const cognitoSetPassword = /* GraphQL */ `
  mutation V2CognitoSetPassword($email: String!, $password: String!, $permanent: Boolean) {
    v2CognitoSetPassword(email: $email, password: $password, permanent: $permanent)
  }
`;

export const cognitoSetStatus = /* GraphQL */ `
  mutation V2CognitoSetStatus($email: String!, $enabled: Boolean!) {
    v2CognitoSetStatus(email: $email, enabled: $enabled)
  }
`;

export const cognitoCreateUser = /* GraphQL */ `
  mutation V2CognitoCreateUser(
    $email: String!
    $name: String!
    $temporaryPassword: String!
    $contactPhone: String
    $roleId: String
    $isEmployed: Boolean
  ) {
    v2CognitoCreateUser(
      email: $email
      name: $name
      temporaryPassword: $temporaryPassword
      contactPhone: $contactPhone
      roleId: $roleId
      isEmployed: $isEmployed
    ) {
      email
      name
      roleId
    }
  }
`;

export const deleteAppUser = /* GraphQL */ `
  mutation DeleteV2Users($input: DeleteV2UsersInput!) {
    deleteV2Users(input: $input) {
      id
    }
  }
`;
