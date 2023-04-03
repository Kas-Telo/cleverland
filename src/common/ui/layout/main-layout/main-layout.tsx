import { Outlet } from 'react-router-dom';

import { Footer } from '../../footer';
import { Header } from '../../header';

import style from './main-layout.module.css';

export const MainLayout = () => (
  <div className={style.layout}>
    <div className={style.position}>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  </div>
);
