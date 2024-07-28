
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
        schedules{
          items{
            id
            day
            startHour
            endHour
          }
      }
      sessionTypes{
        items{
          sessionType{
            id
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
*                    MUTATIONS
********************************************************/


