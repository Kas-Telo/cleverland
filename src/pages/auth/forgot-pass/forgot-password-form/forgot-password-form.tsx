import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../../common/hooks/use-actions';
import { useAppDispatch } from '../../../../common/hooks/use-app-dispatch';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Hint } from '../../../../components/text-field/errors/hint/hint';
import { TextField } from '../../../../components/text-field/text-field';
import { asyncAuthActions, syncAuthActions } from '../../../../store/auth';
import { Button } from '../../../../ui';
import { BodyTypography, Info } from '../../../../ui/typography';

import style from '../../auth-form.module.css';
import styleForgot from './forgot-password-form.module.css';

type ForgotPasswordDataType = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [badRequestError, setBadRequestError] = useState('');
  const size: Size = useWindowSize();
  const dispatch = useAppDispatch();
  const { setAuthInfo } = useActions(syncAuthActions);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordDataType) => {
    setAuthInfo({ status: null, info: null });
    const action = await dispatch(asyncAuthActions.forgotPassword(data));

    if (asyncAuthActions.forgotPassword.rejected.match(action)) {
      if (action.payload) {
        setBadRequestError(action.payload?.error);
      }
    }
  };

  return (
    <Modal
      positionContent='start'
      headerContent={
        <ArrowLink classNameText={styleForgot.headerLink} path='/auth' positionArrow='before' colorArrow='#BFC4C9'>
          Вход в личный Кабинет
        </ArrowLink>
      }
    >
      <h4>Восстановление пароля</h4>
      <MyForm data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={style.fullWidthContainer}>
          <TextField
            positionHint='block'
            type='email'
            register={register}
            name='email'
            disabled={false}
            fieldError={errors.email}
            resetErrorOnChange={setBadRequestError}
            placeholder='E-mail'
          >
            <Hint type='email' error={errors.email} isFocused={true} message={badRequestError} />
          </TextField>
          <Info type='large' className={style.fullErrorText}>
            На это email будет отправлено письмо с инструкциями восстановлению пароля
          </Info>
        </div>
        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            disabled={!!errors.email || !!badRequestError || !watch('email')}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
          >
            Восстановить
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
