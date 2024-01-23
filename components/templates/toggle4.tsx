import { useState } from "react";

export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="relative -ml-[6px] inline-flex scale-90 cursor-pointer select-none items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex h-[32px] w-[87.5px] items-center overflow-hidden rounded-full border border-white p-[1.5px] duration-300`}
        >
          <span
            className={`h-[30px] w-[30px] rounded-full bg-[#2dc7f9] text-white duration-300 ${
              isChecked ? "translate-x-14" : ""
            }`}
          >
            <span
              className={`flex h-full min-w-[5rem] items-center text-[12px] ${
                isChecked ? "ml-[-38px]" : "ml-[42px]"
              }`}
            >
              {isChecked ? "有効" : "無効"}
            </span>
          </span>
        </span>
      </label>
    </>
  );
}
