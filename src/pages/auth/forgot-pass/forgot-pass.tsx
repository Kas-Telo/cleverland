import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../common/hooks/use-actions';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Modal } from '../../../components/modal/modal';
import { syncAuthActions } from '../../../store/auth';
import { authSelectors } from '../../../store/auth/selectors';
import { Button } from '../../../ui';
import { BodyTypography } from '../../../ui/typography';

import { ForgotPasswordForm } from './forgot-password-form/forgot-password-form';
import { ResetPasswordForm } from './reset-password-form/reset-password-form';

import style from '../auth-form.module.css';

export const ForgotPass = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const responseInfo = useAppSelector(authSelectors.selectAuthInfo);

  const { setAuthInfo } = useActions(syncAuthActions);

  const onClickModalButton = () => {
    setAuthInfo({ status: null, info: null });
    if (responseInfo.status === 200) {
      navigate(ROUTES.AUTH);
    } else {
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(`${ROUTES.BOOKS}/all`);
    }
  }, [isAuth, navigate]);

  return (
    <div>
      {responseInfo.info ? (
        <Modal dataTestIdModal='status-block' type='info'>
          {searchParams.get('code') ? (
            responseInfo.status === 200 ? (
              <h4>Новые данные сохранены</h4>
            ) : (
              <h4>Данные не сохранились</h4>
            )
          ) : (
            <h4>Письмо выслано</h4>
          )}
          <BodyTypography size='large'>{responseInfo.info}</BodyTypography>
          {searchParams.get('code') && (
            <Button
              submit={false}
              variant='primary'
              size='large'
              sizeTypography='large'
              className={style.infoButton}
              variantTypography='desktop'
              onClick={onClickModalButton}
            >
              {responseInfo.status === 200 ? 'Вход' : 'Повторить'}
            </Button>
          )}
        </Modal>
      ) : searchParams.get('code') ? (
        <ResetPasswordForm />
      ) : (
        <ForgotPasswordForm />
      )}
    </div>
  );
};
