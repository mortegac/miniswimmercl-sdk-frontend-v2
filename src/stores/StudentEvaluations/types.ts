export interface StudentEvaluations {

  id: string;
  date: string;
  previousLevel: string;
  sessionsCarriedOut: Number;
  age: Number;
  wasApproved: boolean;
  observations: string;
  
  studentId: string;
  evaluationLevelId: string;
  userId: string;
  
  student: string;
  evaluationLevel: string;
  // user: string;
  
  // studentEvaluationsDetails: string;
}



export const emptyStudentEvaluations: StudentEvaluations = {
    id: "",
    date:  "",
    previousLevel:  "",
    sessionsCarriedOut:  0,
    age: 0,
    wasApproved:  false,
    observations:  "",
    
    studentId:  "",
    evaluationLevelId:  "",
    userId:  "",
    
    student:  "",
    evaluationLevel:  "",
  };
  

  export type FilterOptions  = {
    studentId?: string;
  }
  
  
  

export type StudentEvaluationsDetail = {

    id: string;
    text: string;
    wasAchieved: boolean,
    studentEvaluationsId: string;
    evaluationObjectiveId: string;
    studentEvaluation: string;
    evaluationObjective: string;
    
}



