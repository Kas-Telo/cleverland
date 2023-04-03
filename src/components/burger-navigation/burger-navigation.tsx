import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { syncAuthActions } from '../../store/auth';
import { syncBooksActions } from '../../store/books';
import { Menu, MenuItem } from '../../ui/menu';
import { Navigation } from '../navigation';

import style from './burger-navigation.module.css';

type Props = {
  onClose: () => void;
  dataTestId: string;
};

export const BurgerNavigation = memo(({ onClose, dataTestId }: Props) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const { toggleIsAuth } = useActions(syncAuthActions);
  const { updateCategories, setIsFirstLoadingCategories } = useActions(syncBooksActions);

  const exitButtonClick = useCallback(() => {
    localStorage.setItem('token', `${JSON.stringify(null)}`);
    updateCategories({ categories: [] });
    setIsFirstLoadingCategories({ isFirstLoadingCategories: true });
    toggleIsAuth({ isAuth: false });
  }, [setIsFirstLoadingCategories, toggleIsAuth, updateCategories]);

  const onCollapsedClick = useCallback(
    (value: boolean) => {
      if (!pathname.includes(ROUTES.BOOKS)) {
        onClose();
      }
      setCollapsed(value);
    },
    [onClose, pathname]
  );

  return (
    <div aria-hidden={true} className={style.container} onClick={onClose} data-test-id={dataTestId}>
      <div className={style.navContainer}>
        <Navigation
          dataTestIdType='burger'
          dataTestIdShowCase='burger-showcase'
          dataTestIdTerms='burger-terms'
          dataTestIdContract='burger-contract'
          collapsed={collapsed}
          setCollapsed={onCollapsedClick}
        />
      </div>
      <div className={style.hr} />
      <div className={style.profileContainer}>
        <Menu>
          <MenuItem title='Профиль' path={ROUTES.PROFILE} basedPath='' />
          <MenuItem dataTestId='exit-button' title='Выход' path='' basedPath='' onClick={exitButtonClick} />
        </Menu>
      </div>
    </div>
  );
});
