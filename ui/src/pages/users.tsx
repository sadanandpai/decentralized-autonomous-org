import Head from 'next/head';
import Profile from '@/components/Profile';
import Users from '@/components/Users';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>DAO: Users</title>
      </Head>
      <main>
        <Users />
      </main>
    </>
  );
}
