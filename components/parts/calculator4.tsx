"use client";

import { useState } from "react";
import Image from "next/image";

export default function Calculator4({
  result,
  setResult,
  setIsCalculator,
  select,
}: any) {
  const [result2, setResult2] = useState("");
  const max = 999999999;

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="relative h-[400px] w-[300px] rounded-md border-4 border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {
            setResult2("");
            setIsCalculator(false);
          }}
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
          {result2 == ""
            ? Number(result).toLocaleString()
            : Number(result2).toLocaleString()}
          円
        </div>
        <div className="mt-4 grid grid-cols-4 grid-rows-4 content-center items-center justify-center gap-4 text-3xl font-bold">
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result2 + "7") < max) {
                  setResult2((result: any) => result + "7");
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
                if (Number(result2 + "8") < max) {
                  setResult2((result: any) => result + "8");
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
                if (Number(result2 + "9") < max) {
                  setResult2((result: any) => result + "9");
                }
              }}
            >
              9
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-gray-200 text-black shadow-2xl"
              onClick={() => {}}
            ></div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result2 + "4") < max) {
                  setResult2((result: any) => result + "4");
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
                if (Number(result2 + "5") < max) {
                  setResult2((result: any) => result + "5");
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
                if (Number(result2 + "6") < max) {
                  setResult2((result: any) => result + "6");
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
                setResult2("0");
              }}
            >
              C
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (Number(result2 + "1") < max) {
                  setResult2((result: any) => result + "1");
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
                if (Number(result2 + "2") < max) {
                  setResult2((result: any) => result + "2");
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
                if (Number(result2 + "3") < max) {
                  setResult2((result: any) => result + "3");
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
                if (Number(result2) > 0 || result2 == "") {
                  if (Number(result2 + "0") < max) {
                    setResult2((result: any) => result + "0");
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
                if (Number(result2) > 0) {
                  if (Number(result2 + "00") < max) {
                    setResult2((result: any) => result + "00");
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
                if (Number(result2) > 0) {
                  if (Number(result2 + "000") < max) {
                    setResult2((result: any) => result + "000");
                  }
                }
              }}
            >
              000
            </div>
          </div>
          <div className="flex items-center justify-center text-2xl">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white bg-neutral-700 text-black shadow-2xl"
              onClick={() => {
                if (result2 != "") {
                  setResult(result2.replace(/[^0-9]/g, ""));
                } else {
                  setResult(result.replace(/[^0-9]/g, ""));
                }
                setIsCalculator(false);
              }}
            >
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
