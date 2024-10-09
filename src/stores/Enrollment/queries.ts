
/********************************************************
*                    QUERIES
********************************************************/
export const getEnrollment = /* GraphQL */ `
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
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
      sessionType {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        AgeGroupType
        duration
        isActive
        createdAt
        updatedAt
        locationCoursesId
        __typename
      }
      transaction {
        id
        amount
        date
        paymentMethod
        status
        createdAt
        updatedAt
        transactionEnrollmentId
        __typename
      }
      sessionDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentEnrollmentsId
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      enrollmentTransactionId
      __typename
    }
  }
`;
export const listEnrollments = /* GraphQL */ `
  query ListEnrollments(
    $id: ID
    $filter: ModelEnrollmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEnrollments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items
      {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      numberOfSessions
      sessionType {
        durationSession
        name
        timeAWeek
        totalSessions
      }
      student{
         id
          name
          lastName
          birthdate
          emailPhone
        relationships{
          items{
            usersRelationshipsId
            relationType
            user{
              id
              name
            }
          }
        }
      }
      course{
        id
        title
        location{
          id
          name
        }
      }
      sessionDetails{
        items{
          date
          month
          year
          status
        }
      }
    }
      nextToken
      __typename
    }
  }
`;




