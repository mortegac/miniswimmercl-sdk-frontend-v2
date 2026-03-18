export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {id}
  }
`;

export const updateScheduleActive = /* GraphQL */ `
  mutation UpdateV2Schedule($input: UpdateV2ScheduleInput!) {
    updateV2Schedule(input: $input) {
      id
      isActive
      __typename
    }
  }
`;