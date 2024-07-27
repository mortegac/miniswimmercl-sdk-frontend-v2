// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, createStudentquick} from "./services"
import {Student, emptyStudent, FilterOptions} from "./types"



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



export const setStudent = createAsyncThunk(
  "studnet/create",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await createStudentquick({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getUser", error)
      return Promise.reject(error);
    }
  }
);
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
        
        // console.log("---getStudents --action---", objPayload)
        state.students = objPayload?.items || [];
        
      })
      
      // setStudent
      .addCase(setStudent.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setStudent.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        console.log("---objPayload---", objPayload)

        state.student.id = objPayload[0]?.id || "";
        // state.name = objPayload[0]?.name || "";
        // state.email = objPayload[0]?.email || "";
      })
      
      
      
    
  },
});

export const selectStudent = (state: RootState) => state.student;

export default studentSlice.reducer;
