import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from '../../api/user/user';
import { UserCredentialRequestType, UserType } from '../../api/user/user-types';
import { handleAsyncServerNetworkError } from '../../common/utils/error-util';
import { syncAppActions } from '../app';
import { ThunkApiTypeForAsyncThunk } from '..';

// thunks
const getMe = createAsyncThunk<{ user: UserType }, unknown, ThunkApiTypeForAsyncThunk>(
  'user/getMe',
  async (_, thunkApi) => {
    try {
      const response = await userApi.me();

      return { user: response.data };
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

const updateCredential = createAsyncThunk<
  { user: UserType },
  { data: UserCredentialRequestType; userId: number },
  ThunkApiTypeForAsyncThunk
>('user/updateCredential', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    const response = await userApi.updateCredential(payload.data, payload.userId);

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Изменения успешно сохранены!' }));

    return { user: response.data };
  } catch (e) {
    return handleAsyncServerNetworkError(e, thunkApi, true, 'Изменения не были сохранены. Попробуйте позже!');
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

const updateAvatar = createAsyncThunk<
  { user: UserType },
  { data: UserCredentialRequestType; userId: number },
  ThunkApiTypeForAsyncThunk
>('user/updateAvatar', async (payload, thunkApi) => {
  try {
    const response = await userApi.updateCredential(payload.data, payload.userId);

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Фото успешно сохранено!' }));

    return { user: response.data };
  } catch (e) {
    const errorMessage = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!';

    return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
  }
});

const uploadImage = createAsyncThunk<unknown, { formData: FormData }, ThunkApiTypeForAsyncThunk>(
  'user/uploadImage',
  async (payload, thunkApi) => {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
    try {
      const response = await userApi.imageUpload(payload.formData);

      const userId = thunkApi.getState().user.user.id;

      await thunkApi.dispatch(updateAvatar({ data: { avatar: response.data[0].id }, userId }));

      thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Фото успешно сохранено!' }));

      return {};
    } catch (e) {
      const errorMessage = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!';

      return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
    } finally {
      thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
    }
  }
);

// state
const initialState = {
  user: {} as UserType,
};

// slice
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(updateCredential.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

// exports
export const userReducer = slice.reducer;
export const asyncUserActions = {
  getMe,
  updateCredential,
  uploadImage,
};
