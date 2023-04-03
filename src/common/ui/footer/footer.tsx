import facebook from '../../../assets/icons/social/facebook.svg';
import inst from '../../../assets/icons/social/inst.svg';
import linked from '../../../assets/icons/social/linked.svg';
import vk from '../../../assets/icons/social/vk.svg';
import { BodyTypography } from '../../../ui/typography';

import style from './footer.module.css';

export const Footer = () => (
  <footer className={style.footer}>
    <div className={style.container}>
      <BodyTypography className={style.copyright} size='large'>
        &copy; 2020-2023 Cleverland. Все права защищены
      </BodyTypography>
      <div className={style.socialBlock}>
        <a className={style.socialItem} href='#'>
          <img src={facebook} alt='facebook' />
        </a>
        <a className={style.socialItem} href='#'>
          <img src={inst} alt='instagram' />
        </a>
        <a className={style.socialItem} href='#'>
          <img src={vk} alt='vk' />
        </a>
        <a className={style.socialItem} href='#'>
          <img src={linked} alt='linked' />
        </a>
      </div>
    </div>
  </footer>
);
