import { Flex, Heading, Image, Box } from "@chakra-ui/react";
import Link from "next/link";
import Tags from "../Tags";

interface IProps {
  slug: string;
  title: string;
  tags: string[];
  img: string;
}

export default function SectionBox({ title, tags, img, slug }: IProps) {
  return (
    <Flex justify="space-between">
      <Box
        _hover={{
          transform: "scale(1.05)",
        }}
        transition="all 0.5s ease-in-out"
      >
        <Image src={img} alt="封面图" />
      </Box>
      <Flex flexDir={"column"} justify="space-between">
        <Link href={"/weekly/" + slug}>
          <Heading as={"h5"} textAlign="center" p="2em" cursor={"pointer"}>
            {title}
          </Heading>
        </Link>
        <Tags tags={tags} />
      </Flex>
    </Flex>
  );
}
