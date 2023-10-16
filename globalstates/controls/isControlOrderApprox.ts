import useGlobal from "../useGlobal";

export default function useIsControlOrderApproxGlobal() {
  return useGlobal({
    key: "isControlOrderApprox",
    initialState: false,
  });
}
