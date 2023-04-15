import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { connectToMetaMask } from '@/actions/Metamask';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

export default function HomePage() {
  const toast = useToast();
  const router = useRouter();

  const onMetaMarkConnect = async () => {
    const metaMaskDetails = await connectToMetaMask();
    if (!metaMaskDetails) {
      toast({
        title: 'Error while connecting to Metamask',
        description: 'Make sure you approve the connection to Metamask',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    router.push('/profile');
  };

  return (
    <>
      <Head>
        <title>DAO: Home</title>
      </Head>
      <div>
        <main className="text-center">
          <Button variant="solid" colorScheme="green" onClick={onMetaMarkConnect} className="m-8">
            Get Started
          </Button>

          <Link href="/proposals">
            <Button variant="solid" colorScheme="blue" className="m-8">
              Proposals
            </Button>
          </Link>
        </main>
      </div>
    </>
  );
}
