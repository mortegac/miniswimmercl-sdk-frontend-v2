export const getShoppingCart = /* GraphQL */ `
  query GetShoppingCart($id: ID!) {
    getShoppingCart(id: $id) {
      id
      totalPrice
      status
      createdAt
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      seller {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      sellersCommission {
        id
        salesCommission
        paymentAmount
        amount
        type
        description
        status
        createdAt
        updatedAt
        usersSellersCommissionsId
        sellersCommissionShoppingCartId
        __typename
      }
      cartDetails {
        nextToken
        __typename
      }
      paymentTransactions {
        nextToken
        __typename
      }
      updatedAt
      usersShoppingCartId
      usersShoppingCartSellerId
      shoppingCartSellersCommissionId
      __typename
    }
  }
`;
export const listShoppingCarts = /* GraphQL */ `
  query ListShoppingCarts(
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        usersShoppingCartSellerId
        shoppingCartSellersCommissionId
        usersShoppingCartId
      user{
        id
        name
        contactPhone
      }
      cartDetails{
        items{
          id
          amount
          detail
          enrollment{
        id
        student{
          id 
          name
          lastName
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