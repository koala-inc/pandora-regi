"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Toggle from "@/components/templates/toggle4";
import Image from "next/image";

export default function ItemCategoryLists() {
  return (
    <>
      <Control>
        <div className="flex">
          <Border
            className="my-2 w-[300px]"
            size="p-4 flex flex-col overflow-scroll"
            black
          >
            <p className="text-accent">大カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <p className="text-accent">小カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
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
            <p className="text-accent">大カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <p className="text-accent">小カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
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
            <p className="text-accent">大カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <p className="text-accent">小カテゴリー</p>
            <input
              type="text"
              className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
            <input
              type="text"
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
          <div className="ml-6 h-[45px] w-[45px]">
            <Border rounded="rounded-full" size="h-[40px] w-[40px] p-[12px]">
              <Image
                src={"/assets/add.svg"}
                width={26}
                height={26}
                className="!h-full !w-full"
                alt=""
              />
            </Border>
          </div>
        </div>
      </Control>
    </>
  );
}
