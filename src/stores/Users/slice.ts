// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  fetchAuthUser,
  handleLogin,
  fetchData,
  fetchDataSearchName,
  createApoderado,
  updateApoderado,
  handleForgotPassword,
  handleConfirmForgotPassword,
  handleConfirmNewPasswordChallenge,
} from "./services"

import { Roles } from "../Roles/types";
import { UserPermissions } from "../UserPermissions/types";
import { Users, emptyUser, FilterOptions } from "../Users/types";


export interface UserState {
  isAuthenticated: boolean;
  authChecked: boolean;
  id: string;
  name: string;
  email: string;
  emailAuth: string;
  phone: string;
  usersRolesId: string;
  permissions: any[];
  firstLogin: boolean;
  status: "idle" | "loading" | "failed";
  step: "initial" | "login" | "autenticated";
  Roles?: Roles;
  users?: Users;
  apoderados: Users[];
  UserPermissions?: UserPermissions[];
  requiresNewPassword: boolean;
  errorMessage?: string;
}

export const initialState: UserState = {
  isAuthenticated: false,
  authChecked: false,
  id: "",
  usersRolesId: "",
  permissions: [],
  name: "",
  phone: "",
  email: "",
  emailAuth: "",
  firstLogin: true,
  status: "idle",
  apoderados: [emptyUser],
  step: "initial",
  requiresNewPassword: false,
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


export const getApoderadoSearchName = createAsyncThunk(
  "apoderado/listSearchName",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchDataSearchName({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH STUDENTS", error)
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
      return rejectWithValue(error);
    }
  }
);

export const getAuthUser = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await fetchAuthUser();
      return response;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);


export const confirmNewPassword = createAsyncThunk(
  "auth/confirmNewPassword",
  async (params: { newPassword: string }, { rejectWithValue }) => {
    try {
      return await handleConfirmNewPasswordChallenge(params.newPassword);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (params: { email: string }, { rejectWithValue }) => {
    try {
      return await handleForgotPassword(params.email);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const confirmForgotPassword = createAsyncThunk(
  "auth/confirmForgotPassword",
  async (params: { email: string; code: string; newPassword: string }, { rejectWithValue }) => {
    try {
      return await handleConfirmForgotPassword(params.email, params.code, params.newPassword);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanDataUser: (state) => {
      state.users = emptyUser;
    },
    resetNewPasswordFlag: (state) => {
      state.requiresNewPassword = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // getAuthUser
      .addCase(getAuthUser.rejected, (state) => {
        state.status = "idle";
        state.authChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.authChecked = true;

        state.isAuthenticated = action?.payload?.id ? true : false;
        state.name = action?.payload?.name || "";
        state.usersRolesId = action?.payload?.usersRolesId || "";
        state.emailAuth = action?.payload?.email || "";
        state.phone = action?.payload?.contactPhone || "";
        state.permissions = action?.payload?.permissions || [];
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
        state.phone =  objPayload[0]?.contactPhone || "";
      })
      
      
      // getApoderadoSearchName
      
      .addCase(getApoderadoSearchName.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getApoderadoSearchName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getApoderadoSearchName.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getStudents --action---", objPayload)
        state.apoderados = objPayload?.items || [];
        
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
        state.errorMessage = "";
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.authChecked = true;

        if (objPayload?.requiresNewPassword === true) {
          state.requiresNewPassword = true;
          return;
        }

        state.isAuthenticated = objPayload?.userId ? true : false;
        state.id = objPayload?.id || objPayload?.email || "";
        state.name = objPayload?.name || "";
        state.emailAuth = objPayload?.email || "";
        state.usersRolesId = objPayload?.usersRolesId || "";
        state.permissions = objPayload?.permissions || [];
      })

      // confirmNewPassword
      .addCase(confirmNewPassword.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al cambiar contraseña";
      })
      .addCase(confirmNewPassword.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(confirmNewPassword.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.authChecked = true;
        state.requiresNewPassword = false;
        state.isAuthenticated = objPayload?.userId ? true : false;
        state.id = objPayload?.id || objPayload?.email || "";
        state.name = objPayload?.name || "";
        state.emailAuth = objPayload?.email || "";
        state.usersRolesId = objPayload?.usersRolesId || "";
        state.permissions = objPayload?.permissions || [];
      })

      // forgotPassword
      .addCase(forgotPassword.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al enviar el código";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "idle";
        state.errorMessage = "";
      })

      // confirmForgotPassword
      .addCase(confirmForgotPassword.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al confirmar la nueva contraseña";
      })
      .addCase(confirmForgotPassword.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(confirmForgotPassword.fulfilled, (state) => {
        state.status = "idle";
        state.errorMessage = "";
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
  resetNewPasswordFlag,
} = authSlice.actions;

export default authSlice.reducer;
