import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import SearchBox from "@/components/SearchBox";
import { ChatIcon } from "@chakra-ui/icons";
import { BsGithub } from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import Link from "next/link";
import { redirectToGithub } from "@/utils/help";

export default function Header() {
  return (
    <>
      <Head>
        <title>妙才周刊</title>
        <meta name="description" content="妙才的科技人文周刊，欢迎订阅👏🏻" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        position="sticky"
        // top={0}
        // left={0}
        // right={0}
        m="2em auto"
        maxW="960px"
        align="center"
      >
        <Link href="/">
          <Box mr="auto" cursor={"pointer"}>
            <Box display="inline-block" fontSize="3em">
              妙才
            </Box>
            周刊
          </Box>
        </Link>
        <SearchBox />
        <Flex justify={"end"} align="center" ml="4em" gap={4}>
          <Link href="/">
            <span>
              <FcHome cursor="pointer" />
            </span>
          </Link>
          <a href="#comment">
            <ChatIcon />
          </a>
          <BsGithub onClick={redirectToGithub} cursor="pointer" />
        </Flex>
      </Flex>
    </>
  );
}
