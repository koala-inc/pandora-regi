"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Lock
 * 概算モーダル
 *
 */

export default function useIsLockGlobal() {
  return useGlobal("isLock", 0);
}
