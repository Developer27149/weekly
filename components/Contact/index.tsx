import { EmailIcon } from "@chakra-ui/icons";
import { Avatar, Flex } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { GrBlog } from "react-icons/gr";
import Link from "next/link";

export default function Contact() {
  return (
    <Flex
      p={"0.5em"}
      bgColor="green.50"
      color={"blackAlpha.800"}
      align="center"
      fontSize={"14px"}
      maxH="80px"
      boxShadow={"5px 10px 5px 0px #eee"}
    >
      <Avatar
        src="https://avatars.githubusercontent.com/u/23721611?v=4"
        w="48px"
        h="48px"
      />
      <Flex
        flexGrow={1}
        justify="space-between"
        flexDir={"column"}
        align="end"
        pl="1em"
      >
        <p>web开发者，欢迎一起合作、交流、分享资讯！</p>
        <Flex align={"center"} justify="end" gap={2}>
          <Link href="https://github.com/youyiqin">
            <BsGithub />
          </Link>
          <Link href="mailto:rivenqinyy@gmail.com">
            <EmailIcon />
          </Link>
          <Link href="https://youyiqin.github.io/blog">
            <GrBlog />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
