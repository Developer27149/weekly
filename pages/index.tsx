import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SearchBox from "@/components/SearchBox";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";
import { getAllPostData } from "@/utils/index";

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

      <main className={styles.main}>
        <h3 className={styles.title}>欢迎来到妙才周刊!</h3>
        <SearchBox />
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = { count: 3 };
  const dirs = await getAllPostData();
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: data,
  };
}
