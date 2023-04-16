import { Button } from '@chakra-ui/react';
import ProposalForm from './ProposalForm';
import { useState } from 'react';

function NewProposal() {
  const [isNewProposal, setIsNewProposal] = useState<any>(false);

  if (isNewProposal) {
    return <ProposalForm setIsNewProposal={setIsNewProposal} />;
  }

  return (
    <div className="text-center m-4">
      <Button variant="solid" colorScheme="blue" onClick={() => setIsNewProposal(true)}>
        Create New Proposal
      </Button>
    </div>
  );
}

export default NewProposal;
