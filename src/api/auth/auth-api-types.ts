import { BaseUserType } from '../user/user-types';

export type AuthRequestType = {
  identifier: string;
  password: string;
};
export type RegistrationRequestType = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
export type AuthResponseType = {
  jwt: string;
  user: BaseUserType;
};
export type ForgotPasswordRequestType = {
  email: string;
};
export type ForgotPasswordResponseType = {
  ok: boolean;
};
export type ResetPasswordRequestType = {
  password: string;
  passwordConfirmation: string;
  code: string;
};
