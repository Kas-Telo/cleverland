import { memo, MouseEvent, ReactElement } from 'react';

import { IMenuSubItem } from '../menu-sub-item/menu-sub-item';

import { Item } from './item/item';
import { ItemSelector } from './item-selector/item-selector';

export type IMenuItem = {
  title: string;
  children?: ReactElement<IMenuSubItem> | Array<ReactElement<IMenuSubItem>>;
  path: string;
  basedPath: string;
  collapsed?: boolean;
  onClickAccordion?: (collapsed: boolean) => void;
  onClick?: () => void;
  dataTestId?: string;
};

export const MenuItem = memo(
  ({ title, path, children, collapsed = false, onClickAccordion, dataTestId, basedPath, onClick }: IMenuItem) => {
    const itemSelectorClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      if (onClickAccordion) {
        onClickAccordion(!collapsed);
      }
    };

    const itemClick = () => {
      if (onClick) onClick();
    };

    return (
      <div>
        {children ? (
          <ItemSelector
            dataTestId={dataTestId}
            title={title}
            path={path}
            basedPath={basedPath}
            onClickSelector={itemSelectorClick}
            collapsed={collapsed}
          >
            {children}
          </ItemSelector>
        ) : (
          <Item dataTestId={dataTestId} title={title} path={path} onClick={itemClick} />
        )}
      </div>
    );
  }
);
