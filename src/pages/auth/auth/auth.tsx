import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../common/hooks/use-actions';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Modal } from '../../../components/modal/modal';
import { syncAuthActions } from '../../../store/auth';
import { Button } from '../../../ui';
import { BodyTypography } from '../../../ui/typography';

import { AuthForm } from './auth-form/auth-form';

import style from '../auth-form.module.css';

export const Auth = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const authError = useAppSelector((state) => state.auth.authInfo);

  const { setAuthInfo } = useActions(syncAuthActions);

  useEffect(() => {
    if (isAuth) {
      navigate(`${ROUTES.BOOKS}/all`);
    }
  }, [isAuth, navigate]);

  return (
    <div>
      {authError.info ? (
        <Modal dataTestIdModal='status-block' type='info'>
          <h4>Вход не выполнен</h4>
          <BodyTypography size='large'>Что-то пошло не так. Попробуйте ещё раз</BodyTypography>
          <Button
            submit={false}
            variant='primary'
            size='large'
            sizeTypography='large'
            className={style.infoButton}
            variantTypography='desktop'
            onClick={() => setAuthInfo({ status: null, info: null })}
          >
            Повторить
          </Button>
        </Modal>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};
