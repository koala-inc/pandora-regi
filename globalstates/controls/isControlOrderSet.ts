import useGlobal from "../useGlobal";

export default function useIsControlOrderSetGlobal() {
  return useGlobal({
    key: "isControlOrderSet",
    initialState: false,
  });
}
