export const listEvaluationLevels = /* GraphQL */ `
  query ListEvaluationLevels {
    listEvaluationLevels {
      items {
        id
        ico
        name
        description
        startingAge
        endingAge
        order
        evaluationObjectives{
           items{
             id
             texto
             isMandatory
             isActive
           }
         }
      }
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