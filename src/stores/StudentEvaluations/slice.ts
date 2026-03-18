import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "../store";
import { fetchStudentEvaluations, createStudentEvaluationService, updateStudentEvaluationService, deleteStudentEvaluationService } from "./services";
import { StudentEvaluations, emptyStudentEvaluations, FilterOptions, InputCreateEvaluation, InputUpdateEvaluation } from "./types";

export interface StudentEvaluationsState {
  status: "idle" | "loading" | "failed";
  studentEvaluation: StudentEvaluations;
  studentEvaluations: StudentEvaluations[];
  activeAssessments: string[];
  errorMessage: string;
}

export const initialState: StudentEvaluationsState = {
  status: "idle",
  studentEvaluation: emptyStudentEvaluations,
  studentEvaluations: [],
  activeAssessments: [],
  errorMessage: "",
};

export const getStudentEvaluations = createAsyncThunk(
  "studentEvaluations/list",
  async (objFilter: FilterOptions, { rejectWithValue }) => {
    try {
      return await fetchStudentEvaluations({ ...objFilter });
    } catch (error: any) {
      console.error(">>>>ERROR FETCH StudentEvaluations", error);
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const createStudentEvaluationThunk = createAsyncThunk(
  "studentEvaluations/create",
  async (input: InputCreateEvaluation, { rejectWithValue }) => {
    try {
      return await createStudentEvaluationService(input);
    } catch (error: any) {
      console.error(">>>>ERROR CREATE StudentEvaluation", error);
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const updateStudentEvaluationThunk = createAsyncThunk(
  "studentEvaluations/update",
  async (input: InputUpdateEvaluation, { rejectWithValue }) => {
    try {
      return await updateStudentEvaluationService(input);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const deleteStudentEvaluationThunk = createAsyncThunk(
  "studentEvaluations/delete",
  async ({ evaluationId, detailIds }: { evaluationId: string; detailIds: string[] }, { rejectWithValue }) => {
    try {
      await deleteStudentEvaluationService(evaluationId, detailIds);
      return evaluationId;
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const studentEvaluationsSlice = createSlice({
  name: "studentEvaluations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(getStudentEvaluations.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getStudentEvaluations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudentEvaluations.fulfilled, (state, action) => {
        const items: StudentEvaluations[] = action.payload || [];
        state.status = "idle";
        state.studentEvaluations = items;
        state.activeAssessments = items.map((item) => item.evaluationLevelId);
      })

      // CREATE — list is re-fetched by the page after save
      .addCase(createStudentEvaluationThunk.pending, (state) => { state.status = "loading"; })
      .addCase(createStudentEvaluationThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(createStudentEvaluationThunk.fulfilled, (state) => { state.status = "idle"; })

      // UPDATE — list is re-fetched by the page after save
      .addCase(updateStudentEvaluationThunk.pending, (state) => { state.status = "loading"; })
      .addCase(updateStudentEvaluationThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(updateStudentEvaluationThunk.fulfilled, (state) => { state.status = "idle"; })

      // DELETE
      .addCase(deleteStudentEvaluationThunk.pending, (state) => { state.status = "loading"; })
      .addCase(deleteStudentEvaluationThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(deleteStudentEvaluationThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedId = action.payload as string;
        state.studentEvaluations = state.studentEvaluations.filter((e) => e.id !== deletedId);
        state.activeAssessments = state.studentEvaluations.map((e) => e.evaluationLevelId);
      });
  },
});

export const selectStudentEvaluations = (state: RootState) => state.studentEvaluations;

export default studentEvaluationsSlice.reducer;
