import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { RequestCommentType } from '../../api/comments/comments-api-types';
import { UserComment } from '../../api/user/user-types';
import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useActions } from '../../common/hooks/use-actions';
import { asyncBooksActions } from '../../store/books';
import { Button } from '../../ui';
import { Rating, RatingType } from '../../ui/rating/rating';
import { Textarea } from '../../ui/textarea/textarea';
import { Subtitle } from '../../ui/typography';
import { Modal } from '../modal/modal';
import { MyForm } from '../my-form/my-form';

import style from './feedback-modal.module.css';

type FormDataType = {
  text: string;
};

type Props = {
  onClose: () => void;
  bookId: number;
  userId: number;
  comment?: UserComment | undefined;
  dataTestIdModalOuter?: string;
  dataTestIdModal?: string;
  dataTestIdModalTitle?: string;
  dataTestIdModalCloseButton?: string;
  dataTestIdModalField?: string;
  dataTestIdModalSubmit: string;
};

export const FeedbackModal = ({
  dataTestIdModalField,
  dataTestIdModalOuter,
  dataTestIdModalSubmit,
  dataTestIdModalCloseButton,
  dataTestIdModalTitle,
  dataTestIdModal,
  onClose,
  bookId,
  userId,
  comment,
}: Props) => {
  const { pathname } = useLocation();
  const [rating, setRate] = useState(5);

  const { addComment, updateComment } = useActions(asyncBooksActions);
  const { register, handleSubmit } = useForm({
    values: {
      text: comment?.text ? comment.text : '',
    },
  });

  const onSubmit = ({ text }: FormDataType) => {
    const requestData: RequestCommentType = {
      data: {
        rating,
        text,
        book: bookId,
        user: userId,
      },
    };
    const page = pathname.includes(ROUTES.PROFILE) ? 'profile' : 'book';

    if (comment?.id) {
      updateComment({ requestData, commentId: comment.id, page });
    } else {
      addComment({ data: requestData, page });
    }
    onClose();
  };

  const onChangeRating = useCallback((rate: RatingType) => {
    setRate(rate);
  }, []);

  useEffect(() => {
    if (comment?.rating) {
      setRate(comment.rating);
    }
  }, [comment?.rating]);

  return (
    <Modal
      dataTestIdModal={dataTestIdModal}
      dataTestIdModalOuter={dataTestIdModalOuter}
      dataTestIdModalCloseButton={dataTestIdModalCloseButton}
      substrate={true}
      onClose={onClose}
    >
      <MyForm contentPosition='center' onSubmit={handleSubmit(onSubmit)}>
        <h4 data-test-id={dataTestIdModalTitle}>Оцените Книгу</h4>
        <div className={style.ratingBlock}>
          <Subtitle size='large'>Ваша оценка</Subtitle>
          <Rating widthOneStar={42} heightOneStar={42} rating={rating} setRate={onChangeRating} />
        </div>
        <Textarea
          dataTestId={dataTestIdModalField}
          className={style.textArea}
          placeholder='Оставить отзыв'
          {...register('text')}
        />
        <Button
          dataTestId={dataTestIdModalSubmit}
          submit={true}
          variant='primary'
          size='large'
          sizeTypography='large'
          className={style.submitButton}
          variantTypography='desktop'
        >
          Оценить
        </Button>
      </MyForm>
    </Modal>
  );
};
