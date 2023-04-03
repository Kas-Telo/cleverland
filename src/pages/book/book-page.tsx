import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ResponseCommentBookType } from '../../api/books/books-api-types';
import { UserComment } from '../../api/user/user-types';
import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { useAppSelector } from '../../common/hooks/use-app-selector';
import { useScrollLock } from '../../common/hooks/use-scroll-lock';
import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { FeedbackModal } from '../../components/feedback-modal/feedback-modal';
import { Slider } from '../../components/slider/slider';
import { appSelectors, syncAppActions } from '../../store/app';
import { authSelectors } from '../../store/auth/selectors';
import { asyncBooksActions, booksSelectors, syncBooksActions } from '../../store/books';
import { asyncUserActions, userSelectors } from '../../store/user';
import { Breadcrumbs, Crumb } from '../../ui/breadcrumbs';
import { Loader } from '../../ui/loader/loader';
import { BodyTypography } from '../../ui/typography';

import { Feedback } from './feedback/feedback';
import { InformationBlock } from './information-block/information-block';
import { RatingBlock } from './rating-block/rating-block';
import { ShortDescription } from './short-description/short-description';

import style from './book-page.module.css';

export const BookPage = () => {
  const [isModalFeedbackActive, setIsModalFeedbackActive] = useState(false);
  const [myComment, setMyComment] = useState<UserComment | undefined>(undefined);

  const { pathname } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const size: Size = useWindowSize();
  const { unlockScroll, lockScroll } = useScrollLock();

  const book = useAppSelector(booksSelectors.selectBook);
  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const isLoading = useAppSelector(appSelectors.selectIsLoading);
  const error = useAppSelector(appSelectors.selectAppError);
  const categories = useAppSelector(booksSelectors.selectCategories);
  const userId = useAppSelector(userSelectors.selectUserId);

  const { fetchCategories, fetchBook } = useActions(asyncBooksActions);
  const { zeroingBook } = useActions(syncBooksActions);
  const { toggleLoading } = useActions(syncAppActions);
  const { getMe } = useActions(asyncUserActions);

  if (!isAuth) {
    navigate(ROUTES.AUTH);
  }

  const onOpenModal = useCallback(
    (comment: ResponseCommentBookType | undefined) => {
      const newComment: UserComment | undefined = comment
        ? {
            id: comment.id,
            bookId: book.id,
            rating: comment?.rating ? comment.rating : 5,
            text: comment?.text ? comment.text : '',
          }
        : undefined;

      setMyComment(newComment);
      setIsModalFeedbackActive(true);
    },
    [book.id]
  );
  const onCloseModal = useCallback(() => {
    setIsModalFeedbackActive(false);
  }, []);

  const currentCategory = useMemo(
    () => categories.find((el) => el.path === params.category),
    [categories, params.category]
  );

  const shouldFetch = useRef(true);
  const bookIdParam = useRef<number>(-1);

  const fetchCategoriesAndBook = useCallback(async () => {
    toggleLoading({ isLoading: true });
    if (!userId && params.bookId) {
      await Promise.all([getMe({}), fetchCategories({}), fetchBook({ id: +params.bookId })]);
    } else if (params.bookId) {
      await fetchBook({ id: +params.bookId });
    }
    toggleLoading({ isLoading: false });
  }, [fetchBook, fetchCategories, getMe, params.bookId, toggleLoading, userId]);

  useEffect(() => {
    if (params.bookId) {
      if (bookIdParam.current !== +params.bookId) {
        bookIdParam.current = +params.bookId;
        shouldFetch.current = true;
      }
    }
  }, [params.bookId]);

  useEffect(() => {
    if (isModalFeedbackActive) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isModalFeedbackActive, lockScroll, unlockScroll]);

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchCategoriesAndBook();
    }

    return () => {
      if (!shouldFetch.current) {
        zeroingBook();
      }
    };
  }, [fetchCategoriesAndBook, zeroingBook]);

  return (
    <section className={style.container}>
      <Breadcrumbs>
        <Crumb
          dataTestIdLink='breadcrumbs-link'
          path={`${ROUTES.BOOKS}/${currentCategory ? currentCategory.path : 'all'}`}
        >
          {currentCategory ? currentCategory.name : 'Все книги'}
        </Crumb>
        <Crumb dataTestIdName='book-name' path={pathname}>
          {book.title}
        </Crumb>
      </Breadcrumbs>
      {isLoading ? (
        <Loader />
      ) : (
        !error.error && (
          <div>
            <div className={style.frame}>
              <div className={style.sliderContainer}>
                <Slider images={book.images} />
              </div>
              <ShortDescription
                title={book.title}
                authors={book.authors}
                dateHandedTo={book.delivery ? book.delivery.dateHandedTo : null}
                order={book.booking ? book.booking.order : false}
                customerId={book.booking?.customerId}
                handed={book.delivery ? book.delivery.handed : false}
                description={book.description}
                bookingId={book.booking?.id}
                dateOrder={book.booking?.dateOrder}
                bookId={book.id}
              />
            </div>
            <div>
              <div className={style.contentBlock}>
                {size.width <= 992 && (
                  <div className={style.descriptionBlock}>
                    <h5 className={style.descriptionTitle}>О книге</h5>
                    <BodyTypography size='large'>{book.description ? book.description : '---'}</BodyTypography>
                  </div>
                )}
                <div className={style.informationContainer}>
                  <div className={style.ratingAndInformationBlock}>
                    <RatingBlock rating={book.rating} />
                    <InformationBlock
                      cover={book.cover}
                      weight={book.weight}
                      categories={book.categories}
                      ISBN={book.ISBN}
                      issueYear={book.issueYear}
                      format={book.format}
                      pages={book.pages}
                      producer={book.producer}
                      publish={book.publish}
                    />
                  </div>
                  <Feedback comments={book.comments} onOpenModal={onOpenModal} />
                </div>
              </div>
              {isModalFeedbackActive && (
                <FeedbackModal
                  dataTestIdModalOuter='modal-outer'
                  dataTestIdModal='modal-rate-book'
                  dataTestIdModalTitle='modal-title'
                  dataTestIdModalCloseButton='modal-close-button'
                  dataTestIdModalField='comment'
                  dataTestIdModalSubmit='button-comment'
                  onClose={onCloseModal}
                  bookId={book.id}
                  userId={userId}
                  comment={myComment}
                />
              )}
            </div>
          </div>
        )
      )}
    </section>
  );
};
