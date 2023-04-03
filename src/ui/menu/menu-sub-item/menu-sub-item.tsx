import { Link, useLocation } from 'react-router-dom';

import style from './menu-sub-item.module.css';

export type IMenuSubItem = {
  title: string;
  path: string;
  count?: number | null;
  dataTestId?: string;
  dataTestIdType?: string;
  dataTestIdCategory?: string;
};

export const MenuSubItem = ({ count, path, title, dataTestId, dataTestIdType, dataTestIdCategory }: IMenuSubItem) => {
  const { pathname } = useLocation();

  const linkActiveClass = `${style.link} ${
    pathname.toLowerCase().includes(path.toLowerCase()) ? style.activeLink : ''
  }`;

  const countClass = `${pathname.toLowerCase().includes(path.toLowerCase()) ? style.bookCountActive : style.bookCount}`;

  return (
    <li className={style.item}>
      <Link
        data-test-id={`${dataTestId ? dataTestId : `${dataTestIdType}-${dataTestIdCategory}`}`}
        className={linkActiveClass}
        to={path}
      >
        {title}
      </Link>
      {count !== null && (
        <span data-test-id={`${dataTestIdType}-book-count-for-${dataTestIdCategory}`} className={countClass}>
          {count}
        </span>
      )}
    </li>
  );
};
