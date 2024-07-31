


export const generateEnrollment = /* GraphQL */ `
  mutation GenerateEnrollment(
    $studentId: String!
    $startDate: String!
    $sessionTypeId: String!
    $scheduleId: String!
    $courseId: String!
  ) {
    generateEnrollment(
      studentId: $studentId
      startDate: $startDate
      sessionTypeId: $sessionTypeId
      scheduleId: $scheduleId
      courseId: $courseId
    )
  }
`;

