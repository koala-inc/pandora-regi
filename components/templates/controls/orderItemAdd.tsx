import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/settings";
import Button from "../button";
import { useState } from "react";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[100px] w-full px-4 py-2">{children}</SubBorder>;
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

export default function OrderItemAdd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-405px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <ContentHeader>
          <Button>オーダー入力</Button>
          <Button>店内履歴</Button>
          <Button>オーダー修正</Button>
          <input />
          <Button>検索</Button>
        </ContentHeader>
        <div className="flex py-2">
          <Button>ドリンク</Button>
          <Button>フード</Button>
          <Button>ボトル</Button>
        </div>
        <div className="tabs mt-3">
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 0
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(0)}
          >
            焼酎
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 1
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(1)}
          >
            果実酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            日本酒
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
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
        <div className="mt-[-1px] flex h-[520px] w-[1020px] rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
          <div className="grid w-full grid-cols-8 grid-rows-7 content-start items-center justify-center rounded-md border border-white bg-black p-4">
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              いいちこ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
              <br />
              プレミアム
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              いいちこ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
              <br />
              プレミアム
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              いいちこ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
              <br />
              プレミアム
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              いいちこ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              いいちこ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
              <br />
              プレミアム
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              ジンロ
            </div>
            <div
              className={
                "mx-auto flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              鏡月
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
