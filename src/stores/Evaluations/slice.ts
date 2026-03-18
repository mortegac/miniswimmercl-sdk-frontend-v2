import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "../store";
import {
  fetchData,
  createEvaluationLevelService,
  updateEvaluationLevelService,
  deleteEvaluationLevelService,
  createEvaluationObjectiveService,
  updateEvaluationObjectiveService,
} from "./services";
import { EvaluationLevel, emptyEvaluationLevel, FilterOptions, InputLevel, InputObjective } from "./types";

export interface EvaluationLevelState {
  status: "idle" | "loading" | "failed";
  evaluationLevel: EvaluationLevel;
  evaluationLevels: EvaluationLevel[];
  errorMessage: string;
}

export const initialState: EvaluationLevelState = {
  status: "idle",
  evaluationLevel: emptyEvaluationLevel,
  evaluationLevels: [emptyEvaluationLevel],
  errorMessage: "",
};

export const getEvaluationLevel = createAsyncThunk(
  "EvaluationLevel/list",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH EvaluationLevels", error);
      return Promise.reject(error);
    }
  }
);

export const createEvaluationLevelThunk = createAsyncThunk(
  "EvaluationLevel/create",
  async (input: InputLevel) => {
    try {
      return await createEvaluationLevelService(input);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updateEvaluationLevelThunk = createAsyncThunk(
  "EvaluationLevel/update",
  async (input: InputLevel) => {
    try {
      return await updateEvaluationLevelService(input);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deleteEvaluationLevelThunk = createAsyncThunk(
  "EvaluationLevel/delete",
  async (id: string) => {
    try {
      return await deleteEvaluationLevelService(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const createEvaluationObjectiveThunk = createAsyncThunk(
  "EvaluationLevel/createObjective",
  async (input: InputObjective) => {
    try {
      return await createEvaluationObjectiveService(input);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updateEvaluationObjectiveThunk = createAsyncThunk(
  "EvaluationLevel/updateObjective",
  async (input: InputObjective) => {
    try {
      return await updateEvaluationObjectiveService(input);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const EvaluationsSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(getEvaluationLevel.rejected, (state) => { state.status = "failed"; })
      .addCase(getEvaluationLevel.pending, (state) => { state.status = "loading"; })
      .addCase(getEvaluationLevel.fulfilled, (state, action) => {
        state.status = "idle";
        state.evaluationLevels = (action.payload as EvaluationLevel[]) || [];
      })

      // CREATE LEVEL
      .addCase(createEvaluationLevelThunk.pending, (state) => { state.status = "loading"; })
      .addCase(createEvaluationLevelThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(createEvaluationLevelThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const newLevel = { ...action.payload, evaluationObjectives: { items: [] } };
        state.evaluationLevels = [...state.evaluationLevels, newLevel].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );
      })

      // UPDATE LEVEL
      .addCase(updateEvaluationLevelThunk.pending, (state) => { state.status = "loading"; })
      .addCase(updateEvaluationLevelThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(updateEvaluationLevelThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const updated = action.payload;
        const idx = state.evaluationLevels.findIndex((l) => l.id === updated.id);
        if (idx !== -1) {
          state.evaluationLevels[idx] = {
            ...state.evaluationLevels[idx],
            ...updated,
          };
          state.evaluationLevels = [...state.evaluationLevels].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0)
          );
        }
      })

      // DELETE LEVEL
      .addCase(deleteEvaluationLevelThunk.pending, (state) => { state.status = "loading"; })
      .addCase(deleteEvaluationLevelThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(deleteEvaluationLevelThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedId = action.payload?.id;
        if (deletedId) {
          state.evaluationLevels = state.evaluationLevels.filter((l) => l.id !== deletedId);
        }
      })

      // CREATE OBJECTIVE
      .addCase(createEvaluationObjectiveThunk.pending, (state) => { state.status = "loading"; })
      .addCase(createEvaluationObjectiveThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(createEvaluationObjectiveThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const obj = action.payload;
        const levelIdx = state.evaluationLevels.findIndex((l) => l.id === obj.evaluationLevelId);
        if (levelIdx !== -1) {
          const current = state.evaluationLevels[levelIdx].evaluationObjectives?.items || [];
          state.evaluationLevels[levelIdx] = {
            ...state.evaluationLevels[levelIdx],
            evaluationObjectives: { items: [...current, obj] },
          };
        }
      })

      // UPDATE OBJECTIVE
      .addCase(updateEvaluationObjectiveThunk.pending, (state) => { state.status = "loading"; })
      .addCase(updateEvaluationObjectiveThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(updateEvaluationObjectiveThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const obj = action.payload;
        const levelIdx = state.evaluationLevels.findIndex((l) => l.id === obj.evaluationLevelId);
        if (levelIdx !== -1) {
          const items = state.evaluationLevels[levelIdx].evaluationObjectives?.items || [];
          const objIdx = items.findIndex((o) => o.id === obj.id);
          if (objIdx !== -1) {
            const newItems = [...items];
            newItems[objIdx] = { ...newItems[objIdx], ...obj };
            state.evaluationLevels[levelIdx] = {
              ...state.evaluationLevels[levelIdx],
              evaluationObjectives: { items: newItems },
            };
          }
        }
      });
  },
});

export const selectEvaluations = (state: RootState) => state.evaluations;

export default EvaluationsSlice.reducer;
