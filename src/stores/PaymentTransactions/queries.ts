
/********************************************************
*                    QUERIES
********************************************************/
export const getPaymentTransactions = /* GraphQL */ `
  query GetV2PaymentTransactions($id: ID!) {
    getV2PaymentTransactions(id: $id) {
      id
      status
      token
      amount
      buy_order
      card_number
      transaction_date
      accounting_date
      installments_number
      payment_type_code
      session_id
      card_detail
      installments_amount
      authorization_code
      response_code
      vci
      day
      month
      year
      hour
      glosa
      hasRefund
      users {
        id
        name
        email
      }
      shoppingCartId
      usersId
      __typename
    }
  }
`;
export const listPaymentTransactions = /* GraphQL */ `
  query ListPaymentTransactions(
    $filter: ModelV2PaymentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2PaymentTransactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        token
        amount
        buy_order
        card_number
        transaction_date
        accounting_date
        installments_number
        payment_type_code
        session_id
        card_detail
        installments_amount
        authorization_code
        response_code
        vci
        day
        month
        year
        hour
        glosa
        hasRefund
        shoppingCartId
        usersId
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



