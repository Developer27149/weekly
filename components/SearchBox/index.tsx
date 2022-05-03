import { Kbd, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { globalAtom } from "@/atoms/globalAtom";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBox() {
  const [, setGlobalState] = useAtom(globalAtom);
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.ctrlKey === true && e.key === "k") {
        setGlobalState((prev) => ({ ...prev, isSearchEnable: true }));
      }
    });
  }, []);

  return (
    <Flex align="center" gap={1}>
      <SearchIcon
        color="blue.300"
        cursor="pointer"
        onClick={() =>
          setGlobalState((prev) => ({ ...prev, isSearchEnable: true }))
        }
      />
      <Kbd ml="2em">Ctrl</Kbd>
      <Kbd>k</Kbd>
    </Flex>
  );
}
