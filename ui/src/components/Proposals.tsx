import { Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import ProposalForm from './ProposalForm';
import { fetchProposals } from '@/actions/proposal.action';
import { useMetaMaskStore } from '@/actions/metaMask.store';
import { useRouter } from 'next/router';

function Proposal({ proposal }: any) {
  return (
    <Card className="mb-8" variant="filled">
      <CardHeader>
        <Text>
          <strong>{/* {proposal.id} */}</strong>. {proposal.title}
        </Text>
      </CardHeader>
      <CardBody>
        <Text>{proposal.description}</Text>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Text>{proposal.uploadDocPath}</Text>
        <div className="flex gap-4">
          <Button variant="solid" colorScheme="orange">
            No
          </Button>
          <Button variant="solid" colorScheme="green">
            Yes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function Proposals() {
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);
  const [proposals, setProprosals] = useState<any>([]);
  const [isNewProposal, setIsNewProposal] = useState<any>(false);

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
    console.log(proposals);

    setProprosals(proposals);
  };

  return (
    <div className="text-center">
      {isNewProposal ? (
        <ProposalForm setIsNewProposal={setIsNewProposal} />
      ) : (
        <Button variant="solid" colorScheme="blue" onClick={() => setIsNewProposal(true)}>
          Create New Proposal
        </Button>
      )}

      <div className="m-auto my-8 px-6 md:max-w-4xl">
        {proposals.map((proposal: any) => (
          <Proposal key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}

export default Proposals;
