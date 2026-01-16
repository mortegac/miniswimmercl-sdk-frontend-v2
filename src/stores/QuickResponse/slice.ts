// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  fetchData,
  fetchOneData,
  fetchDataSearchName,
  createQuickResponseService,
  updateQuickResponseService,
  deleteQuickResponseService
} from "./services";
import { QuickResponse, emptyQuickResponse, FilterOptions } from "./types";

export interface QuickResponseState {
  status: "idle" | "loading" | "failed";
  quickResponse: QuickResponse;
  quickResponses: QuickResponse[];
  errorMessage: string;
}

export const initialState: QuickResponseState = {
  status: "idle",
  quickResponse: emptyQuickResponse,
  quickResponses: [emptyQuickResponse],
  errorMessage: "",
};

/**
 * B?squeda optimizada de respuestas r?pidas por nombre
 * Busca coincidencias parciales en cualquier parte del string del campo name
 */
export const getQuickResponsesSearchName = createAsyncThunk(
  "quickResponse/listSearchName",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchDataSearchName({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH QUICK RESPONSES SEARCH", error);
      return Promise.reject(error);
    }
  }
);

/**
 * Obtener todas las respuestas r?pidas activas
 */
export const getQuickResponses = createAsyncThunk(
  "quickResponse/list",
  async () => {
    try {
      const response: any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH QUICK RESPONSES", error);
      return Promise.reject(error);
    }
  }
);

/**
 * Obtener una respuesta r?pida por ID
 */
export const getQuickResponseById = createAsyncThunk(
  "quickResponse/one",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchOneData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH ONE QUICK RESPONSE", error);
      return Promise.reject(error);
    }
  }
);

/**
 * Crear una nueva respuesta r?pida
 */
export const createQuickResponse = createAsyncThunk(
  "quickResponse/create",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await createQuickResponseService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE QUICK RESPONSE", error);
      return Promise.reject(error);
    }
  }
);

/**
 * Actualizar una respuesta r?pida existente
 */
export const updateQuickResponse = createAsyncThunk(
  "quickResponse/update",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await updateQuickResponseService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE QUICK RESPONSE", error);
      return Promise.reject(error);
    }
  }
);

/**
 * Eliminar una respuesta r?pida
 */
export const deleteQuickResponse = createAsyncThunk(
  "quickResponse/delete",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await deleteQuickResponseService({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR DELETE QUICK RESPONSE", error);
      return Promise.reject(error);
    }
  }
);

export const quickResponseSlice = createSlice({
  name: "quickResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET QuickResponses
      .addCase(getQuickResponses.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al obtener respuestas r?pidas";
      })
      .addCase(getQuickResponses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuickResponses.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.quickResponses = objPayload?.items || [];
      })

      // GET ONE QuickResponse
      .addCase(getQuickResponseById.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al obtener respuesta rápida";
      })
      .addCase(getQuickResponseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuickResponseById.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.quickResponse = objPayload || emptyQuickResponse;
      })

      // SEARCH QuickResponses by Name
      .addCase(getQuickResponsesSearchName.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al buscar respuestas r?pidas";
      })
      .addCase(getQuickResponsesSearchName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuickResponsesSearchName.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.quickResponses = objPayload?.items || [];
      })

      // CREATE QuickResponse
      .addCase(createQuickResponse.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al crear respuesta r?pida";
      })
      .addCase(createQuickResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createQuickResponse.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        state.quickResponse = objPayload || emptyQuickResponse;
        // Agregar a la lista si existe
        if (objPayload && state.quickResponses.length > 0 && state.quickResponses[0].id === "") {
          state.quickResponses = [objPayload];
        } else if (objPayload) {
          state.quickResponses = [...state.quickResponses, objPayload];
        }
      })

      // UPDATE QuickResponse
      .addCase(updateQuickResponse.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al actualizar respuesta r?pida";
      })
      .addCase(updateQuickResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuickResponse.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        state.quickResponse = objPayload || emptyQuickResponse;
        // Actualizar en la lista
        state.quickResponses = state.quickResponses.map((item) =>
          item.id === objPayload?.id ? objPayload : item
        );
      })

      // DELETE QuickResponse
      .addCase(deleteQuickResponse.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload?.errorMessage || "Error al eliminar respuesta r?pida";
      })
      .addCase(deleteQuickResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteQuickResponse.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        // Eliminar de la lista
        state.quickResponses = state.quickResponses.filter(
          (item) => item.id !== objPayload?.id
        );
        if (state.quickResponse.id === objPayload?.id) {
          state.quickResponse = emptyQuickResponse;
        }
      });
  },
});

export const selectQuickResponse = (state: RootState) => state.quickResponse;

export default quickResponseSlice.reducer;
