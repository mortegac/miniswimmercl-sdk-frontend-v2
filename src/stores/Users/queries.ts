


export const getUsers = /* GraphQL */ `
  query GetV2Users($id: ID!) {
    getV2Users(id: $id) {
      id
      name
      email
      validated
      contactPhone
      ig
      firstContact
      streetAddress
      city
      state
      zipCode
      country
      isEmployed
      isAcademyStudent
      roleId
      relationships {
        items {
          id
          relationType
          userId
          studentId
          student {
            id
            name
            lastName
            gender
            birthdate
            placeOfResidence
            isActive
          }
          user {
            id
            email
            name
            contactPhone
          }
        }
      }
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListV2Users(
    $filter: Modelv2UsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Users(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        validated
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        isEmployed
        isAcademyStudent
        __typename
      }
      nextToken
      __typename
    }
  }
`;