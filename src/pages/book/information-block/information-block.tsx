import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { Subtitle } from '../../../ui/typography';

import { TableInfo } from './table-info/table-info';

import style from './information-block.module.css';

type Props = {
  categories: string[] | null;
  issueYear: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
};

export const InformationBlock = ({
  ISBN,
  issueYear,
  format,
  publish,
  pages,
  producer,
  weight,
  cover,
  categories,
}: Props) => {
  const size: Size = useWindowSize();

  return (
    <div className={style.container}>
      {size.width > 992 ? (
        <h5>Подробная информация</h5>
      ) : size.width > 576 ? (
        <Subtitle size='large'>Подробная информация</Subtitle>
      ) : (
        <h3>Подробная информация</h3>
      )}
      <div className={style.hr} />
      <TableInfo
        cover={cover}
        weight={weight}
        categories={categories}
        ISBN={ISBN}
        issueYear={issueYear}
        format={format}
        pages={pages}
        producer={producer}
        publish={publish}
      />
    </div>
  );
};
