import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Border from "./border";
import Button from "./button";
import useIsControlGlobal from "@/globalstates/isControl";
import Toggle from "./toggle";
import { useState } from "react";

export default function OrderControl() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tabs">
        <a
          className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
            activeTab == 0
              ? "tab-active bg-black text-white"
              : "tab-lifted bg-secondary text-black"
          }`}
          onClick={() => setActiveTab(0)}
        >
          焼酎
        </a>
        <a
          className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
            activeTab == 1
              ? "tab-active bg-black text-white"
              : "tab-lifted bg-secondary text-black"
          }`}
          onClick={() => setActiveTab(1)}
        >
          果実酒
        </a>
        <a
          className={`tab tab-lg mr-1 w-[8em] rounded-t-xl ${
            activeTab == 2
              ? "tab-active bg-black text-white"
              : "tab-lifted bg-secondary text-black"
          }`}
          onClick={() => setActiveTab(2)}
        >
          日本酒
        </a>
        {/* <a className="tab tab-lifted tab-lg w-[8em] rounded-t-xl bg-neutral-400 text-black">
          +
        </a> */}
      </div>
      <div className="mt-[-1px] h-[400px] w-[800px] rounded-b-xl rounded-r-xl bg-black text-white">
        <p>
          {activeTab == 0
            ? "焼酎"
            : activeTab == 1
            ? "果実酒"
            : activeTab == 2
            ? "日本酒"
            : ""}
        </p>
        <span
          className={
            "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
          }
        >
          ジンロ
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
          いいちこ
        </span>
      </div>
    </>
  );
}
