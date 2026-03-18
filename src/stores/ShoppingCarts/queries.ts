export const getShoppingCart = /* GraphQL */ `
  query GetV2ShoppingCart($id: ID!) {
    getV2ShoppingCart(id: $id) {
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
        roleId
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
        roleId
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
        usersId
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
      userId
      sellerId
      sellersCommissionId
      __typename
    }
  }
`;
export const listShoppingCarts = /* GraphQL */ `
  query ListShoppingCarts(
    $filter: ModelV2ShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2ShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPrice
        status
        createdAt
        userId
        sellerId
        sellersCommissionId
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
