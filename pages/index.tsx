import HomeSections from "@/components/HomeSections";
import type { NextPage } from "next";
import { getAllPostMetadata } from "@/utils/index";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";

const Home: NextPage = (props) => {
  const [, setPostState] = useAtom(postsAtoms);
  useEffect(() => {
    setPostState(props);
  }, []);
  return <HomeSections />;
};

export default Home;

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const metaData = await getAllPostMetadata();
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: metaData,
  };
}
