import { memo } from 'react';
import { Link } from 'react-router-dom';

import { COLORS } from '../../common/enums-and-constants/constants';
import { Icon } from '../../ui/icon/icon';
import { ButtonTypography } from '../../ui/typography';

import style from './arrow-link.module.css';

type Props = {
  children?: string;
  path: string;
  positionArrow: 'before' | 'after';
  colorArrow?: string;
  className?: string;
  classNameText?: string;
};

export const ArrowLink = memo(({ children, path, positionArrow, className, classNameText, colorArrow }: Props) => (
  <Link to={path} className={`${style.linkContainer} ${className}`}>
    {positionArrow === 'before' && (
      <div className={`${style.arrow} ${style.leftArrow}`}>
        <Icon title='arrow-left' stroke={colorArrow || COLORS.DARK} />
      </div>
    )}
    <ButtonTypography className={`${classNameText} ${style.text}`} size='small' variant='mobile'>
      {children}
    </ButtonTypography>
    {positionArrow === 'after' && (
      <div className={`${style.arrow} ${style.rightArrow}`}>
        <Icon title='arrow-right' stroke={colorArrow || COLORS.DARK} />
      </div>
    )}
  </Link>
));
