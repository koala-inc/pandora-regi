"use client";

import Control from "@/components/master/(component)/control";
import { useState } from "react";

export default function ItemCategoryList() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Control>
        <div className="h-full w-[1000px] bg-white p-4">
          <div className="tabs">
            <a
              className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
                activeTab == 0
                  ? "tab-active bg-black text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(0)}
            >
              メイン
            </a>
            <a
              className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
                activeTab == 1
                  ? "tab-active bg-black text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(1)}
            >
              VIP
            </a>
            <a
              className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
                activeTab == 2
                  ? "tab-active bg-black text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => setActiveTab(2)}
            >
              案内所/外販
            </a>
            <a className="tab tab-lifted tab-lg w-[8em] rounded-t-xl bg-neutral-400 text-black">
              +
            </a>
          </div>
          <div className="mt-[-1px] h-[400px] w-[800px] rounded-b-xl rounded-r-xl bg-black text-white">
            <p>
              {activeTab == 0
                ? "メイン"
                : activeTab == 1
                ? "VIP"
                : activeTab == 2
                ? "その他"
                : ""}
            </p>
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
          </div>
        </div>
      </Control>
    </>
  );
}
