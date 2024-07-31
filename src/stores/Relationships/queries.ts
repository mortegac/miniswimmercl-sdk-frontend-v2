export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $id: ID
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelationships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        relationType
        createdAt
        updatedAt
        usersRelationshipsId
        studentRelationshipsId
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
          courseEnrollmentsId
          # sessionDetails( filter:{ status: {eq: ACTIVE}}){
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