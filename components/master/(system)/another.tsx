"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Toggle from "@/components/templates/toggle4";
import Image from "next/image";

export default function Another() {
  return (
    <>
      <Control>
        <div className="flex">
          <div className="flex flex-col">
            <Border
              className="my-2 w-[300px]"
              size="p-4 flex flex-col overflow-scroll"
              black
            >
              <p className="text-secondary-accent">送り代</p>
              <input
                type="number"
                className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
              />
              <input
                type="number"
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
              />
              <Border rounded="rounded-full" size="h-[40px] w-[40px] p-[12px]">
                <Image
                  src={"/assets/add.svg"}
                  width={26}
                  height={26}
                  className="!h-full !w-full"
                  alt=""
                />
              </Border>
            </Border>
            <Border
              className="my-2 w-[300px]"
              size="p-4 flex flex-col overflow-scroll"
              black
            >
              <p className="text-secondary-accent">ポジション</p>
              <input
                type="number"
                className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
              />
              <input
                type="number"
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
              />
              <Border rounded="rounded-full" size="h-[40px] w-[40px] p-[12px]">
                <Image
                  src={"/assets/add.svg"}
                  width={26}
                  height={26}
                  className="!h-full !w-full"
                  alt=""
                />
              </Border>
            </Border>
          </div>
          <div className="flex flex-col">
            <Border
              className="my-2 h-[120px] w-[500px]"
              size="p-4 flex flex-col overflow-scroll"
              black
            >
              <p className="text-secondary-accent">残数表示</p>
              <p className="text-lg font-bold text-white">
                ボトルの残数が
                <input
                  type="number"
                  className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                />
                本以下だった場合、ボタンの色を変える
              </p>
            </Border>
            <Border
              className="my-2 h-[100px] w-[500px]"
              size="p-4 flex flex-col overflow-scroll"
              black
            >
              <p className="text-secondary-accent">端末表示</p>
              <p className="text-lg font-bold text-white">
                発注表示　
                <Toggle />
              </p>
            </Border>
          </div>
        </div>
      </Control>
    </>
  );
}
