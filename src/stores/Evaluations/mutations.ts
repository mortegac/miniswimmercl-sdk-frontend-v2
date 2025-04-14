export const createStudentEvaluation = /* GraphQL */ `
  mutation CreateStudentEvaluation($input: CreateStudentEvaluationsInput!) {
    createStudentEvaluations(input: $input) {
      id
      date
      previousLevel
      sessionsCarriedOut
      age
      wasApproved
      observations
      studentId
      evaluationLevelId
      userId
    }
  }
`;

export const updateStudentEvaluation = /* GraphQL */ `
  mutation UpdateStudentEvaluation($input: UpdateStudentEvaluationsInput!) {
    updateStudentEvaluations(input: $input) {
      id
      date
      previousLevel
      sessionsCarriedOut
      age
      wasApproved
      observations
      studentId
      evaluationLevelId
      userId
    }
  }
`;

export const deleteStudentEvaluation = /* GraphQL */ `
  mutation DeleteStudentEvaluation($input: DeleteStudentEvaluationsInput!) {
    deleteStudentEvaluations(input: $input) {
      id
    }
  }
`; 