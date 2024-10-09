
/********************************************************
*                    QUERIES
********************************************************/
export const listEmailSends = /* GraphQL */ `
  query ListEmailSends(
    $id: ID
    $filter: ModelEmailSendFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEmailSends(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        type
        contentEmail
        email
        wasSent
        userSend{
          id
          name
        }
        student{ 
          id
          name
          lastName
        }
        createdAt
        updatedAt
        usersEmailSendId
        studentEmailSendId
        __typename
      }
      nextToken
      __typename
    }
  }
`;