import { useEffect, useState } from 'react';

import NewProposal from './NewProposal';
import dynamic from 'next/dynamic';
import { fetchProposals } from '@/actions/proposal.action';
import { shallow } from 'zustand/shallow';
import { useMetaMaskStore } from '@/actions/metaMask.store';
import { useProposalsStore } from '@/actions/proposals.store';
import { useRouter } from 'next/router';

const Proposal = dynamic(() => import('./Proposal'), {
  ssr: false,
});

function Proposals() {
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);
  const [proposals, getProposals, activeProposal] = useProposalsStore(
    (state) => [state.proposals, state.getProposals, state.activeProposal],
    shallow
  );

  useEffect(() => {
    if (provider) {
      getProposals();
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {activeProposal?.status === 0 ? '' : <NewProposal />}

      <div className="m-auto my-8 px-6 md:max-w-4xl">
        {proposals.map((proposal: any) => (
          <Proposal key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}

export default Proposals;
