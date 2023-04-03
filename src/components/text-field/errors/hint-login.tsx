import { Fragment } from 'react';
import { FieldError } from 'react-hook-form';

import { Info } from '../../../ui/typography';

import style from './hint.module.css';

type Props = {
  isFocused: boolean;
  error?: FieldError;
};
export const HintLogin = ({ isFocused, error }: Props) => {
  const classErrorSpan = (errorVariable: boolean) => `${errorVariable ? style.markErrorText : ''}`;
  const classFullError = `${error && !isFocused ? style.markErrorText : style.fullErrorText}`;

  return (
    <Info dataTestId='hint' type='large' className={`${classFullError} ${style.hintContainer}`}>
      {error?.type === 'required' && !isFocused ? (
        error?.message
      ) : (
        <Fragment>
          Используйте для логина{' '}
          <span className={`${classErrorSpan(!!error?.types?.latinRequired)} ${style.errorText}`}>
            латинский алфавит
          </span>{' '}
          и <span className={`${classErrorSpan(!!error?.types?.digitRequired)} ${style.errorText}`}>цифры</span>
        </Fragment>
      )}
    </Info>
  );
};
