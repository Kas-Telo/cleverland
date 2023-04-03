import { RootStateType } from '..';

export const selectUser = (state: RootStateType) => state.user.user;
export const selectUserBooking = (state: RootStateType) => state.user.user.booking;
export const selectUserId = (state: RootStateType) => state.user.user.id;
export const selectUserAvatar = (state: RootStateType) => state.user.user.avatar;
export const selectUserDelivery = (state: RootStateType) => state.user.user.delivery;

export const userSelectors = {
  selectUser,
  selectUserBooking,
  selectUserId,
  selectUserAvatar,
  selectUserDelivery,
};
