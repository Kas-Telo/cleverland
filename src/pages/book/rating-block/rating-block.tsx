import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { Rating } from '../../../ui/rating/rating';
import { BodyTypography, Subtitle } from '../../../ui/typography';

import style from './rating-block.module.css';

type Props = {
  rating: number | null;
};

export const RatingBlock = ({ rating }: Props) => {
  const size: Size = useWindowSize();

  return (
    <div className={style.container}>
      {size.width > 992 ? (
        <h5>Рейтинг</h5>
      ) : size.width > 576 ? (
        <Subtitle size='large'>Рейтинг</Subtitle>
      ) : (
        <h3>Рейтинг</h3>
      )}
      <div className={style.hr} />
      <div className={style.ratingBlock}>
        <Rating widthOneStar={size.width > 576 ? 24 : 34} heightOneStar={size.width > 576 ? 24 : 34} rating={rating} />
        {!rating && (
          <BodyTypography className={style.bodyTypography} size='small'>
            ещё нет оценок
          </BodyTypography>
        )}
        {rating && size.width > 576 && <h5>{rating}</h5>}
      </div>
    </div>
  );
};
