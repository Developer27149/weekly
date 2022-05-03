import Header from "@/components/Header";
// import Footer from "./footer";
import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {};

// @ts-ignore
const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Box as="main">{children}</Box>
    {/* <Footer /> */}
    <Box className="giscus" maxW="960px" w="100vw" m="2em auto"></Box>
  </>
);
export default Layout;
