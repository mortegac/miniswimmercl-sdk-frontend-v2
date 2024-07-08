


export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      name
      email
      validated
      contactPhone
      ig
      firstContact
      relationships {
        nextToken
        __typename
      }
      userTickets {
        nextToken
        __typename
      }
      roles {
        id
        name
        displayName
        icon
        createdAt
        updatedAt
        __typename
      }
      userPermissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        email
        validated
        contactPhone
        ig
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;