import { memo, ReactNode, useCallback } from 'react';

import { Size, useWindowSize } from '../../common/hooks/use-window-size';

import { ModalCloseButton } from './modal-close-button/modal-close-button';

import style from './modal.module.css';

type Props = {
  type?: 'info';
  positionContent?: 'start' | 'center' | 'end';
  children: ReactNode;
  dataTestIdModalOuter?: string;
  dataTestIdModal?: string;
  dataTestIdModalCloseButton?: string;
  headerContent?: ReactNode;
  substrate?: boolean;
  onClose?: () => void;
};

export const Modal = memo(
  ({
    children,
    type,
    positionContent,
    dataTestIdModal,
    dataTestIdModalOuter,
    dataTestIdModalCloseButton,
    substrate,
    headerContent,
    onClose,
  }: Props) => {
    const size: Size = useWindowSize();
    const classViewHeader = `${headerContent && style.viewHeader}`;
    const classModalWithSubstrate = `${substrate ? style.substrateActive : ''}`;
    const classPositionContent = `${
      positionContent === 'start'
        ? style.positionContentStart
        : positionContent === 'end'
        ? style.positionContentEnd
        : style.positionContentCenter
    }`;

    const onCloseHandler = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    return (
      <div
        data-test-id={dataTestIdModalOuter}
        onClick={onCloseHandler}
        className={`${style.substrate} ${classModalWithSubstrate}`}
        aria-hidden={true}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          data-test-id={dataTestIdModal}
          aria-hidden={true}
          className={style.modalContainer}
        >
          {onClose && (
            <ModalCloseButton
              dataTestId={dataTestIdModalCloseButton}
              className={style.buttonClose}
              onClose={onCloseHandler}
              size={size.width > 576 ? 'L' : 'M'}
            />
          )}
          <header className={`${style.header} ${classViewHeader}`}>{headerContent}</header>
          <div className={`${style.container} ${classPositionContent}  ${type === 'info' && style.infoContainer}`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
