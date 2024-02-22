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
import { useState } from "react";

export default function OrderEnd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  let total = 0;
  purchaseOrder[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total += Number(purchaseOrder[0]?.price);
  purchaseOrder[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });

  const totalPay = Math.ceil(Math.floor(total * 1.3 * 1.1) / 100) * 100;
  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState(0);

  const [type, setType] = useState(false);

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
                    <div className="w-full text-right text-2xl">
                      {(totalPay - discount).toLocaleString()}円
                    </div>
                  </div>
                  <div className="flex flex-col w-full mr-4">
                    <div className="text-accent w-full text-left">手数料</div>
                    <div className="w-full text-right text-2xl">{0}円</div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-accent w-full text-left">値引き</div>
                    <input
                      className="w-full border p-[3px] rounded-md text-right"
                      value={discount}
                      onChange={(e) => {
                        setDiscount(Number(e.target.value));
                      }}
                    />
                  </div>
                </Border2>
                <Border2
                  className="my-2 w-[300px]"
                  rounded="border-white rounded-md"
                  size="p-4 flex flex-col min-h-[90px] overflow-scroll justify-center"
                  black
                >
                  <div className="text-accent w-full text-left">残金</div>
                  <div className="w-full text-right text-2xl text-red-400">
                    {(totalPay - discount - pay).toLocaleString()}円
                  </div>
                </Border2>
              </div>
              <div className="p-4 pt-0 w-full flex justify-center items-center">
                <Border2
                  className="my-2 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex min-h-[100px] overflow-scroll !items-end"
                  black
                >
                  <div className="flex flex-col w-[30rem] mr-4">
                    <div className="text-accent w-full text-left">支払方法</div>
                    <select
                      className="w-full text-md p-2 rounded-md"
                      onChange={(e) => {
                        if (Number(e.target.value) == 1) {
                          setType(true);
                        } else {
                          setType(false);
                        }
                      }}
                    >
                      <option value={1}>カード</option>
                      <option value={2} selected>
                        現金
                      </option>
                      <option value={3}>ポイント</option>
                      <option value={4}>掛</option>
                    </select>
                  </div>
                  <div
                    className={
                      type
                        ? "flex flex-col w-[30rem] mr-4"
                        : "flex flex-col w-[30rem] mr-4 grayscale opacity-20"
                    }
                  >
                    <div className="text-accent w-full text-left">
                      カード種類
                    </div>
                    <select
                      className="w-full text-md p-2 rounded-md"
                      disabled={!type}
                    >
                      <option disabled selected>
                        選択してください。
                      </option>
                      <option>JCB</option>
                      <option>VISA</option>
                      <option>MASTER</option>
                      <option>AMEX</option>
                      <option>DINERS</option>
                      <option>UNION(銀聯)</option>
                    </select>
                  </div>
                  <div
                    className={
                      type
                        ? "flex flex-col w-[20rem] mr-4"
                        : "flex flex-col w-[20rem] mr-4 grayscale opacity-20"
                    }
                  >
                    <div className="text-accent w-full text-left">手数料</div>
                    <select
                      className="w-full text-md text-right p-2 rounded-md"
                      disabled={!type}
                    >
                      <option selected>0％</option>
                      <option>10％</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[30rem] mr-4">
                    <div className="text-accent w-full text-left">預り金</div>
                    <input
                      className="w-full border p-[6px] rounded-md text-right"
                      value={pay}
                      onChange={(e) => {
                        setPay(Number(e.target.value));
                      }}
                    />
                  </div>
                  <div
                    className="flex flex-col min-w-[6rem] mr-4 h-full justify-end"
                    onClick={() => {
                      setPay(totalPay - discount);
                    }}
                  >
                    <Button natural>残金</Button>
                  </div>
                  <div className="flex h-[40px] items-center">
                    <Border2
                      rounded="rounded-full"
                      size="h-[28px] w-[28px] p-[6px]"
                    >
                      <div>
                        <Image
                          src={"/assets/close.svg"}
                          width={26}
                          height={26}
                          className="!h-full !w-full"
                          alt=""
                        />
                      </div>
                    </Border2>
                  </div>
                </Border2>
              </div>
            </div>
          </Border>
          <Border className="mr-2 h-[210px] w-[146px]" size="h-[200px] w-full">
            <div className="flex w-full flex-col p-4">
              <p className="mb-1 text-center font-bold text-accent">
                レシート発行
              </p>
              <Button natural>合計</Button>
              <Button className="mt-1" natural>
                明細
              </Button>
              <Button className="mt-3" bg="green" natural>
                領収書
              </Button>
            </div>
          </Border>
          <div className="flex h-[300px] flex-col justify-start">
            <Border
              className="mr-2 h-[140px] w-[146px]"
              size="h-[130px] w-full flex-col"
            >
              <div className="flex w-full flex-col p-4">
                <Button bg="orange" natural>
                  伝票破棄
                </Button>
                <Button bg="green" className="mt-3" natural>
                  立て直し
                </Button>
              </div>
            </Border>
            <Border
              className="mt-3 mr-2 h-[200px] w-[146px]"
              size="h-[190px] w-full flex-col"
            >
              <div className="flex w-full flex-col p-4">
                <Button bg="red" natural>
                  取消
                </Button>
                <Button className="mt-3" natural>
                  先預り
                </Button>
                <Button
                  bg="blue"
                  className="mt-3"
                  natural
                  onClick={() => {
                    setPurchaseOrder([]);
                    setIsPurchaseOrder(true);
                    setIsControl("");
                    setIsCard(false);
                  }}
                >
                  精算
                </Button>
              </div>
            </Border>
          </div>
        </div>
      </motion.div>
    </>
  );
}
