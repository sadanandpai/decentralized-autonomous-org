import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import { enrollUser, getUserDetails, updateUser } from '@/actions/user.action';
import { getBalance, useMetaMaskStore } from '@/stores/metaMask.store';
import { getFailedToast, getSuccessToast } from '@/constants/toast.data';
import { useEffect, useState } from 'react';

import { shallow } from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

function ProfileForm() {
  const toast = useToast();
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);
  const account = useMetaMaskStore((state) => state.account)!;
  const [isNewUser, setIsNewUser, resetMetaMask] = useMetaMaskStore(
    (state) => [state.isNewUser, state.setIsNewUser, state.resetMetaMask],
    shallow
  );

  const [balance, setBalance] = useState<any>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pic, setPic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (provider) {
      try {
        getBalance().then((value) => setBalance(value));
        setUserDetails();
      } catch (e: any) {
        toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
      }
    } else {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserDetails = () => {
    getUserDetails(account).then(
      (userDetails) => {
        if (!userDetails) {
          setIsNewUser(true);
          return;
        }

        setFirstName(userDetails.firstname);
        setLastName(userDetails.lastname);
        setEmail(userDetails.email);
        setPic(userDetails.pic);
        setIsNewUser(false);
      },
      (e: any) => {
        toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
      }
    );
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isNewUser) {
        const txn = await enrollUser(firstName, lastName, email, pic);
        setIsLoading(false);

        await txn.wait();
        toast(getSuccessToast({ title: 'You are successfully enrolled' }));
        setIsNewUser(false);
      } else {
        const txn = await updateUser(firstName, lastName, email, pic);
        setIsLoading(false);

        await txn.wait();
        toast(getSuccessToast({ title: 'Profile updated successfully' }));
      }
    } catch (e: any) {
      toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
    } finally {
      setIsLoading(false);
      setUserDetails();
    }
  };

  const onDisconnect = () => {
    resetMetaMask();
    router.push('/');
  };

  return (
    <div className="m-auto my-12 px-6 md:max-w-xl">
      <FormControl className="mb-8">
        <FormLabel>Address</FormLabel>
        <Input type="text" defaultValue={useMetaMaskStore.getState().account!} readOnly />
        <FormHelperText>
          Balance: <span className="text-blue-800">{balance}</span>
        </FormHelperText>
      </FormControl>

      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input type="text" value={pic} onChange={(e) => setPic(e.target.value)} />
        </FormControl>

        <div className="w-full">
          <Button mt={4} colorScheme="teal" type="submit" isLoading={isLoading} className="w-full">
            {isNewUser ? 'Enroll' : 'Update'}
          </Button>
          {isNewUser && (
            <Text className="text-center text-sm -mb-2">
              Enrollment fee is <strong>0.1 ETH</strong>
            </Text>
          )}
        </div>
      </form>

      <Button mt={4} colorScheme="orange" className="w-full" onClick={onDisconnect}>
        Disconnect
      </Button>
    </div>
  );
}

export default ProfileForm;
