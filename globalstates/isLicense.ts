"use client";

import { useCallback } from "react";
import useGlobalSWR from "./useGlobalSWR";
import { v4 } from "uuid";

const key = "isLicense";
let initialState = v4();

export default function useIsLicenseGlobal(): [
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
