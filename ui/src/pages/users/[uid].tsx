import { useEffect, useState } from 'react';

import Head from 'next/head';
import UserDetails from '@/components/UserDetails';
import { getFailedToast } from '@/constants/toast.data';
import { getUserDetails } from '@/actions/user.action';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

export default function UserPage() {
  const router = useRouter();
  const toast = useToast();
  const { uid } = router.query;

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (uid) {
      getUserDetails(uid as string).then(
        (user) => setUser({ ...user, userAddress: uid }),
        (e: any) => {
          toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>DAO: User Details</title>
      </Head>
      <main>
        <h2 className="text-2xl font-medium mt-8 text-center">Users of DAO system</h2>
        <UserDetails user={user} />
      </main>
    </>
  );
}
