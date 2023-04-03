import { Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from '../../../pages/auth/auth/auth';
import { ForgotPass } from '../../../pages/auth/forgot-pass/forgot-pass';
import { Registration } from '../../../pages/auth/registration/registration';
import { BookPage } from '../../../pages/book';
import { LayoutMainPage, MainPage, Terms } from '../../../pages/main';
import { Profile } from '../../../pages/profile';
import { syncAuthActions } from '../../../store/auth';
import { authSelectors } from '../../../store/auth/selectors';
import { ROUTES } from '../../enums-and-constants/routes-enum';
import { useActions } from '../../hooks/use-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getToken } from '../../utils/get-token';
import { Layout } from '../layout';
import { AuthLayout } from '../layout/auth-layout/auth-layout';
import { MainLayout } from '../layout/main-layout/main-layout';

export const Routing = () => {
  const isAuth = useAppSelector(authSelectors.selectIsAuth);

  const { toggleIsAuth } = useActions(syncAuthActions);

  if (getToken()) {
    toggleIsAuth({ isAuth: true });
  } else {
    toggleIsAuth({ isAuth: false });
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Navigate to={isAuth ? `${ROUTES.BOOKS}/all` : ROUTES.AUTH} />} />
        <Route element={<MainLayout />}>
          <Route element={<LayoutMainPage />}>
            <Route path={`${ROUTES.BOOKS}/:category`} element={<MainPage />} />
            <Route path={ROUTES.TERMS} element={<Terms contentView='terms' />} />
            <Route path={ROUTES.CONTRACT} element={<Terms contentView='contract' />} />
          </Route>
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={`${ROUTES.BOOKS}/:category/:bookId`} element={<BookPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH} element={<Auth />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPass />} />
        </Route>
      </Route>
    </Routes>
  );
};
