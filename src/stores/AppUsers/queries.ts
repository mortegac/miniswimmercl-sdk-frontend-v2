export const listAppV2Users = /* GraphQL */ `
  query ListV2Users(
    $filter: ModelV2UsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Users(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        contactPhone
        ig
        isEmployed
        isActive
        isAcademyStudent
        validated
        firstContact
        roleId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// Busca un usuario por email en el User Pool de Cognito
export const getCognitoUser = /* GraphQL */ `
  query V2ListCognitoUsers($filter: String) {
    v2ListCognitoUsers(limit: 1, filter: $filter) {
      users {
        sub
        email
        name
        enabled
        status
        createdAt
      }
    }
  }
`;

export const listAppV2Roles = /* GraphQL */ `
  query ListV2Roles {
    listV2Roles {
      items {
        id
        name
        displayName
        icon
      }
    }
  }
`;
