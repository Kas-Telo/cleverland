import { AxiosResponse } from 'axios';

import { instance } from '../api-instance';

import { RequestBookingType, ResponseBookingType } from './booking-types';

export const bookingApi = {
  booking: (payload: RequestBookingType) =>
    instance.post<RequestBookingType, AxiosResponse<ResponseBookingType>>('/bookings', payload),
  bookingUpdate: (payload: RequestBookingType, bookingId: number) =>
    instance.put<RequestBookingType, AxiosResponse<ResponseBookingType>>(`/bookings/${bookingId}`, payload),
  bookingDelete: (bookingId: number) =>
    instance.delete<Record<string, never>, AxiosResponse<ResponseBookingType>>(`/bookings/${bookingId}`),
};
