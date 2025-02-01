



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, updatePay} from "./services"
import {ShoppingCart, emptyShoppingCart, FilterOptions} from "./types"



export interface ShoppingCartState {
  status: "idle" | "loading" | "failed";
  shoppingCarts: ShoppingCart[];
  errorMessage:string;
}

export const initialState: ShoppingCartState = {
  status: "idle",
  shoppingCarts: [emptyShoppingCart],
  errorMessage:"",
};


export const getShoppingCart = createAsyncThunk(
  "ShoppingCart/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH ShoppingCarts", error)
      return Promise.reject(error);
    }
  }
);


export const updatePayment = createAsyncThunk(
  "ShoppingCart/updatePay",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await updatePay({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH updatePay", error)
      return Promise.reject(error);
    }
  }
);


export const ShoppingCartsSlice = createSlice({
  name: "ShoppingCarts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getShoppingCart.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getShoppingCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        function sortShoppingCartsByStatus(shoppingCarts:any) {
          return shoppingCarts.sort((a:any, b:any) => {
            if (a.status < b.status) return -1;
            if (a.status > b.status) return 1;
            return 0;
          });
        }
        
        const sortedShoppingCarts = sortShoppingCartsByStatus(objPayload?.items);

        
        state.shoppingCarts = sortedShoppingCarts || [];
        // state.shoppingCarts = objPayload?.items || [];
        
      })
      
      
       // UPDATE PAYMENT 
       .addCase(updatePayment.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(updatePayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        console.log("---updateEnrollmentPay --action---", objPayload)
      })
      
      
    
  },
});

export const selectShoppingCarts = (state: RootState) => state.shoppingCarts;

export default ShoppingCartsSlice.reducer;
