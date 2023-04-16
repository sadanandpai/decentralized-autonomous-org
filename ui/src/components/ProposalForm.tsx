import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { getBalance, useMetaMaskStore } from '@/actions/metaMask.store';
import { getFailedToast, updateToast } from '@/constants/toast.data';
import { useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';
import { createNewProposal } from '@/actions/proposal.action';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

function ProposalForm({ setIsNewProposal }: any) {
  const toast = useToast();
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);

  const [balance, setBalance] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [document, setDocument] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (provider) {
      try {
        getBalance().then((value) => setBalance(value));
      } catch (e: any) {
        toast(getFailedToast(e.reason));
      }
    } else {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createNewProposal(title, description, document);
      toast(updateToast);
    } catch (e: any) {
      toast(getFailedToast(e.reason));
    } finally {
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
