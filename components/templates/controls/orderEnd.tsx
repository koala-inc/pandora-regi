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
import Calculator1 from "@/components/parts/calculator1";
import Calculator from "@/components/parts/calculator";
import Calculator4 from "@/components/parts/calculator4";

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
  total += Number(purchaseOrder[0]?.price) * Number(purchaseOrder[0]?.num);
  total += Number(purchaseOrder[0]?.roomCharge);
  total +=
    Number(purchaseOrder[0].extensionPrice) *
    Number(purchaseOrder[0].orderExtension);
  purchaseOrder[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrder[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay =
    Math.ceil(
      Math.floor(
        (total -
          (purchaseOrder[0]?.priceTax ? purchaseOrder[0]?.price : 0) -
          (purchaseOrder[0]?.roomTax ? purchaseOrder[0]?.roomCharge : 0)) *
          1.3 *
          1.1 +
          (purchaseOrder[0]?.priceTax ? purchaseOrder[0]?.price : 0) +
          (purchaseOrder[0]?.roomTax ? purchaseOrder[0]?.roomCharge : 0)
      ) / 100
    ) * 100;
  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState(0);

  const [type, setType] = useState(false);
  const [type2, setType2] = useState(true);
  const [discountType, setDiscountType] = useState(false);

  const [isCalculator, setIsCalculator] = useState(false);
  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);

  return (
    <>
      {isCalculator && isCalculatorSelect == 0 && (
        <Calculator4
          result={discount}
          setResult={setDiscount}
          setIsCalculator={setIsCalculator}
        />
      )}
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
            size="h-[auto] w-full"
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
                      {(discountType
                        ? totalPay + Number(discount)
                        : totalPay - Number(discount)
                      ).toLocaleString()}
                      円
                    </div>
                  </div>
                  <div className="flex flex-col w-full mr-4">
                    <div className="text-accent w-full text-left">手数料</div>
                    <div className="w-full text-right text-2xl">{0}円</div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div
                      className="text-accent w-full text-left"
                      onClick={() => {
                        setDiscountType((discountType) => !discountType);
                      }}
                    >
                      値引き
                      <span
                        className={
                          discountType
                            ? "opacity-50 ml-4 px-2"
                            : "mx-2 ml-4 border border-white px-2 rounded-md"
                        }
                      >
                        -
                      </span>
                      <span
                        className={
                          !discountType
                            ? "opacity-50 px-2"
                            : "mx-2 border border-white px-2 rounded-md"
                        }
                      >
                        +
                      </span>
                    </div>
                    <input
                      className="w-full border p-[3px] rounded-md text-right"
                      value={
                        (discountType ? "" : "-") +
                        Number(discount).toLocaleString()
                      }
                      onClick={(e) => {
                        setIsCalculator(true);
                      }}
                      readOnly
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
                    {(discountType
                      ? totalPay + Number(discount) - pay
                      : totalPay - Number(discount) - pay
                    ).toLocaleString()}
                    円
                  </div>
                </Border2>
              </div>
              <div className="p-4 pt-0 w-full flex justify-center items-center">
                <Border2
                  className="my-2 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex min-h-[100px] overflow-scroll flex-col !justify-end"
                  black
                >
                  <div className="w-full flex items-end mb-4">
                    <div className="flex flex-col w-[30rem] mr-4">
                      <div className="text-accent w-full text-left mb-1">
                        支払方法
                      </div>
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
                    <div className="flex flex-col w-[30rem] mr-4">
                      <div className="text-accent w-full text-left mb-1">
                        カード種類
                      </div>
                      <select
                        className={
                          type
                            ? "w-full text-md p-2 rounded-md"
                            : "w-full text-md p-2 rounded-md grayscale opacity-20"
                        }
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
                    <div className="flex flex-col w-[20rem] mr-4">
                      <div className="text-accent w-full text-left mb-1">
                        手数料
                      </div>
                      <select
                        className={
                          type
                            ? "w-full text-md text-right p-2 rounded-md"
                            : "w-full text-md text-right p-2 rounded-md grayscale opacity-20"
                        }
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
                  </div>
                  <div className="w-full flex items-end mb-4">
                    <div className="flex flex-col w-[30rem] mr-4">
                      <select
                        className="w-full text-md p-2 rounded-md"
                        onChange={(e) => {
                          if (Number(e.target.value) == 1) {
                            setType2(true);
                          } else {
                            setType2(false);
                          }
                        }}
                      >
                        <option value={1} selected>
                          カード
                        </option>
                        <option value={2}>現金</option>
                        <option value={3}>ポイント</option>
                        <option value={4}>掛</option>
                      </select>
                    </div>
                    <div
                      className={
                        type2
                          ? "flex flex-col w-[30rem] mr-4"
                          : "flex flex-col w-[30rem] mr-4 grayscale opacity-20"
                      }
                    >
                      <select
                        className="w-full text-md p-2 rounded-md"
                        disabled={!type2}
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
                        type2
                          ? "flex flex-col w-[20rem] mr-4"
                          : "flex flex-col w-[20rem] mr-4 grayscale opacity-20"
                      }
                    >
                      <select
                        className="w-full text-md text-right p-2 rounded-md"
                        disabled={!type2}
                      >
                        <option selected>0％</option>
                        <option>5％</option>
                        <option>10％</option>
                        <option>15％</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-[30rem] mr-4">
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
