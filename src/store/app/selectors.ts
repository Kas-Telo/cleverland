import { RootStateType } from '..';

export const selectIsLoading = (state: RootStateType) => state.app.isLoading;
export const selectAppError = (state: RootStateType) => state.app.appError;
export const selectAppInfo = (state: RootStateType) => state.app.appInfo;

export const appSelectors = {
  selectIsLoading,
  selectAppError,
  selectAppInfo,
};
