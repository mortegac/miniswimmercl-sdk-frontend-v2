
/********************************************************
*                    QUERIES
********************************************************/
export const sessionDetailsByLocationIdAndDate = /* GraphQL */ `
  query ListV2SessionDetailByLocationIdAndDate(
    $locationId: String!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: Modelv2SessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2SessionDetailByLocationIdAndDate(
      locationId: $locationId
      date: $date
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
        enrollmentId
        studentId
        locationId
        locationIdUsed
        courseId
        scheduleId
        modifiedBy
        modifiedByDate
        course {
          id
          title
          description
        }
        schedule {
          id
          day
          startHour
          endHour
        }
        student {
          id
          name
          lastName
          birthdate
          gender
          emailPhone
          contactPhone
          enrollments {
            items {
              id
              wasPaid
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;



export const listSessionDetails = /* GraphQL */ `
  query ListSessionDetails(
    $filter: ModelV2SessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2SessionDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        enrollmentId
        studentId
        locationId
        locationIdUsed
        courseId
        scheduleId
        course{
          id
          description
        }
        schedule{
          id
          day
          startHour
        }
        __typename
        student{
          id
          name
          lastName
          birthdate
          gender
          enrollments{
            items{
              id
              wasPaid
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;

export const getSessionDetail = /* GraphQL */ `
  query GetV2SessionDetail($id: ID!) {
    getV2SessionDetail(id: $id) {
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
        studentId
        courseId
        sessionTypeId
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
        __typename
      }
      enrollmentId
      studentId
      __typename
    }
  }
`;

export const sessionDetailsBySessionDetailStudentId = /* GraphQL */ `
  query ListV2SessionDetailByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: Modelv2SessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2SessionDetailByStudentId(
      studentId: $studentId
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
        studentId
        courseId
        scheduleId
        privateEnrollmentId
        enrollmentId
        coachId
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



