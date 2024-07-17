

export const createSessionDetail = /* GraphQL */ `
  mutation CreateSessionDetail(
    $input: CreateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    createSessionDetail(input: $input, condition: $condition) {id}
  }
`;
export const updateSessionDetail = /* GraphQL */ `
  mutation UpdateSessionDetail(
    $input: UpdateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    updateSessionDetail(input: $input, condition: $condition) { id }
  }
`;
export const deleteSessionDetail = /* GraphQL */ `
  mutation DeleteSessionDetail(
    $input: DeleteSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    deleteSessionDetail(input: $input, condition: $condition) { id }
  }
`;