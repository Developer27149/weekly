import Header from "@/components/Header";
// import Footer from "./footer";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Contact from "./Contact";

type Props = {};

// @ts-ignore
const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Box as="main">{children}</Box>
    <Flex maxW="960px" w="100vw" m="2em auto">
      <Box className="giscus" id="comment" flexGrow={1} />
      <Contact />
    </Flex>
  </>
);
export default Layout;
