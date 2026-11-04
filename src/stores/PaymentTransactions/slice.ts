// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, fetchDataByCart} from "./services"
import {PaymentTransactions, emptyPaymentTransactions, FilterOptions} from "./types"



export interface PaymentTransactionsState {
  status: "idle" | "loading" | "failed";
  cartStatus: "idle" | "loading" | "failed";
  paymentTransaction: PaymentTransactions;
  paymentTransactions: PaymentTransactions[];
  cartTransactions: PaymentTransactions[];
  errorMessage:string;
}

export const initialState: PaymentTransactionsState = {
  status: "idle",
  cartStatus: "idle",
  paymentTransaction: emptyPaymentTransactions,
  paymentTransactions: [emptyPaymentTransactions],
  cartTransactions: [],
  errorMessage:"",
};


export const getPaymentTransactions = createAsyncThunk(
  "PaymentTransactionsState/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH PaymentTransactionsState", error)
      return Promise.reject(error);
    }
  }
);



export const getPaymentTransactionsByCart = createAsyncThunk(
  "PaymentTransactionsState/listByCart",
  async (cartId: string) => {
    try {
      const response: any = await fetchDataByCart(cartId);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const PaymentTransactionsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getPaymentTransactions.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || String(action.error?.message || "");
      })
      .addCase(getPaymentTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPaymentTransactions.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.paymentTransactions = objPayload?.items || [];
      })

      .addCase(getPaymentTransactionsByCart.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(getPaymentTransactionsByCart.rejected, (state) => {
        state.cartStatus = "failed";
      })
      .addCase(getPaymentTransactionsByCart.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.cartStatus = "idle";
        state.cartTransactions = objPayload?.items || [];
      })

  },
});

export const selectPaymentTransactions = (state: RootState) => state.paymentTransactions;

export default PaymentTransactionsSlice.reducer;