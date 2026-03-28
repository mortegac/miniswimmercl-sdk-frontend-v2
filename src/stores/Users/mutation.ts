
/********************************************************
*                    MUTATIONS
********************************************************/


export const createUsers = /* GraphQL */ `
  mutation CreateV2Users(
    $input: CreateV2UsersInput!
    $condition: ModelV2UsersConditionInput
  ) {
    createV2Users(input: $input, condition: $condition) { id }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateV2Users(
    $input: UpdateV2UsersInput!
    $condition: ModelV2UsersConditionInput
  ) {
    updateV2Users(input: $input, condition: $condition) { id }
  }
`;