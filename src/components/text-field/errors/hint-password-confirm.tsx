import { FieldError } from 'react-hook-form';

import { Info } from '../../../ui/typography';

import style from './hint.module.css';

type Props = {
  error?: FieldError;
  isFocused: boolean;
};
export const HintPasswordConfirm = ({ error, isFocused }: Props) => (
  <Info dataTestId='hint' type='large' className={style.markErrorText}>
    {error && error?.types?.required
      ? error.message
      : error?.types?.confirmValidate && !isFocused && 'Пароли не совпадают'}
  </Info>
);
