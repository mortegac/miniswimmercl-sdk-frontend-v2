import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchGmailInboxByUser, fetchGmailInboxPage, triggerGmailSync } from './services';
import { GmailInbox, emptyGmailInbox, FilterOptions, AdminFilterOptions, AdminPageResult } from './types';

export interface GmailInboxState {
  status: 'idle' | 'loading' | 'failed';
  syncStatus: 'idle' | 'syncing' | 'failed';
  emails: GmailInbox[];
  errorMessage: string;
  adminStatus: 'idle' | 'loading' | 'failed';
  adminEmails: GmailInbox[];
  adminNextToken: string | null;
  adminErrorMessage: string;
}

const initialState: GmailInboxState = {
  status: 'idle',
  syncStatus: 'idle',
  emails: [],
  errorMessage: '',
  adminStatus: 'idle',
  adminEmails: [],
  adminNextToken: null,
  adminErrorMessage: '',
};

export const getGmailInbox = createAsyncThunk(
  'gmailInbox/listByUser',
  async (objFilter: FilterOptions, { rejectWithValue }) => {
    try {
      return await fetchGmailInboxByUser(objFilter);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const triggerSync = createAsyncThunk(
  'gmailInbox/triggerSync',
  async (_, { rejectWithValue }) => {
    try {
      await triggerGmailSync();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getGmailInboxPage = createAsyncThunk(
  'gmailInbox/getPage',
  async (params: AdminFilterOptions, { rejectWithValue }) => {
    try {
      return await fetchGmailInboxPage(params);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: llama v2GmailSync (Lambda) y luego recarga el inbox del apoderado
export const syncAndRefreshGmailInbox = createAsyncThunk(
  'gmailInbox/syncAndRefresh',
  async (objFilter: FilterOptions, { dispatch, rejectWithValue }) => {
    try {
      await triggerGmailSync();
      const items = await fetchGmailInboxByUser(objFilter);
      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const gmailInboxSlice = createSlice({
  name: 'gmailInbox',
  initialState,
  reducers: {
    clearGmailInbox: (state) => {
      state.emails = [];
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGmailInbox.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = '';
      })
      .addCase(getGmailInbox.fulfilled, (state, action) => {
        state.status = 'idle';
        state.emails = action.payload ?? [];
      })
      .addCase(getGmailInbox.rejected, (state, action) => {
        const payload: any = action.payload;
        state.status = 'failed';
        state.errorMessage = payload?.errorMessage ?? 'Error al cargar emails';
      })
      // triggerSync
      .addCase(triggerSync.pending, (state) => { state.syncStatus = 'syncing'; })
      .addCase(triggerSync.fulfilled, (state) => { state.syncStatus = 'idle'; })
      .addCase(triggerSync.rejected, (state) => { state.syncStatus = 'failed'; })
      // getGmailInboxPage
      .addCase(getGmailInboxPage.pending, (state) => {
        state.adminStatus = 'loading';
        state.adminErrorMessage = '';
      })
      .addCase(getGmailInboxPage.fulfilled, (state, action) => {
        state.adminStatus = 'idle';
        state.adminEmails = (action.payload as AdminPageResult).items;
        state.adminNextToken = (action.payload as AdminPageResult).nextToken;
      })
      .addCase(getGmailInboxPage.rejected, (state, action) => {
        const payload: any = action.payload;
        state.adminStatus = 'failed';
        state.adminErrorMessage = payload?.errorMessage ?? 'Error al cargar emails';
      })
      // syncAndRefreshGmailInbox
      .addCase(syncAndRefreshGmailInbox.pending, (state) => {
        state.syncStatus = 'syncing';
      })
      .addCase(syncAndRefreshGmailInbox.fulfilled, (state, action) => {
        state.syncStatus = 'idle';
        state.emails = action.payload ?? [];
      })
      .addCase(syncAndRefreshGmailInbox.rejected, (state) => {
        state.syncStatus = 'failed';
      });
  },
});

export const selectGmailInbox = (state: RootState) => state.gmailInbox;
export const { clearGmailInbox } = gmailInboxSlice.actions;
export default gmailInboxSlice.reducer;
