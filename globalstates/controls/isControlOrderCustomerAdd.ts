import useGlobal from "../useGlobal";

export default function useIsControlOrderCustomerAddGlobal() {
  return useGlobal({
    key: "isControlOrderCustomerAdd",
    initialState: false,
  });
}
