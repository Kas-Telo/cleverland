import { ReactNode } from 'react';

import style from './red-mask-content-block.module.css';

type Props = {
  children: string | ReactNode;
};

export const RedMaskContentBlock = ({ children }: Props) => (
  <div data-test-id='expired' className={style.redMaskContainer}>
    <div className={style.contentBlock}>{children}</div>
  </div>
);
