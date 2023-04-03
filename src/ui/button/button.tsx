import { ButtonHTMLAttributes, DetailedHTMLProps, memo, ReactNode } from 'react';

import style from './button.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = DefaultButtonPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
  sizeTypography: 'large' | 'small';
  variant: 'primary' | 'secondary';
  variantTypography: 'mobile' | 'desktop';
  submit: boolean;
  dataTestId?: string;
  block?: boolean;
};

export const Button = memo(
  ({
    dataTestId,
    children,
    disabled,
    size,
    sizeTypography,
    variant,
    variantTypography,
    block,
    className,
    submit,
    ...restProps
  }: Props) => {
    const classBlock = `${block ? style.fullWidth : ''}`;
    const classSize = `${size === 'large' ? style.large : style.small}`;
    const classText = `${
      variantTypography === 'desktop' && sizeTypography === 'large'
        ? style.desktopTextLarge
        : variantTypography === 'desktop' && sizeTypography === 'small'
        ? style.desktopTextSmall
        : variantTypography === 'mobile' && sizeTypography === 'large'
        ? style.mobileTextLarge
        : style.mobileTextSmall
    }`;

    let classDisabled: string;

    if (disabled) {
      classDisabled = `${variant === 'primary' ? style.disabledPrimary : style.disabledSecondary}`;
    } else {
      classDisabled = `${variant === 'primary' ? style.primary : style.secondary}`;
    }

    return (
      <button
        data-test-id={dataTestId}
        className={` ${classBlock} ${classSize} ${style.text} ${classText} ${classDisabled} ${classBlock} ${className}`}
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);
