import Head from 'next/head';
import Profile from '@/components/Profile';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>DAO: Profile</title>
      </Head>
      <main>
        <Profile />
      </main>
    </>
  );
}
