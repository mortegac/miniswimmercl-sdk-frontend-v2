



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {createShoppinCartDetail, fetchOne} from "./services"
import {ShoppingCartDetail, emptyShoppingCartDetail, FilterOptions, InputOptions} from "./types"


export interface ShoppingCartDetailState {
  status: "idle" | "loading" | "failed";
  shoppingCartDetails: ShoppingCartDetail[];
  errorMessage:string;
}

export const initialState: ShoppingCartDetailState = {
  status: "idle",
  shoppingCartDetails: [emptyShoppingCartDetail],
  errorMessage:"",
};


export const getShoppingCartDetail = createAsyncThunk(
  "shoppingCartDetail/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchOne({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH shoppingCartDetails", error)
      return Promise.reject(error);
    }
  }
);



  

export const setShoppingCartDetail = createAsyncThunk(
  "shoppingCartDetail/create",
  async (objFilter: InputOptions) => {
    try {
      const response:any = await createShoppinCartDetail({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH Create shoppingCartDetails", error)
      return Promise.reject(error);
    }
  }
);



export const ShoppingCartDetailsSlice = createSlice({
  name: "shoppingCartDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getShoppingCartDetail.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getShoppingCartDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShoppingCartDetail.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        state.shoppingCartDetails = objPayload?.items || [];
        
      })
      // set ShoppingCartDetail
      .addCase(setShoppingCartDetail.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setShoppingCartDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setShoppingCartDetail.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        state.shoppingCartDetails = objPayload?.items || [];
        
      })
      
      
    
  },
});

export const selectShoppingCartDetails = (state: RootState) => state.shoppingCartDetails;

export default ShoppingCartDetailsSlice.reducer;
