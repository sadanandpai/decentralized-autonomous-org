import Metamask from "@/components/Metamask";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl">Self Governance DAO tooling</h1>

      <Metamask />
    </main>
  );
}
