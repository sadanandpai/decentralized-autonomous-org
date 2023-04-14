import Head from "next/head";
import dynamic from "next/dynamic";

const Metamask = dynamic(() => import("@/components/Metamask"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center p-4">
        <h1 className="text-2xl">Self Governance DAO</h1>
        <Metamask />
      </main>
    </>
  );
}
