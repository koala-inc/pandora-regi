"use client";

import { useCallback } from "react";
import useSWR from "swr";

/*
 * useGlobal
 * グローバルステートを扱うカスタムフック
 *
 */

export default function useGlobal(key: string, initialData: any) {
  type INITIAL = typeof initialData;
  const { data = initialData, mutate } = useSWR<INITIAL>(key, null, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  useCallback(() => {
    mutate((_data: INITIAL) => _data || initialData, false);
  }, [mutate, initialData]);

  return [data, mutate];
}
