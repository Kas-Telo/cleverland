import { Fragment, MouseEvent, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IMenuSubItem } from '../../menu-sub-item/menu-sub-item';

import style from './item-selector.module.css';

type Props = {
  title: string;
  children: ReactElement<IMenuSubItem> | Array<ReactElement<IMenuSubItem>>;
  path: string;
  basedPath: string;
  collapsed: boolean;
  onClickSelector: (e: MouseEvent<HTMLAnchorElement>) => void;
  dataTestId?: string;
};

export const ItemSelector = ({ title, collapsed, path, children, onClickSelector, dataTestId, basedPath }: Props) => {
  const { pathname } = useLocation();
  const activeMenuListClass = `${pathname.toLowerCase().includes(basedPath.toLowerCase()) ? style.activeMenu : ''}`;

  const currentPath = pathname.includes(basedPath.toLowerCase()) ? pathname : path;

  const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    onClickSelector(e);
  };

  return (
    <Fragment>
      <Link data-test-id={dataTestId} className={style.menuItemSelector} onClick={onClickHandler} to={currentPath}>
        <h5 className={activeMenuListClass}>{title}</h5>
      </Link>
      {(pathname === path || pathname.includes(basedPath.toLowerCase())) && <div className={style.hr} />}

      <ul className={`${collapsed ? style.listCollapsed : style.list}`}>{children}</ul>
    </Fragment>
  );
};
