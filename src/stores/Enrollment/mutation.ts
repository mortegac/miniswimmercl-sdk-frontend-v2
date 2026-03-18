
export const generateEnrollment = /* GraphQL */ `
  mutation V2GenerateEnrollment(
    $userId: String!
    $studentId: String!
    $startDate: String!
    $sessionTypeId: String!
    $scheduleId: String!
    $courseId: String!
  ) {
    v2GenerateEnrollment(
      userId: $userId
      studentId: $studentId
      startDate: $startDate
      sessionTypeId: $sessionTypeId
      scheduleId: $scheduleId
      courseId: $courseId
    )
  }
`;


export const removeEnrollment = /* GraphQL */ `
  mutation V2RemoveEnrollment(
    $enrollId: String!,
    $employeeId: String!
  ) {
    v2RemoveEnrollment(
      enrollId: $enrollId,
      employeeId: $employeeId
    )
  }
`;



export const updateEnrollment = /* GraphQL */ `
  mutation UpdateV2Enrollment(
    $input: UpdateV2EnrollmentInput!
    $condition: ModelV2EnrollmentConditionInput
  ) {
    updateV2Enrollment(input: $input, condition: $condition) {id}
  }
`;
