import thunk from 'redux-thunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './app/app-slice';
import { authReducer } from './auth/auth';
import { booksReducer } from './books/books-slice';
import { userReducer } from './user/user';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  books: booksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkApiTypeForAsyncThunk = {
  state: RootStateType;
  dispatch: AppDispatch;
  rejectValue: { status: number | null; error: string };
};
