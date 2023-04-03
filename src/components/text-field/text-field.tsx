import { ReactNode } from 'react';
import { FieldError, FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import { authRegexp } from '../../common/enums-and-constants/regexp-constants';
import {
  ConfirmPasswordValidateType,
  LoginValidateType,
  PasswordValidateType,
  RequiredValidateType,
} from '../../common/utils/field-validate';
import { Input } from '../../ui/input/input';

import { Hint } from './errors/hint/hint';

import style from './text-field.module.css';

export type ValidateType = LoginValidateType | PasswordValidateType | ConfirmPasswordValidateType;

type TypeRegister = (name: any, options?: RegisterOptions<FieldValues, any>) => UseFormRegisterReturn<any>;

type Props = {
  type: 'password' | 'text' | 'tel' | 'email';
  name: string;
  fieldError?: FieldError;
  register: TypeRegister;
  placeholder: string;
  disabled: boolean;
  checkMark?: boolean;
  setIsFocused?: (value: boolean, name?: string) => void;
  defaultValue?: string;
  required?: RequiredValidateType | boolean | string;
  validate?: ValidateType | Record<string, never>;
  children?: ReactNode;
  setIsChangedField?: (value: boolean) => void;
  resetErrorOnChange?: (value: string) => void;
  positionHint: 'absolute' | 'block';
  className?: string;
};

export const TextField = ({
  type,
  placeholder,
  checkMark,
  setIsChangedField,
  positionHint,
  register,
  defaultValue,
  disabled,
  setIsFocused,
  resetErrorOnChange,
  required,
  validate,
  name,
  children,
  fieldError,
  className,
}: Props) => {
  const classHintContainer = `${positionHint === 'absolute' ? style.absoluteHintContainer : style.blockHintContainer}`;

  return (
    <div className={`${style.textFieldContainer} ${className}`}>
      <Input
        type={type}
        placeholder={placeholder}
        isError={!!fieldError}
        defaultValue={defaultValue}
        disabled={disabled}
        checkMark={checkMark}
        onFocus={() => {
          if (setIsFocused) setIsFocused(true, name);
          if (setIsChangedField) setIsChangedField(true);
        }}
        {...register(name, {
          required: required === undefined ? 'Поле не может быть пустым' : required,
          pattern:
            type === 'email'
              ? {
                  value: authRegexp.email,
                  message: 'Введите корректный e-mail',
                }
              : undefined,
          validate,

          onBlur: () => {
            if (setIsFocused) setIsFocused(false, name);
          },
          onChange: () => {
            if (resetErrorOnChange) resetErrorOnChange('');
          },
        })}
      />
      <div className={classHintContainer}>{children ? children : <Hint error={fieldError} isFocused={true} />}</div>
    </div>
  );
};
