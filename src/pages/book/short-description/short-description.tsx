import { useCallback, useEffect, useState } from 'react';

import { useScrollLock } from '../../../common/hooks/use-scroll-lock';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { BookingModal } from '../../../components/booking-modal/booking-modal';
import { ButtonBook } from '../../../components/button-book';
import { BodyTypography, Subtitle } from '../../../ui/typography';

import style from './shord-discription.module.css';

type Props = {
  title: string;
  authors: string[] | null;
  order: boolean;
  customerId: number | null | undefined;
  handed: boolean;
  dateHandedTo: string | null;
  description: string | null;
  bookingId: number | null | undefined;
  dateOrder: string | null | undefined;
  bookId: number;
};

export const ShortDescription = ({
  bookId,
  title,
  authors,
  dateHandedTo,
  order,
  dateOrder,
  bookingId,
  customerId,
  handed,
  description,
}: Props) => {
  const size: Size = useWindowSize();
  const { unlockScroll, lockScroll } = useScrollLock();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    setIsBookingModalOpen(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  useEffect(() => {
    if (isBookingModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isBookingModalOpen, lockScroll, unlockScroll]);

  return (
    <div className={style.container}>
      {isBookingModalOpen && (
        <BookingModal
          dataTestIdModalOuter='modal-outer'
          dataTestIdModalCloseButton='modal-close-button'
          dataTestIdModal='booking-modal'
          dataTestIdModalTitle='modal-title'
          dataTestIdModalSubmit='booking-button'
          bookId={bookId}
          bookingId={bookingId}
          dateOrder={dateOrder}
          onClose={onCloseModal}
        />
      )}
      {size.width > 992 ? (
        <div>
          <h3 data-test-id='book-title' className={style.title}>
            {title}
          </h3>
          <h5 className={style.author}>{authors?.join(', ')}</h5>
        </div>
      ) : size.width > 576 ? (
        <div>
          <h4 data-test-id='book-title' className={style.title}>
            {title}
          </h4>
          <Subtitle size='small' className={style.author}>
            {authors?.join(', ')}
          </Subtitle>
        </div>
      ) : (
        <div>
          <h3 data-test-id='book-title' className={style.title}>
            {title}
          </h3>
          <BodyTypography size='small' className={style.author}>
            {authors?.join(', ')}
          </BodyTypography>
        </div>
      )}
      <ButtonBook
        displayLocation='main'
        dataTestId='booking-button'
        className={style.button}
        dateHandedTo={dateHandedTo}
        order={order}
        customerId={customerId}
        handed={handed}
        onClick={onOpenModal}
        size={size.width > 576 ? 'large' : 'small'}
        sizeTypography={size.width > 576 ? 'large' : 'small'}
        variantTypography={size.width > 576 ? 'mobile' : 'mobile'}
      />
      {size.width > 992 && (
        <div className={style.descriptionBlock}>
          <h5 className={style.descriptionTitle}>О книге</h5>
          <BodyTypography size='large'>{description ? description : '---'}</BodyTypography>
        </div>
      )}
    </div>
  );
};
