
/********************************************************
*                    QUERIES
********************************************************/
export const getQuickResponse = /* GraphQL */ `
  query GetQuickResponse($id: ID!) {
    getQuickResponse(id: $id) {
      id
      name
      message
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listQuickResponses = /* GraphQL */ `
  query ListQuickResponses(
    $id: ID
    $filter: ModelQuickResponseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuickResponses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        message
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const searchQuickResponsesByName = /* GraphQL */ `
  query SearchQuickResponsesByName(
    $name: String
    $filter: ModelQuickResponseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    quickResponsesByName(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        message
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
