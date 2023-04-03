import { AxiosResponse } from 'axios';

import { authInstance } from '../api-instance';

import {
  AuthRequestType,
  AuthResponseType,
  ForgotPasswordRequestType,
  ForgotPasswordResponseType,
  RegistrationRequestType,
  ResetPasswordRequestType,
} from './auth-api-types';

export const authApi = {
  auth: (payload: AuthRequestType) =>
    authInstance.post<AuthRequestType, AxiosResponse<AuthResponseType>>('/local', payload),
  registration: (payload: RegistrationRequestType) =>
    authInstance.post<RegistrationRequestType, AxiosResponse<AuthResponseType>>('/local/register', payload),
  forgotPassword: (payload: ForgotPasswordRequestType) =>
    authInstance.post<ForgotPasswordRequestType, AxiosResponse<ForgotPasswordResponseType>>(
      '/forgot-password',
      payload
    ),
  resetPassword: (payload: ResetPasswordRequestType) =>
    authInstance.post<ResetPasswordRequestType, AxiosResponse<AuthResponseType>>('/reset-password', payload),
};
