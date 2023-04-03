import { DetailedHTMLProps, HTMLAttributes, memo, MouseEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ResponseBookCardType } from '../../api/books/books-api-types';
import coverUndefined from '../../assets/images/cover-undefined.png';
import { BASE_URL_FOR_IMAGE, COLORS } from '../../common/enums-and-constants/constants';
import { useAppSelector } from '../../common/hooks/use-app-selector';
import { useHighlight } from '../../common/hooks/use-highlight';
import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { getDayDotMonth } from '../../common/utils/date/formatted-date-util';
import { userSelectors } from '../../store/user';
import { Rating } from '../../ui/rating/rating';
import { BodyTypography, ButtonTypography, Subtitle } from '../../ui/typography';
import { ButtonBook } from '../button-book';

import style from './book-card.module.css';

type DefaultDivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = DefaultDivPropsType & {
  bookCard: ResponseBookCardType;
  displayOption: 'tile' | 'list';
  displayLocation: 'main' | 'booking-profile' | 'handed-profile' | 'history-profile';
  path: string;
  filterForHighlightText?: string;
  onOpenModal?: (params?: { dateOrder: string | null; bookingId: number | null; bookId: number }) => void;
  onOpenFeedbackModal?: (bookId: number) => void;
  onButtonClick?: () => void;
  dataTestIdButton?: string;
  isComment?: boolean;
};

export const BookCard = memo(
  ({
    bookCard,
    onOpenModal,
    onOpenFeedbackModal,
    displayOption,
    isComment,
    path,
    filterForHighlightText,
    displayLocation,
    onButtonClick,
    className,
    dataTestIdButton,
  }: Props) => {
    const userId = useAppSelector(userSelectors.selectUserId);
    const size: Size = useWindowSize();

    const containerClass = `${displayOption === 'tile' ? style.containerTile : style.containerList} ${className}`;
    const coverClass = `${displayOption === 'tile' ? style.coverTile : style.coverList}`;
    const buttonClass = `${displayOption === 'tile' ? style.buttonTile : style.buttonList}`;
    const titleClass = `${displayOption === 'tile' ? style.titleTile : style.titleList}`;
    const authorClass = `${displayOption === 'tile' ? style.authorTile : style.authorList}`;

    const authorType = displayOption === 'tile' || size.width <= 638 ? 'small' : 'large';

    const highlightText = useHighlight(filterForHighlightText || '', COLORS.TEXT_SELECT);

    const titleElement =
      size.width > 638 && displayOption !== 'tile' ? (
        <h4 className={titleClass}>{filterForHighlightText ? highlightText(bookCard.title) : bookCard.title}</h4>
      ) : (
        <Subtitle className={titleClass} size='small'>
          {filterForHighlightText ? highlightText(bookCard.title) : bookCard.title}
        </Subtitle>
      );

    const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        e.preventDefault();
        if (displayLocation === 'booking-profile') {
          if (onButtonClick) onButtonClick();
        } else if (displayLocation === 'history-profile') {
          if (onOpenFeedbackModal) onOpenFeedbackModal(bookCard.id);
        } else {
          const dateOrder = bookCard.booking?.customerId === userId ? bookCard.booking.dateOrder : null;
          let bookingId = null;

          if (bookCard.booking) {
            bookingId = bookCard.booking.id;
          }
          if (onOpenModal) {
            onOpenModal({ dateOrder, bookingId, bookId: bookCard.id });
          }
        }
      },
      [bookCard.booking, bookCard.id, displayLocation, onButtonClick, onOpenFeedbackModal, onOpenModal, userId]
    );

    return (
      <Link to={path} className={containerClass} data-test-id='card'>
        <img
          className={coverClass}
          src={bookCard.image?.url ? `${BASE_URL_FOR_IMAGE}${bookCard.image.url}` : coverUndefined}
          alt='cover'
          loading='lazy'
        />
        <div className={style.descriptionContainer}>
          <div className={style.description}>
            {displayOption === 'tile' &&
              (bookCard.rating ? <Rating className={style.rating} rating={bookCard.rating} /> : <p>ещё нет оценок</p>)}
            {titleElement}
            <BodyTypography className={authorClass} size={authorType}>
              {bookCard.authors?.join(', ')}
            </BodyTypography>
          </div>
          {displayOption === 'tile' ? (
            <ButtonBook
              dataTestId={dataTestIdButton}
              className={buttonClass}
              block={true}
              isComment={displayLocation === 'history-profile' && isComment}
              displayLocation={displayLocation}
              order={bookCard.booking ? bookCard.booking.order : false}
              handed={bookCard.delivery ? bookCard.delivery.handed : false}
              dateHandedTo={bookCard.delivery ? bookCard.delivery.dateHandedTo : null}
              customerId={bookCard.booking?.customerId}
              size='small'
              sizeTypography='small'
              variantTypography='mobile'
              onClick={buttonClickHandler}
            />
          ) : (
            <div className={style.ratingWithButtonContainer}>
              <div>
                {bookCard.rating ? (
                  <Rating
                    heightOneStar={size.width < 450 ? 16 : 24}
                    widthOneStar={size.width < 450 ? 16 : 24}
                    rating={bookCard.rating}
                  />
                ) : (
                  <p>ещё нет оценок</p>
                )}
              </div>
              {displayLocation === 'handed-profile' ? (
                size.width > 768 ? (
                  <h4 className={style.textHandedTo}>{`Возврат ${
                    bookCard.delivery?.dateHandedTo && getDayDotMonth(bookCard.delivery?.dateHandedTo)
                  }`}</h4>
                ) : (
                  <ButtonTypography className={style.textHandedTo} size='large' variant='mobile'>
                    {`Возврат ${bookCard.delivery?.dateHandedTo && getDayDotMonth(bookCard.delivery?.dateHandedTo)}`}
                  </ButtonTypography>
                )
              ) : (
                <ButtonBook
                  dataTestId={dataTestIdButton}
                  className={buttonClass}
                  block={true}
                  displayLocation={displayLocation}
                  order={bookCard.booking ? bookCard.booking.order : false}
                  customerId={bookCard.booking?.customerId}
                  handed={bookCard.delivery ? bookCard.delivery.handed : false}
                  dateHandedTo={bookCard.delivery ? bookCard.delivery.dateHandedTo : null}
                  size='small'
                  sizeTypography='small'
                  variantTypography='mobile'
                  onClick={buttonClickHandler}
                />
              )}
            </div>
          )}
        </div>
      </Link>
    );
  }
);
