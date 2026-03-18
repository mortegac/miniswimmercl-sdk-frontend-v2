// Fetch all evaluations for a student (Gen 2)
export const listStudentEvaluationsByStudent = /* GraphQL */ `
  query ListStudentEvaluationsByStudent(
    $filter: ModelV2StudentEvaluationsFilterInput
    $limit: Int
  ) {
    listV2StudentEvaluations(
      filter: $filter
      limit: $limit
    ) {
      items {
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
        user {
          id
          name
        }
        evaluationLevel {
          id
          ico
          name
          description
          startingAge
          endingAge
          order
        }
        studentEvaluationsDetails {
          items {
            id
            wasAchieved
            text
            evaluationObjectiveId
            evaluationObjective {
              id
              texto
              isMandatory
            }
          }
        }
      }
    }
  }
`;
