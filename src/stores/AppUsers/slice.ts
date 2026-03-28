import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  fetchAppUsers,
  fetchAppRoles,
  fetchCognitoUser,
  createUser,
  updateUser,
  deleteUser,
  setCognitoPassword,
  setCognitoStatus,
  createCognitoUser,
  type CognitoUserInfo,
  type CreateCognitoUserParams,
} from './services';
import type { AppUser, AppRole, UserFormData } from './types';

export interface AppUsersState {
  status: 'idle' | 'loading' | 'failed';
  mutationStatus: 'idle' | 'saving' | 'deleting' | 'failed';
  cognitoStatus: 'idle' | 'loading' | 'failed';
  cognitoActionStatus: 'idle' | 'saving' | 'failed';
  users: AppUser[];
  roles: AppRole[];
  cognitoUser: CognitoUserInfo | null;
  errorMessage: string;
  cognitoErrorMessage: string;
}

const initialState: AppUsersState = {
  status: 'idle',
  mutationStatus: 'idle',
  cognitoStatus: 'idle',
  cognitoActionStatus: 'idle',
  users: [],
  roles: [],
  cognitoUser: null,
  errorMessage: '',
  cognitoErrorMessage: '',
};

// ── List / fetch ──────────────────────────────────────────────────────────────

export const getAppUsers = createAsyncThunk(
  'appUsers/list',
  async (_, { rejectWithValue }) => {
    try { return await fetchAppUsers(); }
    catch (err) { return rejectWithValue(String(err)); }
  }
);

export const getAppRoles = createAsyncThunk(
  'appUsers/listRoles',
  async (_, { rejectWithValue }) => {
    try { return await fetchAppRoles(); }
    catch (err) { return rejectWithValue(String(err)); }
  }
);

export const getCognitoUserInfo = createAsyncThunk(
  'appUsers/getCognitoUser',
  async (email: string, { rejectWithValue }) => {
    try { return await fetchCognitoUser(email); }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

// ── CRUD DynamoDB ─────────────────────────────────────────────────────────────

export const createAppUserThunk = createAsyncThunk(
  'appUsers/create',
  async (data: UserFormData, { rejectWithValue }) => {
    try { return await createUser(data); }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

export const updateAppUserThunk = createAsyncThunk(
  'appUsers/update',
  async ({ id, data }: { id: string; data: Partial<UserFormData> }, { rejectWithValue }) => {
    try { return await updateUser(id, data); }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

export const deleteAppUserThunk = createAsyncThunk(
  'appUsers/delete',
  async (id: string, { rejectWithValue }) => {
    try { await deleteUser(id); return id; }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

// ── Cognito actions ───────────────────────────────────────────────────────────

export const setCognitoPasswordThunk = createAsyncThunk(
  'appUsers/cognitoSetPassword',
  async (
    { email, password, permanent }: { email: string; password: string; permanent: boolean },
    { rejectWithValue }
  ) => {
    try { await setCognitoPassword(email, password, permanent); }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

export const setCognitoStatusThunk = createAsyncThunk(
  'appUsers/cognitoSetStatus',
  async ({ email, enabled }: { email: string; enabled: boolean }, { rejectWithValue }) => {
    try {
      await setCognitoStatus(email, enabled);
      return { email, enabled };
    } catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

export const createCognitoUserThunk = createAsyncThunk(
  'appUsers/cognitoCreateUser',
  async (params: CreateCognitoUserParams, { rejectWithValue }) => {
    try { return await createCognitoUser(params); }
    catch (err: any) { return rejectWithValue(err?.errors?.[0]?.message ?? String(err)); }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState,
  reducers: {
    clearMutationError: (state) => {
      state.errorMessage = '';
      state.mutationStatus = 'idle';
    },
    clearCognitoState: (state) => {
      state.cognitoUser = null;
      state.cognitoStatus = 'idle';
      state.cognitoActionStatus = 'idle';
      state.cognitoErrorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // getAppUsers
      .addCase(getAppUsers.pending, (state) => { state.status = 'loading'; state.errorMessage = ''; })
      .addCase(getAppUsers.fulfilled, (state, action) => { state.status = 'idle'; state.users = action.payload; })
      .addCase(getAppUsers.rejected, (state, action) => { state.status = 'failed'; state.errorMessage = String(action.payload ?? 'Error al cargar usuarios'); })
      // getAppRoles
      .addCase(getAppRoles.fulfilled, (state, action) => { state.roles = action.payload; })
      // getCognitoUserInfo
      .addCase(getCognitoUserInfo.pending, (state) => { state.cognitoStatus = 'loading'; state.cognitoErrorMessage = ''; })
      .addCase(getCognitoUserInfo.fulfilled, (state, action) => { state.cognitoStatus = 'idle'; state.cognitoUser = action.payload; })
      .addCase(getCognitoUserInfo.rejected, (state, action) => { state.cognitoStatus = 'failed'; state.cognitoErrorMessage = String(action.payload ?? 'Error Cognito'); })
      // create
      .addCase(createAppUserThunk.pending, (state) => { state.mutationStatus = 'saving'; state.errorMessage = ''; })
      .addCase(createAppUserThunk.fulfilled, (state, action) => { state.mutationStatus = 'idle'; state.users.push(action.payload); })
      .addCase(createAppUserThunk.rejected, (state, action) => { state.mutationStatus = 'failed'; state.errorMessage = String(action.payload ?? 'Error al crear'); })
      // update
      .addCase(updateAppUserThunk.pending, (state) => { state.mutationStatus = 'saving'; state.errorMessage = ''; })
      .addCase(updateAppUserThunk.fulfilled, (state, action) => {
        state.mutationStatus = 'idle';
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = { ...state.users[idx], ...action.payload };
      })
      .addCase(updateAppUserThunk.rejected, (state, action) => { state.mutationStatus = 'failed'; state.errorMessage = String(action.payload ?? 'Error al actualizar'); })
      // delete
      .addCase(deleteAppUserThunk.pending, (state) => { state.mutationStatus = 'deleting'; state.errorMessage = ''; })
      .addCase(deleteAppUserThunk.fulfilled, (state, action) => { state.mutationStatus = 'idle'; state.users = state.users.filter((u) => u.id !== action.payload); })
      .addCase(deleteAppUserThunk.rejected, (state, action) => { state.mutationStatus = 'failed'; state.errorMessage = String(action.payload ?? 'Error al eliminar'); })
      // cognito setPassword
      .addCase(setCognitoPasswordThunk.pending, (state) => { state.cognitoActionStatus = 'saving'; state.cognitoErrorMessage = ''; })
      .addCase(setCognitoPasswordThunk.fulfilled, (state) => { state.cognitoActionStatus = 'idle'; })
      .addCase(setCognitoPasswordThunk.rejected, (state, action) => { state.cognitoActionStatus = 'failed'; state.cognitoErrorMessage = String(action.payload ?? 'Error al cambiar contraseña'); })
      // cognito setStatus
      .addCase(setCognitoStatusThunk.pending, (state) => { state.cognitoActionStatus = 'saving'; state.cognitoErrorMessage = ''; })
      .addCase(setCognitoStatusThunk.fulfilled, (state, action) => {
        state.cognitoActionStatus = 'idle';
        if (action.payload && state.cognitoUser) {
          state.cognitoUser = { ...state.cognitoUser, enabled: action.payload.enabled };
        }
      })
      .addCase(setCognitoStatusThunk.rejected, (state, action) => { state.cognitoActionStatus = 'failed'; state.cognitoErrorMessage = String(action.payload ?? 'Error al cambiar estado'); })
      // cognito createUser
      .addCase(createCognitoUserThunk.pending, (state) => { state.mutationStatus = 'saving'; state.errorMessage = ''; })
      .addCase(createCognitoUserThunk.fulfilled, (state, action) => {
        state.mutationStatus = 'idle';
        if (action.payload) {
          // update the user in the list with new data from Cognito creation
          const idx = state.users.findIndex((u) => u.id === action.payload.email);
          if (idx !== -1) state.users[idx] = { ...state.users[idx], ...action.payload };
          else state.users.push(action.payload as any);
        }
      })
      .addCase(createCognitoUserThunk.rejected, (state, action) => { state.mutationStatus = 'failed'; state.errorMessage = String(action.payload ?? 'Error al crear en Cognito'); });
  },
});

export const selectAppUsers = (state: RootState) => state.appUsers;
export const { clearMutationError, clearCognitoState } = appUsersSlice.actions;
export default appUsersSlice.reducer;
