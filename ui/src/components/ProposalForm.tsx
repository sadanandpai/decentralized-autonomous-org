import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  getFailedToast,
  getSuccessToast,
  txnSuccessToast,
  updateToast,
} from '@/constants/toast.data';

import { Spinner } from '@chakra-ui/react';
import { createNewProposal } from '@/actions/proposal.action';
import { useProposalsStore } from '@/actions/proposals.store';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

function ProposalForm({ setIsNewProposal }: any) {
  const toast = useToast();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getProposals = useProposalsStore((state) => state.getProposals);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const txn = await createNewProposal(title, description, document);
      toast(txnSuccessToast);
      setIsNewProposal(false);
      await txn.wait();
      toast(getSuccessToast('Proposal created', title));
      getProposals();
    } catch (e: any) {
      toast(getFailedToast(e.reason));
      setIsLoading(false);
    }
  };

  return (
    <div className="m-auto my-12 px-6 md:max-w-xl">
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Path to the document</FormLabel>
          <Input type="text" value={document} onChange={(e) => setDocument(e.target.value)} />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          {isLoading ? <Spinner /> : 'Create Proposal'}
        </Button>

        <Button
          variant="outline"
          colorScheme="orange"
          disabled={isLoading}
          onClick={() => setIsNewProposal(false)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default ProposalForm;
