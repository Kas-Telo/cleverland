import { DetailedHTMLProps, HTMLAttributes, memo, ReactNode } from 'react';

import style from './body-typography.module.css';

type DefaultParagraphPropsType = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

type Props = DefaultParagraphPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
};

export const BodyTypography = memo(({ className, children, size, ...restprops }: Props) => {
  const finalClassName = `${size === 'large' ? style.large : style.small} ${className}`;

  return (
    <p className={finalClassName} {...restprops}>
      {children}
    </p>
  );
});
