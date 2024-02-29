"use client";

import { useState } from "react";
import Button from "../templates/button";
import Border from "../templates/border";
import Image from "next/image";
import useIsLockGlobal from "@/globalstates/isLock";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";

export default function Lock() {
  const [isLock, setIsLock] = useIsLockGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {
        setIsLock(0);
      }}
    >
      <div
        className="h-[370px] w-[560px] flex justify-center items-center rounded-md border border-secondary bg-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border bg-black p-4 rounded-md flex justify-center flex-col items-center">
          <div
            onClick={() => {
              setIsControl("");
              setIsCard(false);
              setIsLock(2);
            }}
          >
            <Button natural className="w-full mb-3" text2XL>
              {"　"}概算 ＋
              <Border
                className="ml-2"
                rounded="rounded-full"
                size="h-[45px] w-[45px] p-[6px]"
              >
                <Image
                  src={"/assets/padlock.svg"}
                  width={26}
                  height={26}
                  className="mt-[-3px] !h-full !w-full"
                  alt=""
                />
              </Border>
              {"　"}
            </Button>
          </div>
          <Button natural className="w-full mb-3" text2XL>
            概算
            <Border
              className="ml-2"
              rounded="rounded-full"
              size="relative h-[45px] w-[45px] p-[6px]"
            >
              <Image
                src={"/assets/padlock.svg"}
                width={20}
                height={20}
                className="mt-[-3px] !h-full !w-full"
                alt=""
              />
              <Image
                src={"/assets/close.svg"}
                width={20}
                height={20}
                className="absolute top-0 left-0 !h-full !w-full"
                alt=""
              />
            </Border>
          </Button>
          <Button natural className="w-full" text2XL>
            <Border rounded="rounded-full" size="h-[45px] w-[45px] p-[6px]">
              <Image
                src={"/assets/padlock.svg"}
                width={26}
                height={26}
                className="mt-[-3px] !h-full !w-full"
                alt=""
              />
            </Border>
          </Button>
        </div>
        <div className="ml-1 w-[238.8px] mt-[12px] p-4 pr-0 rounded-md flex justify-center flex-col items-center">
          <Button natural className="w-full mb-3" text2XL>
            <div className="leading-[55px] w-full text-center align-middle">
              席別概算
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
