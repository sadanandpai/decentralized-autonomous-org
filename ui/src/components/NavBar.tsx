import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import MetaMaskButton from './MetaMaskButton';
import { useMetaMaskStore } from '@/actions/metaMask.store';

function NavBar() {
  const provider = useMetaMaskStore((state) => state.provider);

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-semibold flex gap-4">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2586/2586197.png"
            alt="meta mask"
            height="30"
            width="30"
          />
          Self Governance DAO
        </h1>
      </Link>

      <div className="flex gap-2">
        {provider && (
          <>
            <Link href="/proposals">
              <Button variant="outline" colorScheme="blue">
                Proposals
              </Button>
            </Link>

            <Link href="/users">
              <Button variant="outline" colorScheme="blue">
                Users
              </Button>
            </Link>
          </>
        )}

        <MetaMaskButton />
      </div>
    </header>
  );
}

export default NavBar;
