import { useState } from "react";

export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="relative inline-flex scale-90 cursor-pointer select-none items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex h-[44px] w-[122px] items-center overflow-hidden rounded-full border border-white p-[1.5px] duration-300`}
        >
          <span
            className={`h-[36px] w-[36px] rounded-full bg-[#2dc7f9] text-white duration-300 ${
              isChecked ? "translate-x-20" : ""
            }`}
          >
            <span
              className={`flex h-full min-w-[5rem] items-center text-[14px] ${
                isChecked ? "ml-[-50px]" : "ml-[40px]"
              }`}
            >
              {isChecked ? "ゲスト" : "レディース"}
            </span>
          </span>
        </span>
      </label>
    </>
  );
}
