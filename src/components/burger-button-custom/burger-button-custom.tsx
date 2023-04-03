import { memo } from 'react';

import style from './burger-button-custom.module.css';

type Props = {
  dataTestId?: string;
  isOpenMenu: boolean;
  toggleMenu: () => void;
  className?: string;
};

export const BurgerButtonCustom = memo(({ isOpenMenu, toggleMenu, className, dataTestId }: Props) => {
  const activeSpan = `${isOpenMenu ? style.active : ''}`;

  return (
    <button data-test-id={dataTestId} type='button' className={`${style.container} ${className}`} onClick={toggleMenu}>
      <span className={`${style.item} ${activeSpan}`} />
    </button>
  );
});
