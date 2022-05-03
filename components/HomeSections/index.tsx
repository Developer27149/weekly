import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { postsAtoms } from "@/atoms/postsAtom";
import { keywordAtom } from "@/atoms/keyword";
import { isEmptyObject } from "@/utils/help";
import dayjs from "dayjs";
import SectionBox from "../SectionBox";
import Link from "next/link";
import Tags from "@/components/Tags";

export default function HomeSections() {
  const [postState] = useAtom(postsAtoms);
  const [keyword] = useAtom(keywordAtom);

  if (!postState || isEmptyObject(postState)) return null;
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      width={"min(90vw, 960px)"}
      m="0 auto"
    >
      {Object.keys(postState).map((monthStr, idx) => {
        const [newestPost, ...lastPosts] = postState?.[monthStr] || [];

        return (
          <AccordionItem key={monthStr} border="none" my={4}>
            <h2>
              <AccordionButton bg="#f6ffed">
                <Box flex="1" textAlign="left">
                  {dayjs(monthStr).format("YYYY年MM月")}
                </Box>
                {idx === 0 && (
                  <Badge colorScheme="purple" mr="1em">
                    new
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
              <ul>
                {lastPosts.map((item, idx: number) => (
                  <li key={idx}>
                    <Flex justify={"space-between"}>
                      <Link href={`/weekly/${item.weeklyName}`}>
                        {item.intro}
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
