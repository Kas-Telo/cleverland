import { Size, useWindowSize } from '../../../../../common/hooks/use-window-size';
import { BodyTypography, Info, Subtitle } from '../../../../../ui/typography';

import style from './info-item.module.css';

type Props = {
  title: string;
  description: string | null | undefined;
};

export const InfoItem = ({ title, description }: Props) => {
  const size: Size = useWindowSize();

  return (
    <div className={style.item}>
      {size.width > 576 ? (
        <Subtitle className={style.title} size={size.width > 992 ? 'large' : 'small'}>
          {title}
        </Subtitle>
      ) : (
        <Info className={style.title} type='large'>
          {title}
        </Info>
      )}
      {size.width > 576 ? (
        <BodyTypography className={style.description} size={size.width > 992 ? 'large' : 'small'}>
          {description ? description : '---'}
        </BodyTypography>
      ) : (
        <Info className={style.description} type='small'>
          {description ? description : '---'}
        </Info>
      )}
    </div>
  );
};
