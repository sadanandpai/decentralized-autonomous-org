import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { getFailedToast, getSuccessToast } from '@/constants/toast.data';

import { Spinner } from '@chakra-ui/react';
import { createNewProposal } from '@/actions/proposal.action';
import { useProposalsStore } from '@/stores/proposals.store';
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
      toast(getSuccessToast({ title: 'You will be notified on transaction completion' }));
      setIsNewProposal(false);
      await txn.wait();
      toast(getSuccessToast({ title, description: 'Proposal created' }));
      getProposals();
    } catch (e: any) {
      toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
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
        <Text className="text-center text-sm -mt-6">
          Proposal creation fee is <strong>0.1 ETH</strong>.
          <br />
          This will be refunded if proposal gets approved.
        </Text>

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
