import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { userSelectors } from '../../../store/user';

import { UploadImage } from './upoad-image/upload-image';

import style from './user-block.module.css';

export const UserBlock = () => {
  const size: Size = useWindowSize();

  const user = useAppSelector(userSelectors.selectUser);

  return (
    <div data-test-id='profile-avatar' className={style.container}>
      <UploadImage />
      {size.width > 576 ? (
        <h1 className={style.name}>{`${user.firstName} ${user.lastName}`}</h1>
      ) : (
        <h2 className={style.name}>{`${user.firstName} ${user.lastName}`}</h2>
      )}
    </div>
  );
};
