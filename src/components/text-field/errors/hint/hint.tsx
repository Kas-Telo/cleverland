import { FieldError } from 'react-hook-form';

import { Info } from '../../../../ui/typography';
import { HintLogin } from '../hint-login';
import { HintPassword } from '../hint-password';
import { HintPasswordConfirm } from '../hint-password-confirm';
import { HintPhone } from '../hint-phone';

import style from '../hint.module.css';

type Props = {
  error?: FieldError;
  isFocused: boolean;
  message?: string;
  type?: 'password' | 'login' | 'confirmPassword' | 'phone' | 'email';
};

export const Hint = ({ error, isFocused, message, type }: Props) => {
  const emailMessage = 'Введите корректный e-mail';

  return (
    <div aria-hidden={true}>
      {type === 'password' ? (
        <HintPassword isFocused={isFocused} error={error} />
      ) : type === 'login' ? (
        <HintLogin isFocused={isFocused} error={error} />
      ) : type === 'confirmPassword' ? (
        <HintPasswordConfirm isFocused={isFocused} error={error} />
      ) : type === 'phone' ? (
        <HintPhone error={error} />
      ) : type === 'email' && error?.type !== 'required' && !!error?.message ? (
        <Info dataTestId='hint' type='large' className={style.markErrorText}>
          {message || emailMessage}
        </Info>
      ) : (
        <Info dataTestId='hint' type='large' className={style.markErrorText}>
          {error?.message || message}
        </Info>
      )}
    </div>
  );
};
