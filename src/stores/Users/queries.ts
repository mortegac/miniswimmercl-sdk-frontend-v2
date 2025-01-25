


export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
        name
        email
        validated
        contactPhone
        ig
        firstContact
        createdAt
        updatedAt
        usersRolesId
        relationships{
        items{
          relationType
          usersRelationshipsId
          user{
            id
            name
          }
          student{
            id
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
                sessionTypeEnrollmentsId
                sessionDetails{
                  items{
                    id
                    sessionNumber
                    status
                  }
                }
              }
            }
          }
          relationType
          usersRelationshipsId
          studentRelationshipsId
          user{
            id
            email
            name
            contactPhone
          }
        }
      }
        __typename
      roles {
        id
        name
        displayName
        icon
        createdAt
        updatedAt
        __typename
      }
      userPermissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        email
        validated
        contactPhone
        ig
        firstContact
        createdAt
        updatedAt
        usersRolesId
        relationships{
        items{
          relationType
          usersRelationshipsId
          user{
            id
            name
          }
          student{
            id
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
                sessionTypeEnrollmentsId
                sessionDetails{
                  items{
                    id
                    sessionNumber
                  }
                }
              }
            }
          }
          relationType
          usersRelationshipsId
          studentRelationshipsId
          user{
            id
            email
            name
            contactPhone
          }
        }
      }
        __typename
      }
      nextToken
      __typename
    }
  }
`;