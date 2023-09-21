"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "./button";

export default function Footer() {
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <motion.footer
      initial={{ bottom: -160 }}
      animate={{ bottom: 15 }}
      exit={{ bottom: -160 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.1 }}
      className="absolute bottom-[15px] left-1/2 z-30 h-[160px] w-2/3 -translate-x-1/2 rounded-md border-2 border-black"
    >
      <div className="h-full w-full rounded-md border-4 border-secondary bg-primary">
        <div className="flex h-full w-full items-center justify-start rounded-md border border-black px-5">
          <div className="flex w-[calc(100%-65px)] flex-wrap items-start justify-around">
            <Button>タイムカード</Button>
            <Button disabled>送り/日払い</Button>
            <Button disabled>外販</Button>
            <Button disabled>出納帳</Button>
            <Button disabled>リスト票</Button>
            <Button disabled>荷物</Button>
            <Button disabled>顧客</Button>
            <Button disabled>ポイント</Button>
            <Button disabled>キープボトル</Button>
            <Button disabled>在庫</Button>
            <Button disabled>
              キャスト
              <br />
              伝票履歴
            </Button>
            <Button>マスター</Button>
            <Button disabled>ログ</Button>
            <Button disabled>コール票発行</Button>
          </div>
          <nav
            className="absolute right-[25px] top-[58px] cursor-pointer rounded-full border border-black"
            onClick={() => setIsFooter(false)}
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
    </motion.footer>
  );
}
