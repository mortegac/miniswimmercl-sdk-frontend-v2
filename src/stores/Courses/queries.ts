
/********************************************************
*                    QUERIES
********************************************************/
export const getCourse = /* GraphQL */ `
  query GetV2Course($id: ID!) {
    getV2Course(id: $id) {
      id
      title
      description
      startingAge
      endingAge
      ageType
      ageGroupType
      duration
      isActive
      location {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        __typename
      }
      schedules {
        nextToken
        __typename
      }
      courseSessionTypes {
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      locationId
      __typename
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelV2CourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Courses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        schedules(
          filter:{
            isActive : {eq: true}
          }
        ){
          items{
            id
            isActive
            day
            startHour
            endHour
            locationSchedulesId
            courseSchedulesId
            minimumQuotas
            maximumQuotas
          }
        }
        courseSessionTypes {
          items{
            id
            sessionType{
              id
              isActive
              name
              totalSessions
              amount
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;


/********************************************************
*                    CUSTOM
********************************************************/


export const listCoursesStudent = /* GraphQL */ `
  query ListCourses(
    $filter: ModelV2CourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Courses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ageType
        title
        locationId
        enrollments(
          filter:{
            startDate: {between: [
              "01-01-2025",
              "01-31-2025"
              ]},
            wasPaid: { eq: true}
          }
        ){
          items{
            wasPaid
            startDate
            student{
              id
              name
              lastName
              birthdate
              emailPhone
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
        }
      }
      nextToken
      __typename
    }
  }
`;
