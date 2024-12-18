
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
      # contentEmail
      contentMessage
      phone
      phoneState
      email
      emailState
      userSend{
        id 
        name
      }
      student{ 
        id 
        name 
        lastName
      }
      enrollment{
        courseEnrollmentsId
        scheduleId
        scheduleName
      }
      createdAt
      # updatedAt
      studentEmailSendId
      enrollmentEmailSendsId
      usersEmailSendId
    }
      nextToken
      __typename
    }
  }
`;