import { Outlet } from 'react-router-dom';

import style from './auth-layout.module.css';

export const AuthLayout = () => (
  <div data-test-id='auth' className={style.container}>
    <Outlet />
  </div>
);
