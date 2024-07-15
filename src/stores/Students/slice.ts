// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {Student, emptyStudent} from "./types"



export interface UserState {
  status: "idle" | "loading" | "failed";
  student: Student;
 students: Student[];
 errorMessage:string;
}

export const initialState: UserState = {
  status: "idle",
  student: emptyStudent,
  students: [emptyStudent],
  errorMessage:"",
};




export const getStudents = createAsyncThunk(
  "students/list",
  async () => {
    try {
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH STUDENTS", error)
      return Promise.reject(error);
    }
  }
);


export const studentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET StudentS
      .addCase(getStudents.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        console.log("---getStudents --action---", objPayload)
        state.students = objPayload?.items || [];
        
      })
      
      
    
  },
});

export const selectStudent = (state: RootState) => state.student;

export default studentSlice.reducer;
