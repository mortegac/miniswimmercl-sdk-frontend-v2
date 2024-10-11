
/********************************************************
*                    QUERIES
********************************************************/

export const listSessionDetails = /* GraphQL */ `
  query ListSessionDetails(
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        createdAt
        updatedAt
        enrollmentSessionDetailsId
        sessionDetailStudentId
        __typename
        # enrollment{
        #   id
        #   startDate
        #   course{
        #     id
        #     title
        #   }
        # }
        student{
          id
          name
          lastName
          birthdate
          gender
        }
      }
      nextToken
      __typename
    }
  }
`;

export const getSessionDetail = /* GraphQL */ `
  query GetSessionDetail($id: ID!) {
    getSessionDetail(id: $id) {
      id
      date
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      sessionDetailStudentId
      __typename
    }
  }
`;
/********************************************************
*                    MUTATIONS
********************************************************/


