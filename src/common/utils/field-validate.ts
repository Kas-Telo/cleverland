import { authRegexp } from '../enums-and-constants/regexp-constants';

export type LoginValidateType = {
  digitRequired: (value: string) => boolean;
  latinRequired: (value: string) => boolean;
};
export type PasswordValidateType = {
  digitRequired: (value: string) => boolean;
  capitalLetterRequired: (value: string) => boolean;
  minLength: (value: string) => boolean;
};
export type ConfirmPasswordValidateType = {
  confirmValidate: (value: string) => boolean;
};
export type EmailValidateType = {
  emailIncorrect: (value: string) => boolean;
};
export type RequiredValidateType = {
  value: boolean;
  message: string;
};

export const requiredValidate: RequiredValidateType = {
  value: true,
  message: 'Поле не может быть пустым',
};
export const loginValidate: LoginValidateType = {
  digitRequired: (value) => !!value.match(/[0-9]/),
  latinRequired: (value) => !value.match(/[^a-zA-Z0-9]/) && !!value.match(/[a-zA-z]/),
};
export const passwordValidate: PasswordValidateType = {
  minLength: (value) => value.length >= 8,
  capitalLetterRequired: (value) => !!value.match(/[A-ZА-ЯЁ]/),
  digitRequired: (value) => !!value.match(/[0-9]/),
};
export const emailValidate: EmailValidateType = {
  emailIncorrect: (value) => !!value.match(authRegexp.email),
};
