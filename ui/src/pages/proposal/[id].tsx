import Head from 'next/head';
import Voters from '@/components/Voters';

export default function ProposalVoters() {
  return (
    <>
      <Head>
        <title>DAO: Proposal Voters</title>
      </Head>
      <div>
        <h2 className="text-2xl font-medium mt-8 text-center">Voters of Proposal</h2>
        <main>
          <Voters />
        </main>
      </div>
    </>
  );
}
