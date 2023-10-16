import useGlobal from "../useGlobal";

export default function useIsControlOrderItemAddGlobal() {
  return useGlobal({
    key: "isControlOrderItemAdd",
    initialState: false,
  });
}
