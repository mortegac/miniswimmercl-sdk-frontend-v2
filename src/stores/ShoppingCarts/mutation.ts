



export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateV2ShoppingCart(
    $input: UpdateV2ShoppingCartInput!
    $condition: ModelV2ShoppingCartConditionInput
  ) {
    updateV2ShoppingCart(input: $input, condition: $condition) {id}
  }
`;
