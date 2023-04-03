import { FieldError } from 'react-hook-form';

import { Info } from '../../../ui/typography';

import style from './hint.module.css';

type Props = {
  error?: FieldError;
};
export const HintPhone = ({ error }: Props) => {
  const classPhoneError = `${error && style.markErrorText}`;

  return (
    <Info dataTestId='hint' type='large' className={`${classPhoneError} ${style.fullErrorText}`}>
      {error?.types?.required ? error?.message : 'В формате +375 (xx) xxx-xx-xx'}
    </Info>
  );
};
