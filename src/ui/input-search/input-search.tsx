import { DetailedHTMLProps, InputHTMLAttributes, memo, useCallback, useState } from 'react';

import { COLORS } from '../../common/enums-and-constants/constants';
import { Icon } from '../icon/icon';

import style from './input-search.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type Props = DefaultInputPropsType & {
  onCloseInput?: () => void;
  variant: 'desktop' | 'mobile';
  dataTestId?: string;
  dataTestIdClose?: string;
};

export const InputSearch = memo(
  ({ value, onChange, placeholder, className, onCloseInput, variant, dataTestIdClose, ...restProps }: Props) => {
    const [inputFocus, setInputFocus] = useState(false);

    const inputClass = `${variant === 'desktop' ? style.inputDesktop : style.inputMobile}`;
    const inputContainerStyle = {
      height: `${variant === 'desktop' ? '38px' : '32px'}`,
    };

    const onBlurInputHandler = () => {
      setInputFocus(false);
      if (onCloseInput && value === '') {
        onCloseInput();
      }
    };

    const onCloseClickHandler = useCallback(() => {
      setInputFocus(false);
      if (onCloseInput) {
        onCloseInput();
      }
    }, [onCloseInput]);

    return (
      <div {...restProps} style={inputContainerStyle} className={`${style.container} ${className}`}>
        {variant === 'desktop' && (
          <Icon
            className={style.iconSearch}
            title='search'
            width='16px'
            height='16px'
            fill={inputFocus ? COLORS.HOVER : COLORS.GRAY_BLACK_40}
          />
        )}
        <input
          data-test-id='input-search'
          type='text'
          className={`${style.input} ${inputClass}`}
          placeholder={placeholder}
          onFocus={() => setInputFocus(true)}
          onBlur={onBlurInputHandler}
          value={value}
          onChange={onChange}
        />
        {variant === 'mobile' && (
          <Icon
            dataTestId={dataTestIdClose}
            className={style.iconClose}
            title='close'
            width='16px'
            height='6px'
            fill={COLORS.HOVER}
            onClick={onCloseClickHandler}
          />
        )}
      </div>
    );
  }
);
