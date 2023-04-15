import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <header>
        <h1 className="text-2xl font-semibold p-4 shadow-md text-center">
          Self Governance DAO
        </h1>
      </header>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
