import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { postsAtoms } from "@/atoms/postsAtom";

export default function SearchBox() {
  const [postState] = useAtom(postsAtoms);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.ctrlKey === true && e.key === "k") {
        inputRef.current?.focus();
      }
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(postState);
  };

  return (
    <Box my={12} minW={450}>
      <InputGroup size="md">
        <Input
          pr="6rem"
          type="text"
          placeholder="查你所想"
          ref={inputRef}
          border="none
        "
          borderBottom="2px solid #b7eb8f7a"
          borderRadius="0"
          _hover={{
            borderRadius: "4px",
          }}
          onChange={onChange}
        />
        <InputRightElement width="5rem" mr="0.5em">
          <Flex align="center">
            <Kbd>Ctrl</Kbd> + <Kbd>k</Kbd>
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
