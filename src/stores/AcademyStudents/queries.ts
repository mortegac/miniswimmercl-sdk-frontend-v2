export const getAcademyStudents = /* GraphQL */ `
  query GetAcademyStudents($id: ID!) {
    getAcademyStudents(id: $id) {
      id
      name
      email
      birthdate
      years
      address
      phone
      profession
      studiesRelated
      medicalHistory
      emergencyContact
      isPaid
      presence
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAcademyStudents = /* GraphQL */ `
  query ListAcademyStudents(
    $id: ID
    $filter: ModelAcademyStudentsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAcademyStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        status
        presence
        name
        urlImage
        email
        birthdate
        years
        address
        country
        phone
        profession
        studiesRelated
        medicalHistory
        emergencyContact
        isPaid
        isSponsored
        createdAt
        updatedAt
        academyStudentsCertificateId
      }
      nextToken
      __typename
    }
  }
`;