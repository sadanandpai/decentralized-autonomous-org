import Head from 'next/head';
import Proposals from '@/components/Proposals';

export default function ProposalsPage() {
  return (
    <>
      <Head>
        <title>DAO: Proposals Dashboard</title>
      </Head>
      <div>
        <h2 className="text-2xl font-medium mt-8 text-center">List of Proposals</h2>
        <main>
          <Proposals />
        </main>
      </div>
    </>
  );
}
