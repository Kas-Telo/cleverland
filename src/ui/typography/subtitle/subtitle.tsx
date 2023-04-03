import { DetailedHTMLProps, HTMLAttributes, memo, ReactNode } from 'react';

import style from './subtitle.module.css';

type DefaultParagraphPropsType = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

type Props = DefaultParagraphPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
};

export const Subtitle = memo(({ className, children, size, ...restProps }: Props) => {
  const finalClassName = `${size === 'large' ? style.large : style.small} ${className}`;

  return (
    <p className={finalClassName} {...restProps}>
      {children}
    </p>
  );
});
