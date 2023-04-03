import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ResponseBookCardType } from '../../../../api/books/books-api-types';
import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { useAppSelector } from '../../../../common/hooks/use-app-selector';
import { getComment } from '../../../../common/utils/helpers/get-comment';
import { BookCard } from '../../../../components/book-card';
import { userSelectors } from '../../../../store/user';

import style from './history-books-slider.module.css';

type Props = {
  onOpenFeedbackModal: (bookId: number) => void;
};

export const HistoryBooksSlider = ({ onOpenFeedbackModal }: Props) => {
  const user = useAppSelector(userSelectors.selectUser);

  const books = user.history?.books?.map((book) => {
    const bookCard: ResponseBookCardType = {
      id: book.id,
      title: book.title,
      rating: book.rating,
      authors: book.authors,
      issueYear: book.issueYear,
      image: book.image,
      histories: null,
      booking: null,
      categories: null,
      delivery: null,
    };

    const comment = getComment(bookCard.id, user.comments);

    return (
      <SwiperSlide data-test-id='history-slide' className={style.slider} key={book.id}>
        <BookCard
          isComment={!!comment}
          dataTestIdButton='history-review-button'
          className={style.bookCard}
          bookCard={bookCard}
          displayOption='tile'
          displayLocation='history-profile'
          path={`${ROUTES.BOOKS}/all/${book.id}`}
          onOpenFeedbackModal={onOpenFeedbackModal}
        />
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={true}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        770: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      modules={[Pagination]}
      className={style.swiper}
    >
      {books}
    </Swiper>
  );
};
