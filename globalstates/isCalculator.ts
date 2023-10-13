import useGlobal from "./useGlobal";

export default function useIsCalculatorGlobal() {
  return useGlobal({
    key: "isCalculator",
    initialState: false,
  });
}
