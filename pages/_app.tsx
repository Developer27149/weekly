import "../styles/globals.css";
import "mac-scrollbar/dist/mac-scrollbar.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/layout";
import SearchModal from "@/components/SearchBox/SearchModal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* @ts-ignore */}
      <Layout>
        <Component {...pageProps} />
        <SearchModal />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
