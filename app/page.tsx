"use client";

import Header from "@/components/header";
import Seat from "@/components/seat";
import seatMap from "@/configs/seatMap";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const makeFullScreen = (el: any) => {
  if (!document.fullscreenElement) {
    el.requestFullscreen();
    return;
  }
  document.exitFullscreen();
};

export default function Home() {
  const DEBUG = true;

  const [isHeader, setIsHeader] = useState(false);

  return (
    <main className="relative h-full w-full">
      <AnimatePresence>
        {isHeader && <Header setIsHeader={setIsHeader} />}
      </AnimatePresence>
      <Image
        src={"/assets/background.jpg"}
        fill
        className="-z-50 object-cover object-center"
        alt=""
      />
      <section id="map" className="h-full w-full">
        {seatMap.map((seat, index) => {
          switch (seat.type) {
            case "seat":
              return (
                <Seat key={index} id={seat.id} area={seat.area}>
                  {seat.id.toLocaleUpperCase()}
                </Seat>
              );
            case "object":
              return (
                <Image
                  width={30}
                  height={30}
                  className={seat.area + " !w-full !h-full"}
                  src={seat.objectUrl}
                  alt=""
                />
              );
            case "text":
              return (
                <Seat key={index} id={seat.id} area={seat.area}>
                  {seat.body}
                </Seat>
              );
          }
        })}
        {DEBUG && (
          <>
            <Seat id="admin" area="[grid-area:9/7/9/19]">
              デバッグメニュー
            </Seat>
            <Seat id="purchaseOrderAllReset" area="[grid-area:10/7/10/11]">
              全伝票リセット
            </Seat>
            <Seat id="0" area="[grid-area:10/11/10/15]">
              勤怠リセット
            </Seat>
            <Seat id="1" area="[grid-area:10/15/10/19]">
              -
            </Seat>
          </>
        )}
      </section>
      <nav
        className="border-black absolute right-[15px] top-[15px] rounded-full border cursor-pointer"
        onClick={() => setIsHeader(true)}
      >
        <div className="rounded-full border-4 border-secondary">
          <span className="border-black flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-primary p-[12px]">
            <Image
              src={"/assets/menu.svg"}
              width={26}
              height={26}
              className="z-10 !h-full !w-full"
              alt=""
            />
          </span>
        </div>
      </nav>
      <nav
        className="bg-blue-300/40 h-2/3 w-[80px] rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={() => setIsHeader(true)}
      ></nav>
      <nav
        className="bg-blue-300/40 h-[80px] w-2/3 absolute bottom-0 left-1/2 transform -translate-x-1/2"
        onClick={() => makeFullScreen(document.querySelector("main"))}
      ></nav>
      <nav
        className="bg-blue-300/40 h-2/3 w-[80px] absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={() => setIsHeader(true)}
      ></nav>
    </main>
  );
}
