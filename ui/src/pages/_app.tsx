import '@/styles/globals.css';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import type { AppProps } from 'next/app';

const { ToastContainer } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top-right', duration: 3000, isClosable: true } }}
    >
      <header>
        <h1 className="text-2xl font-semibold p-4 shadow-md text-center">Self Governance DAO</h1>
      </header>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}
