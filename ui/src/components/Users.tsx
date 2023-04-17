import { useEffect, useState } from 'react';

import UserDetails from './UserDetails';
import { getAllUsers } from '@/actions/user.action';
import { getFailedToast } from '@/constants/toast.data';
import { useMetaMaskStore } from '@/actions/metaMask.store';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

function Users() {
  const toast = useToast();
  const router = useRouter();
  const provider = useMetaMaskStore((state) => state.provider);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (provider) {
      getUsers();
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (e: any) {
      toast(getFailedToast(e.reason ?? e.code));
    }
  };

  if (users.length === 0) {
    return <h2 className="text-center text-2xl m-8 font-medium">No Users Found</h2>;
  }

  return (
    <div className="m-auto my-8 px-6 md:max-w-4xl">
      {users.map((user: any) => (
        <UserDetails key={user.userAddress} user={user} />
      ))}
    </div>
  );
}

export default Users;
