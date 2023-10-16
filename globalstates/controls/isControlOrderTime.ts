import useGlobal from "../useGlobal";

export default function useIsControlOrderTimeGlobal() {
  return useGlobal({
    key: "ControlOrderTime",
    initialState: false,
  });
}
