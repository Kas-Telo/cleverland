import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ResponseBookCardType } from '../../../../api/books/books-api-types';
import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../../common/hooks/use-actions';
import { useAppSelector } from '../../../../common/hooks/use-app-selector';
import { useScrollLock } from '../../../../common/hooks/use-scroll-lock';
import { BookCard } from '../../../../components/book-card';
import { BookingModal } from '../../../../components/booking-modal/booking-modal';
import { appSelectors, syncAppActions } from '../../../../store/app';
import { authSelectors } from '../../../../store/auth/selectors';
import { asyncBooksActions, booksSelectors, syncBooksActions } from '../../../../store/books';
import { DomainCategoryType, SortValueType } from '../../../../store/books/books-slice-types';
import { asyncUserActions, userSelectors } from '../../../../store/user';

import { FilterPanel } from './filter-panel/filter-panel';

import style from './main-page.module.css';

const filteredBooksByCategories = (
  books: ResponseBookCardType[],
  category: DomainCategoryType
): ResponseBookCardType[] => books.filter((el) => el.categories?.includes(category.name));

const sortedBooksByRating = (books: ResponseBookCardType[], sortValue: SortValueType): ResponseBookCardType[] => {
  const copyBooks = [...books];

  return copyBooks.sort((a, b) => {
    const aRating: number | null = a.rating === null ? 0 : a.rating;
    const bRating: number | null = b.rating === null ? 0 : b.rating;

    return sortValue === 'ascending' ? aRating - bRating : bRating - aRating;
  });
};

const filteredBooksByTitle = (books: ResponseBookCardType[], title: string): ResponseBookCardType[] =>
  books.filter((el) => el.title.toLowerCase().includes(title.toLowerCase()));

const categoriesWithBooksCounts = (
  books: ResponseBookCardType[],
  categories: DomainCategoryType[]
): DomainCategoryType[] => {
  let copyCategories = [...categories];

  books.forEach((book) => {
    copyCategories = copyCategories.map((category) =>
      book.categories?.includes(category.name)
        ? {
            ...category,
            count: category.count ? category.count + 1 : 1,
          }
        : category.count
        ? category
        : { ...category, count: 0 }
    );
  });

  return copyCategories;
};

export const MainPage = () => {
  const [books, setBooks] = useState<ResponseBookCardType[]>([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [viewType, setViewType] = useState<'tile' | 'list'>('tile');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [dateOrder, setDateOrder] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [bookingBookId, setBookingBookId] = useState<number | null>();

  const { pathname } = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();

  const booksState = useAppSelector(booksSelectors.selectBookCardList);
  const categories = useAppSelector(booksSelectors.selectCategories);
  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const isFirstLoadingCategories = useAppSelector(booksSelectors.selectIsFirstLoadingCategories);
  const error = useAppSelector(appSelectors.selectAppError);
  const currentSortValue = useAppSelector(booksSelectors.selectCurrentSortValue);
  const userId = useAppSelector(userSelectors.selectUserId);

  const { fetchCategories, fetchBooks } = useActions(asyncBooksActions);
  const { toggleLoading } = useActions(syncAppActions);
  const { getMe } = useActions(asyncUserActions);
  const { setIsFirstLoadingCategories, updateCategories } = useActions(syncBooksActions);
  const { lockScroll, unlockScroll } = useScrollLock();

  const currentCategory = useMemo(() => categories.find((el) => el.path === category), [category, categories]);
  const shouldFetch = useRef(true);

  const onCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  const onOpenBookingModal = useCallback(
    (params?: { dateOrder: string | null; bookingId: number | null; bookId: number }) => {
      if (params) {
        setBookingBookId(params.bookId);
        setBookingId(params.bookingId);
        setDateOrder(params.dateOrder);
      }
      setIsBookingModalOpen(true);
    },
    []
  );

  const fetchCategoriesAndBooks = useCallback(async () => {
    toggleLoading({ isLoading: true });
    lockScroll();

    if (userId) {
      await fetchBooks({});
    } else {
      await Promise.all([getMe({}), fetchBooks({}), fetchCategories({})]);
    }
    toggleLoading({ isLoading: false });
    unlockScroll();
  }, [fetchBooks, fetchCategories, getMe, lockScroll, toggleLoading, unlockScroll, userId]);

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.AUTH);
    } else if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchCategoriesAndBooks();
    }
  }, [fetchCategoriesAndBooks, isAuth, navigate]);

  useEffect(() => {
    if (isFirstLoadingCategories && categories.length > 0 && booksState.length > 0) {
      updateCategories({ categories: categoriesWithBooksCounts(booksState, categories) });
      setIsFirstLoadingCategories({ isFirstLoadingCategories: false });
    }
  }, [booksState, categories, isFirstLoadingCategories, setIsFirstLoadingCategories, updateCategories]);

  useEffect(() => {
    let booksTemp = booksState;

    if (currentCategory) {
      booksTemp = filteredBooksByCategories(booksTemp, currentCategory);
    }
    booksTemp = sortedBooksByRating(booksTemp, currentSortValue);
    booksTemp = filteredBooksByTitle(booksTemp, searchValue);

    setBooks(booksTemp);
  }, [booksState, categories.length, currentCategory, currentSortValue, searchValue]);

  useEffect(() => {
    if (isBookingModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isBookingModalOpen, lockScroll, unlockScroll]);

  return (
    <section data-test-id='main-page' className={style.contentContainer}>
      {isBookingModalOpen && (
        <BookingModal
          dataTestIdModalOuter='modal-outer'
          dataTestIdModalCloseButton='modal-close-button'
          dataTestIdModal='booking-modal'
          dataTestIdModalTitle='modal-title'
          dataTestIdModalSubmit='booking-button'
          bookId={bookingBookId}
          dateOrder={dateOrder}
          bookingId={bookingId}
          onClose={onCloseBookingModal}
        />
      )}
      {!error.error && (
        <FilterPanel
          onChangeViewType={setViewType}
          viewType={viewType}
          onOpenInput={() => setDisplayInput(true)}
          onCloseInput={() => setDisplayInput(false)}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          displayInput={displayInput}
        />
      )}
      <div data-test-id='content' className={style.booksContainer}>
        {currentCategory?.count === 0 ? (
          <div className={style.emptyDataTextContainer}>
            <h3 className={style.emptyDataText} data-test-id='empty-category'>
              В этой категории книг ещё нет
            </h3>
          </div>
        ) : books.length === 0 && searchValue ? (
          <div className={style.emptyDataTextContainer}>
            <h3 className={style.emptyDataText} data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </h3>
          </div>
        ) : (
          books.map((el) => (
            <BookCard
              dataTestIdButton='booking-button'
              displayLocation='main'
              key={el.id}
              filterForHighlightText={searchValue}
              path={`${pathname}/${el.id}`}
              bookCard={el}
              displayOption={viewType}
              onOpenModal={onOpenBookingModal}
            />
          ))
        )}
      </div>
    </section>
  );
};
