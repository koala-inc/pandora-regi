import { useCallback } from "react";
import useGlobalSWR from "./useGlobalSWR";

export default function useGlobal({
  key,
  initialState,
}: {
  key: string;
  initialState: any;
}): [typeof initialState, (data: typeof initialState) => void] {
  const { data: state, mutate } = useGlobalSWR(key, initialState);

  const setData = useCallback(
    (data: typeof initialState) => {
      mutate(data, false);
    },
    [mutate]
  );

  return [state, setData];
}
