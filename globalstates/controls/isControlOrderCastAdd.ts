import useGlobal from "../useGlobal";

export default function useIsControlOrderCastAddGlobal() {
  return useGlobal({
    key: "isControlOrderCastAdd",
    initialState: false,
  });
}
