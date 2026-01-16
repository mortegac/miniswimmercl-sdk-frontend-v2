
/********************************************************
*                    MUTATIONS
********************************************************/
export const createQuickResponse = /* GraphQL */ `
  mutation CreateQuickResponse(
    $input: CreateQuickResponseInput!
    $condition: ModelQuickResponseConditionInput
  ) {
    createQuickResponse(input: $input, condition: $condition) {
      id
      name
      message
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateQuickResponse = /* GraphQL */ `
  mutation UpdateQuickResponse(
    $input: UpdateQuickResponseInput!
    $condition: ModelQuickResponseConditionInput
  ) {
    updateQuickResponse(input: $input, condition: $condition) {
      id
      name
      message
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteQuickResponse = /* GraphQL */ `
  mutation DeleteQuickResponse(
    $input: DeleteQuickResponseInput!
    $condition: ModelQuickResponseConditionInput
  ) {
    deleteQuickResponse(input: $input, condition: $condition) {
      id
      name
      message
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;
