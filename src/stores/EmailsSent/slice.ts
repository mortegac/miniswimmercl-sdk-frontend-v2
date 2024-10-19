// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, createEmailSent} from "./services"
import {EmailSend, emptyEmailSend, FilterOptions} from "./types"



export interface EmailSendState {
  status: "idle" | "loading" | "failed";
  emailSent: EmailSend;
  emailSends: EmailSend[];
  errorMessage:string;
  wasSent: boolean;
}

export const initialState: EmailSendState = {
  status: "idle",
  emailSent: emptyEmailSend,
  emailSends: [emptyEmailSend],
  errorMessage:"",
  wasSent:false,
};


export const getEmails = createAsyncThunk(
  "EmailSend/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);



export const setEmailSend = createAsyncThunk(
  "EmailSend/create",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      console.error(">>>>setEnrollment-objFilter", objFilter)
      const response:any = await createEmailSent({ ...objFilter });
      console.error(">>>>setEnrollment-response", response)
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH setEnrollment", error)
      return Promise.reject(error);
    }
  }
);


export const EmailSendSlice = createSlice({
  name: "emailSend",
  initialState,
  reducers: {
    cleanSentVar: (state) => {
      state.wasSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
       // SET ENROLLMENT
      .addCase(setEmailSend.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage && objPayload.errorMessage;
        state.wasSent = false;
      })
      .addCase(setEmailSend.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(setEmailSend.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.wasSent = true;
        state.emailSends = objPayload;
        console.log("---setEnrollment --action---", objPayload)
        
      })
      
      // GET EMAILS 
      .addCase(getEmails.rejected, (state, action) => {
        const objPayload: any = action.payload;
        console.log("---getEmails --rejected---", action.payload)
        
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage && objPayload.errorMessage;
      })
      .addCase(getEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmails.fulfilled, (state, action) => {
        console.log("---getEmails --fulfilled---", action.payload)
        const objPayload: any = action.payload;
        state.status = "idle";
     
        // state.courses = objPayload?.items || [];
        state.emailSends = objPayload || [];
        
      })
      
    
  },
});

export const selectEmailSend = (state: RootState) => state.emailSend;
export const {
  cleanSentVar
} = EmailSendSlice.actions;
export default EmailSendSlice.reducer;
