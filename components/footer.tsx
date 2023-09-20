"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useIsFooterGlobal from "@/globalstates/isFooter";

export default function Footer() {
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <motion.footer
      initial={{ bottom: -90 }}
      animate={{ bottom: 15 }}
      exit={{ bottom: -90 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.1 }}
      className="absolute bottom-[15px] left-1/2 z-30 h-[90px] w-2/3 -translate-x-1/2 rounded-md border-2 border-black"
    >
      <div className="h-full w-full rounded-md border-4 border-secondary bg-primary">
        <div className="flex h-full w-full items-center justify-start rounded-md border border-black">
          <nav
            className="absolute right-[25px] top-[23px] cursor-pointer rounded-full border border-black"
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
