
/********************************************************
*                    QUERIES
********************************************************/

export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      city
      minimumTemperature
      maximumTemperature
      address
      phone
      courses {
        items{
          id
          title
        }
      }
      schedules {
        nextToken
        __typename
      }
      expenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $id: ID
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLocations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
        courses {
          items{
            id
            title
          }
        },
        schedules {
          items{
              id
            day
            startHour
            course{
              id
              title
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


