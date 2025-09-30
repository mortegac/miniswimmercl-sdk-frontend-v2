import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "../store";
import {fetchStudentEvaluations} from "./services"
import {StudentEvaluations, emptyStudentEvaluations, FilterOptions} from "./types"



export interface StudentEvaluationsState {
  status: "idle" | "loading" | "failed";
  studentEvaluation:  StudentEvaluations;
  studentEvaluations:  StudentEvaluations[];
  activeAssessments:  string[];
  errorMessage:string;
}


export const initialState: StudentEvaluationsState = {
  status: "idle",
  studentEvaluation: emptyStudentEvaluations,
  studentEvaluations: [emptyStudentEvaluations],
  activeAssessments: [],
  errorMessage:"",
};

export const getStudentEvaluations = createAsyncThunk(
  "studentEvaluationsReducer/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchStudentEvaluations({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);



export const studentEvaluationsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getStudentEvaluations.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getStudentEvaluations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudentEvaluations.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.studentEvaluations = objPayload?.studentEvaluations?.items || [];
        
        state.activeAssessments = Array.isArray(objPayload?.studentEvaluations?.items) 
      && objPayload?.studentEvaluations?.items.map((item: any) => item.evaluationLevelId)
      })
      
      
  },
});
// Selectors
export const selectStudentEvaluations = (state: RootState) => state.studentEvaluations;

export default studentEvaluationsSlice.reducer; 