import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { useActions } from '../../../../common/hooks/use-actions';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { passwordValidate } from '../../../../common/utils/field-validate';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Hint } from '../../../../components/text-field/errors/hint/hint';
import { TextField } from '../../../../components/text-field/text-field';
import { asyncAuthActions, syncAuthActions } from '../../../../store/auth';
import { Button } from '../../../../ui';
import { BodyTypography } from '../../../../ui/typography';

import style from '../../auth-form.module.css';

type ResetPasswordDataFormType = {
  password: string;
  passwordConfirmation: string;
};

export const ResetPasswordForm = () => {
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConf, setIsFocusedPasswordConf] = useState(false);
  const size: Size = useWindowSize();
  const [searchParams] = useSearchParams();
  const codeQuery = searchParams.get('code');

  const { resetPassword } = useActions(asyncAuthActions);
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
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = (data: ResetPasswordDataFormType) => {
    if (codeQuery) {
      setAuthInfo({ status: null, info: null });
      resetPassword({ ...data, code: codeQuery });
    }
  };

  return (
    <Modal positionContent='start'>
      <h4>Восстановление пароля</h4>
      <MyForm data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          positionHint='absolute'
          type='password'
          register={register}
          checkMark={!errors.password && !!watch('password')}
          name='password'
          validate={passwordValidate}
          setIsFocused={setIsFocusedPassword}
          disabled={false}
          fieldError={errors.password}
          placeholder='Пароль'
        >
          <Hint type='password' error={errors.password} isFocused={isFocusedPassword} />
        </TextField>

        <TextField
          positionHint='absolute'
          type='password'
          register={register}
          name='passwordConfirmation'
          validate={{ confirmValidate: (value: string) => value === watch('password') }}
          disabled={false}
          setIsFocused={setIsFocusedPasswordConf}
          fieldError={errors.password}
          placeholder='Пароль'
        >
          <Hint type='confirmPassword' error={errors.passwordConfirmation} isFocused={isFocusedPasswordConf} />
        </TextField>
        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            disabled={
              !!errors.passwordConfirmation?.types?.required ||
              (!isFocusedPasswordConf && !!errors.passwordConfirmation?.types?.confirmValidate) ||
              !watch('password') ||
              !watch('passwordConfirmation')
            }
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
          >
            Сохранить изменения
          </Button>
          <div className={style.linkBlock}>
            <BodyTypography className={style.text} size='large'>
              После сохранения войдите в библиотеку, используя новый пароль
            </BodyTypography>
          </div>
        </div>
      </MyForm>
    </Modal>
  );
};
