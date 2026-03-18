
/********************************************************
*                    QUERIES
********************************************************/

export const getLocation = /* GraphQL */ `
  query GetV2Location($id: ID!) {
    getV2Location(id: $id) {
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
      __typename
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelV2LocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Locations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        city
        region
        group
        minimumTemperature
        maximumTemperature
        address
        isVisible
        phone
        imageMap
        urlMap
        directions
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
export const listLocationsOnly = /* GraphQL */ `
  query ListLocations(
    $filter: ModelV2LocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Locations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        city
        region
        group
        isVisible
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions

      courses{
        items{
          id
          title
          isActive
        }
      }
      schedules{
        items{
          id
          day
          startHour
          endHour
        }
      }


      }
      nextToken
      __typename
    }
  }
`;



export const listLocationsAdmin = /* GraphQL */ `
  query ListV2LocationsAdmin(
    $filter: ModelV2LocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2Locations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        city
        region
        group
        country
        address
        phone
        minimumTemperature
        maximumTemperature
        imageMap
        urlMap
        directions
        isActive
        isVisible
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


