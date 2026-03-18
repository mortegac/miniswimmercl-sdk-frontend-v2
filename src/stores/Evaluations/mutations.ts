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

export const createEvaluationLevel = /* GraphQL */ `
  mutation CreateV2EvaluationLevel($input: CreateV2EvaluationLevelInput!) {
    createV2EvaluationLevel(input: $input) {
      id
      name
      description
      ico
      startingAge
      endingAge
      order
      __typename
    }
  }
`;

export const updateEvaluationLevel = /* GraphQL */ `
  mutation UpdateV2EvaluationLevel($input: UpdateV2EvaluationLevelInput!) {
    updateV2EvaluationLevel(input: $input) {
      id
      name
      description
      ico
      startingAge
      endingAge
      order
      __typename
    }
  }
`;

export const deleteEvaluationLevel = /* GraphQL */ `
  mutation DeleteV2EvaluationLevel($input: DeleteV2EvaluationLevelInput!) {
    deleteV2EvaluationLevel(input: $input) {
      id
      __typename
    }
  }
`;

export const createEvaluationObjective = /* GraphQL */ `
  mutation CreateV2EvaluationObjetives($input: CreateV2EvaluationObjetivesInput!) {
    createV2EvaluationObjetives(input: $input) {
      id
      texto
      evaluationLevelId
      isMandatory
      isActive
      __typename
    }
  }
`;

export const updateEvaluationObjective = /* GraphQL */ `
  mutation UpdateV2EvaluationObjetives($input: UpdateV2EvaluationObjetivesInput!) {
    updateV2EvaluationObjetives(input: $input) {
      id
      texto
      evaluationLevelId
      isMandatory
      isActive
      __typename
    }
  }
`;