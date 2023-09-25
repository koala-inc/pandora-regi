import useGlobal from "./useGlobal";

export default function useIsAnimateGlobal() {
  return useGlobal({
    key: "isAnimate",
    initialState: {
      decoration: true,
    },
  });
}
