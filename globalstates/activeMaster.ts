import useGlobal from "./useGlobal";

export default function useActiveMasterGlobal() {
  return useGlobal({
    key: "activeMaster",
    initialState: "",
  });
}
