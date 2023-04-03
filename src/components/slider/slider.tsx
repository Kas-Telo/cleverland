import { memo, useCallback, useState } from 'react';
import { FreeMode, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperType from 'swiper/types/swiper-class';

import coverUndefined from '../../assets/images/cover-undefined.png';
import { BASE_URL_FOR_IMAGE } from '../../common/enums-and-constants/constants';
import { Size, useWindowSize } from '../../common/hooks/use-window-size';

import style from './slider.module.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

type Props = {
  images: Array<{ url: string | null }> | null;
};

export const Slider = memo(({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const size: Size = useWindowSize();

  const lengthImages = images?.length;

  const onSwiperClick = useCallback((value: SwiperType) => {
    setThumbsSwiper(value);
  }, []);

  return (
    <div className={style.container}>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        pagination={
          size.width > 992
            ? false
            : {
                clickable: true,
              }
        }
        modules={[FreeMode, Pagination, Thumbs]}
        className={style.bigSlider}
      >
        {images ? (
          images.map((el) => (
            <SwiperSlide key={el.url}>
              <img className={style.imgBig} src={`${BASE_URL_FOR_IMAGE}${el.url}`} alt='slide' />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img className={style.imgBig} src={coverUndefined} alt='slide' />
          </SwiperSlide>
        )}
      </Swiper>

      {size.width > 992 && (
        <Swiper
          onSwiper={onSwiperClick}
          spaceBetween={25}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className={style.smallSlider}
        >
          {lengthImages &&
            lengthImages > 1 &&
            images.map((el) => (
              <SwiperSlide data-test-id='slide-mini' key={el.url} className={style.slide}>
                <img className={style.imgSmall} src={`${BASE_URL_FOR_IMAGE}${el.url}`} alt='slide' />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
});
