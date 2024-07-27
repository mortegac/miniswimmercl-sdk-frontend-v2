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