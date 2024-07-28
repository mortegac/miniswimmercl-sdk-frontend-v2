// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, createRelation} from "./services"
import {Relationship, emptyRelationship, FilterOptions} from "./types"



export interface Relationshipstate {
  status: "idle" | "loading" | "failed";
  relationship: Relationship;
  relationships: Relationship[];
  errorMessage:string;
}

export const initialState: Relationshipstate = {
  status: "idle",
  relationship: emptyRelationship,
  relationships: [emptyRelationship],
  errorMessage:"",
};



export const setRelationship = createAsyncThunk(
  "relationship/create",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await createRelation({ ...objFilter });
      console.log("---student/create-----", response)
     
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getUser", error)
      return Promise.reject(error);
    }
  }
);


export const getRelationships = createAsyncThunk(
  "Relationships/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData(objFilter);
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH Relationships", error)
      return Promise.reject(error);
    }
  }
);


export const Relationshipslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Relationships
      .addCase(getRelationships.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getRelationships.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRelationships.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        state.relationships = objPayload || [];
        
      })
      
      // setRelationship
     .addCase(setRelationship.rejected, (state, action) => {
      const objPayload: any = action.payload;
      state.status = "failed";
      state.errorMessage = objPayload.errorMessage;
    })
    .addCase(setRelationship.pending, (state) => {
      state.status = "loading";
    })
    .addCase(setRelationship.fulfilled, (state, action) => {
      state.status = "idle";
      const objPayload: any = action.payload;
      console.log("---objPayload---", objPayload)

      state.relationship.id = objPayload.id || "";
      // state.name = objPayload[0]?.name || "";
      // state.email = objPayload[0]?.email || "";
    })
    
  },
});

export const selectRelationships = (state: RootState) => state.relationships;

export default Relationshipslice.reducer;
