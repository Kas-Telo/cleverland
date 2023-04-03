import { memo, useEffect } from 'react';

import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { Icon } from '../icon/icon';
import { Subtitle } from '../typography';

import style from './alert.module.css';

type Props = {
  children: string;
  type: 'error' | 'success';
  onClose: (type: 'error' | 'success') => void;
};

export const Alert = memo(({ children, type, onClose }: Props) => {
  const size: Size = useWindowSize();

  const sizeAlertIcon = size.width > 992 ? 32 : 24;
  const sizeCloseIcon = size.width > 992 ? 24 : 16;
  const sizeSubtitle = size.width > 992 ? 'large' : 'small';
  const typeAlertIcon = type === 'error' ? 'error' : 'success';

  const alertClass = `${type === 'error' ? style.error : style.success}`;

  const onCloseHandler = () => {
    onClose(type);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      onClose(type);
    }, 4000);

    return () => {
      clearTimeout(id);
    };
  }, [onClose, type]);

  return (
    <div data-test-id='error' className={`${style.container} ${alertClass}`}>
      <div className={style.contentContainer}>
        <div>
          <Icon title={typeAlertIcon} width={sizeAlertIcon} height={sizeAlertIcon} />
        </div>
        <Subtitle className={style.message} size={sizeSubtitle}>
          {children}
        </Subtitle>
        <button data-test-id='alert-close' className={style.closeButton} type='button' onClick={onCloseHandler}>
          <Icon title='close' width={sizeCloseIcon} height={sizeCloseIcon} />
        </button>
      </div>
    </div>
  );
});
