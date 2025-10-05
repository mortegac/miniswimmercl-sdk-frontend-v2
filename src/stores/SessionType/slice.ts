// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  fetchData,
  fetchDataWithRelations,
  fetchOne,
  createSessionTypeService,
  updateSessionTypeService,
  deleteSessionTypeService
} from "./services";
import { SessionType, emptySessionType, FilterOptions, InputOptions } from "./types";

export interface SessionTypeState {
  status: "idle" | "loading" | "failed";
  sessionType: SessionType;
  sessionTypes: SessionType[];
  errorMessage: string;
}

export const initialState: SessionTypeState = {
  status: "idle",
  sessionType: emptySessionType,
  sessionTypes: [emptySessionType],
  errorMessage: "",
};

export const getSessionTypes = createAsyncThunk(
  "SessionType/list",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionTypes", error);
      return Promise.reject(error);
    }
  }
);

export const getSessionTypesWithRelations = createAsyncThunk(
  "SessionType/listWithRelations",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchDataWithRelations({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionTypes with relations", error);
      return Promise.reject(error);
    }
  }
);

export const getSessionType = createAsyncThunk(
  "SessionType/getOne",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchOne({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionType", error);
      return Promise.reject(error);
    }
  }
);

export const setSessionType = createAsyncThunk(
  "SessionType/create",
  async (objFilter: InputOptions) => {
    try {
      const response: any = await createSessionTypeService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE SessionType", error);
      return Promise.reject(error);
    }
  }
);

export const updateSessionType = createAsyncThunk(
  "SessionType/update",
  async (objFilter: InputOptions) => {
    try {
      const response: any = await updateSessionTypeService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE SessionType", error);
      return Promise.reject(error);
    }
  }
);

export const removeSessionType = createAsyncThunk(
  "SessionType/delete",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await deleteSessionTypeService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR DELETE SessionType", error);
      return Promise.reject(error);
    }
  }
);

export const sessionTypeSlice = createSlice({
  name: "sessionType",
  initialState,
  reducers: {
    setSessionTypeSelected: (state, action) => {
      state.sessionType = action.payload;
    },
    clearSessionType: (state) => {
      state.sessionType = emptySessionType;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET SessionTypes
      .addCase(getSessionTypes.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionTypes.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.sessionTypes = objPayload?.items || [];
      })

      // GET SessionTypes with relations
      .addCase(getSessionTypesWithRelations.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionTypesWithRelations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionTypesWithRelations.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.sessionTypes = objPayload?.items || [];
      })

      // GET SessionType
      .addCase(getSessionType.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionType.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.sessionType = objPayload || emptySessionType;
      })

      // CREATE SessionType
      .addCase(setSessionType.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setSessionType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSessionType.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        // Add the new session type to the list
        if (objPayload?.id) {
          state.sessionTypes = [objPayload, ...state.sessionTypes];
        }
      })

      // UPDATE SessionType
      .addCase(updateSessionType.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(updateSessionType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSessionType.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        // Update the session type in the list
        if (objPayload?.id) {
          const index = state.sessionTypes.findIndex(st => st.id === objPayload.id);
          if (index !== -1) {
            state.sessionTypes[index] = objPayload;
          }
          // Update selected session type if it's the same
          if (state.sessionType.id === objPayload.id) {
            state.sessionType = objPayload;
          }
        }
      })

      // DELETE SessionType
      .addCase(removeSessionType.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(removeSessionType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSessionType.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        // Remove the session type from the list
        if (objPayload?.id) {
          state.sessionTypes = state.sessionTypes.filter(st => st.id !== objPayload.id);
          // Clear selected session type if it was deleted
          if (state.sessionType.id === objPayload.id) {
            state.sessionType = emptySessionType;
          }
        }
      });
  },
});

export const selectSessionType = (state: RootState) => state.sessionType;

export const {
  setSessionTypeSelected,
  clearSessionType,
} = sessionTypeSlice.actions;

export default sessionTypeSlice.reducer;
