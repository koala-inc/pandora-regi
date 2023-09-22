import useGlobal from "./useGlobal";

export default function useIsCardGlobal() {
  return useGlobal({
    key: "isCard",
    initialState: false,
  });
}
