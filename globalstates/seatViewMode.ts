"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * PurchaseOrder
 * 伝票を立てる前に確認データ
 *
 */

export default function useSeatViewModeGlobal() {
  return useGlobal("seatViewMode", 0);
}
