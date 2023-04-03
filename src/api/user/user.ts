import { AxiosResponse } from 'axios';

import { instance } from '../api-instance';

import { UserCredentialRequestType, UserType } from './user-types';

export const userApi = {
  me: () => instance.get<Record<string, never>, AxiosResponse<UserType>>('/users/me'),
  updateCredential: (payload: UserCredentialRequestType, userId: number) =>
    instance.put<UserCredentialRequestType, AxiosResponse<UserType>>(`users/${userId}`, payload),
  imageUpload: (formData: FormData) => instance.post<FormData, AxiosResponse<[{ id: number }]>>('/upload', formData),
};
