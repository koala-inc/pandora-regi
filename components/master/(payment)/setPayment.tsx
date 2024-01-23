"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";

export default function SetPayment() {
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <p className="text-accent">セット名</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">基本時間（分）</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">基本料金</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">税/サ</p>
          <input
            type="checkbox"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">案内所</p>
          <input
            type="checkbox"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">席カテゴリー</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
        </Border>
      </Control>
    </>
  );
}
