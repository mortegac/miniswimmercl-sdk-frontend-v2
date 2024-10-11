// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, fetchDataOnly} from "./services"
import {Location, emptyLocation} from "./types"



export interface UserState {
  status: "idle" | "loading" | "failed";
 location: Location;
 locations: Location[];
 errorMessage:string;
 locationsList: string[];
}

export const initialState: UserState = {
  status: "idle",
  location: emptyLocation,
  locations: [emptyLocation],
  errorMessage:"",
  locationsList: [],
};




export const getLocations = createAsyncThunk(
  "locations/list",
  async () => {
    try {
      
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH LOCATIONS", error)
      return Promise.reject(error);
    }
  }
);
export const getLocationsOnly = createAsyncThunk(
  "locations/list-only",
  async () => {
    try {
      
      const response:any = await fetchDataOnly();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH LOCATIONS", error)
      return Promise.reject(error);
    }
  }
);


export const locationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET LOCATIONS
      .addCase(getLocations.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getLocations --action---", objPayload)
        state.locations = objPayload?.items || [];
      
        
      })
      // GET LOCATIONS
      .addCase(getLocationsOnly.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getLocationsOnly.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocationsOnly.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        state.locations = objPayload?.items || [];
        
        const transformList = (objPayload: Location[]): any[] => {
          const orderArray = [...objPayload].sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          
          return orderArray.map((item) => ({
                label: `${String(item.id).toUpperCase()}`,
                value: String(item.id)
          }))
        }
        state.locationsList = transformList(objPayload?.items) || [];
        
        
        
      })
      
      
    
  },
});

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
