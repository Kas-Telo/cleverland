import { RootStateType } from '..';

export const selectBook = (state: RootStateType) => state.books.book;
export const selectBookCardList = (state: RootStateType) => state.books.bookCardList;
export const selectCategories = (state: RootStateType) => state.books.categories;
export const selectIsFirstLoadingCategories = (state: RootStateType) => state.books.isFirstLoadingCategories;
export const selectCurrentSortValue = (state: RootStateType) => state.books.currentSortValue;

export const booksSelectors = {
  selectBook,
  selectBookCardList,
  selectCategories,
  selectIsFirstLoadingCategories,
  selectCurrentSortValue,
};
