import useGlobal from "./useGlobal";

export default function useIsDebugGlobal() {
  return useGlobal({
    key: "isDebug",
    initialState: false,
  });
}
