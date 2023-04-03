import { UserComment } from '../../../api/user/user-types';

export const getComment = (bookId: number, comments: UserComment[] | null) =>
  comments?.find((el) => el.bookId === bookId);
