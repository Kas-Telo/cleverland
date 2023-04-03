import { Fragment } from 'react';
import { FieldError } from 'react-hook-form';

import { Info } from '../../../ui/typography';

import style from './hint.module.css';

type Props = {
  error?: FieldError;
  isFocused: boolean;
};
export const HintPassword = ({ error, isFocused }: Props) => {
  const classErrorSpan = (errorVariable: boolean) => `${errorVariable ? style.markErrorText : ''}`;
  const classFullError = `${error && !isFocused ? style.markErrorText : style.fullErrorText}`;

  return (
    <Info dataTestId='hint' type='large' className={classFullError}>
      {error?.type === 'required' && !isFocused ? (
        error.message
      ) : (
        <Fragment>
          Пароль{' '}
          <span className={`${classErrorSpan(!!error?.types?.minLength)} ${style.errorText}`}>не менее 8 символов</span>
          , с{' '}
          <span className={`${classErrorSpan(!!error?.types?.capitalLetterRequired)} ${style.errorText}`}>
            заглавной буквой
          </span>{' '}
          и <span className={`${classErrorSpan(!!error?.types?.digitRequired)} ${style.errorText}`}>цифрой</span>
        </Fragment>
      )}
    </Info>
  );
};
