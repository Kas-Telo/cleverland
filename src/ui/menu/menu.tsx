import { ReactElement } from 'react';

import { IMenuItem } from './menu-item/menu-item';

import style from './menu.module.css';

interface IMenu {
  className?: string;
  children: ReactElement<IMenuItem> | Array<ReactElement<IMenuItem>>;
}

export const Menu = ({ children, className }: IMenu) => (
  <nav className={`${style.container} ${className}`}>{children}</nav>
);
