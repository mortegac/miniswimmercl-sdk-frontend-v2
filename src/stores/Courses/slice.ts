// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {Course, emptyCourse} from "./types"



export interface CourseState {
  status: "idle" | "loading" | "failed";
  course: Course;
 courses: Course[];
 errorMessage:string;
}

export const initialState: CourseState = {
  status: "idle",
  course: emptyCourse,
  courses: [emptyCourse],
  errorMessage:"",
};




export const getCourses = createAsyncThunk(
  "Courses/list",
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


export const CourseSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getCourses.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        console.log("---getCourses --action---", objPayload)
        state.courses = objPayload?.items || [];
        
      })
      
      
    
  },
});

export const selectCourse = (state: RootState) => state.course;

export default CourseSlice.reducer;
