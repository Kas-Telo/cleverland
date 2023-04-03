import { Link } from 'react-router-dom';

import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { syncAuthActions } from '../../store/auth';
import { syncBooksActions } from '../../store/books';

import style from './user-menu.module.css';

export const UserMenu = () => {
  const { updateCategories, setIsFirstLoadingCategories } = useActions(syncBooksActions);
  const { toggleIsAuth } = useActions(syncAuthActions);

  const exitButtonClick = () => {
    localStorage.setItem('token', `${JSON.stringify(null)}`);
    updateCategories({ categories: [] });
    setIsFirstLoadingCategories({ isFirstLoadingCategories: true });
    toggleIsAuth({ isAuth: false });
  };

  return (
    <div className={style.container}>
      <Link data-test-id='profile-button' to={ROUTES.PROFILE}>
        <h5>Профиль</h5>
      </Link>
      <Link to='' onClick={exitButtonClick}>
        <h5>Выход</h5>
      </Link>
    </div>
  );
};
