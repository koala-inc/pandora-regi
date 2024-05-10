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
import useSeatPresetGlobal from "@/globalstates/seatPreset";

export default function OrderEnd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );
  let total = 0;
  purchaseOrderState[0]?.cast?.map((cast: any) => {
    total += Number(String(cast.price).replace(/[^0-9]/g, ""));
  });
  total +=
    Number(purchaseOrderState[0]?.price) * Number(purchaseOrderState[0]?.num);
  total += Number(purchaseOrderState[0]?.roomCharge);
  total +=
    Number(purchaseOrderState[0].extensionPrice) *
    Number(purchaseOrderState[0].orderExtension);
  purchaseOrderState[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay =
    Math.ceil(
      Math.floor(
        (total -
          (purchaseOrderState[0]?.priceTax ? purchaseOrderState[0]?.price : 0) -
          (purchaseOrderState[0]?.roomTax
            ? purchaseOrderState[0]?.roomCharge
            : 0)) *
          1.3 *
          1.1 +
          (purchaseOrderState[0]?.priceTax ? purchaseOrderState[0]?.price : 0) +
          (purchaseOrderState[0]?.roomTax
            ? purchaseOrderState[0]?.roomCharge
            : 0)
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
            className="mr-1 h-[100px] w-[calc(100%-360px)]"
            size="h-[auto] w-full"
          >
            <div className="flex w-full flex-col">
              <div className="flex w-full p-4 pb-0">
                <Border2
                  className="my-2 mr-4 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex min-h-[80px] overflow-scroll"
                  black
                >
                  <div className="mr-4 flex w-full flex-col">
                    <div className="w-full text-left text-accent">合計金額</div>
                    <div className="w-full text-right text-2xl">
                      {(discountType
                        ? totalPay + Number(discount)
                        : totalPay - Number(discount)
                      ).toLocaleString()}
                      円
                    </div>
                  </div>
                  <div className="mr-4 flex w-full flex-col">
                    <div className="w-full text-left text-accent">手数料</div>
                    <div className="w-full text-right text-2xl">{0}円</div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div
                      className="w-full text-left text-accent"
                      onClick={() => {
                        setDiscountType((discountType) => !discountType);
                      }}
                    >
                      値引き
                      <span
                        className={
                          discountType
                            ? "ml-4 px-2 opacity-50"
                            : "mx-2 ml-4 rounded-md border border-white px-2"
                        }
                      >
                        -
                      </span>
                      <span
                        className={
                          !discountType
                            ? "px-2 opacity-50"
                            : "mx-2 rounded-md border border-white px-2"
                        }
                      >
                        +
                      </span>
                    </div>
                    <input
                      className="w-full rounded-md border p-[3px] text-right"
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
                  <div className="w-full text-left text-accent">残金</div>
                  <div className="w-full text-right text-2xl text-red-400">
                    {(discountType
                      ? totalPay + Number(discount) - pay
                      : totalPay - Number(discount) - pay
                    ).toLocaleString()}
                    円
                  </div>
                </Border2>
              </div>
              <div className="flex w-full items-center justify-center p-4 pt-0">
                <Border2
                  className="my-2 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex min-h-[100px] overflow-scroll flex-col !justify-end"
                  black
                >
                  <div className="mb-4 flex w-full items-end">
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-1 w-full text-left text-accent">
                        支払方法
                      </div>
                      <select
                        className="text-md w-full rounded-md p-2"
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
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-1 w-full text-left text-accent">
                        カード種類
                      </div>
                      <select
                        className={
                          type
                            ? "text-md w-full rounded-md p-2"
                            : "text-md w-full rounded-md p-2 opacity-20 grayscale"
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
                    <div className="mr-4 flex w-[20rem] flex-col">
                      <div className="mb-1 w-full text-left text-accent">
                        手数料
                      </div>
                      <select
                        className={
                          type
                            ? "text-md w-full rounded-md p-2 text-right"
                            : "text-md w-full rounded-md p-2 text-right opacity-20 grayscale"
                        }
                        disabled={!type}
                      >
                        <option selected>0％</option>
                        <option>10％</option>
                      </select>
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="w-full text-left text-accent">預り金</div>
                      <input
                        className="w-full rounded-md border p-[6px] text-right"
                        value={pay}
                        onChange={(e) => {
                          setPay(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="mr-4 flex h-full min-w-[6rem] flex-col justify-end"
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
                  <div className="mb-4 flex w-full items-end">
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <select
                        className="text-md w-full rounded-md p-2"
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
                          ? "mr-4 flex w-[30rem] flex-col"
                          : "mr-4 flex w-[30rem] flex-col opacity-20 grayscale"
                      }
                    >
                      <select
                        className="text-md w-full rounded-md p-2"
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
                          ? "mr-4 flex w-[20rem] flex-col"
                          : "mr-4 flex w-[20rem] flex-col opacity-20 grayscale"
                      }
                    >
                      <select
                        className="text-md w-full rounded-md p-2 text-right"
                        disabled={!type2}
                      >
                        <option selected>0％</option>
                        <option>5％</option>
                        <option>10％</option>
                        <option>15％</option>
                      </select>
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <input
                        className="w-full rounded-md border p-[6px] text-right"
                        value={pay}
                        onChange={(e) => {
                          setPay(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="mr-4 flex h-full min-w-[6rem] flex-col justify-end"
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
              className="mr-2 mt-3 h-[200px] w-[146px]"
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
                    setPurchaseOrder(
                      purchaseOrder.filter((v: any) => v.id != seatPreset)
                    );
                    setSeatPreset("");
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
