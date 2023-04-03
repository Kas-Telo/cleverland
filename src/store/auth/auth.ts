import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { authApi } from '../../api/auth/auth-api';
import {
  AuthRequestType,
  ForgotPasswordRequestType,
  ForgotPasswordResponseType,
  RegistrationRequestType,
  ResetPasswordRequestType,
} from '../../api/auth/auth-api-types';
import { handleAsyncServerNetworkError } from '../../common/utils/error-util';
import { syncAppActions } from '../app';
import { syncBooksActions } from '../books';
import { AppDispatch, ThunkApiTypeForAsyncThunk } from '..';

// actions
const toggleIsAuth = createAction<{ isAuth: boolean }>('authActions/toggleIsAuth');
const setAuthInfo = createAction<{ status: number | null; info: string | null }>('authActions/setAuthInfo');
const setSuccessfulRegistration = createAction<{ value: boolean }>('authActions/setSuccessfulRegistration');

// thunks
const auth = createAsyncThunk<
  { isAuth: boolean },
  AuthRequestType,
  { dispatch: AppDispatch; rejectValue: { errorStatus: number | undefined } }
>('auth/auth', async (payload, { dispatch, rejectWithValue }) => {
  dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    const response = await authApi.auth(payload);

    localStorage.setItem('token', `${JSON.stringify(response.data.jwt)}`);

    dispatch(syncBooksActions.setIsFirstLoadingCategories({ isFirstLoadingCategories: true }));

    return { isAuth: true };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue({ errorStatus: e.response?.status });
    }

    return rejectWithValue({ errorStatus: undefined });
  } finally {
    dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

const registration = createAsyncThunk<
  { successfulRegistration: boolean },
  RegistrationRequestType,
  { dispatch: AppDispatch; rejectValue: { errorStatus: number | undefined } }
>('auth/registration', async (payload, { dispatch, rejectWithValue }) => {
  dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    await authApi.registration(payload);

    return { successfulRegistration: true };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue({ errorStatus: e.response?.status });
    }

    return rejectWithValue({ errorStatus: undefined });
  } finally {
    dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

const forgotPassword = createAsyncThunk<
  ForgotPasswordResponseType,
  ForgotPasswordRequestType,
  ThunkApiTypeForAsyncThunk
>('auth/forgotPassword', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    const response = await authApi.forgotPassword(payload);

    return response.data;
  } catch (e) {
    return handleAsyncServerNetworkError(e, thunkApi, false);
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

const resetPassword = createAsyncThunk<AuthRequestType, ResetPasswordRequestType, ThunkApiTypeForAsyncThunk>(
  'auth/resetPassword',
  async (payload, thunkApi) => {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
    try {
      const response = await authApi.resetPassword(payload);

      return response.data;
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, false);
    } finally {
      thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
    }
  }
);

// state
const initialState = {
  isAuth: true,
  authInfo: {
    info: null as string | null,
    status: null as number | null,
  },
  successfulRegistration: false,
};

// slice
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleIsAuth, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(setAuthInfo, (state, action) => {
      state.authInfo.info = action.payload.info;
    });
    builder.addCase(setSuccessfulRegistration, (state, action) => {
      state.successfulRegistration = action.payload.value;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(auth.rejected, (state, action) => {
      if (action.payload?.errorStatus !== 400) {
        state.authInfo.info = 'Что-то пошло не так. Попробуйте ещё раз';
      }
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.successfulRegistration = action.payload.successfulRegistration;
      state.authInfo.info = 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль';
    });
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload?.errorStatus === 400) {
        state.authInfo.info =
          'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.';
        state.authInfo.status = 400;
      } else {
        state.authInfo.info = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз';
      }
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.authInfo.info = 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля';
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {});
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.authInfo.info = 'Зайдите в личный кабинет, используя свои логин и новый пароль';
      state.authInfo.status = 200;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.authInfo.info = 'Что-то пошло не так. Попробуйте ещё раз';
      if (action.payload) {
        state.authInfo.status = action.payload.status;
      }
    });
  },
});

// exports
export const authReducer = slice.reducer;
export const asyncAuthActions = {
  auth,
  registration,
  forgotPassword,
  resetPassword,
};
export const syncAuthActions = {
  toggleIsAuth,
  setAuthInfo,
  setSuccessfulRegistration,
};
