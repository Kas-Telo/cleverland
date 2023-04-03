import { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { appSelectors } from '../../../store/app';
import { Loader } from '../../../ui/loader/loader';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useScrollLock } from '../../hooks/use-scroll-lock';

export const Layout = () => {
  const isLoading = useAppSelector(appSelectors.selectIsLoading);
  const { unlockScroll, lockScroll } = useScrollLock();

  useEffect(() => {
    if (isLoading) {
      lockScroll();
    }
    if (!isLoading) {
      unlockScroll();
    }
  }, [isLoading, lockScroll, unlockScroll]);

  return (
    <Fragment>
      {isLoading && <Loader />}
      <Outlet />
    </Fragment>
  );
};
