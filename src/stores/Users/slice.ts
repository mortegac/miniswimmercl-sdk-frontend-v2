// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchAuthUser} from "./services"

import { Roles } from "../Roles/types";
import { UserPermissions } from "../UserPermissions/types";


export interface UserState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  firstLogin: boolean;
  status: "idle" | "loading" | "failed";
  step: "initial" | "login" | "autenticated";
  Roles?: Roles;
  UserPermissions?: UserPermissions[];
  errorMessage?: string;
}

export const initialState: UserState = {
  isAuthenticated: false,
  name: "",
  email: "",
  firstLogin: true,
  status: "idle",
  step: "initial",
  errorMessage: "",
};



export const getAuthUser = createAsyncThunk(
  "auth/user",
  async () => {
    try {
      // console.log("...tenderRequirement/list...")
      const response:any = await fetchAuthUser();
      return response;
    } catch (error) {
      console.error(">>>>ERROR LOADING THE PROCESSES", error)
      return Promise.reject(error);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUser
      .addCase(getAuthUser.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = "idle";
        
        console.log("---getUser --action---", action)
        // state.isAuthenticated = action?.payload?.isAuthenticated || false;
        action.payload
        state.isAuthenticated = action?.payload?.id ? true:false;
        state.name = action?.payload?.name || "";
        state.email = action?.payload?.email || "";

        // state.UserPermissions = action?.payload?.Permission || [];
        // if (action?.payload?.Role !== undefined) {
        //   state.Roles = action.payload.Roles;
        // }
        // state.firstLogin = action?.payload?.firstLogin || false;
        // state.step = "login";
      })
    
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
