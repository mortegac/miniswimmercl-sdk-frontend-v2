
/********************************************************
*                    QUERIES
********************************************************/
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
      relationships{
          items{
            id
            relationType
            user{
              name
              id
              contactPhone
            }
          }
      }
      enrollments{
          items{
            id
            startDate
            amountPaid
            courseEnrollmentsId
            scheduleId
            sessionTypeEnrollmentsId
            scheduleName
            wasPaid
            course{
              id
              title
              location{
                id
                name
              }
            }
            sessionDetails
            {
              items{
                id
                sessionNumber              
                date
                month
                year
                status
                locationId
                locationIdUsed
                modifiedBy
                modifiedByDate
              }
            }
          }
        }
      sessionDetail {
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
      }
      createdAt
      updatedAt
      studentSessionDetailId
      __typename
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $id: ID
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        relationships{
          items{
            id
            relationType
            user{
              name
              id
            }
          }
        }
        enrollments{
          items{
            id
            amountPaid
            courseEnrollmentsId
            # sessionDetails( filter:{ status: {eq: ACTIVE}}){
            sessionDetails( filter:{ 
              or: [
              { status: { eq: ACTIVE } },
              { status: { eq: RECOVERED } }
            ]
            }){
              items{
                id
                sessionNumber              
                date
                month
                year
                status
                locationId
                locationIdUsed
            
            
              }
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



/********************************************************
*                    MUTATIONS
********************************************************/


