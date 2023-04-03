import axios, { AxiosError } from 'axios';

import { ResponseErrorType } from '../../api/api-types';
import { AppDispatch, RootStateType } from '../../store';
import { syncAppActions } from '../../store/app';
import { syncAuthActions } from '../../store/auth';

export type ThunkApiType = {
  dispatch: AppDispatch;
  rejectWithValue: (arg: { status: number | null; error: string }) => any;
  getState: () => RootStateType;
};

export const handleAsyncServerNetworkError = (
  e: unknown,
  thunkAPI: ThunkApiType,
  showError = true,
  errorMessage?: string
) => {
  const err = e as Error | AxiosError<ResponseErrorType, any>;

  const resultError = errorMessage
    ? { status: null, error: errorMessage }
    : axios.isAxiosError(err)
    ? err.response?.data
      ? { status: err.response.data.error.status, error: err.response.data.error.message }
      : { status: null, error: 'Что-то пошло не так. Обновите страницу через некоторое время.' }
    : { status: null, error: err.message ? err.message : 'Some error occurred' };

  if (axios.isAxiosError(err) && err.response?.status === (401 || 403)) {
    thunkAPI.dispatch(syncAuthActions.toggleIsAuth({ isAuth: false }));
  } else if (showError) {
    thunkAPI.dispatch(syncAppActions.setAppError(resultError));
  }
  thunkAPI.dispatch(syncAppActions.toggleLoading({ isLoading: false }));

  return thunkAPI.rejectWithValue(resultError);
};
