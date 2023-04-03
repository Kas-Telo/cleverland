import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo/logo.svg';
import { BurgerButtonCustom } from '../../../components/burger-button-custom';
import { BurgerNavigation } from '../../../components/burger-navigation';
import { UserMenu } from '../../../components/user-menu/user-menu';
import { appSelectors, syncAppActions } from '../../../store/app';
import { Alert } from '../../../ui/alert';
import { ROUTES } from '../../enums-and-constants/routes-enum';
import { useActions } from '../../hooks/use-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useScrollLock } from '../../hooks/use-scroll-lock';
import { Size, useWindowSize } from '../../hooks/use-window-size';

import { UserBlock } from './user-block/user-block';

import style from './header.module.css';

export const Header = () => {
  const { unlockScroll, lockScroll } = useScrollLock();
  const size: Size = useWindowSize();
  const appError = useAppSelector(appSelectors.selectAppError);
  const appInfo = useAppSelector(appSelectors.selectAppInfo);
  const { setAppError, setAppInfo } = useActions(syncAppActions);

  const [isOpenMenu, toggleMenu] = useState(false);
  const navigationContainer = `${isOpenMenu ? style.visibleNav : style.invisibleNav}`;
  const blurContentVisible = `${isOpenMenu ? style.visibleBlur : ''}`;

  const onCloseAlert = useCallback(
    (type: 'error' | 'success') => {
      if (type === 'error') {
        setAppError({ status: null, error: null });
      } else {
        setAppInfo({ message: null });
      }
    },
    [setAppError, setAppInfo]
  );

  const onBurgerButtonClick = useCallback(() => {
    toggleMenu(!isOpenMenu);
  }, [isOpenMenu, toggleMenu]);

  const onBurgerNavigationClose = useCallback(() => {
    toggleMenu(false);
  }, []);

  useEffect(() => {
    if (size.width > 1242) {
      toggleMenu(false);
    }
  }, [size.width]);

  useEffect(() => {
    if (isOpenMenu) {
      lockScroll();
    }
    if (!isOpenMenu) {
      unlockScroll();
    }
  }, [isOpenMenu, lockScroll, unlockScroll]);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <Link className={style.logo} to={`${ROUTES.BOOKS}/all`}>
            <img src={logo} alt='logo-main-link' />
          </Link>
          <BurgerButtonCustom
            dataTestId='button-burger'
            className={style.burgerMenu}
            isOpenMenu={isOpenMenu}
            toggleMenu={onBurgerButtonClick}
          />
          <h3>Библиотека</h3>
        </div>
        <div className={style.userBlock}>
          <div className={`${style.userMenuContainer}`}>
            <UserMenu />
          </div>
          <UserBlock />
        </div>
      </div>
      {appError && (
        <div className={style.alertContainer}>
          {appError.error && (
            <Alert type='error' onClose={onCloseAlert}>
              {appError.error}
            </Alert>
          )}
        </div>
      )}
      {appInfo.message && (
        <div className={style.alertContainer}>
          {appInfo.message && (
            <Alert type='success' onClose={onCloseAlert}>
              {appInfo.message}
            </Alert>
          )}
        </div>
      )}

      <div className={`${style.containerNav} ${navigationContainer} `}>
        <BurgerNavigation dataTestId='burger-navigation' onClose={onBurgerNavigationClose} />
      </div>
      <div />
      <div
        aria-hidden={true}
        className={`${blurContentVisible} ${style.blurContainer}`}
        onClick={onBurgerNavigationClose}
      />
    </header>
  );
};
