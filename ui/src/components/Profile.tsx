import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { account, connectToMetaMask, getBalance } from '@/actions/Metamask';
import { enrollUser, getUserDetails, updateUser } from '@/actions/DaoUser';
import { enrollmentToast, getFailedToast, updateToast } from '@/constants/toast';
import { useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

function Profile() {
  const toast = useToast();
  const [balance, setBalance] = useState<any>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    connectToMetaMask().then(() => {
      getBalance().then((value) => setBalance(value));
      setUserDetails();
    });
  }, []);

  const setUserDetails = () => {
    getUserDetails(account).then((userDetails) => {
      if (!userDetails) {
        setIsNewUser(true);
        return;
      }

      setFirstName(userDetails?.firstname);
      setLastName(userDetails?.lastname);
      setEmail(userDetails?.email);
      setIsNewUser(false);
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isNewUser) {
        await enrollUser(firstName, lastName, email);
        toast(enrollmentToast);
      } else {
        await updateUser(firstName, lastName, email);
        toast(updateToast);
      }
    } catch (e: any) {
      toast(getFailedToast(e.reason));
    } finally {
      setIsLoading(false);
      setUserDetails();
    }
  };

  return (
    <div className="m-auto my-12 px-6 md:max-w-xl">
      <FormControl className="mb-8">
        <FormLabel>Address</FormLabel>
        <Input type="text" defaultValue={account} readOnly />
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

        <Button mt={4} colorScheme="teal" type="submit">
          {isLoading ? <Spinner /> : isNewUser ? 'Enroll' : 'Update'}
        </Button>
      </form>
    </div>
  );
}

export default Profile;
