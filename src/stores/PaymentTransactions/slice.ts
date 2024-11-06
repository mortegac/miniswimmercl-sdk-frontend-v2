// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData} from "./services"
import {PaymentTransactions, emptyPaymentTransactions, FilterOptions} from "./types"



export interface PaymentTransactionsState {
  status: "idle" | "loading" | "failed";
  paymentTransaction: PaymentTransactions;
  paymentTransactions: PaymentTransactions[];
 errorMessage:string;
}

export const initialState: PaymentTransactionsState = {
  status: "idle",
  paymentTransaction: emptyPaymentTransactions,
  paymentTransactions: [emptyPaymentTransactions],
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
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getPaymentTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPaymentTransactions.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getPaymentTransactions --action---", objPayload)
         
        // const sortedArray = objPayload?.items.sort((a:any, b:any) => {
        //   // Primero, comparamos por locationCoursesId
        //   if (a.locationCoursesId < b.locationCoursesId) return -1;
        //   if (a.locationCoursesId > b.locationCoursesId) return 1;
          
        //   // Si locationCoursesId es igual, comparamos por AgeGroupType
        //   if (a.AgeGroupType < b.AgeGroupType) return -1;
        //   if (a.AgeGroupType > b.AgeGroupType) return 1;
          
        //   // Si ambos son iguales, no cambiamos el orden
        //   return 0;
        // });
  
        // state.courses = objPayload?.items || [];
        state.paymentTransactions = objPayload?.items || [];
        
      })
      
      
    
  },
});

export const selectPaymentTransactions = (state: RootState) => state.paymentTransactions;

export default PaymentTransactionsSlice.reducer;