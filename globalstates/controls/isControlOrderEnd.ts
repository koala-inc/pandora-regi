import useGlobal from "../useGlobal";

export default function useIsControlOrderEndGlobal() {
  return useGlobal({
    key: "isControlOrderEnd",
    initialState: false,
  });
}
