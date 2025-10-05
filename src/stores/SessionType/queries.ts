
/********************************************************
*                    QUERIES
********************************************************/
export const getSessionType = /* GraphQL */ `
  query GetSessionType($id: ID!) {
    getSessionType(id: $id) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listSessionTypes = /* GraphQL */ `
  query ListSessionTypes(
    $id: ID
    $filter: ModelSessionTypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSessionTypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listSessionTypesWithRelations = /* GraphQL */ `
  query ListSessionTypesWithRelations(
    $id: ID
    $filter: ModelSessionTypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSessionTypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        courses {
          items {
            id
            title
            description
          }
        }
        enrollments {
          items {
            id
            amountPaid
            startDate
            endDate
            wasPaid
          }
        }
        privateEnrollments {
          items {
            id
            amountPaid
            startDate
            endDate
            wasPaid
          }
        }
        __typename
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

export const sessionDetailsBySessionDetailStudentId = /* GraphQL */ `
  query SessionDetailsBySessionDetailStudentId(
    $sessionDetailStudentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionDetailsBySessionDetailStudentId(
      sessionDetailStudentId: $sessionDetailStudentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationId
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        course{
          id
         title
          description
        }
        schedule{
          id
          day
          startHour
        }
      }
      nextToken
      __typename
    }
  }
`;

/********************************************************
*                    MUTATIONS
********************************************************/


