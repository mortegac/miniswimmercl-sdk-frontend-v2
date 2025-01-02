
export const generateEnrollment = /* GraphQL */ `
  mutation GenerateEnrollment(
    $userId: String!
    $studentId: String!
    $startDate: String!
    $sessionTypeId: String!
    $scheduleId: String!
    $courseId: String!
  ) {
    generateEnrollment(
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
  mutation RemoveEnrollment(
    $enrollId: String!, 
    $employeeId: String!
  ) {
    removeEnrollment(
      enrollId: $enrollId, 
      employeeId: $employeeId
    )
  }
`;