import useGlobal from "./useGlobal";

export default function useIsTimeCardGlobal() {
  return useGlobal({
    key: "isTimeCard",
    initialState: false,
  });
}
