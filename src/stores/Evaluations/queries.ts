export const listEvaluationLevels = /* GraphQL */ `
  query ListV2EvaluationLevels(
    $filter: ModelV2EvaluationLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listV2EvaluationLevels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ico
        name
        description
        startingAge
        endingAge
        order
        evaluationObjectives {
          items {
            id
            texto
            isMandatory
            isActive
          }
        }
      }
      nextToken
      __typename
    }
  }
`;

export const getStudentEvaluation = /* GraphQL */ `
  query GetStudentEvaluation($id: ID!) {
    getStudentEvaluations(id: $id) {
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