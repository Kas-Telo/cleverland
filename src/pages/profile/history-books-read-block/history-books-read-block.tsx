import { useCallback, useState } from 'react';

import { UserComment } from '../../../api/user/user-types';
import { useActions } from '../../../common/hooks/use-actions';
import { useAppDispatch } from '../../../common/hooks/use-app-dispatch';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { getComment } from '../../../common/utils/helpers/get-comment';
import { FeedbackModal } from '../../../components/feedback-modal/feedback-modal';
import { syncAppActions } from '../../../store/app';
import { asyncBooksActions } from '../../../store/books';
import { userSelectors } from '../../../store/user';
import { BodyTypography } from '../../../ui/typography';
import { EmptyContentBlock } from '../empty-content-block/empty-content-block';

import { HistoryBooksSlider } from './history-books-slider/history-books-slider';

import styleBlock from '../inner-block.module.css';

export const HistoryBooksReadBlock = () => {
  const size: Size = useWindowSize();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.selectUser);
  const [feedbackBookId, setFeedbackBookId] = useState<number | undefined>(undefined);

  const { toggleLoading } = useActions(syncAppActions);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookComment, setBookComment] = useState<UserComment | undefined>(undefined);

  const onOpenFeedbackModal = useCallback(
    async (bookId: number) => {
      toggleLoading({ isLoading: true });
      const action = await dispatch(asyncBooksActions.fetchBook({ id: bookId }));

      toggleLoading({ isLoading: false });

      if (asyncBooksActions.fetchBook.fulfilled.match(action)) {
        const comment = getComment(action.payload.id, user.comments);

        setBookComment(comment);
        setFeedbackBookId(bookId);
        setIsOpenModal(true);
      }
    },
    [dispatch, toggleLoading, user.comments]
  );

  return (
    <div data-test-id='history' className={styleBlock.container}>
      {isOpenModal && (
        <FeedbackModal
          onClose={() => setIsOpenModal(false)}
          bookId={feedbackBookId as number}
          userId={user.id}
          comment={bookComment}
          dataTestIdModalOuter='modal-outer'
          dataTestIdModal='modal-rate-book'
          dataTestIdModalTitle='modal-title'
          dataTestIdModalCloseButton='modal-close-button'
          dataTestIdModalField='comment'
          dataTestIdModalSubmit='button-comment'
        />
      )}
      <header className={styleBlock.headerBlock}>
        {size.width > 576 ? (
          <h4 className={styleBlock.headerTitle}>История</h4>
        ) : (
          <h3 className={styleBlock.headerTitle}>История</h3>
        )}
        <BodyTypography className={styleBlock.headerDescription} size='large'>
          Список прочитанных книг
        </BodyTypography>
      </header>
      <div>
        {user.history?.books ? (
          <HistoryBooksSlider onOpenFeedbackModal={onOpenFeedbackModal} />
        ) : (
          <EmptyContentBlock>Вы не читали книг из нашей библиотеки</EmptyContentBlock>
        )}
      </div>
    </div>
  );
};
