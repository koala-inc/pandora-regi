"use client";

import { useState } from "react";
import Image from "next/image";

export default function Calculator() {
  const [result, setResult] = useState("");
  const [tax, setTax] = useState(false);
  const max = 999999999;

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {}}
    >
      <div
        className="relative h-[400px] w-[300px] rounded-md border border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {}}
        >
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
        <div className="flex h-[60px] w-full items-center justify-end rounded-md bg-neutral-900 px-3 text-4xl text-white">
          ¥{Number(result).toLocaleString()} {tax && "込"}
        </div>
        <div className="mt-4 grid grid-cols-4 grid-rows-4 content-center items-center justify-center gap-4 text-3xl font-bold">
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "7") < max) {
                  setResult((result) => result + "7");
                }
              }}
            >
              7
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "8") < max) {
                  setResult((result) => result + "8");
                }
              }}
            >
              8
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "9") < max) {
                  setResult((result) => result + "9");
                }
              }}
            >
              9
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-green-200 text-black shadow-2xl"
              onClick={() => {
                setTax((tax) => !tax);
              }}
            >
              込
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "4") < max) {
                  setResult((result) => result + "4");
                }
              }}
            >
              4
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "5") < max) {
                  setResult((result) => result + "5");
                }
              }}
            >
              5
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "6") < max) {
                  setResult((result) => result + "6");
                }
              }}
            >
              6
            </div>
          </div>
          <div className="col-start-4 row-start-2 row-end-4 flex items-center justify-center">
            <div
              className="flex h-[138px] w-[60px] items-center justify-center rounded-md border border-white bg-accent text-black shadow-2xl"
              onClick={() => {
                setResult("");
              }}
            >
              C
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "1") < max) {
                  setResult((result) => result + "1");
                }
              }}
            >
              1
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "2") < max) {
                  setResult((result) => result + "2");
                }
              }}
            >
              2
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result + "3") < max) {
                  setResult((result) => result + "3");
                }
              }}
            >
              3
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result) > 0) {
                  if (Number(result + "0") < max) {
                    setResult((result) => result + "0");
                  }
                }
              }}
            >
              0
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-blue-200 text-2xl text-black shadow-2xl"
              onClick={() => {
                if (Number(result) > 0) {
                  if (Number(result + "00") < max) {
                    setResult((result) => result + "00");
                  }
                }
              }}
            >
              00
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-blue-200 text-2xl text-black shadow-2xl"
              onClick={() => {
                if (Number(result) > 0) {
                  if (Number(result + "000") < max) {
                    setResult((result) => result + "000");
                  }
                }
              }}
            >
              000
            </div>
          </div>
          <div className="flex items-center justify-center text-2xl">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white bg-neutral-700 text-black shadow-2xl">
              <Image
                src={"/assets/enter.svg"}
                width={40}
                height={40}
                className="z-10"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
