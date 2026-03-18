
/********************************************************
*                    QUERIES
********************************************************/
export const getStudent = /* GraphQL */ `
  query GetV2Student($id: ID!) {
    getV2Student(id: $id) {
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
              streetAddress
              city
              state
              zipCode
              country
              latitude
              longitude
            }
          }
      }
      enrollments{
          items{
            id
            startDate
            amountPaid
            courseId
            scheduleId
            sessionTypeId
            scheduleName
            wasPaid
            student{
              id
              name
              lastName
              birthdate
              contactPhone
              emailPhone
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
            sessionDetails
            {
              items{
                id
                sessionNumber
                totalSessions
                date
                month
                year
                status
                locationId
                locationIdUsed
                courseId
                scheduleId
                course{
                  id
                  title
                }
                schedule{
                  id
                  day
                  startHour
                }
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
        enrollmentId
        studentId
        __typename
      }
      evaluationLevelId
      evaluationIcon
      evaluationDescription
      studentEvaluations {
        items {
          id
          date
          wasApproved
          evaluationLevelId
          evaluationLevel {
            id
            ico
            name
            description
          }
        }
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelV2StudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Students(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        isActive
        createdAt
        updatedAt
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
            courseId
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

export const updateStudentEvaluationSummary = /* GraphQL */ `
  mutation UpdateV2Student($input: UpdateV2StudentInput!) {
    updateV2Student(input: $input) {
      id
      evaluationLevelId
      evaluationIcon
      evaluationDescription
    }
  }
`;



