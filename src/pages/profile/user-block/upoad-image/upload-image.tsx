import { ChangeEvent } from 'react';

import avatarDefault from '../../../../assets/images/avatar-default.png';
import { BASE_URL_FOR_IMAGE } from '../../../../common/enums-and-constants/constants';
import { useActions } from '../../../../common/hooks/use-actions';
import { useAppSelector } from '../../../../common/hooks/use-app-selector';
import { asyncUserActions, userSelectors } from '../../../../store/user';
import { Icon } from '../../../../ui/icon/icon';

import style from './upload-image.module.css';

export const UploadImage = () => {
  const { uploadImage } = useActions(asyncUserActions);
  const avatar = useAppSelector(userSelectors.selectUserAvatar);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const formData = new FormData();

      formData.append('files', files[0]);

      uploadImage({ formData });
    }
  };

  return (
    <div className={style.container}>
      <label className={style.imageLabel} htmlFor='upload'>
        <img src={avatar ? `${BASE_URL_FOR_IMAGE}${avatar}` : avatarDefault} alt='ava' />
      </label>
      <label className={style.inputLabel} htmlFor='upload'>
        <input className={style.input} id='upload' type='file' onChange={onChangeHandler} />
      </label>
      <label htmlFor='upload'>
        <Icon className={style.icon} title='photo' />
      </label>
    </div>
  );
};
