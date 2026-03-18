import { generateClient } from 'aws-amplify/api';
import { listStudentEvaluationsByStudent } from './queries';
import {
  createStudentEvaluationV2,
  createStudentEvaluationsDetailV2,
  updateStudentEvaluationV2,
  updateStudentEvaluationsDetailV2,
  deleteStudentEvaluationV2,
  deleteStudentEvaluationsDetailV2,
} from './mutations';
import { updateStudentEvaluationSummary } from '../Students/queries';
import { FilterOptions, InputCreateEvaluation, InputUpdateEvaluation } from './types';

const client = generateClient();

export const fetchStudentEvaluations = async (objFilter: FilterOptions): Promise<any> => {
  try {
    const getData: any = await client.graphql({
      query: listStudentEvaluationsByStudent,
      variables: {
        filter: { studentId: { eq: objFilter.studentId } },
        limit: 1000,
      },
    });
    return getData?.data?.listV2StudentEvaluations?.items || [];
  } catch (err: any) {
    const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
    throw new Error(`fetchStudentEvaluations: ${msg}`);
  }
};

export const createStudentEvaluationService = async (input: InputCreateEvaluation): Promise<any> => {
  // ── Step 1: create the evaluation header ─────────────────────
  let newEvaluation: any;
  try {
    const evalRes: any = await client.graphql({
      query: createStudentEvaluationV2,
      variables: {
        input: {
          studentId: input.studentId,
          evaluationLevelId: input.evaluationLevelId,
          userId: input.userId,
          date: input.date,
          age: Number(input.age),
          wasApproved: input.wasApproved,
          observations: input.observations || "",
          previousLevel: input.previousLevel || "",
          sessionsCarriedOut: Number(input.sessionsCarriedOut),
        },
      },
    });
    newEvaluation = evalRes?.data?.createV2StudentEvaluations;
    console.log(">>> STEP 1 createV2StudentEvaluations >>>", newEvaluation);
  } catch (err: any) {
    const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
    console.error(">>> ERROR createV2StudentEvaluations >>>", err);
    throw new Error(`Error creando evaluación: ${msg}`);
  }

  if (!newEvaluation?.id) {
    throw new Error("La evaluación fue creada pero no devolvió un ID válido");
  }

  // ── Step 2: create one detail per objective ───────────────────
  const details: any[] = [];
  for (const obj of input.objectives) {
    try {
      const res: any = await client.graphql({
        query: createStudentEvaluationsDetailV2,
        variables: {
          input: {
            studentEvaluationsId: newEvaluation.id,
            evaluationObjectiveId: obj.evaluationObjectiveId,
            wasAchieved: obj.wasAchieved,
            text: obj.text || "",
          },
        },
      });
      const detail = res?.data?.createV2StudentEvaluationsDetail;
      console.log(">>> STEP 2 createV2StudentEvaluationsDetail >>>", detail);
      details.push(detail);
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
      console.error(">>> ERROR createV2StudentEvaluationsDetail >>>", err);
      throw new Error(`Error guardando objetivo ${obj.evaluationObjectiveId}: ${msg}`);
    }
  }

  // ── Step 3: update student with latest evaluation summary ────
  try {
    await client.graphql({
      query: updateStudentEvaluationSummary,
      variables: {
        input: {
          id: input.studentId,
          evaluationLevelId: input.evaluationLevelId,
          evaluationIcon: input.evaluationIcon || "",
          evaluationDescription: input.evaluationDescription || "",
        },
      },
    });
    console.log(">>> STEP 3 updateV2Student evaluation summary >>>");
  } catch (err: any) {
    // Non-blocking: log but don't fail the whole operation
    console.warn(">>> WARN updateV2Student evaluation summary >>>", err?.errors?.[0]?.message || err?.message);
  }

  return { ...newEvaluation, studentEvaluationsDetails: { items: details } };
};

export const updateStudentEvaluationService = async (input: InputUpdateEvaluation): Promise<any> => {
  // 1. Update header
  let updated: any;
  try {
    const res: any = await client.graphql({
      query: updateStudentEvaluationV2,
      variables: {
        input: {
          id: input.id,
          wasApproved: input.wasApproved,
          observations: input.observations || "",
          previousLevel: input.previousLevel || "",
          sessionsCarriedOut: Number(input.sessionsCarriedOut),
        },
      },
    });
    updated = res?.data?.updateV2StudentEvaluations;
    console.log(">>> updateV2StudentEvaluations >>>", updated);
  } catch (err: any) {
    const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
    throw new Error(`Error actualizando evaluación: ${msg}`);
  }

  // 2. Update each detail's wasAchieved
  for (const detail of input.details) {
    try {
      await client.graphql({
        query: updateStudentEvaluationsDetailV2,
        variables: {
          input: {
            id: detail.id,
            wasAchieved: detail.wasAchieved,
          },
        },
      });
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
      throw new Error(`Error actualizando objetivo ${detail.id}: ${msg}`);
    }
  }

  return updated;
};

export const deleteStudentEvaluationService = async (evaluationId: string, detailIds: string[]): Promise<any> => {
  // 1. Delete all details first
  for (const detailId of detailIds) {
    try {
      await client.graphql({
        query: deleteStudentEvaluationsDetailV2,
        variables: { input: { id: detailId } },
      });
    } catch (err: any) {
      console.warn(`No se pudo eliminar detalle ${detailId}:`, err);
    }
  }
  // 2. Delete header
  try {
    const res: any = await client.graphql({
      query: deleteStudentEvaluationV2,
      variables: { input: { id: evaluationId } },
    });
    return res?.data?.deleteV2StudentEvaluations;
  } catch (err: any) {
    const msg = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
    throw new Error(`Error eliminando evaluación: ${msg}`);
  }
};
