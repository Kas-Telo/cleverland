import { memo } from 'react';

import avatarDefault from '../../../assets/images/avatar-default.png';
import { BASE_URL_FOR_IMAGE } from '../../../common/enums-and-constants/constants';
import { getFullDate } from '../../../common/utils/date/formatted-date-util';
import { BodyTypography } from '../../../ui/typography';

import style from './user-block.module.css';

type Props = {
  avatar: string | null;
  dataOfCreation: string;
  fullName: string;
};

export const UserBlock = memo(({ avatar, dataOfCreation, fullName }: Props) => (
  <div className={style.container}>
    <div>
      <img className={style.avatar} src={avatar ? `${BASE_URL_FOR_IMAGE}${avatar}` : avatarDefault} alt='ava' />
    </div>
    <div className={style.descriptionContainer}>
      <BodyTypography data-test-id='comment-author' className={style.typography} size='large'>
        {fullName}
      </BodyTypography>
      <BodyTypography data-test-id='comment-date' className={style.typography} size='large'>
        {getFullDate(dataOfCreation)}
      </BodyTypography>
    </div>
  </div>
));
