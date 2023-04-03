import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { bookingApi } from '../../api/booking/booking';
import { RequestBookingType } from '../../api/booking/booking-types';
import { booksApi } from '../../api/books/books-api';
import { ResponseBookCardType, ResponseBookType } from '../../api/books/books-api-types';
import { commentsApi } from '../../api/comments/comments-api';
import { RequestCommentType } from '../../api/comments/comments-api-types';
import { handleAsyncServerNetworkError } from '../../common/utils/error-util';
import { syncAppActions } from '../app';
import { asyncUserActions } from '../user';
import { ThunkApiTypeForAsyncThunk } from '..';

import { DomainCategoryType, SortValueType } from './books-slice-types';

// actions
export const updateCategories = createAction<{ categories: DomainCategoryType[] }>('booksActions/updateCategories');
export const zeroingBook = createAction('booksActions/zeroingBook');
export const changeSortValue = createAction<{ sortValue: SortValueType }>('booksActions/changeSortValue');
export const setIsFirstLoadingCategories = createAction<{ isFirstLoadingCategories: boolean }>(
  'booksActions/setIsFirstLoadingCategories'
);

// thunks
export const fetchCategories = createAsyncThunk<DomainCategoryType[], unknown, ThunkApiTypeForAsyncThunk>(
  'books/fetchCategories',
  async (_, thunkApi) => {
    try {
      const response = await booksApi.getCategories();

      return response.data.map((el) => ({ ...el, count: null }));
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

export const fetchBooks = createAsyncThunk<ResponseBookCardType[], unknown, ThunkApiTypeForAsyncThunk>(
  'books/fetchBooks',
  async (_, thunkApi) => {
    try {
      const response = await booksApi.getBooks();

      return response.data;
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

export const fetchBook = createAsyncThunk<ResponseBookType, { id: number }, ThunkApiTypeForAsyncThunk>(
  'books/fetchBook',
  async ({ id }, thunkApi) => {
    try {
      const response = await booksApi.getBook(id);

      return response.data;
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

export const addComment = createAsyncThunk<
  unknown,
  { data: RequestCommentType; page: 'profile' | 'book' },
  ThunkApiTypeForAsyncThunk
>('books/addComment', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    await commentsApi.addComment(payload.data);

    if (payload.page === 'profile') {
      await thunkApi.dispatch(asyncUserActions.getMe({}));
    } else {
      await thunkApi.dispatch(fetchBook({ id: payload.data.data.book }));
    }

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Спасибо, что нашли время оценить книгу!' }));

    return {};
  } catch (e) {
    const errorMessage = 'Оценка не была отправлена. Попробуйте позже!';

    return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

export const updateComment = createAsyncThunk<
  unknown,
  { requestData: RequestCommentType; commentId: number; page: 'profile' | 'book' },
  ThunkApiTypeForAsyncThunk
>('books/updateComment', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    await commentsApi.updateComment(payload.requestData, payload.commentId);

    if (payload.page === 'profile') {
      await thunkApi.dispatch(asyncUserActions.getMe({}));
    } else {
      await thunkApi.dispatch(fetchBook({ id: payload.requestData.data.book }));
    }

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Спасибо, что нашли время изменить оценку!' }));

    return {};
  } catch (e) {
    const errorMessage = 'Изменения не были сохранены. Попробуйте позже!';

    return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

export const addBooking = createAsyncThunk<unknown, RequestBookingType, ThunkApiTypeForAsyncThunk>(
  'books/addBooking',
  async (payload, thunkApi) => {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
    try {
      await bookingApi.booking(payload);

      if (thunkApi.getState().books.book.id) {
        await thunkApi.dispatch(fetchBook({ id: payload.data.book }));
      } else {
        await thunkApi.dispatch(fetchBooks({}));
      }

      thunkApi.dispatch(
        syncAppActions.setAppInfo({ message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' })
      );

      return {};
    } catch (e) {
      const errorMessage = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!';

      return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
    } finally {
      thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
    }
  }
);

export const updateBooking = createAsyncThunk<
  unknown,
  { requestPayload: RequestBookingType; bookingId: number },
  ThunkApiTypeForAsyncThunk
>('books/updateBooking', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));

  try {
    await bookingApi.bookingUpdate(payload.requestPayload, payload.bookingId);

    if (thunkApi.getState().books.book.id) {
      await thunkApi.dispatch(fetchBook({ id: payload.requestPayload.data.book }));
    } else {
      await thunkApi.dispatch(fetchBooks({}));
    }

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Изменения успешно сохранены!' }));

    return {};
  } catch (e) {
    const errorMessage = 'Изменения не были сохранены. Попробуйте позже!';

    return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

export const cancelBooking = createAsyncThunk<
  { bookingId: number },
  { bookingId: number; page: 'profile' | 'book' },
  ThunkApiTypeForAsyncThunk
>('books/cancelBooking', async (payload, thunkApi) => {
  thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: true }));
  try {
    await bookingApi.bookingDelete(payload.bookingId);

    if (payload.page === 'profile') {
      await thunkApi.dispatch(asyncUserActions.getMe({}));
    } else if (thunkApi.getState().books.book.id) {
      await thunkApi.dispatch(fetchBook({ id: thunkApi.getState().books.book.id }));
    } else {
      await thunkApi.dispatch(fetchBooks({}));
    }

    thunkApi.dispatch(syncAppActions.setAppInfo({ message: 'Бронирование книги успешно отменено!' }));

    return {};
  } catch (e) {
    const errorMessage = 'Не удалось снять бронирование книги. Попробуйте позже!';

    return handleAsyncServerNetworkError(e, thunkApi, true, errorMessage);
  } finally {
    thunkApi.dispatch(syncAppActions.toggleLoading({ isLoading: false }));
  }
});

// state
export const initialState = {
  bookCardList: [] as ResponseBookCardType[],
  categories: [] as DomainCategoryType[],
  book: {} as ResponseBookType | Record<string, never>,
  isFirstLoadingCategories: true,
  currentSortValue: 'descending' as SortValueType,
};

// slice
const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.bookCardList = action.payload;
    });
    builder.addCase(updateCategories, (state, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(setIsFirstLoadingCategories, (state, action) => {
      state.isFirstLoadingCategories = action.payload.isFirstLoadingCategories;
    });
    builder.addCase(changeSortValue, (state, action) => {
      state.currentSortValue = action.payload.sortValue;
    });
    builder.addCase(zeroingBook, (state) => {
      state.book = {};
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.book = action.payload;
    });
  },
});

// exports
export const booksReducer = slice.reducer;
export const asyncBooksActions = {
  fetchCategories,
  fetchBooks,
  fetchBook,
  addComment,
  addBooking,
  updateBooking,
  cancelBooking,
  updateComment,
};
export const syncBooksActions = {
  changeSortValue,
  setIsFirstLoadingCategories,
  updateCategories,
  zeroingBook,
};
