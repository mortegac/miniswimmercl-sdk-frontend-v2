// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, updateData} from "./services"
import {SessionDetail, emptySessionDetail, FilterOptions, InputOptions} from "./types"



export interface SessionDetailsState {
  status: "idle" | "loading" | "failed";
  SessionDetail: SessionDetail;
 sessionDetails: SessionDetail[];
 errorMessage:string;
}

export const initialState: SessionDetailsState = {
  status: "idle",
  SessionDetail: emptySessionDetail,
  sessionDetails: [emptySessionDetail],
  errorMessage:"",
};




export const getSessionDetails = createAsyncThunk(
  "sessionDetails/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionDetails", error)
      return Promise.reject(error);
    }
  }
);
export const setSessionDetails = createAsyncThunk(
  "sessionDetails/update",
  async (objInput: InputOptions) => {
    try {
      const response:any = await updateData({ ...objInput });
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE SessionDetails", error)
      return Promise.reject(error);
    }
  }
);


export const sessionDetailslice = createSlice({
  name: "SessionDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET SessionDetails
      .addCase(getSessionDetails.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionDetails.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        const newArray = objPayload.items.sort((a:any, b:any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        state.sessionDetails = newArray || [];
      })
      
      // UPDATE SessionDetails
      .addCase(setSessionDetails.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setSessionDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSessionDetails.fulfilled, (state, action) => {
        // const objPayload: any = action.payload;
        state.status = "idle";
        
        // const newArray = objPayload.items.sort((a:any, b:any) => {
        //   return new Date(a.date).getTime() - new Date(b.date).getTime();
        // });
        // state.sessionDetails = newArray || [];
      })
      
      
    
  },
});

export const selectSessionDetails = (state: RootState) => state.sessionDetail;

export default sessionDetailslice.reducer;
