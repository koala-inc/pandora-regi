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
    <div
      className="h-full w-full border-y-4 border-secondary bg-primary"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-full w-full items-center justify-start border-y border-black">
        <div className="pl-6 pr-10">
          <div className="text-accent">時間</div>
          <div className="text-4xl text-white">
            {format(datetime, "HH:mm", { locale: ja })}
          </div>
        </div>
        <div className="px-6">
          <div className="text-center text-accent">出勤</div>
          <div className="text-center text-4xl text-white">0</div>
        </div>
        <div className="px-0">
          <div className="text-accent">　</div>
          <div className="text-4xl text-white">/</div>
        </div>
        <div className="px-6">
          <div className="text-center text-accent">予定</div>
          <div className="text-right text-4xl text-white">0</div>
        </div>
        <div className="px-6">
          <div className="text-center text-accent">客数</div>
          <div className="text-center text-4xl text-white">0</div>
        </div>
        <div className="px-0">
          <div className="text-accent">　</div>
          <div className="text-4xl text-white">/</div>
        </div>
        <div className="px-6">
          <div className="text-center text-accent">累計</div>
          <div className="text-center text-4xl text-white">0</div>
        </div>
        <div className="px-6">
          <div className="text-accent">店内±</div>
          <div className=" flex text-4xl text-white">
            <div className="mr-1 mt-[-3px]">+</div>0
          </div>
        </div>
        <div className="ml-auto pl-6 pr-[190px]">
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
                setSeatViewMode(2);
              }}
              natural
            >
              指名
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
                setSeatViewMode(4);
              }}
              natural
            >
              開始終了
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
