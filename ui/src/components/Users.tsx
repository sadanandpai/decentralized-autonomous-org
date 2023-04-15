import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { getAllUsers } from '@/actions/DaoUser';

function User({ user }: any) {
  return (
    <Card className="mb-8" variant={'filled'}>
      <CardHeader>
        <Text>
          <strong>Address: </strong> {user.userAddress}
        </Text>
      </CardHeader>
      <CardBody className="flex justify-between">
        <div>
          <Text>
            <strong>Name: </strong> {user.firstName} {user.lastName}
          </Text>
          <Text className="mt-4">
            <strong>Email: </strong> {user.email}
          </Text>
        </div>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_r_nNv3j7kodjLAcK1ffhptO1KYKtZAv1A&usqp=CAU"
          alt="display pic"
          className="border border-black border-solid rounded-full"
          width={60}
          height={60}
        />
      </CardBody>
    </Card>
  );
}

function Users() {
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    setUsers(await getAllUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="m-auto my-8 px-6 md:max-w-4xl">
      {users.map((user: any) => (
        <User key={user.userAddress} user={user} />
      ))}
    </div>
  );
}

export default Users;
