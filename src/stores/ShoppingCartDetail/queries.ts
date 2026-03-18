export const getShoppingCartDetail = /* GraphQL */ `
  query GetV2ShoppingCartDetail($id: ID!) {
    getV2ShoppingCartDetail(id: $id) {
      id
      type
      quantity
      amount
      detail
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        scheduleId
        scheduleName
        paymentToken
        courseId
        sessionTypeId
        studentId
        __typename
      }
      cart {
        id
        totalPrice
        status
        createdAt
        userId
        __typename
      }
      cartId
      enrollmentId
      __typename
    }
  }
`;
export const listShoppingCartDetails = /* GraphQL */ `
  query ListShoppingCartDetails(
    $filter: ModelV2ShoppingCartDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2ShoppingCartDetails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        quantity
        amount
        detail
        wasDeleted
        cartId
        enrollmentId
        enrollment{
          id
          student{
            id
            name
            lastName
          }
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
