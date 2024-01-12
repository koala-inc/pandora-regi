"use client";

import Control from "@/components/master/(component)/control";
import { useState } from "react";
import Border from "../border";

export default function OrderSet() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <div className="mb-4 flex">
            <span
              className={
                "m-4 flex max-w-[160px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
              }
            >
              フード
            </span>
            <span
              className={
                "m-4 flex max-w-[160px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
              }
            >
              ボトル
            </span>
            <span
              className={
                "m-4 flex max-w-[160px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
              }
            >
              サービス
            </span>
          </div>
          <div className="tabs">
            <a
              className={`tab-lg tab -ml-[4px] mr-1 w-[8em] rounded-t-xl ${
                activeTab == 0
                  ? "tab-active bg-primary text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(0)}
            >
              焼酎
            </a>
            <a
              className={`tab-lg tab mr-1 w-[8em] rounded-t-xl ${
                activeTab == 1
                  ? "tab-active bg-primary text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(1)}
            >
              果実酒
            </a>
            <a
              className={`tab-lg tab mr-1 w-[8em] rounded-t-xl ${
                activeTab == 2
                  ? "tab-active bg-primary text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(2)}
            >
              日本酒
            </a>
            <a className="tab-lifted tab-lg tab w-[8em] rounded-t-xl bg-neutral-400 text-black">
              +
            </a>
            <a className="tab-lifted tab-lg tab w-[8em] rounded-t-xl text-black"></a>
            <a className="tab-lifted tab-lg tab w-[8em] rounded-t-xl text-black"></a>
            <a className="tab-lifted tab-lg tab w-[8em] rounded-t-xl text-black"></a>
          </div>
          <div className="mt-[-1px] h-[460px] w-[800px] rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
            {/* <p>
              {activeTab == 0
                ? "メイン"
                : activeTab == 1
                ? "VIP"
                : activeTab == 2
                ? "その他"
                : ""}
            </p> */}
            <Border
              className="my-2 w-full"
              size="p-4 flex overflow-scroll flex-wrap"
              black
            >
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
            </Border>
          </div>
        </Border>
      </Control>
    </>
  );
}
