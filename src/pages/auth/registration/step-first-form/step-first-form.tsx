import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { loginValidate, passwordValidate } from '../../../../common/utils/field-validate';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Hint } from '../../../../components/text-field/errors/hint/hint';
import { TextField } from '../../../../components/text-field/text-field';
import { Button } from '../../../../ui';
import { BodyTypography, Subtitle } from '../../../../ui/typography';
import { StepFirstDataType } from '../registration';

import style from '../../auth-form.module.css';

type Props = {
  addData: (data: StepFirstDataType) => void;
};

export const StepFirstForm = ({ addData }: Props) => {
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const setIsFocusedCallback = (value: boolean, name?: string) => {
    if (name) setIsFocused({ ...isFocused, [name]: value });
  };

  const size: Size = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: StepFirstDataType) => {
    addData(data);
  };

  return (
    <Modal positionContent='start'>
      <div>
        <h4 className={style.titleRegistration}>Регистрация</h4>
        <Subtitle size='small'>шаг 1 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          positionHint='absolute'
          type='text'
          register={register}
          name='username'
          setIsFocused={setIsFocusedCallback}
          validate={loginValidate}
          fieldError={errors.username}
          placeholder='Придумайте логин для входа'
          disabled={false}
        >
          <Hint type='login' error={errors.username} isFocused={isFocused.username} />
        </TextField>
        <TextField
          positionHint='absolute'
          type='password'
          checkMark={!errors.password}
          register={register}
          name='password'
          validate={passwordValidate}
          setIsFocused={setIsFocusedCallback}
          defaultValue={watch('password')}
          disabled={false}
          fieldError={errors.password}
          placeholder='Пароль'
        >
          <Hint type='password' error={errors.password} isFocused={isFocused.password} />
        </TextField>

        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.password || !!errors.username || !watch('password') || !watch('username')}
          >
            Следующий шаг
          </Button>
          <div className={style.linkBlock}>
            <BodyTypography className={style.linkDescription} size='large'>
              Есть учётной записи?
            </BodyTypography>
            <ArrowLink path={ROUTES.AUTH} positionArrow='after'>
              Войти
            </ArrowLink>
          </div>
        </div>
      </MyForm>
    </Modal>
  );
};
