import { InfoItem } from './info-item/info-item';

import style from './table-info.module.css';

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

export const TableInfo = ({ ISBN, issueYear, format, publish, pages, producer, weight, cover, categories }: Props) => {
  const categoriesString = categories?.join(', ');

  const leftColumnClass = `${style.leftColumn}`;

  return (
    <div className={style.container}>
      <div className={`${style.column} ${leftColumnClass}`}>
        <InfoItem title='Издательство' description={publish} />
        <InfoItem title='Год издания' description={issueYear} />
        <InfoItem title='Страниц' description={pages} />
        <InfoItem title='Переплет' description={cover} />
        <InfoItem title='Формат' description={format} />
      </div>
      <div className={style.column}>
        <InfoItem title='Жанр' description={categoriesString} />
        <InfoItem title='Вес' description={weight} />
        <InfoItem title='ISBN' description={ISBN} />
        <InfoItem title='Изготовитель' description={producer} />
      </div>
    </div>
  );
};
