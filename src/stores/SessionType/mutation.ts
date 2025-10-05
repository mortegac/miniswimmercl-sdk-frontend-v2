

export const createSessionType = /* GraphQL */ `
  mutation CreateSessionType(
    $input: CreateSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    createSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateSessionType = /* GraphQL */ `
  mutation UpdateSessionType(
    $input: UpdateSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    updateSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteSessionType = /* GraphQL */ `
  mutation DeleteSessionType(
    $input: DeleteSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    deleteSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;