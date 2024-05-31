"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";

export default function TimeAdd() {
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <p className="text-accent">システム切り替え</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">システム切り替え日時</p>
          <input
            type="time"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">日曜</p>
          <input
            type="time"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">月曜</p>
          <input
            type="time"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">火曜</p>
          <input
            type="time"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">水曜</p>
          <input
            type="time"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">木曜</p>
          <input
            type="time"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">土曜</p>
          <input
            type="time"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
        </Border>
      </Control>
    </>
  );
}
