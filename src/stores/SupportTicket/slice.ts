// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSupportTickets, createSupportTickets, updateStatusTickets, createTicketComment } from "./services";
import {
  emptySupportTicket,
  // SupportTicket,
  // CustomSupportTicketFilterObject,
  InputOptions,
  FilterOptions
} from "./type";
// import { SupportTicketLevel, SupportTicketStatusTicket } from "../graphql/API";

export interface supportTicketState {
  items: any[];
  status: "idle" | "loading" | "failed";
  filter?: any;
  errorMessage: string;
}

const initialState: supportTicketState = {
  status: "idle",
  items: [emptySupportTicket],
  filter: {
    month: "",
    year: "",
  },
  errorMessage: "",
};

// export const getSupportTickets = createAsyncThunk(
//   "supportTickets/list",
//   async (filter?: CustomSupportTicketFilterObject) => {
//     const response = await fetchSupportTickets(filter);
//     return response;
//   },
// );
export const getSupportTickets = createAsyncThunk(
  "supportTickets/list",
  async (filter?: FilterOptions) => {
    const response = await fetchSupportTickets({ ...filter });
    return response;
  },
);


export const setSupportTickets = createAsyncThunk(
  "tickets/create",
  async (input: InputOptions, { dispatch }) => {
    try {
      const response: any = await createSupportTickets({ ...input });
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE tickets/create", error)
      return Promise.reject(error);
    }
  }
);

export const setStatusTickets = createAsyncThunk(
  "tickets/updateStatut",
  async (input: InputOptions, { dispatch }) => {
    try {
      const response: any = await updateStatusTickets({ ...input });
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE tickets/create", error)
      return Promise.reject(error);
    }
  }
);


export const setTicketComment = createAsyncThunk(
  "tickets/create-comment",
  async (input: InputOptions, { dispatch }) => {
    try {
      const response: any = await createTicketComment({ ...input });
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE tickets/comment", error)
      return Promise.reject(error);
    }
  }
);

export const supportTicketSlice = createSlice({
  name: "supportTickets",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        filter: any;
      }>,
    ) => {
      state.status = "loading";
      state.filter = { ...state.filter, ...action.payload.filter };
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupportTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSupportTickets.fulfilled, (state, action: any) => {
        state.status = "idle";
        console.log("--getSupportTickets--", action.payload)
        state.items = [...action.payload];
      })
      .addCase(getSupportTickets.rejected, (state) => {
        console.error(state, "error getting support");
        state.status = "failed";
      })

      // SET TICKET
      .addCase(setSupportTickets.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setSupportTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSupportTickets.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";

        console.log("--  settickets ---", objPayload)
      })

      // UPDATE TICKET
      .addCase(setStatusTickets.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setStatusTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setStatusTickets.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";

        console.log("--  UPDATE TICKET ---", objPayload)
      })

      // SET COMMENTS TICKET
      .addCase(setTicketComment.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setTicketComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setTicketComment.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";

        console.log("--  set comments tickets ---", objPayload)
      })
  },
});

export const { setFilter } = supportTicketSlice.actions;
export const selectSupportTickets = (state: RootState) => state.supportTickets;

export default supportTicketSlice.reducer;
