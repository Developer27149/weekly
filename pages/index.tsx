import type { NextPage } from "next";
import Head from "next/head";
import SearchBox from "@/components/SearchBox";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";
import { getAllPostMetadata } from "@/utils/index";
import HomeSections from "@/components/HomeSections";
import { Flex, Box } from "@chakra-ui/react";
import SearchModal from "@/components/SearchBox/SearchModal";

const Home: NextPage = (props) => {
  const [, setPostState] = useAtom(postsAtoms);
  useEffect(() => {
    setPostState(props);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>妙才周刊</title>
        <meta name="description" content="妙才的科技人文周刊，欢迎订阅👏🏻" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        justify="space-between"
        m="1em auto"
        maxW="960px"
      >
        <Box>
          <Box display="inline-block" fontSize="3em">
            妙才
          </Box>
          周刊
        </Box>
        <SearchBox />
      </Flex>
      <main className={styles.main}>
        <HomeSections />
      </main>

      <SearchModal />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const metaData = await getAllPostMetadata();
  console.log(metaData);

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: metaData,
  };
}
