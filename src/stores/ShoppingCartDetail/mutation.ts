


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



export const updateShoppingCartDetail = /* GraphQL */ `
  mutation UpdateShoppingCartDetail(
    $input: UpdateShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    updateShoppingCartDetail(input: $input, condition: $condition) { id }
  }
`;


export const deleteShoppingCartDetail = /* GraphQL */ `
  mutation DeleteShoppingCartDetail(
    $input: DeleteShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    deleteShoppingCartDetail(input: $input, condition: $condition) {id}
  }
`;