"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Card
 * 伝票などを表示するカードの表示非表示のフラグ
 *
 */

export default function useIsCardGlobal() {
  return useGlobal("isCard", false);
}
