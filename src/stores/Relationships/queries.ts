export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $filter: ModelV2RelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Relationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        relationType
        userId
        studentId
        student{
          name
          lastName
          gender
          birthdate
          placeOfResidence
          enrollments{
            items{
              id
              amountPaid
              courseId
              sessionDetails( filter:{
                or: [
                { status: { eq: ACTIVE } },
                { status: { eq: RECOVERED } }
              ]
              }){
                items{
                  id
                  sessionNumber
                }
              }
            }
          }
        }
        user{
          id
          email
          name
          contactPhone
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
