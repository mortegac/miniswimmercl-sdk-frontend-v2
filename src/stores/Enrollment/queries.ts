
/********************************************************
*                    QUERIES
********************************************************/
export const getEnrollment = /* GraphQL */ `
  query GetV2Enrollment($id: ID!) {
    getV2Enrollment(id: $id) {
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
        __typename
      }
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        ageGroupType
        duration
        isActive
        locationId
        __typename
      }
      sessionDetails {
        nextToken
        __typename
      }
      studentId
      courseId
      sessionTypeId
      __typename
    }
  }
`;
export const listEnrollments = /* GraphQL */ `
  query ListEnrollments(
    $filter: ModelV2EnrollmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Enrollments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items
      {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      wasDeleted
      numberOfSessions
      scheduleId,
      scheduleName,
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
        contactPhone
        relationships{
          items{
            userId
            relationType
            user{
              id
              name
              contactPhone
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
          id
          date
          month
          year
          status
          locationId
          locationIdUsed
          totalSessions
          sessionNumber
        }
      }
      emailSends{
        items{
          type
          date
          userSend{name}
        }
      }
    }
      nextToken
      __typename
    }
  }
`;

export const listEnrollmentsExpiring = /* GraphQL */ `
  query ListEnrollmentsExpiring(
    $filter: ModelV2EnrollmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Enrollments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        wasDeleted
        numberOfSessions
        sessionsLeft
        sessionsUsed
        scheduleId
        scheduleName
        studentId
        sessionType {
          durationSession
          name
          timeAWeek
          totalSessions
        }
        student {
          id
          name
          lastName
          birthdate
          emailPhone
          contactPhone
        }
        course {
          id
          title
          location {
            id
            name
          }
        }
        sessionDetails {
          items {
            id
            date
            month
            year
            status
            locationId
            locationIdUsed
            totalSessions
            sessionNumber
          }
        }
      }
      nextToken
      __typename
    }
  }
`;




