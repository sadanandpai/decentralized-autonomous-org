import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { account, connectToMetaMask, getBalance } from '@/actions/Metamask';
import { useEffect, useState } from 'react';

import { enrollUser } from '@/actions/DaoUser';
import { ethers } from 'ethers';

function Profile() {
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    connectToMetaMask().then(() => {
      getBalance().then((value) => setBalance(value));
    });
  }, []);

  return (
    <div className="m-auto my-12 px-6 md:max-w-xl">
      <FormControl className="mb-8">
        <FormLabel>Address</FormLabel>
        <Input type="text" defaultValue={account} readOnly />
        <FormHelperText>
          Balance: <span className="text-blue-800">{balance}</span>
        </FormHelperText>
      </FormControl>

      <form className="flex flex-col gap-8">
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Enroll
        </Button>
      </form>
    </div>
  );
}

export default Profile;
