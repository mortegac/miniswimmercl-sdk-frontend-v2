

export const setStart = /* GraphQL */ `
  mutation SetStart(
    $amount: Float!
    $userId: String!
    $glosa: String!
    $cartId: String!
  ) {
    setStart(
      amount: $amount
      userId: $userId
      glosa: $glosa
      cartId: $cartId
    )
  }
`;

export const setCommit = /* GraphQL */ `
  mutation SetCommit($token: String!) {
    setCommit(token: $token)
  }
`;
export const setStatus = /* GraphQL */ `
  mutation SetStatus($token: String!) {
    setStatus(token: $token)
  }
`;