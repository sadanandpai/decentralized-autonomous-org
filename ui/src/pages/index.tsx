import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>DAO: Home</title>
      </Head>
      <div>
        <main className="p-8  text-lg">
          <h2 className="text-2xl my-4 font-medium text-center">
            Welcome to Decentralized Autonomous Organization
          </h2>
          <p className="mt-8 mb-8">
            DAO is an acronym for decentralised autonomous organisation. It is the web3 scheme for a
            way a decentralised company should run. In a DAO all decisions are based on a quorum and
            all money flow is on the blockchain. This is a Dapp that DAOs can use for proposing and
            voting on decisions.
          </p>
          <div className="mb-8">
            <p className="mb-2">
              <strong>Stage 0:</strong> A user must be inducted as a member of the DAO with their
              profile. The profile must be linked to the user’s wallet and contain other information
              about them. Bonus points for a well-rounded profile with a profile picture and other
              data (stored in a decentralised manner).
            </p>
            <p className="mb-2">
              <strong>Stage 1: </strong>One member can initiate a proposal by uploading the
              necessary details. This proposal may have attachments and several descriptive fields.
              Remember all data must be stored in a decentralised manner.
            </p>
            <p className="mb-2">
              <strong>Stage 2: </strong>Once a proposal is uploaded, the other members may be
              notified and the voting process begins. A time is set for all members to finish
              voting. After timeout voting closes and results are tallied. The voting period is
              extended if only less than 80% of the members have voted.
            </p>
            <p className="mb-2">
              <strong>Stage 3: </strong>The voting is transparent and all members will be able to
              see the results and the proposal is accepted or rejected based on a predetermined
              threshold majority.
            </p>
          </div>
          <section>
            <h3>
              Built by <strong>Munish Garg, Anand Kumar, and Sadanand Pai</strong>
            </h3>
          </section>
        </main>
      </div>
    </>
  );
}
