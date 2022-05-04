import { GetStaticProps, GetStaticPaths } from "next";
import {
  getAllDateDirItems,
  getArticleHtml,
  getAllPostMetadata,
} from "@/utils/index";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";

const Weekly = ({ post, initState }: { post: string; initState: any }) => {
  const [, setPostState] = useAtom(postsAtoms);
  useEffect(() => {
    setPostState(initState);
  }, []);
  return (
    <>
      <Box maxW="960px" w="100vw" m="0 auto" p="1em">
        <div
          className="markdown-body"
          style={{ flexGrow: 1 }}
          dangerouslySetInnerHTML={{ __html: post }}
        ></div>
      </Box>
    </>
  );
};

export default Weekly;

// 用于限定符合条件的post id列表
export const getStaticPaths: GetStaticPaths = async () => {
  const items = (await getAllDateDirItems()) ?? [];
  const paths = Object.keys(items)
    .map((i) => i.replace(/\.md$/, ""))
    .map((path) => ({
      params: {
        slug: path,
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const htmlContent = await getArticleHtml(slug);
  const initState = await getAllPostMetadata();

  return {
    props: {
      post: htmlContent?.value,
      initState,
    },
  };
};
