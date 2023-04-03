import { RootStateType } from '..';

export const selectIsAuth = (state: RootStateType) => state.auth.isAuth;
export const selectAuthInfo = (state: RootStateType) => state.auth.authInfo;
export const selectSuccessfulRegistration = (state: RootStateType) => state.auth.successfulRegistration;

export const authSelectors = {
  selectIsAuth,
  selectAuthInfo,
  selectSuccessfulRegistration,
};
