import { ResponseBookCardType } from '../../../api/books/books-api-types';
import { ROUTES } from '../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../common/hooks/use-actions';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { checkOfTheDay } from '../../../common/utils/date';
import { getDateWithTimezone } from '../../../common/utils/date/get-date-with-timezone';
import { BookCard } from '../../../components/book-card';
import { asyncBooksActions } from '../../../store/books';
import { userSelectors } from '../../../store/user';
import { BodyTypography, Subtitle } from '../../../ui/typography';
import { EmptyContentBlock } from '../empty-content-block/empty-content-block';
import { RedMaskContentBlock } from '../red-mask-conent-block/red-mask-content-block';

import styleBlock from '../inner-block.module.css';

export const BookedBookBlock = () => {
  const size: Size = useWindowSize();
  const user = useAppSelector(userSelectors.selectUser);
  const bookingDate = user.booking?.dateOrder && new Date(user.booking?.dateOrder);
  const actualStringBookingDate = bookingDate && getDateWithTimezone(bookingDate, -3);
  const isToday = actualStringBookingDate && checkOfTheDay(new Date(actualStringBookingDate));

  const book: ResponseBookCardType = user.booking?.book
    ? {
        id: user.booking.book.id,
        title: user.booking.book.title,
        rating: user.booking?.book.rating,
        authors: user.booking?.book.authors,
        issueYear: user.booking?.book.issueYear,
        image: user.booking?.book.image,
        booking: {
          id: user.booking?.id,
          order: user.booking?.order,
          dateOrder: user.booking?.dateOrder,
          customerFirstName: user.firstName,
          customerId: user.id,
          customerLastName: user.lastName,
        },
        delivery: null,
        categories: null,
        histories: null,
      }
    : ({} as ResponseBookCardType);

  const { cancelBooking } = useActions(asyncBooksActions);

  const onCancelBooking = async () => {
    if (book.booking) {
      await cancelBooking({ bookingId: book.booking?.id, page: 'profile' });
    }
  };

  return (
    <div className={styleBlock.container}>
      <header className={styleBlock.headerBlock}>
        {size.width > 576 ? (
          <h4 className={styleBlock.headerTitle}>Забронированная книга</h4>
        ) : (
          <h3 className={styleBlock.headerTitle}>Забронированная книга</h3>
        )}
        <BodyTypography className={styleBlock.headerDescription} size='large'>
          Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
        </BodyTypography>
      </header>
      <div className={styleBlock.cardContainer}>
        {user.booking?.book ? (
          <BookCard
            dataTestIdButton='cancel-booking-button'
            bookCard={book}
            displayOption='list'
            displayLocation='booking-profile'
            path={`${ROUTES.BOOKS}/all/${user.booking.book.id}`}
            onButtonClick={onCancelBooking}
          />
        ) : (
          <EmptyContentBlock>Забронируйте книгу и она отобразится</EmptyContentBlock>
        )}
        {user.booking?.dateOrder && new Date(user.booking?.dateOrder).valueOf() < new Date().valueOf() && !isToday && (
          <RedMaskContentBlock>
            <h3>Дата бронирования книги истекла</h3>
            <Subtitle className={styleBlock.redMaskText} size='large'>
              Через 24 часа книга будет доступна всем
            </Subtitle>
          </RedMaskContentBlock>
        )}
      </div>
    </div>
  );
};
