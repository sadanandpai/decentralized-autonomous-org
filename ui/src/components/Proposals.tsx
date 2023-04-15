import { Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import { account, connectToMetaMask, getBalance } from '@/actions/Metamask';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { fetchProposals } from '@/actions/Proposal';

function Proposal({ proposal }: any) {
  return (
    <Card className="mb-8" variant={'filled'}>
      <CardHeader>
        <Text>
          <strong>{proposal.id}</strong>. {proposal.title}
        </Text>
      </CardHeader>
      <CardBody>
        <Text>{proposal.description}</Text>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Text>{proposal.result}</Text>
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
  const [proposals, setProprosals] = useState<any>([]);

  const getProposals = async () => {
    setProprosals(await fetchProposals());
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="m-auto my-8 px-6 md:max-w-4xl">
      {proposals.map((proposal: any) => (
        <Proposal key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}

export default Proposals;
