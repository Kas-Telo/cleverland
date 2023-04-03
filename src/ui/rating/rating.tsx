import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';

import { Icon } from '../icon/icon';

import style from './rating.module.css';

type DefaultDivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5;

type Props = DefaultDivPropsType & {
  widthOneStar?: number;
  heightOneStar?: number;
  gap?: number;
  rating: number | null;
  setRate?: (rate: RatingType) => void;
};

export const Rating = memo(({ rating, setRate, className, widthOneStar = 24, heightOneStar = 24, gap = 6 }: Props) => (
  <div data-test-id='rating' className={`${style.container} ${className}`} style={{ columnGap: `${gap}px` }}>
    {rating && rating >= 1 ? (
      <div data-test-id='star'>
        <Icon
          dataTestId='star-active'
          width={widthOneStar}
          height={heightOneStar}
          title='default-star'
          onClick={() => setRate && setRate(1)}
        />
      </div>
    ) : (
      <div data-test-id='star'>
        <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(1)} />
      </div>
    )}
    {rating && rating >= 2 ? (
      <div data-test-id='star'>
        <Icon
          dataTestId='star-active'
          width={widthOneStar}
          height={heightOneStar}
          title='default-star'
          onClick={() => setRate && setRate(2)}
        />
      </div>
    ) : (
      <div data-test-id='star'>
        <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(2)} />
      </div>
    )}
    {rating && rating >= 3 ? (
      <div data-test-id='star'>
        <Icon
          dataTestId='star-active'
          width={widthOneStar}
          height={heightOneStar}
          title='default-star'
          onClick={() => setRate && setRate(3)}
        />
      </div>
    ) : (
      <div data-test-id='star'>
        <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(3)} />
      </div>
    )}
    {rating && rating >= 4 ? (
      <div data-test-id='star'>
        <Icon
          dataTestId='star-active'
          width={widthOneStar}
          height={heightOneStar}
          title='default-star'
          onClick={() => setRate && setRate(4)}
        />
      </div>
    ) : (
      <div data-test-id='star'>
        <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(4)} />
      </div>
    )}
    {rating && rating >= 5 ? (
      <div data-test-id='star'>
        <Icon
          dataTestId='star-active'
          width={widthOneStar}
          height={heightOneStar}
          title='default-star'
          onClick={() => setRate && setRate(5)}
        />
      </div>
    ) : (
      <div data-test-id='star'>
        <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(5)} />
      </div>
    )}
  </div>
));
