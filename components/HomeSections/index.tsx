import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";

import Link from "next/link";
import SectionBox from "../SectionBox";
import Tags from "@/components/Tags";
import dayjs from "dayjs";
import { isEmptyObject } from "@/utils/help";
import { postsAtoms } from "@/atoms/postsAtom";
import { useAtom } from "jotai";

export default function HomeSections() {
  const [postState] = useAtom(postsAtoms);

  if (!postState || isEmptyObject(postState)) return null;
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      width={"min(90vw, 960px)"}
      m="0 auto 10rem"
    >
      {Object.keys(postState)
        .reverse()
        .map((monthStr, idx) => {
          const [newestPost, ...lastPosts] = postState?.[monthStr] || [];

          return (
            <AccordionItem key={monthStr} border="none" my={4}>
              <h2>
                <AccordionButton bg="#f6ffed">
                  <Box flex="1" textAlign="left">
                    {dayjs(monthStr).format("YYYY年MM月")}
                  </Box>
                  {idx === 0 && (
                    <Badge colorScheme="purple" mr="1em" p={1}>
                      NEW
                    </Badge>
                  )}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex m="2em 1em">
                  <SectionBox
                    title={newestPost.intro}
                    slug={newestPost.weeklyName}
                    img={newestPost.miniImg}
                    tags={newestPost.tags}
                  />
                </Flex>
                <ul style={{ listStyle: "none" }}>
                  {lastPosts.map((item, idx: number) => (
                    <li key={idx} style={{ padding: "1rem 0" }}>
                      <Flex justify={"space-between"} align="center">
                        <Link href={`/weekly/${item.weeklyName}`}>
                          <Heading
                            as={"h5"}
                            fontSize="17px"
                            minW="320px"
                            maxW={440}
                          >
                            {item.intro}
                          </Heading>
                        </Link>
                        <Tags tags={item.tags} />
                      </Flex>
                    </li>
                  ))}
                </ul>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
}
