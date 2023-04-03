import { useState } from 'react';

import { ResponseCommentBookType } from '../../../api/books/books-api-types';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { sortCommentsByDate } from '../../../common/utils/date/formatted-date-util';
import { Comment } from '../../../components/comment/comment';
import { userSelectors } from '../../../store/user';
import { Button } from '../../../ui';
import { Icon } from '../../../ui/icon/icon';
import { Subtitle } from '../../../ui/typography';

import style from './feedback.module.css';

type Props = {
  comments: ResponseCommentBookType[] | null;
  onOpenModal: (comment: ResponseCommentBookType | undefined) => void;
};

export const Feedback = ({ comments, onOpenModal }: Props) => {
  const [isOpenComments, toggleComments] = useState(true);
  const size: Size = useWindowSize();

  const userId = useAppSelector(userSelectors.selectUserId);

  const comment = comments?.find((el) => el.user.commentUserId === userId);

  const commentsViewClass = `${isOpenComments ? style.contentView : style.contentNotView}`;

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          {size.width > 992 ? (
            <h5>Отзывы</h5>
          ) : size.width > 576 ? (
            <Subtitle size='large'>Отзывы</Subtitle>
          ) : (
            <h3>Отзывы</h3>
          )}
          <span className={style.count}>{comments ? comments.length : 0}</span>
        </div>
        <button
          data-test-id='button-hide-reviews'
          type='button'
          className={style.buttonTitle}
          onClick={() => toggleComments(!isOpenComments)}
        >
          <Icon title={isOpenComments ? 'chevron-up' : 'chevron-down'} />
        </button>
      </div>
      <div className={style.commentsContainer} data-test-id='reviews'>
        {comments && (
          <div className={`${style.contentContainer} ${commentsViewClass}`}>
            <div className={style.hr} />
            <ul className={style.containerList}>
              {sortCommentsByDate(comments).map((el) => (
                <li key={el.id}>
                  <Comment comment={el} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          dataTestId='button-rate-book'
          className={style.ratingButton}
          size={size.width > 576 ? 'large' : 'small'}
          sizeTypography={size.width > 576 ? 'large' : 'small'}
          variant={comment ? 'secondary' : 'primary'}
          variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
          submit={false}
          onClick={() => onOpenModal(comment)}
        >
          {comment ? 'Изменить оценку' : 'Оценить книгу'}
        </Button>
      </div>
    </div>
  );
};
