// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchAuthUser, handleLogin, fetchData, createApoderado, updateApoderado} from "./services"

import { Roles } from "../Roles/types";
import { UserPermissions } from "../UserPermissions/types";
import { Users, emptyUser, FilterOptions } from "../Users/types";


export interface UserState {
  isAuthenticated: boolean;
  id: string;
  name: string;
  email: string;
  firstLogin: boolean;
  status: "idle" | "loading" | "failed";
  step: "initial" | "login" | "autenticated";
  Roles?: Roles;
  users?: Users;
  UserPermissions?: UserPermissions[];
  errorMessage?: string;
}

export const initialState: UserState = {
  isAuthenticated: false,
  id: "",
  name: "",
  email: "",
  firstLogin: true,
  status: "idle",
  step: "initial",
  errorMessage: "",
};


export const getUser = createAsyncThunk(
  "users/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getUser", error)
      return Promise.reject(error);
    }
  }
);
export const setApoderado = createAsyncThunk(
  "users/createApoderado",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await createApoderado({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getUser", error)
      return Promise.reject(error);
    }
  }
);


export const setPhoneApoderado = createAsyncThunk(
  "users/updateApoderado",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await updateApoderado({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH update User", error)
      return Promise.reject(error);
    }
  }
);

export const getLoginUser = createAsyncThunk(
  "auth/userLogin",
  // async (params: { password: string; email: string }, thunkAPI) => {
  async (params: { password: string; email: string }, { rejectWithValue }) => {
    try {
      return await handleLogin(params);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAuthUser = createAsyncThunk(
  "auth/user",
  async () => {
    try {
      // // console.log("...tenderRequirement/list...")
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
  reducers: {
    cleanDataUser: (state) => {
      state.users = emptyUser
      
    },
  },
  extraReducers: (builder) => {
    builder
      // getAuthUser
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
        
        // console.log("---getUser --action---", action)
        action.payload
        state.isAuthenticated = action?.payload?.id ? true:false;
        state.name = action?.payload?.name || "";
        state.email = action?.payload?.email || "";
      })
      
      // getUser
      .addCase(getUser.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        // console.log("---objPayload---", objPayload)
        state.users = objPayload[0];
        state.id = objPayload[0]?.id || "";
        state.name = objPayload[0]?.name || "";
        state.email = objPayload[0]?.email || "";
      })
      
      // set Apoderado 
      .addCase(setApoderado.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setApoderado.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setApoderado.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        // console.log("---objPayload---", objPayload)

        state.id = objPayload[0]?.id || "";
        state.name = objPayload[0]?.name || "";
        state.email = objPayload[0]?.email || "";
      })

      // update Apoderado 
      .addCase(setPhoneApoderado.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setPhoneApoderado.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setPhoneApoderado.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        // console.log("---objPayload---", objPayload)

        state.id = objPayload[0]?.id || "";
      })
      
      
      
      // LOGIN
      .addCase(getLoginUser.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
        
      })
      .addCase(getLoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getUser --isAuthenticated---", objPayload?.userId ? true:false)
        
        state.isAuthenticated = objPayload?.userId ? true:false;
        state.name = action?.payload?.name || "";
        state.email = action?.payload?.email || "";
      })
      
      // GET LOGIN USER
      // .addCase(getLoginUser.rejected, (state, action) => {
      //   const objPayload: any = action.payload;
      //   // console.log(">>>action-payload>>>", action.payload);
      //   state.status = "failed";
      //   state.errorMessage = objPayload.errorMessage;
      // })
      // .addCase(getLoginUser.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getLoginUser.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.isAuthenticated = action?.payload?.isAuthenticated || false;
      //   state.name = action?.payload?.name || "";
      //   state.email = action?.payload?.email || "";
      //   state.firstLogin = action?.payload?.firstLogin || false;
      //   state.step = "login";
      // })
    
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const {
  cleanDataUser,
} = authSlice.actions;

export default authSlice.reducer;
