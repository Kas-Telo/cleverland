import { memo, SVGProps } from 'react';

import { ReactComponent as ArrowDropDown } from '../../assets/icons/action/arrow_drop_down.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/action/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/action/arrow-right.svg';
import { ReactComponent as BurgerMenu } from '../../assets/icons/action/burger-menu.svg';
import { ReactComponent as CheckTrue } from '../../assets/icons/action/check-true.svg';
import { ReactComponent as Close } from '../../assets/icons/action/close.svg';
import { ReactComponent as EyeClose } from '../../assets/icons/action/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/action/eye-open.svg';
import { ReactComponent as Photo } from '../../assets/icons/action/photo.svg';
import { ReactComponent as Search } from '../../assets/icons/action/search.svg';
import { ReactComponent as Slash } from '../../assets/icons/action/slash.svg';
import { ReactComponent as SortAscending } from '../../assets/icons/action/sort-ascending.svg';
import { ReactComponent as SortDescending } from '../../assets/icons/action/sort-descending.svg';
import { ReactComponent as DefaultStar } from '../../assets/icons/action/star/default-star.svg';
import { ReactComponent as OutlineStar } from '../../assets/icons/action/star/outline-star.svg';
import { ReactComponent as Tile } from '../../assets/icons/action/tile.svg';
import { ReactComponent as Error } from '../../assets/icons/alerts/error.svg';
import { ReactComponent as Success } from '../../assets/icons/alerts/success.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/chevron/down.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/chevron/up.svg';
import { ReactComponent as Facebook } from '../../assets/icons/social/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/icons/social/inst.svg';
import { ReactComponent as LinkedIn } from '../../assets/icons/social/linked.svg';
import { ReactComponent as Vk } from '../../assets/icons/social/vk.svg';
import { ReactComponent as Loader } from '../../assets/loader/loader.svg';

type DefaultSvgPropsType = SVGProps<SVGSVGElement>;
type Props = DefaultSvgPropsType & {
  title:
    | 'tile'
    | 'burger-menu'
    | 'search'
    | 'sort-ascending'
    | 'sort-descending'
    | 'close'
    | 'instagram'
    | 'facebook'
    | 'vk'
    | 'linked-in'
    | 'default-star'
    | 'outline-star'
    | 'slash'
    | 'chevron-up'
    | 'chevron-down'
    | 'loader'
    | 'success'
    | 'error'
    | 'eye-open'
    | 'eye-close'
    | 'check-true'
    | 'arrow-left'
    | 'arrow-right'
    | 'arrow-up'
    | 'arrow-down'
    | 'photo'
    | 'arrow-drop-down';
  dataTestId?: string;
};

export const Icon = memo(({ title, dataTestId, ...restProps }: Props) => {
  switch (title) {
    case 'tile':
      return <Tile {...restProps} />;
    case 'burger-menu':
      return <BurgerMenu data-test-id={dataTestId} {...restProps} />;
    case 'search':
      return <Search data-test-id={dataTestId} {...restProps} />;
    case 'sort-ascending':
      return <SortAscending data-test-id={dataTestId} {...restProps} />;
    case 'sort-descending':
      return <SortDescending data-test-id={dataTestId} {...restProps} />;
    case 'close':
      return <Close data-test-id={dataTestId} {...restProps} />;
    case 'instagram':
      return <Facebook data-test-id={dataTestId} {...restProps} />;
    case 'vk':
      return <Instagram data-test-id={dataTestId} {...restProps} />;
    case 'facebook':
      return <Vk data-test-id={dataTestId} {...restProps} />;
    case 'linked-in':
      return <LinkedIn data-test-id={dataTestId} {...restProps} />;
    case 'default-star':
      return <DefaultStar data-test-id={dataTestId} {...restProps} />;
    case 'outline-star':
      return <OutlineStar data-test-id={dataTestId} {...restProps} />;
    case 'slash':
      return <Slash data-test-id={dataTestId} {...restProps} />;
    case 'chevron-up':
      return <ArrowUp data-test-id={dataTestId} {...restProps} />;
    case 'chevron-down':
      return <ArrowDown data-test-id={dataTestId} {...restProps} />;
    case 'loader':
      return <Loader data-test-id={dataTestId} {...restProps} />;
    case 'success':
      return <Success data-test-id={dataTestId} {...restProps} />;
    case 'error':
      return <Error data-test-id={dataTestId} {...restProps} />;
    case 'eye-open':
      return <EyeOpen data-test-id={dataTestId} {...restProps} />;
    case 'eye-close':
      return <EyeClose data-test-id={dataTestId} {...restProps} />;
    case 'check-true':
      return <CheckTrue data-test-id={dataTestId} {...restProps} />;
    case 'arrow-left':
      return <ArrowLeft data-test-id={dataTestId} {...restProps} />;
    case 'arrow-right':
      return <ArrowRight data-test-id={dataTestId} {...restProps} />;
    case 'arrow-up':
      return <ArrowUp data-test-id={dataTestId} {...restProps} />;
    case 'arrow-down':
      return <ArrowDown data-test-id={dataTestId} {...restProps} />;
    case 'photo':
      return <Photo data-test-id={dataTestId} {...restProps} />;
    case 'arrow-drop-down':
      return <ArrowDropDown data-test-id={dataTestId} {...restProps} />;
    default:
      return <svg />;
  }
});
