import { ResponseBookCardType } from '../../../api/books/books-api-types';
import { ROUTES } from '../../../common/enums-and-constants/routes-enum';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { BookCard } from '../../../components/book-card';
import { userSelectors } from '../../../store/user';
import { BodyTypography, Subtitle } from '../../../ui/typography';
import { EmptyContentBlock } from '../empty-content-block/empty-content-block';
import { RedMaskContentBlock } from '../red-mask-conent-block/red-mask-content-block';

import styleBlock from '../inner-block.module.css';

export const HandedBookBlock = () => {
  const size: Size = useWindowSize();
  const user = useAppSelector(userSelectors.selectUser);

  const book: ResponseBookCardType = user.delivery?.book
    ? {
        id: user.delivery.book.id,
        title: user.delivery.book.title,
        rating: user.delivery.book.rating,
        authors: user.delivery.book.authors,
        issueYear: user.delivery.book.issueYear,
        image: user.delivery.book.image,
        delivery: {
          id: user.delivery.id,
          handed: user.delivery.handed,
          dateHandedFrom: user.delivery.dateHandedFrom,
          dateHandedTo: user.delivery.dateHandedTo,
          recipientId: user.id,
          recipientFirstName: user.firstName,
          recipientLastName: user.lastName,
        },
        booking: null,
        categories: null,
        histories: null,
      }
    : ({} as ResponseBookCardType);

  return (
    <div className={styleBlock.container}>
      <header className={styleBlock.headerBlock}>
        {size.width > 576 ? (
          <h4 className={styleBlock.headerTitle}>Книга которую взяли</h4>
        ) : (
          <h3 className={styleBlock.headerTitle}>Книга которую взяли</h3>
        )}
        <BodyTypography className={styleBlock.headerDescription} size='large'>
          Здесь можете просмотреть информацию о книге и узнать сроки возврата
        </BodyTypography>
      </header>
      <div className={styleBlock.cardContainer}>
        {user.delivery?.book ? (
          <BookCard
            bookCard={book}
            displayOption='list'
            displayLocation='handed-profile'
            path={`${ROUTES.BOOKS}/all/${user.delivery.book.id}`}
          />
        ) : (
          <EmptyContentBlock>Прочитав книгу, она отобразится в истории</EmptyContentBlock>
        )}
        {user.delivery?.book && new Date(user.delivery?.dateHandedTo as string).valueOf() < new Date().valueOf() && (
          <RedMaskContentBlock>
            <h3>Вышел срок пользования книги</h3>
            <Subtitle className={styleBlock.redMaskText} size='large'>
              Верните книгу, пожалуйста
            </Subtitle>
          </RedMaskContentBlock>
        )}
      </div>
    </div>
  );
};
