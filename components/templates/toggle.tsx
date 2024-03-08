import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import { useState } from "react";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

export default function Toggle({ isChecked, setIsChecked }: any) {
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [nowDate, setNowDate] = useState(dayjs(new Date()));

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (purchaseOrder[0].callToggle != undefined) {
      purchaseOrder[0].callToggle = !isChecked;
      const date = nowDate.hour(Number(purchaseOrder[0].endTime.split(":")[0]));
      const newDate = date.minute(
        Number(purchaseOrder[0].endTime.split(":")[1])
      );
      purchaseOrder[0].callTime = newDate
        .subtract(10, "minute")
        .format("HH:mm");
    }
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex h-[28px] w-[69.5px] items-center overflow-hidden rounded-full border border-white p-[1.5px] duration-300`}
        >
          <span
            className={`h-[20px] w-[20px] rounded-full bg-[#2dc7f9] text-white duration-300 ${
              isChecked ? "translate-x-11" : ""
            }`}
          >
            <span
              className={`flex mt-[0.5px] h-full min-w-[5rem] items-center ${
                isChecked ? "ml-[-38px]" : "ml-[26px]"
              }`}
            >
              {isChecked ? "Auto" : "Call"}
            </span>
          </span>
        </span>
      </label>
    </>
  );
}
