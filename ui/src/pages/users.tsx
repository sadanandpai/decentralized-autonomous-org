import Head from 'next/head';
import Users from '@/components/Users';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>DAO: Users</title>
      </Head>
      <main>
        <h2 className="text-2xl font-medium mt-8 text-center">Users of DAO system</h2>
        <Users />
      </main>
    </>
  );
}
