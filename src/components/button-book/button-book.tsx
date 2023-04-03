import { memo, MouseEventHandler } from 'react';

import { useAppSelector } from '../../common/hooks/use-app-selector';
import { getDayDotMonth } from '../../common/utils/date/formatted-date-util';
import { userSelectors } from '../../store/user';
import { Button } from '../../ui';

type Props = {
  className?: string;
  isComment?: boolean;
  order: boolean;
  customerId: number | null | undefined;
  handed: boolean;
  dateHandedTo: string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size: 'small' | 'large';
  sizeTypography: 'small' | 'large';
  variantTypography: 'mobile' | 'desktop';
  dataTestId?: string;
  block?: boolean;
  displayLocation: 'main' | 'history-profile' | 'booking-profile' | 'handed-profile';
};

export const ButtonBook = memo(
  ({
    className,
    order,
    dataTestId,
    customerId,
    handed,
    dateHandedTo,
    onClick,
    sizeTypography,
    variantTypography,
    size,
    block,
    displayLocation,
    isComment,
  }: Props) => {
    const userId = useAppSelector(userSelectors.selectUserId);

    return (
      <div className={className}>
        {displayLocation === 'booking-profile' ? (
          <Button
            className={className}
            dataTestId={dataTestId}
            block={block}
            size={size}
            sizeTypography={sizeTypography}
            variant='primary'
            variantTypography={variantTypography}
            submit={false}
            onClick={onClick}
          >
            Отменить
          </Button>
        ) : displayLocation === 'history-profile' ? (
          <Button
            className={className}
            dataTestId={dataTestId}
            block={block}
            size={size}
            sizeTypography={sizeTypography}
            variant={isComment ? 'secondary' : 'primary'}
            variantTypography={variantTypography}
            submit={false}
            onClick={onClick}
          >
            {isComment ? 'Изменить оценку' : 'Оставить отзыв'}
          </Button>
        ) : (
          <Button
            className={className}
            dataTestId={dataTestId}
            block={block}
            size={size}
            sizeTypography={sizeTypography}
            variant={order || handed ? 'secondary' : 'primary'}
            variantTypography={variantTypography}
            disabled={(!(customerId === userId) && order) || handed}
            submit={false}
            onClick={onClick}
          >
            {order
              ? 'Забронирована'
              : handed
              ? `Занята до ${dateHandedTo ? getDayDotMonth(dateHandedTo) : '01.24'}`
              : 'Забронировать'}
          </Button>
        )}
      </div>
    );
  }
);
