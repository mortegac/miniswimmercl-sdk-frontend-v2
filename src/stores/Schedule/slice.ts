// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {createSchedules, getSchedulesByLocationAndCourse as getSchedulesByLocationAndCourseService} from "./services"
import {Schedule, emptySchedules, FilterOptions} from "./types"

export interface CourseState {
  status: "idle" | "loading" | "failed";
  schedule: Schedule;
  schedules: Schedule[];
  errorMessage:string;
}

export const initialState: CourseState = {
  status: "idle",
  schedule: emptySchedules,
  schedules: [],
  errorMessage:"",
};

export const setSchedules = createAsyncThunk(
  "schedules/create",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await createSchedules({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH setEnrollment", error)
      return Promise.reject(error);
    }
  }
);


export const getSchedulesByLocationAndCourse = createAsyncThunk(
  "schedules/getByLocationAndCourse",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await getSchedulesByLocationAndCourseService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getSchedulesByLocationAndCourse", error)
      return Promise.reject(error);
    }
  }
);


export const SchedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SET SCHEDULE
      .addCase(setSchedules.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSchedules.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        console.log("--  setSchedules ---", objPayload)
        // state.courses = objPayload?.items || [];
        // state.courses = sortedArray || [];
        
      })
      // GET SCHEDULES BY LOCATION AND COURSE
      .addCase(getSchedulesByLocationAndCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSchedulesByLocationAndCourse.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        const items = objPayload?.data?.items || [];
        state.schedules = items;
        
        console.log("--  getSchedulesByLocationAndCourse ---", items)
      })
      .addCase(getSchedulesByLocationAndCourse.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al obtener los horarios";
      })
    
  },
});

export const selectSchedules = (state: RootState) => state.schedules;

export default SchedulesSlice.reducer;
