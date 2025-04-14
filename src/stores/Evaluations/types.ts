export interface EvaluationLevel {
  id: string;
  ico: string;
  name: string;
  description: string;
  startingAge: number;
  endingAge: number;
  order: number;
}



export const emptyEvaluationLevel: EvaluationLevel = {
    id:  "",
    ico:  "",
    name:  "",
    description:  "",
    startingAge: 0,
    endingAge: 0,
    order: 0,
  };
  

  export type FilterOptions  = {
    startingAge?: number;
    endingAge?: number;
  }
  
  
  

export interface EvaluationObjective {
  id: string;
  texto: string;
  evaluationLevelId: string;
}




// export interface StudentEvaluation {
//   id: string;
//   date: string;
//   previousLevel: string;
//   sessionsCarriedOut: number;
//   age: number;
//   wasApproved: boolean;
//   observations: string;
//   studentId: string;
//   evaluationLevelId: string;
//   userId: string;
// }

// export interface StudentEvaluationDetail {
//   id: string;
//   text: string;
//   wasAchieved: boolean;
//   studentId: string;
//   studentEvaluationId: string;
//   evaluationObjectiveId: string;
// }

// export interface EvaluationsState {
//   evaluationLevels: EvaluationLevel[];
//   evaluationObjectives: EvaluationObjective[];
//   studentEvaluations: StudentEvaluation[];
//   studentEvaluationDetails: StudentEvaluationDetail[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// } 