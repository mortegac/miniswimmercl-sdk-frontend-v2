export interface StudentEvaluations {
  id: string;
  date: string;
  previousLevel: string;
  sessionsCarriedOut: number;
  age: number;
  wasApproved: boolean;
  observations: string;
  studentId: string;
  evaluationLevelId: string;
  userId: string;
  user?: any;
  evaluationLevel?: any;
  studentEvaluationsDetails?: { items: StudentEvaluationsDetail[] };
}

export const emptyStudentEvaluations: StudentEvaluations = {
  id: "",
  date: "",
  previousLevel: "",
  sessionsCarriedOut: 0,
  age: 0,
  wasApproved: false,
  observations: "",
  studentId: "",
  evaluationLevelId: "",
  userId: "",
};

export type FilterOptions = {
  studentId?: string;
};

export type StudentEvaluationsDetail = {
  id: string;
  text: string;
  wasAchieved: boolean;
  studentEvaluationsId: string;
  evaluationObjectiveId: string;
  evaluationObjective?: any;
};

export type InputUpdateEvaluation = {
  id: string;
  wasApproved: boolean;
  observations: string;
  previousLevel: string;
  sessionsCarriedOut: number;
  details: { id: string; wasAchieved: boolean }[];
};

export type InputCreateEvaluation = {
  studentId: string;
  evaluationLevelId: string;
  evaluationIcon?: string;
  evaluationDescription?: string;
  userId: string;
  date: string;
  age: number;
  wasApproved: boolean;
  observations: string;
  previousLevel: string;
  sessionsCarriedOut: number;
  objectives: { evaluationObjectiveId: string; wasAchieved: boolean; text?: string }[];
};
