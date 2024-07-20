// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {Parameters, emptyParameters} from "./types"



export interface ParameterState {
  status: "idle" | "loading" | "failed";
  Parameter: Parameters;
  errorMessage:string;
  
  relationship: [],
  genders: [],
  cityOfResidence: [],
}

export const initialState: ParameterState = {
  status: "idle",
  Parameter: emptyParameters,
  errorMessage:"",
  
  relationship: [],
  genders: [],
  cityOfResidence: [],
};




export const getParameters = createAsyncThunk(
  "Parameters/list",
  async (objFilter: {
    key: String,
  }) => {
    try {
      const response:any = await fetchData(objFilter);
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH Parameters", error)
      return Promise.reject(error);
    }
  }
);



export const handlePayload = <T extends ParameterState>(state: T, payload: any) => {
  switch (payload.key) {
    case 'TYPEOFRELATIONSHIP':
      state.relationship = payload.list;
      break;
    case 'TYPEOFGENDERS':
      state.genders = payload.list;
      break;
    case 'CITYOFRESIDENCE':
      state.cityOfResidence = payload.list;
      break;

  }
}

export const parameterSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // GET PARAMETERS
       .addCase(getParameters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getParameters.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        const { key } = objPayload;
        state.status = 'idle';

        handlePayload(state, action.payload);
      })
      .addCase(getParameters.rejected, (state) => { state.status = 'idle'; })

      
    
  },
});

export const selectParameters = (state: RootState) => state.parameters;

export default parameterSlice.reducer;
