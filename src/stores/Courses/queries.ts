
/********************************************************
*                    QUERIES
********************************************************/
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      title
      description
      startingAge
      endingAge
      ageType
      AgeGroupType
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
        createdAt
        updatedAt
        __typename
      }
      schedules {
        nextToken
        __typename
      }
      sessionTypes {
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      locationCoursesId
      __typename
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $id: ID
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCourses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      sessionTypes
      # (
      #     filter:{
      #       isActive : {eq: true}
      #     }
      #   )
        {
        items{
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
    $id: ID
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCourses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        ageType
        title
        locationCoursesId
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