"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function Header() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {}, (60 - datetime.getSeconds()) * 1000);
    setInterval(() => {
      setDatetime(new Date());
    }, 60 * 1000);
  }, []);

  return (
    <motion.header
      initial={{ top: -90 }}
      animate={{ top: 0 }}
      exit={{ top: -90 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.1 }}
      className="absolute top-0 z-30 h-[90px] w-full border-y-2 border-black"
    >
      <div className="h-full w-full border-y-4 border-secondary bg-primary">
        <div className="flex h-full w-full items-center justify-start border-y border-black">
          <div className="px-6">
            <div className="text-accent">時間</div>
            <div className="text-4xl text-white">
              {format(datetime, "HH:mm:ss", { locale: ja })}
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
    </motion.header>
  );
}
