import { AxiosResponse } from 'axios';

import { instance } from '../api-instance';

import { CategoryType, ResponseBookCardType, ResponseBookType } from './books-api-types';

export const booksApi = {
  getBooks: () => instance.get<Record<string, never>, AxiosResponse<ResponseBookCardType[]>>('/books'),
  getBook: (id: number) => instance.get<Record<string, never>, AxiosResponse<ResponseBookType>>(`/books/${id}`),
  getCategories: () => instance.get<Record<string, never>, AxiosResponse<CategoryType[]>>('/categories'),
};
