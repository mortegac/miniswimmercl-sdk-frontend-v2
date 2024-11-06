export const getShoppingCartDetail = /* GraphQL */ `
  query GetShoppingCartDetail($id: ID!) {
    getShoppingCartDetail(id: $id) {
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
        createdAt
        updatedAt
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        studentEnrollmentsId
        enrollmentShoppingCartDetailId
        __typename
      }
      cart {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        __typename
      }
      createdAt
      updatedAt
      shoppingCartCartDetailsId
      shoppingCartDetailEnrollmentId
      __typename
    }
  }
`;
export const listShoppingCartDetails = /* GraphQL */ `
  query ListShoppingCartDetails(
    $filter: ModelShoppingCartDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCartDetails(
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
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
        __typename
      }
      nextToken
      __typename
    }
  }
`;