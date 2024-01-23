"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";

export default function Designate() {
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <p className="text-accent">指名延長料発生条件（分）</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">指名種（表示名）</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">指名料</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">指名延長料</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">税/サ</p>
          <input
            type="checkbox"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">指名種判定</p>
          <select className="h-[30px] w-[18rem] rounded-md px-2 text-sm">
            <option>場内</option>
            <option>本指名</option>
            <option>同伴</option>
          </select>
          <p className="text-accent">記号表記</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
        </Border>
      </Control>
    </>
  );
}
