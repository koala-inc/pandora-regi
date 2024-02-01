"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Border2 from "@/components/templates/border";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SetPayment() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "easeInOut",
        bounce: 0,
        duration: 0.15,
        delay: 0.15,
      }}
      className="absolute left-[220px] top-1/2 z-20 -translate-y-1/2"
    >
      <div className="tabs mt-3">
        <a
          className={`tab-md tab mr-1 w-[7em] rounded-t-xl ${
            activeTab == 0
              ? "tab-active bg-primary text-white"
              : "tab-lifted bg-secondary text-black"
          }`}
          onClick={() => setActiveTab(0)}
        >
          -
        </a>
      </div>
      <div className="mt-[-1px] min-h-[calc(98dvh-80px)] w-full pr-8 rounded-b-xl rounded-r-xl bg-primary px-4 pt-6 pb-0 text-white">
        <Border
          className="relative my-2 w-full"
          rounded="rounded-md border-white"
          size="p-4 flex"
          black
        >
          <Border2
            className="absolute right-[-15px] top-[-15px]"
            rounded="rounded-full"
            size="h-[28px] w-[28px] p-[6px]"
          >
            <Image
              src={"/assets/close.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border2>
          <div className="flex flex-col mr-3">
            <p className="text-accent">セット名</p>
            <input
              type="text"
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
            />
          </div>
          <div className="flex flex-col mr-3">
            <p className="text-accent">基本時間（分）</p>
            <input
              type="text"
              className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
            />
          </div>
          <div className="flex flex-col mr-3">
            <p className="text-accent">基本料金</p>
            <input
              type="text"
              className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
            />
          </div>
          <div className="flex flex-col mr-3">
            <p className="text-accent">税/サ</p>
            <input
              type="checkbox"
              className="h-[30px] rounded-md px-2 text-sm"
            />
          </div>
          <div className="flex flex-col mr-3">
            <p className="text-accent">案内所</p>
            <input
              type="checkbox"
              className="h-[30px] rounded-md px-2 text-sm"
            />
          </div>
        </Border>
        <div className="mt-8 ml-[260px] flex" onClick={() => {}}>
          <Border2
            complate
            rounded="rounded-full"
            size="h-[32px] w-[32px] p-[4px] bg-primary"
          >
            <Image
              src={"/assets/addGreen.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border2>
        </div>
      </div>
    </motion.div>
  );
}
