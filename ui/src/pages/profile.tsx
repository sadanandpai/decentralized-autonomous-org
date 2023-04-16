import Head from 'next/head';
import ProfileForm from '@/components/ProfileForm';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>DAO: Profile</title>
      </Head>
      <main>
        <ProfileForm />
      </main>
    </>
  );
}
