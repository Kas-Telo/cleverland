import { ContractBlock } from './contract-block/contract-block';
import { TermsBlock } from './terms-block/terms-block';

type Props = {
  contentView: 'terms' | 'contract';
};

export const Terms = ({ contentView }: Props) => (
  <section>
    {contentView === 'terms' && <TermsBlock />}
    {contentView === 'contract' && <ContractBlock />}
  </section>
);
