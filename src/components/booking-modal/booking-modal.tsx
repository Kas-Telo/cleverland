import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { useAppSelector } from '../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { checkDateIsEqual } from '../../common/utils/helpers/date';
import { getDateWithTimezone } from '../../common/utils/helpers/date/get-date-with-timezone';
import { asyncBooksActions } from '../../store/books';
import { userSelectors } from '../../store/user';
import { Button } from '../../ui';
import { Modal } from '../modal/modal';
import { MyCalendar } from '../my-calendar/my-calendar';

import style from './booking-modal.module.css';

type Props = {
  dataTestIdModalOuter?: string;
  dataTestIdModal?: string;
  dataTestIdModalTitle?: string;
  dataTestIdModalCloseButton?: string;
  dataTestIdModalSubmit: string;
  bookId: number | null | undefined;
  bookingId: number | null | undefined;
  dateOrder: string | null | undefined;
  onClose: () => void;
};

export const BookingModal = ({
  dataTestIdModalOuter,
  dataTestIdModalSubmit,
  dataTestIdModalCloseButton,
  dataTestIdModalTitle,
  dataTestIdModal,
  bookId,
  bookingId,
  dateOrder,
  onClose,
}: Props) => {
  const size: Size = useWindowSize();
  const { pathname } = useLocation();
  const userId = useAppSelector(userSelectors.selectUserId);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const { addBooking, updateBooking, cancelBooking } = useActions(asyncBooksActions);

  const selectDayCallback = useCallback(
    (date: Date) => {
      setSelectedDay(date);
    },
    [setSelectedDay]
  );

  const onSubmit = useCallback(async () => {
    const data = {
      order: true,
      dateOrder: getDateWithTimezone(selectedDay as Date, 3),
      book: bookId as number,
      customer: userId,
    };

    if (dateOrder) {
      await updateBooking({
        requestPayload: {
          data,
        },
        bookingId: bookingId as number,
      });
    } else {
      await addBooking({
        data,
      });
    }
    onClose();
  }, [addBooking, bookId, bookingId, dateOrder, onClose, selectedDay, updateBooking, userId]);

  const cancelBookingHandler = useCallback(async () => {
    const page = pathname.includes(`${ROUTES.PROFILE}`) ? 'profile' : 'book';

    await cancelBooking({ bookingId: bookingId as number, page });
    setSelectedDay(null);
    onClose();
  }, [bookingId, cancelBooking, onClose, pathname]);

  useEffect(() => {
    if (dateOrder) {
      setSelectedDay(new Date(dateOrder));
    }
  }, [dateOrder]);

  return (
    <div>
      <Modal
        positionContent='center'
        dataTestIdModal={dataTestIdModal}
        dataTestIdModalOuter={dataTestIdModalOuter}
        dataTestIdModalCloseButton={dataTestIdModalCloseButton}
        substrate={true}
        onClose={onClose}
      >
        {size.width > 576 ? (
          <h4 className={style.title} data-test-id={dataTestIdModalTitle}>
            {dateOrder ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
          </h4>
        ) : (
          <h3 className={style.title} data-test-id={dataTestIdModalTitle}>
            {dateOrder ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
          </h3>
        )}
        <MyCalendar selectedDate={selectedDay} selectDate={selectDayCallback} />
        <Button
          dataTestId={dataTestIdModalSubmit}
          submit={true}
          variant='primary'
          size={size.width > 576 ? 'large' : 'small'}
          sizeTypography={size.width > 576 ? 'large' : 'small'}
          variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
          className={style.submitButton}
          onClick={onSubmit}
          disabled={
            (!!selectedDay && !!dateOrder && checkDateIsEqual(selectedDay, new Date(dateOrder))) || !selectedDay
          }
        >
          Забронировать
        </Button>
        {dateOrder && (
          <Button
            dataTestId='booking-cancel-button'
            submit={false}
            variant='secondary'
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            className={style.submitButton}
            onClick={cancelBookingHandler}
          >
            Отменить бронь
          </Button>
        )}
      </Modal>
    </div>
  );
};
