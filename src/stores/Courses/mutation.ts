export const createCourse = /* GraphQL */ `
  mutation CreateV2Course(
    $input: CreateV2CourseInput!
    $condition: ModelV2CourseConditionInput
  ) {
    createV2Course(input: $input, condition: $condition)
    { id }
  }
`;


export const updateCourse = /* GraphQL */ `
  mutation UpdateV2Course(
    $input: UpdateV2CourseInput!
    $condition: ModelV2CourseConditionInput
  ) {
    updateV2Course(input: $input, condition: $condition)
    { id }
  }
`;