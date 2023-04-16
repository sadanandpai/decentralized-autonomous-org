import { useEffect, useState } from 'react';

import NewProposal from './NewProposal';
import dynamic from 'next/dynamic';
import { fetchProposals } from '@/actions/proposal.action';
import { useMetaMaskStore } from '@/actions/metaMask.store';
import { useRouter } from 'next/router';

const Proposal = dynamic(() => import('./Proposal'), {
  ssr: false,
});

function Proposals() {
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);
  const [proposals, setProprosals] = useState<any>([]);
  const [hasActiveProposal, setHasActiveProposal] = useState<any>([]);

  useEffect(() => {
    if (provider) {
      getProposals();
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProposals = async () => {
    const proposals = await fetchProposals();
    setProprosals(proposals.reverse());
    setHasActiveProposal(proposals.at(-1)?.status === 0);

    console.log(proposals);
  };

  return (
    <div>
      {!hasActiveProposal && <NewProposal />}

      <div className="m-auto my-8 px-6 md:max-w-4xl">
        {proposals.map((proposal: any) => (
          <Proposal key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}

export default Proposals;
