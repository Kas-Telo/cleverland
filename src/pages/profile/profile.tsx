import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { useAppSelector } from '../../common/hooks/use-app-selector';
import { syncAppActions } from '../../store/app';
import { authSelectors } from '../../store/auth/selectors';
import { asyncBooksActions, booksSelectors } from '../../store/books';
import { asyncUserActions } from '../../store/user';

import { BookedBookBlock } from './booked-book-block/booked-book-block';
import { CredentialBlock } from './credential-block/credential-block';
import { HandedBookBlock } from './handed-book-block/handed-book-block';
import { HistoryBooksReadBlock } from './history-books-read-block/history-books-read-block';
import { UserBlock } from './user-block/user-block';

import style from './profile.module.css';

export const Profile = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const categories = useAppSelector(booksSelectors.selectCategories);
  const books = useAppSelector(booksSelectors.selectBookCardList);
  const { fetchBooks, fetchCategories } = useActions(asyncBooksActions);
  const { getMe } = useActions(asyncUserActions);
  const { toggleLoading } = useActions(syncAppActions);

  if (!isAuth) {
    navigate(ROUTES.AUTH);
  }

  toggleLoading({ isLoading: true });

  const shouldFetch = useRef(true);

  const firstLoadingRequest = useCallback(async () => {
    toggleLoading({ isLoading: true });

    if (books.length === 0) await fetchBooks({});
    if (categories.length === 0) await fetchCategories({});
    await getMe({});

    toggleLoading({ isLoading: false });
  }, [books.length, categories.length, fetchBooks, fetchCategories, getMe, toggleLoading]);

  useEffect(() => {
    if (shouldFetch.current) {
      firstLoadingRequest();
      shouldFetch.current = false;
    }
  }, [firstLoadingRequest]);

  return (
    <section className={style.profileContainer}>
      <UserBlock />
      <CredentialBlock />
      <BookedBookBlock />
      <HandedBookBlock />
      <HistoryBooksReadBlock />
    </section>
  );
};
