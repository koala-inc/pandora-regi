import useGlobal from "./useGlobal";

export default function useIsControlGlobal() {
  return useGlobal({
    key: "isControl",
    initialState: false,
  });
}
