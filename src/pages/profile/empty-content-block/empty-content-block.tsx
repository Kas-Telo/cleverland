import styleBlock from '../inner-block.module.css';

type Props = {
  children: string;
};

export const EmptyContentBlock = ({ children }: Props) => (
  <div data-test-id='empty-blue-card' className={styleBlock.emptyContentContainer}>
    <h3>{children}</h3>
  </div>
);
