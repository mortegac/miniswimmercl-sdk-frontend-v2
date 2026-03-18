export const createLocation = /* GraphQL */ `
  mutation CreateV2Location($input: CreateV2LocationInput!) {
    createV2Location(input: $input) {
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
  }
`;

export const updateLocation = /* GraphQL */ `
  mutation UpdateV2Location($input: UpdateV2LocationInput!) {
    updateV2Location(input: $input) {
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
  }
`;
