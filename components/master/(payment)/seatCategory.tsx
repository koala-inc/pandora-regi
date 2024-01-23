"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";

export default function SeatCategory() {
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <p className="text-accent">席カテゴリー名</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">延長時間（分）</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">延長料金</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">サービス料</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">ルームチャージ料</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">ルームチャージ延長時間（分）</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">ルームチャージ延長料</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
        </Border>
      </Control>
    </>
  );
}
