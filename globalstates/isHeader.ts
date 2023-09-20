import { useCallback } from "react";
import useGlobalSWR from "@/globalstates/useGlobalSWR";

const key = "isHeader";
let initialState = false;

export default function useIsHeaderGlobal(): [
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
