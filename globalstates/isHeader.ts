"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Header
 * フッターメニューの表示非表示のフラグ
 *
 */

export default function useIsHeaderGlobal() {
  return useGlobal("isHeader", false);
}
