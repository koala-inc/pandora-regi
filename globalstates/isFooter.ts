import useGlobal from "./useGlobal";

export default function useIsFooterGlobal() {
  return useGlobal({
    key: "isFooter",
    initialState: false,
  });
}
