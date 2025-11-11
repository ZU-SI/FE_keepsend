import { atom } from "jotai";

/** ------------------------------
 * 현재 활성화된 메뉴를 추적하는 atom
 * 값: "service" | "solution" | null
 * ------------------------------ */
export const activeMenuAtom = atom<"service" | "solution" | "news" | null>(
  null
);
