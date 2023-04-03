import { DetailedHTMLProps, FormHTMLAttributes, memo, ReactNode } from 'react';

import style from './my-form.module.css';

type DefaultInputPropsType = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

type Props = DefaultInputPropsType & {
  children: ReactNode;
  className?: string;
  contentPosition?: 'center' | 'start' | 'end';
};

export const MyForm = memo(({ className, children, contentPosition, ...restProps }: Props) => {
  const classFormContentPosition = `${
    contentPosition === 'center'
      ? style.centerContentPosition
      : contentPosition === 'end'
      ? style.endContentPosition
      : ''
  }`;

  return (
    <form {...restProps} className={`${style.form} ${classFormContentPosition} ${className}`}>
      {children}
    </form>
  );
});
