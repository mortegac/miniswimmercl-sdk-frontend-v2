

export const createSessionDetail = /* GraphQL */ `
  mutation CreateV2SessionDetail(
    $input: CreateV2SessionDetailInput!
    $condition: ModelV2SessionDetailConditionInput
  ) {
    createV2SessionDetail(input: $input, condition: $condition) {id}
  }
`;
export const updateSessionDetail = /* GraphQL */ `
  mutation UpdateV2SessionDetail(
    $input: UpdateV2SessionDetailInput!
    $condition: ModelV2SessionDetailConditionInput
  ) {
    updateV2SessionDetail(input: $input, condition: $condition) { id }
  }
`;
export const deleteSessionDetail = /* GraphQL */ `
  mutation DeleteV2SessionDetail(
    $input: DeleteV2SessionDetailInput!
    $condition: ModelV2SessionDetailConditionInput
  ) {
    deleteV2SessionDetail(input: $input, condition: $condition) { id }
  }
`;
