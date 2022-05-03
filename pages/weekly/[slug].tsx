import { GetStaticProps, GetStaticPaths } from "next";
import { getAllDateDirItems, getArticleHtml } from "@/utils/index";
import { Box } from "@chakra-ui/react";

const Weekly = ({ post }: { post: string }) => {
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
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const htmlContent = await getArticleHtml(slug);
  return {
    props: {
      post: htmlContent?.value,
    },
  };
};
