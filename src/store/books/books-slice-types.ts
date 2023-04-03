import { CategoryType } from '../../api/books/books-api-types';

export type DomainCategoryType = CategoryType & {
  count: number | null;
};
export type SortValueType = 'ascending' | 'descending';
