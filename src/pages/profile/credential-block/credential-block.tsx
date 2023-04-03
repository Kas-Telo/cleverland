import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { BodyTypography } from '../../../ui/typography';

import { FormCredentialBlock } from './form-credential-block/form-credential-block';

import styleBlock from '../inner-block.module.css';

export const CredentialBlock = () => {
  const size: Size = useWindowSize();

  return (
    <div className={styleBlock.container}>
      <header className={styleBlock.headerBlock}>
        {size.width > 576 ? (
          <h4 className={styleBlock.headerTitle}>Учётные данные</h4>
        ) : (
          <h3 className={styleBlock.headerTitle}>Учётные данные</h3>
        )}
        <BodyTypography className={styleBlock.headerDescription} size='large'>
          Здесь вы можете отредактировать информацию о себе
        </BodyTypography>
      </header>
      <FormCredentialBlock />
    </div>
  );
};
