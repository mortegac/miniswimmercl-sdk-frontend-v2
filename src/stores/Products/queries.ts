export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sku
        name
        currentStock
        criticalStock
        purchasePrice
        sellingPrice
        profits
        isActive
        createdAt
        updatedAt
        supplierProductsId
      }
    }
  }
`;export const getLocation = /* GraphQL */ `
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