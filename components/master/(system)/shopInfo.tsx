"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";

export default function ShopInfo() {
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <p className="text-accent">店舗名</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">郵便番号</p>
          <input
            type="text"
            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">住所</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">建物</p>
          <input
            type="text"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">電話番号</p>
          <input
            type="tel"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">ロゴデータ</p>
          <input
            type="file"
            className="h-[30px] w-[18rem] rounded-md px-2 text-sm"
          />
          <p className="text-accent">レシートメッセージ</p>
          <textarea className="h-[80px] w-[18rem] rounded-md px-2 text-sm" />
        </Border>
      </Control>
    </>
  );
}
