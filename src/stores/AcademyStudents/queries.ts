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
  query ListV2AcademyStudents(
    $filter: ModelV2AcademyStudentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2AcademyStudents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        companyAgreement
        hasAgreement
        createdAt
        updatedAt
      }
      nextToken
      __typename
    }
  }
`;