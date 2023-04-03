import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './item.module.css';

type Props = {
  title: string;
  path: string;
  dataTestId?: string;
  onClick: () => void;
};

export const Item = ({ path, title, dataTestId, onClick }: Props) => {
  const { pathname } = useLocation();

  const activeMenuClass = `${pathname === path ? style.activeMenu : ''}`;

  return (
    <React.Fragment>
      <Link data-test-id={dataTestId} to={path} onClick={onClick}>
        <h5 className={activeMenuClass}>{title}</h5>
      </Link>
      {pathname === path && <div className={style.hr} />}
    </React.Fragment>
  );
};
