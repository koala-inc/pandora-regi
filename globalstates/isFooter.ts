"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Footer
 * フッターメニューの表示非表示のフラグ
 *
 */

export default function useIsFooterGlobal() {
  return useGlobal("isFooter", false);
}
