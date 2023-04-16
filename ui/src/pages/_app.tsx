import '@/styles/globals.css';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';

const { ToastContainer } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: 'bottom-right', duration: 3000, isClosable: true },
      }}
    >
      <NavBar />
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}
