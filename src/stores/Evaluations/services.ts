import { generateClient } from 'aws-amplify/api';

import { listEvaluationLevels } from './queries';
import {
  createEvaluationLevel,
  updateEvaluationLevel,
  deleteEvaluationLevel,
  createEvaluationObjective,
  updateEvaluationObjective,
} from './mutations';
import { FilterOptions, InputLevel, InputObjective } from './types';

const client = generateClient();

export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: listEvaluationLevels,
        variables: { limit: 100000000 },
      });
      const data: any = getData?.data?.listV2EvaluationLevels;
      resolve([...data.items] as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const createEvaluationLevelService = async (input: InputLevel): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await client.graphql({
        query: createEvaluationLevel,
        variables: {
          input: {
            name: input.name,
            description: input.description,
            ico: input.ico,
            startingAge: Number(input.startingAge),
            endingAge: Number(input.endingAge),
            order: Number(input.order),
          },
        },
      });
      resolve({ ...res.data.createV2EvaluationLevel });
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const updateEvaluationLevelService = async (input: InputLevel): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await client.graphql({
        query: updateEvaluationLevel,
        variables: {
          input: {
            id: input.id,
            name: input.name,
            description: input.description,
            ico: input.ico,
            startingAge: Number(input.startingAge),
            endingAge: Number(input.endingAge),
            order: Number(input.order),
          },
        },
      });
      resolve({ ...res.data.updateV2EvaluationLevel });
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const deleteEvaluationLevelService = async (id: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await client.graphql({
        query: deleteEvaluationLevel,
        variables: { input: { id } },
      });
      resolve({ ...res.data.deleteV2EvaluationLevel });
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const createEvaluationObjectiveService = async (input: InputObjective): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await client.graphql({
        query: createEvaluationObjective,
        variables: {
          input: {
            texto: input.texto,
            evaluationLevelId: input.evaluationLevelId,
            isMandatory: input.isMandatory,
            isActive: input.isActive ?? true,
          },
        },
      });
      resolve({ ...res.data.createV2EvaluationObjetives });
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const updateEvaluationObjectiveService = async (input: InputObjective): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await client.graphql({
        query: updateEvaluationObjective,
        variables: {
          input: {
            id: input.id,
            texto: input.texto,
            isMandatory: input.isMandatory,
            isActive: input.isActive,
          },
        },
      });
      resolve({ ...res.data.updateV2EvaluationObjetives });
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};
