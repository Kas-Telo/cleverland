import { DetailedHTMLProps, HTMLAttributes, memo, ReactNode } from 'react';

import style from './button-typography.module.css';

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type Props = DefaultSpanPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
  variant: 'mobile' | 'desktop';
};

export const ButtonTypography = memo(({ children, size, variant, className, ...restprops }: Props) => {
  const sizeClass = `${size === 'large' ? style.large : style.small}`;
  let mobileClass = '';

  if (variant === 'mobile' && size === 'large') mobileClass = `${style.mobileLarge}`;
  if (variant === 'mobile' && size === 'small') mobileClass = `${style.mobileSmall}`;
  const finalClass = `${sizeClass} ${mobileClass} ${className}`;

  return (
    <span className={finalClass} {...restprops}>
      {children}
    </span>
  );
});
