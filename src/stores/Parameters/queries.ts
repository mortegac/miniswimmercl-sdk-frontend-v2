
/********************************************************
*                    QUERIES
********************************************************/
export const listParameters = /* GraphQL */ `
  query ListV2Parameters(
    $filter: ModelV2ParametersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Parameters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        label
        value
        typeOfParameterId
        idParent
        __typename
      }
      nextToken
      __typename
    }
  }
`;
