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



export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      name
      lastName
      middleName
      emailSend {
        nextToken
        __typename
      }
    name 
    # Pides la lista de sus evaluaciones
    studentEvaluations {
      items {
        # Datos de la evaluación principal
        id
        date
    userId
        user{
          name
        }
        evaluationLevelId
        date
        wasApproved
        observations
      
        evaluationLevel{
          id
          ico
          name
          description
          startingAge
          endingAge
          order
          
        }
        
        # Para cada evaluación, pides sus detalles
        studentEvaluationsDetails {
          items {
            # Datos de cada objetivo evaluado
            id
            wasAchieved
            text
            
            # Y aquí pides la información del objetivo original
            evaluationObjective {
              id
              texto
              isMandatory
            }
          }
        }
      }
    }
      createdAt
      updatedAt
      studentSessionDetailId
      studentSessionDetailDate
      __typename
    }
  }
`;