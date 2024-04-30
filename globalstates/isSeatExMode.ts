"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Lock
 * 概算モーダル
 *
 */

export default function useIsSeatExModeGlobal() {
  return useGlobal("isSeatExMode", false);
}
