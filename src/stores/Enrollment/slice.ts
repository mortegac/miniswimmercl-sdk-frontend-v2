// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {Enrollment, emptyEnrollment, EnrollmentExtra, emptyEnrollmentExtra} from "./types"

export interface EnrollmentState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  enrollment: EnrollmentExtra;
  enrollments: Enrollment[];
  errorMessage:string;
}

export const initialState: EnrollmentState = {
  currentStep: 1,
  status: "idle",
  enrollment: emptyEnrollmentExtra,
  enrollments: [emptyEnrollment],
  errorMessage:"",
};


export const getEnrollmen = createAsyncThunk(
  "Enrollmen/list",
  async () => {
    try {
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);


export const enrollmentSlice = createSlice({
  name: "enrollmen",
  initialState,
  reducers: {
    increment: (state) => {
      state.status = "loading";
      if (state.currentStep <= 2) state.currentStep += 1;
      // const ID = addApoderado(state);
      state.status = "idle";
    },
    decrement: (state) => {
      state.status = "loading";
      if (state.currentStep >= 2) state.currentStep -= 1;
      state.status = "idle";
    },
    setDataEnroll: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      state.enrollment = {
        ...state.enrollment,
        [objAction.key]: objAction.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getEnrollmen.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getEnrollmen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEnrollmen.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getEnrollmen --action---", objPayload)
         
        const sortedArray = objPayload?.items.sort((a:any, b:any) => {
          // Primero, comparamos por locationCoursesId
          if (a.locationCoursesId < b.locationCoursesId) return -1;
          if (a.locationCoursesId > b.locationCoursesId) return 1;
          
          // Si locationCoursesId es igual, comparamos por AgeGroupType
          if (a.AgeGroupType < b.AgeGroupType) return -1;
          if (a.AgeGroupType > b.AgeGroupType) return 1;
          
          // Si ambos son iguales, no cambiamos el orden
          return 0;
        });
  
        // state.courses = objPayload?.items || [];
        state.enrollment = sortedArray || [];
        
      })
      
      
    
  },
});

export const {
  decrement,
  increment,
  setDataEnroll,
} = enrollmentSlice.actions;
export const selectEnrollment = (state: RootState) => state.enrollment;

export default enrollmentSlice.reducer;
