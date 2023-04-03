import { DetailedHTMLProps, forwardRef, Ref, TextareaHTMLAttributes } from 'react';

import style from './textarea.module.css';

type DefaultTextareaType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type Props = DefaultTextareaType & {
  dataTestId?: string;
};

export const Textarea = forwardRef((props: Props, ref: Ref<HTMLTextAreaElement>) => {
  const { placeholder, dataTestId, rows = 4, className, ...restProps } = props;

  return (
    <textarea
      data-test-id={dataTestId}
      rows={rows}
      className={`${style.container} ${className}`}
      placeholder={placeholder}
      ref={ref}
      {...restProps}
    />
  );
});
