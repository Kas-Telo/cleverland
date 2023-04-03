import { ButtonHTMLAttributes, DetailedHTMLProps, memo, ReactNode } from 'react';

import { COLORS } from '../../common/enums-and-constants/constants';
import { Icon } from '../icon/icon';

import style from './button-with-icon.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = DefaultButtonPropsType & {
  isActive: boolean;
  titleIcon: 'tile' | 'burger-menu' | 'search' | 'sort-ascending' | 'sort-descending';
  size: 'small' | 'large';
  children?: string | ReactNode;
  dataTestId?: string;
};

export const ButtonWithIcon = memo(
  ({ className, titleIcon, size, isActive, children, dataTestId, ...restProps }: Props) => {
    const sizeIcon = size === 'large' ? 19 : 16;
    const activeButtonClass = `${isActive ? style.active : style.default}`;
    const withChildrenClass = `${children ? style.withChildren : ''}`;
    const classSizeButton = `${size === 'large' ? style.largeSizeButton : style.smallSizeButton}`;

    return (
      <button
        data-test-id={dataTestId}
        className={`${activeButtonClass} ${style.common}  ${withChildrenClass} ${classSizeButton}  ${className}`}
        type='button'
        {...restProps}
      >
        <Icon
          title={titleIcon}
          fill={isActive ? COLORS.WHITE : COLORS.GRAY_BLACK_40}
          height={`${sizeIcon}px`}
          width={`${sizeIcon}px`}
        />
        {children}
      </button>
    );
  }
);
