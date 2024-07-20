
/********************************************************
*                    QUERIES
********************************************************/
export const listParameters = /* GraphQL */ `
  query ListParameters(
    $id: ID
    $filter: ModelParametersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listParameters(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        label
        value
        parametersEncTypeOfParameterId
        idParent
        __typename
      }
      nextToken
      __typename
    }
  }
`;
