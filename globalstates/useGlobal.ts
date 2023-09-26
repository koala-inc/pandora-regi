import useGlobalSWR from "./useGlobalSWR";

export default function useGlobal({
  key,
  initialState,
}: {
  key: string;
  initialState: any;
}): [typeof initialState, (data: typeof initialState) => void] {
  const { data: state, mutate } = useGlobalSWR(key, initialState);

  return [state, mutate];
}
