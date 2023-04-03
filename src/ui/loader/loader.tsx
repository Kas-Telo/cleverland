import { Icon } from '../icon/icon';

import style from './loader.module.css';

export const Loader = () => (
  <div data-test-id='loader' className={style.loader}>
    <div className={style.circle}>
      <Icon title='loader' />
      <div className={style.hingePoint} />
    </div>
  </div>
);
