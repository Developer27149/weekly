import { Flex, Tag } from "@chakra-ui/react";
import { keywordAtom } from "@/atoms/keyword";
import { useAtom } from "jotai";

interface IProps {
  tags: string[];
  justify?: string;
}

export default function Tags({ tags, justify = 'center' }: IProps) {
  const [keyword] = useAtom(keywordAtom);
  return (
    <Flex flexDir="row" justify={justify} gap={2} flexWrap="wrap">
      {tags.map((tag, idx) => (
        <Tag
          size="sm"
          key={tag + idx}
          colorScheme={
            tag.toUpperCase().includes(keyword.toUpperCase()) && keyword !== ""
              ? "purple"
              : "green"
          }
        >
          {tag}
        </Tag>
      ))}
    </Flex>
  );
}
