import { ForwardedRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { authRegexp } from '../../../../common/enums-and-constants/regexp-constants';
import { useActions } from '../../../../common/hooks/use-actions';
import { useAppSelector } from '../../../../common/hooks/use-app-selector';
import { usePhoneMask } from '../../../../common/hooks/use-phone-mask';
import { loginValidate, passwordValidate, requiredValidate } from '../../../../common/utils/field-validate';
import { Hint } from '../../../../components/text-field/errors/hint/hint';
import { TextField } from '../../../../components/text-field/text-field';
import { asyncUserActions, userSelectors } from '../../../../store/user';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';

import style from './form-credential-block.module.css';

export type FormValuesType = {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export const FormCredentialBlock = () => {
  const user = useAppSelector(userSelectors.selectUser);
  const { updateCredential } = useActions(asyncUserActions);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [disabledCredential, setDisabledCredential] = useState(true);
  const [isFocused, setIsFocused] = useState({
    login: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
  });

  const maskFunction = usePhoneMask();

  const setIsFocusedCallback = (value: boolean, name?: string) => {
    if (name) {
      setIsFocused({ ...isFocused, [name]: value });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<FormValuesType>({
    criteriaMode: 'all',
    mode: 'all',
    values: {
      login: user.username ? user.username : '',
      firstName: user.firstName ? user.firstName : '',
      lastName: user.lastName ? user.lastName : '',
      email: user.email ? user.email : '',
      phone: user.phone ? user.phone : '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValuesType> = ({
    firstName,
    lastName,
    email,
    phone,
    password,
    login,
  }: FormValuesType) => {
    const requestData = password
      ? {
          username: login,
          password,
          firstName,
          lastName,
          email,
          phone,
        }
      : {
          username: login,
          firstName,
          lastName,
          email,
          phone,
        };

    setDisabledCredential(true);
    updateCredential({ data: requestData, userId: user.id });
  };

  return (
    <form data-test-id='profile-form' onSubmit={handleSubmit(onSubmit)}>
      <div className={style.textFieldBlock}>
        <div className={style.textFieldGroup}>
          <TextField
            positionHint='absolute'
            className={style.textField}
            type='text'
            register={register}
            name='login'
            setIsFocused={setIsFocusedCallback}
            defaultValue={watch('login')}
            disabled={disabledCredential}
            validate={loginValidate}
            fieldError={errors.login}
            placeholder='Логин'
          >
            <Hint type='login' error={errors.login} isFocused={isFocused.login} />
          </TextField>
          <TextField
            positionHint='absolute'
            className={style.textField}
            type='password'
            register={register}
            name='password'
            required={isPasswordChanged ? requiredValidate : false}
            validate={isPasswordChanged ? passwordValidate : {}}
            setIsChangedField={setIsPasswordChanged}
            setIsFocused={setIsFocusedCallback}
            defaultValue={watch('password')}
            disabled={disabledCredential}
            fieldError={errors.password}
            placeholder='Пароль'
          >
            <Hint type='password' error={errors.password} isFocused={isFocused.password} />
          </TextField>
        </div>
        <div className={style.textFieldGroup}>
          <TextField
            positionHint='absolute'
            className={style.textField}
            type='text'
            register={register}
            name='firstName'
            fieldError={errors.firstName}
            setIsFocused={setIsFocusedCallback}
            defaultValue={watch('firstName')}
            disabled={disabledCredential}
            placeholder='Имя'
          />
          <TextField
            positionHint='absolute'
            className={style.textField}
            type='text'
            register={register}
            name='lastName'
            fieldError={errors.lastName}
            setIsFocused={setIsFocusedCallback}
            defaultValue={watch('lastName')}
            disabled={disabledCredential}
            placeholder='Фамилия'
          />
        </div>
        <div className={style.textFieldGroup}>
          <div className={style.textFieldPhoneContainer}>
            <Controller
              name='phone'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => {
                const onBlurCallback = () => {
                  setIsFocusedCallback(false, 'phone');
                  onBlur();
                };

                return (
                  <MaskedInput
                    mask={maskFunction(value[6])}
                    placeholderChar='x'
                    value={value}
                    defaultValue={watch('phone')}
                    onBlur={onBlurCallback}
                    onChange={onChange}
                    disabled={disabledCredential}
                    render={(ref, props) => (
                      <Input
                        className={style.textField}
                        name='phone'
                        placeholder='Номер телефона'
                        ref={ref as ForwardedRef<HTMLInputElement>}
                        type='tel'
                        isError={!!errors.phone}
                        onFocus={() => setIsFocusedCallback(true, 'phone')}
                        {...props}
                      />
                    )}
                  />
                );
              }}
              rules={{
                required: 'Поле не может быть пустым',
                pattern: authRegexp.phone,
              }}
            />
            <div className={style.hintContainer}>
              <Hint type='phone' error={errors.phone} isFocused={isFocused.phone} />
            </div>
          </div>
          <TextField
            positionHint='block'
            className={style.textField}
            type='email'
            register={register}
            name='email'
            setIsFocused={setIsFocusedCallback}
            defaultValue={watch('email')}
            disabled={disabledCredential}
            fieldError={errors.email}
            placeholder='E-mail'
          >
            <Hint type='email' error={errors.email} isFocused={isFocused.email} />
          </TextField>
        </div>
      </div>
      <div className={style.buttonsBlock}>
        <Button
          dataTestId='edit-button'
          className={style.button}
          variant='secondary'
          size='large'
          sizeTypography='large'
          variantTypography='desktop'
          onClick={() => setDisabledCredential(!disabledCredential)}
          submit={false}
        >
          Редактировать
        </Button>
        <Button
          dataTestId='save-button'
          className={style.button}
          variant='primary'
          size='large'
          sizeTypography='large'
          variantTypography='desktop'
          disabled={disabledCredential}
          submit={true}
        >
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};
