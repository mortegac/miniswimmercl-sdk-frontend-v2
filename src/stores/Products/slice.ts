// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, } from "./services"
import {Product, emptyProduct, FilterOptions, } from "./types"



export interface ProductState {
  status: "idle" | "loading" | "failed";
  product: Product;
  products: Product[];
 errorMessage:string;
}

export const initialState: ProductState = {
  status: "idle",
  product: emptyProduct,
  products: [emptyProduct],
  errorMessage:"",

};

// locationId?: string;
// isActive?: boolean;
  

export const getProducts = createAsyncThunk(
  "Products/list",
  async () => {
    try {
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);
  


export const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    // setCourseidSelected: (state, action) => {
    //   state.courseidSelected = action.payload;
    // },
    // setLocationIdSelected: (state, action) => {
    //   state.locationIdSelected = action.payload;
    // },
    
  },
  extraReducers: (builder) => {
    builder
      // GET Products
      .addCase(getProducts.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
      console.log("---objPayload---", objPayload)
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
        state.products = action.payload || [];
        
      })
      
    
  },
});

export const selectProduct = (state: RootState) => state.product;

// export const {
//  setCourseidSelected,
//  setLocationIdSelected
// } = CourseSlice.actions;

export default ProductSlice.reducer;
