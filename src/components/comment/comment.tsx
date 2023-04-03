import { memo } from 'react';

import { ResponseCommentBookType } from '../../api/books/books-api-types';
import { Rating } from '../../ui/rating/rating';
import { BodyTypography } from '../../ui/typography';

import { UserBlock } from './user-block/user-block';

import style from './comment.module.css';

type Props = {
  comment: ResponseCommentBookType;
};

export const Comment = memo(({ comment }: Props) => (
  <div data-test-id='comment-wrapper' className={style.container}>
    <div className={style.userBlock}>
      <UserBlock
        fullName={`${comment.user.firstName} ${comment.user.lastName}`}
        avatar={comment.user.avatarUrl}
        dataOfCreation={comment.createdAt}
      />
    </div>
    <Rating rating={comment.rating} />
    <BodyTypography data-test-id='comment-text' className={style.content} size='large'>
      {comment.text}
    </BodyTypography>
  </div>
));
