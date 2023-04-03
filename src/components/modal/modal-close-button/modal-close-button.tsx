import { memo } from 'react';

import { COLORS } from '../../../common/enums-and-constants/constants';
import { Icon } from '../../../ui/icon/icon';

import style from './modal-close-button.module.css';

type Props = {
  onClose: () => void;
  className?: string;
  dataTestId?: string;
  size: 'M' | 'L';
};

export const ModalCloseButton = memo(({ dataTestId, size, onClose, className }: Props) => {
  const widthButton = size === 'M' ? 32 : 48;
  const heightButton = size === 'M' ? 32 : 48;
  const widthIcon = widthButton / 2;
  const heightIcon = heightButton / 2;

  const classSizeButton = `${size === 'M' ? style.mediumSizeButton : style.largeSizeButton}`;

  return (
    <button
      data-test-id={dataTestId}
      className={`${style.button} ${classSizeButton} ${className}`}
      type='submit'
      onClick={onClose}
    >
      <Icon className={style.icon} title='close' width={widthIcon} height={heightIcon} fill={COLORS.HOVER} />
    </button>
  );
});
