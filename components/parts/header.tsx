"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

import useIsHeaderGlobal from "@/globalstates/isHeader";
import useSeatViewModeGlobal from "@/globalstates/seatViewMode";
import Button from "../templates/button";

function Content({ datetime }: { datetime: any }) {
  const [, setIsHeader] = useIsHeaderGlobal();
  const [seatViewMode, setSeatViewMode] = useSeatViewModeGlobal();

  return (
    <div className="h-full w-full border-y-4 border-secondary bg-primary">
      <div className="flex h-full w-full items-center justify-start border-y border-black">
        <div className="px-6">
          <div className="text-accent">時間</div>
          <div className="text-4xl text-white">
            {format(datetime, "HH:mm", { locale: ja })}
          </div>
        </div>
        <div className="px-6">
          <div className="text-accent">モード変更</div>
          <div className="flex">
            <Button
              className={"mr-[0.5em] w-[6em]"}
              onClick={() => {
                setSeatViewMode(0);
              }}
              natural
            >
              コール
            </Button>
            <Button
              className={"mr-[0.5em] w-[6em]"}
              onClick={() => {
                setSeatViewMode(4);
              }}
              natural
            >
              開始終了
            </Button>
            <Button
              className={"mr-[0.5em] w-[6em]"}
              onClick={() => {
                setSeatViewMode(1);
              }}
              natural
            >
              人数
            </Button>
            <Button
              className={"mr-[0.5em] w-[6em]"}
              onClick={() => {
                setSeatViewMode(2);
              }}
              natural
            >
              指名
            </Button>
            <Button
              className={"mr-[0.5em] w-[6em]"}
              onClick={() => {
                setSeatViewMode(3);
              }}
              natural
            >
              セット名
            </Button>
            <Button
              className={"w-[6em]"}
              onClick={() => {
                setSeatViewMode(5);
              }}
              natural
            >
              卓番
            </Button>
          </div>
        </div>
        <nav
          className="absolute right-[25px] top-[23px] cursor-pointer rounded-full border border-black"
          onClick={() => setIsHeader(false)}
        >
          <div className="rounded-full border-4 border-secondary">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black bg-primary p-[6px]">
              <Image
                src={"/assets/close.svg"}
                width={18}
                height={18}
                className="z-10 !h-full !w-full"
                alt=""
              />
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function Header({ datetime }: { datetime: any }) {
  return (
    <motion.header
      initial={{ top: -90 }}
      animate={{ top: 0 }}
      exit={{ top: -90 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.1 }}
      className="absolute top-0 z-30 h-[90px] w-full border-y-2 border-black"
    >
      <Content datetime={datetime} />
    </motion.header>
  );
}
