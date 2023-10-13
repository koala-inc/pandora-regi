"use client";

import useIsCalculatorGlobal from "@/globalstates/isCalculator";

export default function Modal() {
  const [isCalculator, setIsCalculator] = useIsCalculatorGlobal();

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => setIsCalculator(false)}
    >
      <div className="h-[400px] w-[400px]">
        <div className="w-full">数字入力欄</div>
        <div className="grid grid-cols-4 grid-rows-4">
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>込</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>C</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>C</div>
        </div>
      </div>
    </div>
  );
}
