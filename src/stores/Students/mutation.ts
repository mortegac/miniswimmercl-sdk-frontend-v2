


export const createStudent = /* GraphQL */ `
  mutation CreateV2Student(
    $input: CreateV2StudentInput!
    $condition: ModelV2StudentConditionInput
  ) {
    createV2Student(input: $input, condition: $condition) { id }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateV2Student(
    $input: UpdateV2StudentInput!
    $condition: ModelV2StudentConditionInput
  ) {
    updateV2Student(input: $input, condition: $condition) { id }
  }
`;
