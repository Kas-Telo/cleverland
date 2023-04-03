import {
  ChangeEvent,
  DetailedHTMLProps,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';

import { Icon } from '../icon/icon';

import style from './input.module.css';

type PasswordMode = 'public' | 'private';

type DefaultInputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type InputPropsType = DefaultInputType & {
  checkMark?: boolean;
  className?: string;
  isError?: boolean;
  isFocused?: boolean;
};
export const Input = forwardRef((props: InputPropsType, ref: ForwardedRef<HTMLInputElement>) => {
  const { type, onChange, onFocus, onBlur, placeholder, checkMark, className, isError, defaultValue, ...restProps } =
    props;
  const [viewPasswordMode, setViewPasswordMode] = useState<PasswordMode>('private');
  const [localValue, setLocalValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const classFocusInputContainerClass = `${
    inputFocus || defaultValue || localValue ? style.focusInputContainer : style.unFocusInputContainer
  }`;
  const classErrorInputContainer = `${isError ? style.errorInput : ''}`;
  const classLabelPlaceholder = `${
    defaultValue || localValue || inputFocus ? style.labelPlaceholderActive : style.labelPlaceholder
  }`;
  const classInputFocusContent = `${
    defaultValue || localValue || inputFocus ? style.inputFocusContent : style.inputUnFocusContent
  }`;

  const onBlurCallBack = (e: FocusEvent<HTMLInputElement, Element>) => {
    setInputFocus(false);
    if (onBlur) onBlur(e);
  };

  const onFocusCallback = (e: FocusEvent<HTMLInputElement>) => {
    setInputFocus(true);
    if (onFocus) onFocus(e);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.currentTarget.value);
    if (onChange) onChange(e);
  };

  const onClosedIconClick = useCallback(() => {
    setViewPasswordMode('public');
  }, [setViewPasswordMode]);
  const onOpenedIconClick = useCallback(() => {
    setViewPasswordMode('private');
  }, [setViewPasswordMode]);

  return (
    <div
      className={`${style.inputContainer} ${classFocusInputContainerClass} ${classErrorInputContainer} ${className}`}
    >
      <div className={`${style.inputContentContainer}`}>
        <div className={`${style.content} ${classInputFocusContent}`}>
          <label className={classLabelPlaceholder}>{placeholder}</label>
          <input
            className={`${style.input}`}
            type={type === 'password' ? (viewPasswordMode === 'private' ? 'password' : 'text') : type}
            ref={ref}
            onFocus={onFocusCallback}
            onBlur={onBlurCallBack}
            onChange={onChangeHandler}
            defaultValue={defaultValue}
            {...restProps}
          />
        </div>
        {(localValue || inputFocus) && (
          <Fragment>
            {type === 'password' && checkMark && <Icon dataTestId='checkmark' title='check-true' />}
            {type === 'password' && viewPasswordMode === 'public' && (
              <Icon dataTestId='eye-opened' title='eye-open' onClick={onOpenedIconClick} />
            )}
            {type === 'password' && viewPasswordMode === 'private' && (
              <Icon dataTestId='eye-closed' title='eye-close' onClick={onClosedIconClick} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
});
