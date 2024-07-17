// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {SessionDetail, emptySessionDetail, FilterOptions} from "./types"



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
        
        // objPayload.items.length > 0 && console.log(" -- objPayload --- ", objPayload.items)
       
        // Primero, agrupamos las sesiones por enrollmentSessionDetailsId
          // const grupos = objPayload.items.reduce((acc:any, sesion:any) => {
          //   const key = sesion.enrollmentSessionDetailsId;
          //   if (!acc[key]) {
          //     acc[key] = [];
          //   }
          //   acc[key].push(sesion);
          //   return acc;
          // }, {} as Record<string, SessionDetail[]>);

          // Luego, ordenamos cada grupo por sessionNumber
          // Object.values(grupos).forEach((grupo:any) => {
          //   grupo.sort((a:any, b:any) => a.sessionNumber - b.sessionNumber);
          // });
  
          // let newArray:any = []
          // Object.values(grupos).map((item:any)=>newArray.push({...item}))
          
          // objPayload.items.length > 0 && console.log(" -- objPayload --- ", Object.values(grupos))
          // objPayload.items.length > 0 && console.log(" -- objPayload --- ", newArray)
        
        // state.sessionDetails = objPayload.items || [];
        const newArray = objPayload.items.sort((a:any, b:any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        // state.sessionDetails = objPayload.items || [];
        state.sessionDetails = newArray || [];
        
      })
      
      
    
  },
});

export const selectSessionDetails = (state: RootState) => state.sessionDetail;

export default sessionDetailslice.reducer;
