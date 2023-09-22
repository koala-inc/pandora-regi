import useGlobal from "./useGlobal";

export default function useIsHeaderGlobal() {
  return useGlobal({
    key: "isHeader",
    initialState: false,
  });
}
