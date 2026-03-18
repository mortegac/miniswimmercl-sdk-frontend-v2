
/********************************************************
*                    QUERIES
********************************************************/
export const getSessionType = /* GraphQL */ `
  query GetV2SessionType($id: ID!) {
    getV2SessionType(id: $id) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listSessionTypes = /* GraphQL */ `
  query ListV2SessionTypes(
    $filter: ModelV2SessionTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2SessionTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
