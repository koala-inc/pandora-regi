"use client";

import { useState } from "react";
import Button from "../templates/button";
import Border from "../templates/border";
import Image from "next/image";

export default function Lock2() {
  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {}}
    >
      <div
        className="h-[170px] w-[350px] flex justify-around items-center px-4 rounded-md border border-secondary bg-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <Border
          className="ml-2"
          rounded="rounded-full"
          size="h-[80px] w-[80px] p-[15px]"
        >
          <Image
            src={"/assets/padunlock.svg"}
            width={26}
            height={26}
            className="mt-[-3px] !h-full !w-full"
            alt=""
          />
        </Border>
        <Border
          className="ml-2"
          rounded="rounded-full"
          size="h-[80px] w-[80px] p-[20px]"
        >
          <Image
            src={"/assets/close.svg"}
            width={26}
            height={26}
            className="!h-full !w-full"
            alt=""
          />
        </Border>
      </div>
    </div>
  );
}
