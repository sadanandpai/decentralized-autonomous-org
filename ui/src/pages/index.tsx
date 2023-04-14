import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl">Self Governance DAO tooling</h1>
      <Button variant="solid" colorScheme="green">
        Register
      </Button>
    </main>
  );
}
