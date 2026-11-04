
/********************************************************
*                    QUERIES
********************************************************/
export const listEmailSends = /* GraphQL */ `
  query ListV2EmailSends(
    $filter: ModelV2EmailSendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2EmailSends(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        type
        contentMessage
        phone
        phoneState
        email
        emailState
        studentId
        userSendId
        enrollmentId
        userSend {
          id
          name
        }
        student {
          id
          name
          lastName
        }
        enrollment {
          courseId
          scheduleId
          scheduleName
        }
        createdAt
      }
      nextToken
      __typename
    }
  }
`;
