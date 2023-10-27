import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "../button";
import Image from "next/image";

export default function OrderEnd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();

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
        className="absolute left-[390px] top-1/2 z-20 h-[95dvh] max-h-[830px] min-h-[755px] w-[calc(100dvw-420px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <div className="flex h-full w-full">
          <Border
            className="mr-1 h-[300px] w-[calc(100%-360px)]"
            size="h-[290px] w-full"
          >
            -
          </Border>
          <Border className="mr-2 h-[210px] w-[146px]" size="h-[200px] w-full">
            <div className="flex w-full flex-col p-1">
              <p className="mb-1 text-center font-bold text-accent">
                レシート発行
              </p>
              <Button natural>合計</Button>
              <Button className="mt-1" natural>
                明細
              </Button>
              <Button className="mt-3" bg="green">
                領収書
              </Button>
            </div>
          </Border>
          <div className="flex h-[300px] flex-col justify-between">
            <Border
              className="mr-2 h-[210px] w-[146px]"
              size="h-[200px] w-full"
            >
              <Button bg="orange">伝票破棄</Button>
              <Button bg="green">立て直し</Button>
            </Border>
            <Border
              className="mr-2 h-[210px] w-[146px]"
              size="h-[200px] w-full"
            >
              <Button bg="red">取消</Button>
              <Button bg="blue">精算</Button>
            </Border>
          </div>
          <nav className="absolute right-0 top-[1px] z-10 cursor-pointer">
            <Border rounded="rounded-full" size="h-[50px] w-[50px]">
              <Image
                src={"/assets/home.svg"}
                width={26}
                height={26}
                className="!h-full !w-full"
                alt=""
              />
            </Border>
          </nav>
        </div>
      </motion.div>
    </>
  );
}
