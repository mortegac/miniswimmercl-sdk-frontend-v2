



export const createShoppingCartDetail = /* GraphQL */ `
  mutation CreateV2ShoppingCartDetail(
    $input: CreateV2ShoppingCartDetailInput!
    $condition: ModelV2ShoppingCartDetailConditionInput
  ) {
    createV2ShoppingCartDetail(input: $input, condition: $condition) {id}
  }
`;


export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateV2ShoppingCart(
    $input: UpdateV2ShoppingCartInput!
    $condition: ModelV2ShoppingCartConditionInput
  ) {
    updateV2ShoppingCart(input: $input, condition: $condition) {id}
  }
`;



export const updateShoppingCartDetail = /* GraphQL */ `
  mutation UpdateV2ShoppingCartDetail(
    $input: UpdateV2ShoppingCartDetailInput!
    $condition: ModelV2ShoppingCartDetailConditionInput
  ) {
    updateV2ShoppingCartDetail(input: $input, condition: $condition) { id }
  }
`;


export const deleteShoppingCartDetail = /* GraphQL */ `
  mutation DeleteV2ShoppingCartDetail(
    $input: DeleteV2ShoppingCartDetailInput!
    $condition: ModelV2ShoppingCartDetailConditionInput
  ) {
    deleteV2ShoppingCartDetail(input: $input, condition: $condition) {id}
  }
`;
