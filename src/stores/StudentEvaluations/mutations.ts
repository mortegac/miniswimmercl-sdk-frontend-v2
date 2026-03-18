export const updateStudentEvaluationV2 = /* GraphQL */ `
  mutation UpdateV2StudentEvaluations($input: UpdateV2StudentEvaluationsInput!) {
    updateV2StudentEvaluations(input: $input) {
      id
      date
      age
      wasApproved
      observations
      previousLevel
      sessionsCarriedOut
      studentId
      evaluationLevelId
      userId
    }
  }
`;

export const deleteStudentEvaluationV2 = /* GraphQL */ `
  mutation DeleteV2StudentEvaluations($input: DeleteV2StudentEvaluationsInput!) {
    deleteV2StudentEvaluations(input: $input) {
      id
    }
  }
`;

export const updateStudentEvaluationsDetailV2 = /* GraphQL */ `
  mutation UpdateV2StudentEvaluationsDetail($input: UpdateV2StudentEvaluationsDetailInput!) {
    updateV2StudentEvaluationsDetail(input: $input) {
      id
      wasAchieved
      text
      studentEvaluationsId
      evaluationObjectiveId
    }
  }
`;

export const deleteStudentEvaluationsDetailV2 = /* GraphQL */ `
  mutation DeleteV2StudentEvaluationsDetail($input: DeleteV2StudentEvaluationsDetailInput!) {
    deleteV2StudentEvaluationsDetail(input: $input) {
      id
    }
  }
`;

export const createStudentEvaluationV2 = /* GraphQL */ `
  mutation CreateV2StudentEvaluations($input: CreateV2StudentEvaluationsInput!) {
    createV2StudentEvaluations(input: $input) {
      id
      date
      age
      wasApproved
      observations
      previousLevel
      sessionsCarriedOut
      studentId
      evaluationLevelId
      userId
    }
  }
`;

export const createStudentEvaluationsDetailV2 = /* GraphQL */ `
  mutation CreateV2StudentEvaluationsDetail($input: CreateV2StudentEvaluationsDetailInput!) {
    createV2StudentEvaluationsDetail(input: $input) {
      id
      wasAchieved
      text
      studentEvaluationsId
      evaluationObjectiveId
    }
  }
`;
