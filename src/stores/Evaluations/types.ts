export interface EvaluationLevel {
  id: string;
  ico: string;
  name: string;
  description: string;
  startingAge: number;
  endingAge: number;
  order: number;
  evaluationObjectives?: { items: EvaluationObjective[] };
}

export const emptyEvaluationLevel: EvaluationLevel = {
  id: "",
  ico: "",
  name: "",
  description: "",
  startingAge: 0,
  endingAge: 0,
  order: 0,
  evaluationObjectives: { items: [] },
};

export interface EvaluationObjective {
  id: string;
  texto: string;
  evaluationLevelId: string;
  isMandatory: boolean;
  isActive: boolean;
}

export const emptyEvaluationObjective: EvaluationObjective = {
  id: "",
  texto: "",
  evaluationLevelId: "",
  isMandatory: false,
  isActive: true,
};

export type FilterOptions = {
  startingAge?: number;
  endingAge?: number;
};

export type InputLevel = {
  id?: string;
  name: string;
  description: string;
  ico: string;
  startingAge: number;
  endingAge: number;
  order: number;
};

export type InputObjective = {
  id?: string;
  texto: string;
  evaluationLevelId: string;
  isMandatory: boolean;
  isActive: boolean;
};
