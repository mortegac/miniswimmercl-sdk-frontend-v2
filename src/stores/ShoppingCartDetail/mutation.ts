


export const createShoppingCartDetail = /* GraphQL */ `
  mutation CreateShoppingCartDetail(
    $input: CreateShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    createShoppingCartDetail(input: $input, condition: $condition) {id}
  }
`;


export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) {id}
  }
`;