import { Outlet } from 'react-router-dom';

import { Navigation } from '../../../components/navigation';

import style from './layout-main-page.module.css';

export const LayoutMainPage = () => (
  <section className={style.mainContainer}>
    <div className={style.sidebarContainer}>
      <Navigation
        dataTestIdType='navigation'
        dataTestIdShowCase='navigation-showcase'
        dataTestIdTerms='navigation-terms'
        dataTestIdContract='navigation-contract'
      />
    </div>
    <div className={style.outlet}>
      <Outlet />
    </div>
  </section>
);
