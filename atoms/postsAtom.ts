import { atom } from "jotai";

export const postsAtoms = atom<{[key: string]: {
  tags: string[],
  intro: string,
  weeklyName: string,
  miniImg: string,
  
}[]}>({});
