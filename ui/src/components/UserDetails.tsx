import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

import Image from 'next/image';

function UserDetails({ user }: any) {
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
          src={user.pic}
          alt="display pic"
          className="border border-black border-solid rounded-full"
          width={60}
          height={60}
        />
      </CardBody>
    </Card>
  );
}

export default UserDetails;
