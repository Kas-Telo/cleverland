import { createAction, createSlice } from '@reduxjs/toolkit';

// actions
const toggleLoading = createAction<{ isLoading: boolean }>('appActions/toggleLoading');
const setAppError = createAction<{
  status: number | null;
  error: string | null;
}>('appActions/setError');
const setAppInfo = createAction<{
  message: string | null;
}>('appActions/setAppInfo');

// state
type StateType = {
  isLoading: boolean;
  appError: {
    status: number | null;
    error: string | null;
  };
  appInfo: {
    message: string | null;
  };
};
export const initialState: StateType = {
  isLoading: false,
  appError: {
    status: null,
    error: null,
  },
  appInfo: {
    message: null,
  },
};

// slice
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLoading, (state, action) => {
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(setAppError, (state, action) => {
      state.appError = action.payload;
    });
    builder.addCase(setAppInfo, (state, action) => {
      state.appInfo = action.payload;
    });
  },
});

// exports
export const appReducer = slice.reducer;
export const syncAppActions = {
  toggleLoading,
  setAppError,
  setAppInfo,
};
