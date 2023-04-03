import { memo, ReactElement } from 'react';

import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { Icon } from '../icon/icon';

import { ICrumb } from './crumb/crumb';

import style from './breadcrumbs.module.css';

type Props = {
  children: ReactElement<ICrumb> | Array<ReactElement<ICrumb>>;
};

export const Breadcrumbs = memo(({ children }: Props) => {
  const size: Size = useWindowSize();

  const sizeIcon = size.width > 576 ? 24 : 16;

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        {Array.isArray(children)
          ? children.map((el, index) => (
              <div key={`${el.props.path}`} className={style.containerSlashIcon}>
                {el}
                {index < children.length - 1 && (
                  <Icon height={sizeIcon} width={sizeIcon} title='slash' className={style.slashIcon} stroke='#A7A7A7' />
                )}
              </div>
            ))
          : children}
      </div>
    </div>
  );
});
