import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { BodyTypography } from '../../typography';

import style from './crumb.module.css';

export type ICrumb = {
  path: string;
  children: string;
  dataTestIdLink?: string;
  dataTestIdName?: string;
};

export const Crumb = memo(({ path, children, dataTestIdLink, dataTestIdName }: ICrumb) => {
  const { pathname } = useLocation();
  const size: Size = useWindowSize();

  const sizeBodyTypography = size.width > 576 ? 'large' : 'small';

  return (
    <div className={style.container}>
      {pathname === path ? (
        <BodyTypography data-test-id={dataTestIdName} className={style.text} size={sizeBodyTypography}>
          {children}
        </BodyTypography>
      ) : (
        <Link to={path} data-test-id={dataTestIdLink}>
          <BodyTypography className={style.text} size={sizeBodyTypography}>
            {children}
          </BodyTypography>
        </Link>
      )}
    </div>
  );
});
