import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "../store";
import {fetchData} from "./services"
import {EvaluationLevel, emptyEvaluationLevel, FilterOptions} from "./types"



export interface EvaluationLevelState {
  status: "idle" | "loading" | "failed";
  evaluationLevel:  EvaluationLevel;
  evaluationLevels:  EvaluationLevel[];
  errorMessage:string;
}


export const initialState: EvaluationLevelState = {
  status: "idle",
  evaluationLevel: emptyEvaluationLevel,
  evaluationLevels: [emptyEvaluationLevel],
  errorMessage:"",
};

export const getEvaluationLevel = createAsyncThunk(
  "EvaluationLevel/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);


// export const fetchEvaluationLevels = createAsyncThunk(
//   'evaluations/fetchEvaluationLevels',
//   async () => {
//     const response = await API.graphql(graphqlOperation(queries.listEvaluationLevels));
//     return response.data.listEvaluationLevels.items;
//   }
// );

// export const createStudentEvaluation = createAsyncThunk(
//   'evaluations/createStudentEvaluation',
//   async (evaluation: Partial<StudentEvaluation>) => {
//     const response = await API.graphql(graphqlOperation(mutations.createStudentEvaluations, { input: evaluation }));
//     return response.data.createStudentEvaluations;
//   }
// );

// export const updateStudentEvaluation = createAsyncThunk(
//   'evaluations/updateStudentEvaluation',
//   async (evaluation: Partial<StudentEvaluation>) => {
//     const response = await API.graphql(graphqlOperation(mutations.updateStudentEvaluations, { input: evaluation }));
//     return response.data.updateStudentEvaluations;
//   }
// );

// export const deleteStudentEvaluation = createAsyncThunk(
//   'evaluations/deleteStudentEvaluation',
//   async (id: string) => {
//     await API.graphql(graphqlOperation(mutations.deleteStudentEvaluations, { input: { id } }));
//     return id;
//   }
// );

export const EvaluationsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getEvaluationLevel.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getEvaluationLevel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvaluationLevel.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getEvaluationLevel --action---", objPayload)
         
        // const sortedArray = objPayload?.items.sort((a:any, b:any) => {
        //   // Primero, comparamos por locationCoursesId
        //   if (a.locationCoursesId < b.locationCoursesId) return -1;
        //   if (a.locationCoursesId > b.locationCoursesId) return 1;
          
        //   // Si locationCoursesId es igual, comparamos por AgeGroupType
        //   if (a.AgeGroupType < b.AgeGroupType) return -1;
        //   if (a.AgeGroupType > b.AgeGroupType) return 1;
          
        //   // Si ambos son iguales, no cambiamos el orden
        //   return 0;
        // });
  
        // // state.courses = objPayload?.items || [];
        state.evaluationLevels = objPayload || [];
        
      })
      
  },
});
// Selectors
export const selectEvaluations = (state: RootState) => state.evaluations;

export default EvaluationsSlice.reducer; 