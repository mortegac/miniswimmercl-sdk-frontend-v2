// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {EmailsSent, emptyEmailsSent} from "./types"



export interface CourseState {
  status: "idle" | "loading" | "failed";
  emailSent: EmailsSent;
  emailsSent: EmailsSent[];
  errorMessage:string;
}

export const initialState: CourseState = {
  status: "idle",
  emailSent: emptyEmailsSent,
  emailsSent: [emptyEmailsSent],
  errorMessage:"",
};




export const sendEmail = createAsyncThunk(
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
      .addCase(sendEmail.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(sendEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getCourses --action---", objPayload)
     
        state.emailsSent = objPayload || [];
        
      })
      
      
    
  },
});

export const selectCourse = (state: RootState) => state.course;

export default CourseSlice.reducer;
