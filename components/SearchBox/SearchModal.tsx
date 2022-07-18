import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef } from "react";

import Link from "next/link";
import { MacScrollbar } from "mac-scrollbar";
import Tags from "@/components/Tags";
import { globalAtom } from "@/atoms/globalAtom";
import { keywordAtom } from "@/atoms/keyword";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function SearchModal() {
  const [state, setGlobalState] = useAtom(globalAtom);
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const [postsState] = useAtom(postsAtoms);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isSearchEnable) {
      inputRef.current?.focus();
    } else {
      setKeyword("");
    }
  }, [state.isSearchEnable]);

  const router = useRouter();

  useEffect(() => {
    setGlobalState((prev) => ({ ...prev, isSearchEnable: false }));
  }, [router.asPath]);

  if (!state.isSearchEnable) return null;

  return (
    <Flex
      justify={"center"}
      align={"start"}
      w="100vw"
      h="100vh"
      m="0"
      p="0"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={99999999}
      bg="#00000073"
      onScroll={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        setGlobalState((prev) => ({ ...prev, isSearchEnable: false }));
      }}
    >
      <Box
        w="min(60vw, 800px)"
        maxH="50vh"
        bg="white"
        p="2em"
        onClick={(e) => e.stopPropagation()}
        borderRadius={12}
        mt={"10em"}
        display="flex"
        flexDir={"column"}
      >
        <InputGroup border={"none"}>
          <InputLeftAddon
            style={{
              border: "none",
              boxShadow: "none",
              outline: "none",
              backgroundColor: "white",
            }}
            _hover={{
              border: "none",
              boxShadow: "none",
              outline: "none",
            }}
          >
            <SearchIcon color="purple" />
          </InputLeftAddon>
          <Input
            ref={inputRef}
            border="none"
            borderBottom="2px solid #33300066"
            borderRadius="0"
            style={{
              border: "none",
              boxShadow: "none",
              outline: "none",
            }}
            _hover={{
              border: "none",
              boxShadow: "none",
              outline: "none",
            }}
            placeholder="搜索周刊内容"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
        </InputGroup>
        {/* 搜索结果 */}
        <Divider />
        <MacScrollbar className="flex-grow">
          {
            // values is [[weekly1, weekly2], [weekly3],...]
            keyword !== "" &&
              Object.values(postsState)
                .flat()
                .filter(
                  (weekly) =>
                    weekly.tags
                      .map((i) => i.toUpperCase())
                      .some((i) => i.includes(keyword.toUpperCase())) ||
                    weekly.weeklyName.includes(keyword) ||
                    weekly.intro.includes(keyword)
                )
                .map((item) => {
                  return (
                    <Link
                      href={`/weekly/${item.weeklyName}`}
                      key={item.weeklyName}
                    >
                      <Flex
                        cursor="pointer"
                        key={item.weeklyName}
                        align="center"
                        color="gray.400"
                        p=".5em"
                        my="1em"
                      >
                        <ExternalLinkIcon />
                        <Box
                          color="black"
                          fontWeight="bold"
                          mr="auto"
                          ml="1em"
                          pr={4}
                        >
                          <Box mb="1em">{item.intro}</Box>
                          <Tags tags={item.tags} justify={"flex-start"} />
                        </Box>
                      </Flex>
                    </Link>
                  );
                })
          }
        </MacScrollbar>
      </Box>
    </Flex>
  );
}
