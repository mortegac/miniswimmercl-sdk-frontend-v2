// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setDataEnroll } from '../Enrollment/slice';
import { setRelationship } from '../Relationships/slice';

import {fetchData, fetchOneData,  fetchDataSearchName, createStudentquick} from "./services"
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
  "student/create",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await createStudentquick({ ...objFilter });
      
      console.log("---student/create-----", response)
      // Dispatch setDataEnroll action after creating the student
      await Promise.all([
        await dispatch(setDataEnroll({ key: "studentId", value: response?.id || "" })),
        await dispatch(setRelationship({ 
          userId: objFilter.idUser,
          studentId: response?.id,
          relation: objFilter.relation,
        })),
      ]);
      
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH create Student and relationship", error)
      return Promise.reject(error);
    }
  }
);
export const getStudent = createAsyncThunk(
  "students/one",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchOneData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH ONE STUDENT", error)
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
export const getStudentsSearchName = createAsyncThunk(
  "students/listSearchName",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchDataSearchName({ ...objFilter });
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
      
      // GET ONE Student
      .addCase(getStudent.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getStudents --action---", objPayload)
        state.student = objPayload || [];
        
      })
      
      
      
      
      
      .addCase(getStudentsSearchName.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getStudentsSearchName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudentsSearchName.fulfilled, (state, action) => {
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
        // console.log("---objPayload---", objPayload)

        state.student.id = objPayload?.id || "";
        // state.name = objPayload[0]?.name || "";
        // state.email = objPayload[0]?.email || "";
      })
      
      
      
    
  },
});

export const selectStudent = (state: RootState) => state.student;

export default studentSlice.reducer;
