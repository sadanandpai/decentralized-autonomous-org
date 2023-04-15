import { Button } from '@chakra-ui/react';
import Head from 'next/head';
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
      <div className="flex min-h-screen flex-col text-center">
        <main>
          <Button variant="solid" colorScheme="green" onClick={onMetaMarkConnect} className="my-8">
            Get Started
          </Button>
        </main>
      </div>
    </>
  );
}
