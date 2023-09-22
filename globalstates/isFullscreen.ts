import useGlobal from "./useGlobal";

export default function useIsFullscreenGlobal() {
  return useGlobal({
    key: "isFullscreen",
    initialState: false,
  });
}
