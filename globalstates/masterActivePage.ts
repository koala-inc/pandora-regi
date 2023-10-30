"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * MasterActivePage
 * マスター画面でどの画面を表示しているかのフラグ
 *
 */

export default function useMasterActivePageGlobal() {
  return useGlobal("masterActivePage", "在籍キャスト");
}
