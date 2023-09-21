"use client";

import { useCallback } from "react";
import useGlobalSWR from "./useGlobalSWR";

const key = "isCard";
let initialState = true;

export default function useIsCardGlobal(): [
  typeof initialState,
  (data: typeof initialState) => void
] {
  const { data: state, mutate } = useGlobalSWR(key, initialState);

  const setData = useCallback(
    (data: typeof initialState) => {
      mutate(data, false);
    },
    [mutate]
  );

  return [state, setData];
}
