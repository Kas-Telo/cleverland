import avatarDefault from '../../../../assets/images/avatar-default.png';
import { userSelectors } from '../../../../store/user';
import { Subtitle } from '../../../../ui/typography';
import { BASE_URL_FOR_IMAGE } from '../../../enums-and-constants/constants';
import { useAppSelector } from '../../../hooks/use-app-selector';

import style from './user-block.module.css';

export const UserBlock = () => {
  const user = useAppSelector(userSelectors.selectUser);

  return (
    <div className={style.container}>
      <Subtitle size='small'>{`Привет, ${user.firstName}!`}</Subtitle>
      <div className={style.avatarContainer}>
        <img
          className={style.avatar}
          src={user.avatar ? `${BASE_URL_FOR_IMAGE}${user.avatar}` : avatarDefault}
          alt='small-circle-avatar'
        />
      </div>
    </div>
  );
};
