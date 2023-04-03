import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../../common/hooks/use-actions';
import { useAppDispatch } from '../../../../common/hooks/use-app-dispatch';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { TextField } from '../../../../components/text-field/text-field';
import { asyncAuthActions, syncAuthActions } from '../../../../store/auth';
import { Button } from '../../../../ui';
import { BodyTypography, Info } from '../../../../ui/typography';

import style from '../../auth-form.module.css';
import styleAuth from './authorization-form.module.css';

type AuthSubmitForm = {
  identifier: string;
  password: string;
};

export const AuthForm = () => {
  const [badRequestError, toggleBadRequestError] = useState(false);
  const size: Size = useWindowSize();
  const dispatch = useAppDispatch();
  const { setAuthInfo } = useActions(syncAuthActions);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthSubmitForm>({
    mode: 'all',
  });

  const onSubmit = async ({ identifier, password }: AuthSubmitForm) => {
    setAuthInfo({ status: null, info: null });
    const action = await dispatch(
      asyncAuthActions.auth({
        identifier,
        password,
      })
    );

    if (asyncAuthActions.auth.rejected.match(action)) {
      if (action.payload?.errorStatus === 400) {
        toggleBadRequestError(true);
      }
    }
  };

  return (
    <Modal positionContent='start'>
      <h4>Вход в личный кабинет</h4>
      <MyForm data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          positionHint='absolute'
          type='text'
          register={register}
          name='identifier'
          disabled={false}
          fieldError={errors.identifier}
          placeholder='Логин'
        />
        <TextField
          positionHint='absolute'
          type='password'
          register={register}
          name='password'
          disabled={false}
          fieldError={errors.password}
          placeholder='Пароль'
        />
        <div>
          {badRequestError && (
            <Info dataTestId='hint' type='large' className={styleAuth.colorResponseHint}>
              Неверный логин или пароль!
            </Info>
          )}
          <Link to={ROUTES.FORGOT_PASSWORD} className={styleAuth.forgotLink}>
            <Info type='large' className={`${badRequestError ? styleAuth.forgotDarkText : styleAuth.forgotGrayText}`}>
              {badRequestError ? 'Восстановить?' : 'Забыли логин или пароль?'}
            </Info>
          </Link>
        </div>
        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.password || !!errors.identifier || !watch('password') || !watch('identifier')}
          >
            Вход
          </Button>
          <div className={style.linkBlock}>
            <BodyTypography className={style.linkDescription} size='large'>
              Нет учётной записи?
            </BodyTypography>
            <ArrowLink path={ROUTES.REGISTRATION} positionArrow='after'>
              Регистрация
            </ArrowLink>
          </div>
        </div>
      </MyForm>
    </Modal>
  );
};
