import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "../button";
import Image from "next/image";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";

export default function OrderEnd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();

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
            <div className="flex flex-col w-full">
              <div className="flex p-4 pb-0 w-full">
                <Border2
                  className="my-2 w-full mr-4"
                  rounded="border-white rounded-md"
                  size="p-4 flex min-h-[80px] overflow-scroll"
                  black
                >
                  <div className="flex flex-col w-full mr-4">
                    <div className="text-accent w-full text-left">合計金額</div>
                    <div className="w-full text-right text-2xl">¥0</div>
                  </div>
                  <div className="flex flex-col w-full mr-4">
                    <div className="text-accent w-full text-left">手数料</div>
                    <div className="w-full text-right text-2xl">¥0</div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-accent w-full text-left">値引き</div>
                    <input className="w-full border rounded-md text-right" />
                  </div>
                </Border2>
                <Border2
                  className="my-2 w-[300px]"
                  rounded="border-white rounded-md"
                  size="p-4 flex flex-col min-h-[90px] overflow-scroll justify-center"
                  black
                >
                  <div className="text-accent w-full text-left">残金</div>
                  <div className="w-full text-right text-red-400">¥0</div>
                </Border2>
              </div>
              <div className="p-4 pt-0 w-full">
                <Border2
                  className="my-2 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex flex-col min-h-[100px] overflow-scroll"
                  black
                >
                  -
                </Border2>
              </div>
            </div>
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
              size="h-[200px] w-full flex-col"
            >
              <Button bg="orange">伝票破棄</Button>
              <Button bg="green">立て直し</Button>
            </Border>
            <Border
              className="mr-2 h-[210px] w-[146px]"
              size="h-[200px] w-full flex-col"
            >
              <Button bg="red">取消</Button>
              <Button
                bg="blue"
                onClick={() => {
                  setPurchaseOrder([]);
                  setIsPurchaseOrder(true);
                  setIsControl("");
                  setIsCard(false);
                }}
              >
                精算
              </Button>
            </Border>
          </div>
        </div>
      </motion.div>
    </>
  );
}
