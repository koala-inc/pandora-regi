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
  let taxNoTotal = 0;
  purchaseOrderState[0]?.orderItem?.map((orderItem: any) => {
    if (!orderItem.isTax) {
      total += Number(orderItem.price) * Number(orderItem.lot);
    } else {
      taxNoTotal +=
        Number(String(orderItem.price).replace(/[^0-9]/g, "")) *
        Number(orderItem.lot);
    }
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    let exTax = Number(cast.orderExtension) * Number(cast.extensionPrice);
    total += exTax;
    if (!cast.isTax) {
      total += Number(cast.price) * Number(cast.lot);
    } else {
      taxNoTotal +=
        Number(String(cast.price).replace(/[^0-9]/g, "")) * Number(cast.lot);
    }
  });
  purchaseOrderState[0]?.orderSet?.map((set: any) => {
    let exTax = Number(set.orderExtension) * Number(set.extensionPrice);
    total += exTax;
    if (!set.isTax) {
      total += Number(set.price) * Number(set.lot);
    } else {
      taxNoTotal +=
        Number(String(set.price).replace(/[^0-9]/g, "")) * Number(set.lot);
    }
  });

  const totalPay = Math.floor(
    Math.ceil(
      (total * (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) * 1.1 +
        taxNoTotal) /
        100
    ) * 100
  );

  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState(0);

  const [type, setType] = useState(false);
  const [type2, setType2] = useState(true);
  const [discountType, setDiscountType] = useState(false);

  const [isCalculator, setIsCalculator] = useState(false);
  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);

  const [checkedPaymentDetail0, setCheckedPaymentDetail0] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: true,
  });
  const [checkedPaymentDetail1, setCheckedPaymentDetail1] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: true,
  });
  const [checkedPaymentDetail2, setCheckedPaymentDetail2] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail3, setCheckedPaymentDetail3] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail4, setCheckedPaymentDetail4] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail5, setCheckedPaymentDetail5] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail6, setCheckedPaymentDetail6] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail7, setCheckedPaymentDetail7] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail8, setCheckedPaymentDetail8] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });
  const [checkedPaymentDetail9, setCheckedPaymentDetail9] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
    view: false,
  });

  const [payNum, setPayNum] = useState(2);

  return (
    <>
      {isCalculator && isCalculatorSelect == 0 && (
        <Calculator4
          result={discount}
          setResult={setDiscount}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 1 && (
        <Calculator4
          result={checkedPaymentDetail0.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail0((checkedPaymentDetail0) => {
              return {
                ...checkedPaymentDetail0,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 2 && (
        <Calculator4
          result={checkedPaymentDetail1.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail1((checkedPaymentDetail1) => {
              return {
                ...checkedPaymentDetail1,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 3 && (
        <Calculator4
          result={checkedPaymentDetail2.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail2((checkedPaymentDetail2) => {
              return {
                ...checkedPaymentDetail2,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 4 && (
        <Calculator4
          result={checkedPaymentDetail3.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail3((checkedPaymentDetail3) => {
              return {
                ...checkedPaymentDetail3,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 5 && (
        <Calculator4
          result={checkedPaymentDetail4.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail4((checkedPaymentDetail4) => {
              return {
                ...checkedPaymentDetail4,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 6 && (
        <Calculator4
          result={checkedPaymentDetail5.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail5((checkedPaymentDetail5) => {
              return {
                ...checkedPaymentDetail5,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 7 && (
        <Calculator4
          result={checkedPaymentDetail6.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail6((checkedPaymentDetail6) => {
              return {
                ...checkedPaymentDetail6,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 8 && (
        <Calculator4
          result={checkedPaymentDetail7.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail7((checkedPaymentDetail7) => {
              return {
                ...checkedPaymentDetail7,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 9 && (
        <Calculator4
          result={checkedPaymentDetail8.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail8((checkedPaymentDetail8) => {
              return {
                ...checkedPaymentDetail8,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
          setIsCalculator={setIsCalculator}
        />
      )}
      {isCalculator && isCalculatorSelect == 10 && (
        <Calculator4
          result={checkedPaymentDetail9.pay}
          setResult={(v: any) => {
            setCheckedPaymentDetail9((checkedPaymentDetail9) => {
              return {
                ...checkedPaymentDetail9,
                pay: Number(v.replace(/[^0-9]/g, "")),
              };
            });
          }}
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
            className="mr-2 h-full w-[calc(100%-230px)]"
            size="h-full w-full"
          >
            <div className="flex h-full w-full flex-col">
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
                        ? totalPay +
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail4.pay *
                                checkedPaymentDetail4.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail5.pay *
                                checkedPaymentDetail5.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail6.pay *
                                checkedPaymentDetail6.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail7.pay *
                                checkedPaymentDetail7.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail8.pay *
                                checkedPaymentDetail8.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail9.pay *
                                checkedPaymentDetail9.cahrge) /
                                10000
                            ) *
                              100)
                        : totalPay -
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail4.pay *
                                checkedPaymentDetail4.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail5.pay *
                                checkedPaymentDetail5.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail6.pay *
                                checkedPaymentDetail6.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail7.pay *
                                checkedPaymentDetail7.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail8.pay *
                                checkedPaymentDetail8.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail9.pay *
                                checkedPaymentDetail9.cahrge) /
                                10000
                            ) *
                              100)
                      ).toLocaleString()}
                      円
                    </div>
                  </div>
                  <div className="mr-4 flex w-full flex-col">
                    <div className="w-full text-left text-accent">手数料</div>
                    <div className="w-full text-right text-2xl">
                      {(
                        Math.ceil(
                          (checkedPaymentDetail0.pay *
                            checkedPaymentDetail0.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail1.pay *
                            checkedPaymentDetail1.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail2.pay *
                            checkedPaymentDetail2.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail3.pay *
                            checkedPaymentDetail3.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail4.pay *
                            checkedPaymentDetail4.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail5.pay *
                            checkedPaymentDetail5.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail6.pay *
                            checkedPaymentDetail6.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail7.pay *
                            checkedPaymentDetail7.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail8.pay *
                            checkedPaymentDetail8.cahrge) /
                            10000
                        ) *
                          100 +
                        Math.ceil(
                          (checkedPaymentDetail9.pay *
                            checkedPaymentDetail9.cahrge) /
                            10000
                        ) *
                          100
                      ).toLocaleString()}
                      円
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div
                      className="mb-2 w-full text-left text-accent"
                      onClick={() => {
                        setDiscountType((discountType) => !discountType);
                      }}
                    >
                      <span
                        className={
                          discountType
                            ? "ml-4 px-2 py-1 opacity-50"
                            : "mx-2 ml-4 rounded-md border border-white px-2 py-1"
                        }
                      >
                        値引
                      </span>
                      <span
                        className={
                          !discountType
                            ? "px-2 py-1 opacity-50"
                            : "mx-2 rounded-md border border-white px-2 py-1"
                        }
                      >
                        掛値
                      </span>
                    </div>
                    <input
                      className="ml-[10%] w-full max-w-[90%] rounded-md border p-[3px] text-right"
                      value={
                        (discountType ? "" : "- ") +
                        Number(discount).toLocaleString() +
                        "円"
                      }
                      onClick={(e) => {
                        setIsCalculatorSelect(0);
                        setIsCalculator(true);
                      }}
                      readOnly
                    />
                  </div>
                </Border2>
                <Border2
                  className="my-2 w-[300px]"
                  rounded="border-white rounded-md"
                  size="p-4 flex flex-col min-h-[98px] overflow-scroll justify-center"
                  black
                >
                  <div className="w-full text-left text-accent">残金</div>
                  <div className="text-red-400 w-full text-right text-2xl">
                    {(
                      (discountType
                        ? totalPay +
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail4.pay *
                                checkedPaymentDetail4.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail5.pay *
                                checkedPaymentDetail5.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail6.pay *
                                checkedPaymentDetail6.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail7.pay *
                                checkedPaymentDetail7.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail8.pay *
                                checkedPaymentDetail8.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail9.pay *
                                checkedPaymentDetail9.cahrge) /
                                10000
                            ) *
                              100)
                        : totalPay -
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail4.pay *
                                checkedPaymentDetail4.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail5.pay *
                                checkedPaymentDetail5.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail6.pay *
                                checkedPaymentDetail6.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail7.pay *
                                checkedPaymentDetail7.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail8.pay *
                                checkedPaymentDetail8.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail9.pay *
                                checkedPaymentDetail9.cahrge) /
                                10000
                            ) *
                              100)) -
                      Math.ceil(
                        (checkedPaymentDetail0.pay *
                          (100 + checkedPaymentDetail0.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail1.pay *
                          (100 + checkedPaymentDetail1.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail2.pay *
                          (100 + checkedPaymentDetail2.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail3.pay *
                          (100 + checkedPaymentDetail3.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail4.pay *
                          (100 + checkedPaymentDetail4.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail5.pay *
                          (100 + checkedPaymentDetail5.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail6.pay *
                          (100 + checkedPaymentDetail6.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail7.pay *
                          (100 + checkedPaymentDetail7.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail8.pay *
                          (100 + checkedPaymentDetail8.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail9.pay *
                          (100 + checkedPaymentDetail9.cahrge)) /
                          10000
                      ) *
                        100
                    ).toLocaleString()}
                    円
                  </div>
                </Border2>
              </div>
              <div className="flex w-full items-center justify-center p-4 pt-0">
                <Border2
                  className="my-2 w-full"
                  rounded="border-white rounded-md"
                  size="p-4 flex h-[calc(95dvh-240px)] max-h-[650px] overflow-scroll flex-col !justify-start"
                  black
                >
                  <div className="mb-4 flex w-full items-end">
                    <div className="mr-4 flex w-[20rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        支払種別
                      </div>
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        カード種類
                      </div>
                    </div>
                    <div className="mr-4 flex w-[15rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        手数料
                      </div>
                    </div>
                    <div className="mr-4 flex w-[25rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        金額
                      </div>
                    </div>
                    <div className="mr-4 flex w-[25rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        預り金
                      </div>
                    </div>
                    <div className="mr-4 flex w-[355px] flex-col"></div>
                    <div className="flex items-center"></div>
                  </div>
                  {checkedPaymentDetail0.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail0(
                                (checkedPaymentDetail0) => {
                                  return {
                                    ...checkedPaymentDetail0,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail0(
                                (checkedPaymentDetail0) => {
                                  return {
                                    ...checkedPaymentDetail0,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail0.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail0.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail0.cahrge}
                          className={
                            checkedPaymentDetail0.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail0.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail0(
                              (checkedPaymentDetail0) => {
                                return {
                                  ...checkedPaymentDetail0,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail0.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(2);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail0.pay *
                                (100 + checkedPaymentDetail0.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail0.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail0.pay = 0;
                          checkedPaymentDetail0.cahrge = 0;
                          checkedPaymentDetail0.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail1.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail1(
                                (checkedPaymentDetail1) => {
                                  return {
                                    ...checkedPaymentDetail1,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail1(
                                (checkedPaymentDetail1) => {
                                  return {
                                    ...checkedPaymentDetail1,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail1.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail1.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail1.cahrge}
                          className={
                            checkedPaymentDetail1.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail1.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail1(
                              (checkedPaymentDetail1) => {
                                return {
                                  ...checkedPaymentDetail1,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail1.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(2);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                (100 + checkedPaymentDetail1.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail1.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail1.pay = 0;
                          checkedPaymentDetail1.cahrge = 0;

                          checkedPaymentDetail1.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail2.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail2(
                                (checkedPaymentDetail2) => {
                                  return {
                                    ...checkedPaymentDetail2,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail2(
                                (checkedPaymentDetail2) => {
                                  return {
                                    ...checkedPaymentDetail2,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail2.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail2.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail2.cahrge}
                          className={
                            checkedPaymentDetail2.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail2.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail2(
                              (checkedPaymentDetail2) => {
                                return {
                                  ...checkedPaymentDetail2,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail2.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(3);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                (100 + checkedPaymentDetail2.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail2.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail2.pay = 0;
                          checkedPaymentDetail2.cahrge = 0;

                          checkedPaymentDetail2.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail3.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail3(
                                (checkedPaymentDetail3) => {
                                  return {
                                    ...checkedPaymentDetail3,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail3(
                                (checkedPaymentDetail3) => {
                                  return {
                                    ...checkedPaymentDetail3,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail3.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail3.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail3.cahrge}
                          className={
                            checkedPaymentDetail3.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail3.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail3(
                              (checkedPaymentDetail3) => {
                                return {
                                  ...checkedPaymentDetail3,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail3.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(4);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                (100 + checkedPaymentDetail3.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail3.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail3.pay = 0;
                          checkedPaymentDetail3.cahrge = 0;

                          checkedPaymentDetail3.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail4.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail4(
                                (checkedPaymentDetail4) => {
                                  return {
                                    ...checkedPaymentDetail4,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail4(
                                (checkedPaymentDetail4) => {
                                  return {
                                    ...checkedPaymentDetail4,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail4.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail4.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail4.cahrge}
                          className={
                            checkedPaymentDetail4.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail4.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail4(
                              (checkedPaymentDetail4) => {
                                return {
                                  ...checkedPaymentDetail4,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail4.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(5);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail4.pay *
                                (100 + checkedPaymentDetail4.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail4.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail4.pay = 0;
                          checkedPaymentDetail4.cahrge = 0;

                          checkedPaymentDetail4.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail5.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail5(
                                (checkedPaymentDetail5) => {
                                  return {
                                    ...checkedPaymentDetail5,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail5(
                                (checkedPaymentDetail5) => {
                                  return {
                                    ...checkedPaymentDetail5,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail5.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail5.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail5.cahrge}
                          className={
                            checkedPaymentDetail5.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail5.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail5(
                              (checkedPaymentDetail5) => {
                                return {
                                  ...checkedPaymentDetail5,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail5.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(6);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail5.pay *
                                (100 + checkedPaymentDetail5.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail5.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail5.pay = 0;
                          checkedPaymentDetail5.cahrge = 0;

                          checkedPaymentDetail5.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail6.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail6(
                                (checkedPaymentDetail6) => {
                                  return {
                                    ...checkedPaymentDetail6,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail6(
                                (checkedPaymentDetail6) => {
                                  return {
                                    ...checkedPaymentDetail6,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail6.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail6.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail6.cahrge}
                          className={
                            checkedPaymentDetail6.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail6.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail6(
                              (checkedPaymentDetail6) => {
                                return {
                                  ...checkedPaymentDetail6,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail6.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(7);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail6.pay *
                                (100 + checkedPaymentDetail6.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail6.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail6.pay = 0;
                          checkedPaymentDetail6.cahrge = 0;

                          checkedPaymentDetail6.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail7.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail7(
                                (checkedPaymentDetail7) => {
                                  return {
                                    ...checkedPaymentDetail7,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail7(
                                (checkedPaymentDetail7) => {
                                  return {
                                    ...checkedPaymentDetail7,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail7.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail7.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail7.cahrge}
                          className={
                            checkedPaymentDetail7.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail7.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail7(
                              (checkedPaymentDetail7) => {
                                return {
                                  ...checkedPaymentDetail7,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail7.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(8);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail7.pay *
                                (100 + checkedPaymentDetail7.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail7.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail8.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail7.pay = 0;
                          checkedPaymentDetail7.cahrge = 0;

                          checkedPaymentDetail7.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail8.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail8(
                                (checkedPaymentDetail8) => {
                                  return {
                                    ...checkedPaymentDetail8,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail8(
                                (checkedPaymentDetail8) => {
                                  return {
                                    ...checkedPaymentDetail8,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail8.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail8.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail8.cahrge}
                          className={
                            checkedPaymentDetail8.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail8.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail8(
                              (checkedPaymentDetail8) => {
                                return {
                                  ...checkedPaymentDetail8,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail8.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(9);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail8.pay *
                                (100 + checkedPaymentDetail8.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail8.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail9.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail9.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail8.pay = 0;
                          checkedPaymentDetail8.cahrge = 0;

                          checkedPaymentDetail8.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  {checkedPaymentDetail9.view && (
                    <div className="mb-4 flex w-full items-end">
                      <div className="mr-4 flex w-[20rem] flex-col">
                        <select
                          className="box-border h-[42px] w-full rounded-md p-2"
                          onChange={(e) => {
                            if (Number(e.target.value) == 1) {
                              setCheckedPaymentDetail9(
                                (checkedPaymentDetail9) => {
                                  return {
                                    ...checkedPaymentDetail9,
                                    type: true,
                                  };
                                }
                              );
                            } else {
                              setCheckedPaymentDetail9(
                                (checkedPaymentDetail9) => {
                                  return {
                                    ...checkedPaymentDetail9,
                                    type: false,
                                    cahrge: 0,
                                  };
                                }
                              );
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
                        <select
                          className={
                            checkedPaymentDetail9.type
                              ? "box-border h-[42px] w-full rounded-md p-2"
                              : "box-border h-[42px] w-full rounded-md p-2 opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail9.type}
                        >
                          <option disabled selected>
                            未選択
                          </option>
                          <option>JCB</option>
                          <option>VISA</option>
                          <option>MASTER</option>
                          <option>AMEX</option>
                          <option>DINERS</option>
                          <option>UNION(銀聯)</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[15rem] flex-col">
                        <select
                          value={checkedPaymentDetail9.cahrge}
                          className={
                            checkedPaymentDetail9.type
                              ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                              : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                          }
                          disabled={!checkedPaymentDetail9.type}
                          onChange={(e) => {
                            setCheckedPaymentDetail9(
                              (checkedPaymentDetail9) => {
                                return {
                                  ...checkedPaymentDetail9,
                                  cahrge: Number(e.target.value),
                                };
                              }
                            );
                          }}
                        >
                          <option value={0} selected>
                            0％
                          </option>
                          <option value={5}>5％</option>
                          <option value={10}>10％</option>
                          <option value={15}>15％</option>
                        </select>
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <input
                          value={
                            checkedPaymentDetail9.pay.toLocaleString() + "円"
                          }
                          className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                          onClick={(e) => {
                            setIsCalculatorSelect(9);
                            setIsCalculator(true);
                          }}
                        />
                      </div>
                      <div className="mr-4 flex w-[25rem] flex-col">
                        <div className="box-border flex h-[42px] w-full items-center justify-end rounded-md p-[4px] text-right">
                          {(
                            Math.ceil(
                              (checkedPaymentDetail9.pay *
                                (100 + checkedPaymentDetail9.cahrge)) /
                                10000
                            ) * 100
                          ).toLocaleString()}
                          円
                        </div>
                      </div>
                      <div
                        className="mr-4 flex h-full min-w-[5rem] flex-col justify-end"
                        onClick={() => {
                          checkedPaymentDetail9.pay = discountType
                            ? totalPay +
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay
                            : totalPay -
                              Number(discount) -
                              checkedPaymentDetail0.pay -
                              checkedPaymentDetail1.pay -
                              checkedPaymentDetail2.pay -
                              checkedPaymentDetail3.pay -
                              checkedPaymentDetail4.pay -
                              checkedPaymentDetail5.pay -
                              checkedPaymentDetail6.pay -
                              checkedPaymentDetail7.pay -
                              checkedPaymentDetail8.pay;
                          // setPay(totalPay - discount);
                        }}
                      >
                        <Button natural className={"w-[5em]"}>
                          残金
                        </Button>
                      </div>
                      <div
                        className="flex h-[40px] items-center"
                        onClick={() => {
                          checkedPaymentDetail9.pay = 0;
                          checkedPaymentDetail9.cahrge = 0;
                          checkedPaymentDetail9.view = false;
                        }}
                      >
                        <Border2
                          className={
                            [
                              checkedPaymentDetail0.view,
                              checkedPaymentDetail1.view,
                              checkedPaymentDetail2.view,
                              checkedPaymentDetail3.view,
                              checkedPaymentDetail4.view,
                              checkedPaymentDetail5.view,
                              checkedPaymentDetail6.view,
                              checkedPaymentDetail7.view,
                              checkedPaymentDetail8.view,
                              checkedPaymentDetail9.view,
                            ].filter((element) => element).length == 1
                              ? "opacity-0"
                              : ""
                          }
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
                  )}
                  <div className="flex w-full items-center justify-center">
                    <Border2
                      rounded="rounded-full"
                      size="h-[24px] w-[24px] p-[4px]"
                    >
                      <Image
                        src={"/assets/addGreen.svg"}
                        width={22}
                        height={22}
                        className="!h-full !w-full"
                        alt=""
                        onClick={() => {
                          let flag = true;
                          [
                            checkedPaymentDetail0.view,
                            checkedPaymentDetail1.view,
                            checkedPaymentDetail2.view,
                            checkedPaymentDetail3.view,
                            checkedPaymentDetail4.view,
                            checkedPaymentDetail5.view,
                            checkedPaymentDetail6.view,
                            checkedPaymentDetail7.view,
                            checkedPaymentDetail8.view,
                            checkedPaymentDetail9.view,
                          ].map((view: any, index: any) => {
                            if (!view && flag) {
                              switch (index) {
                                case 0:
                                  checkedPaymentDetail0.view = true;
                                  break;
                                case 1:
                                  checkedPaymentDetail1.view = true;
                                  break;
                                case 2:
                                  checkedPaymentDetail2.view = true;
                                  break;
                                case 3:
                                  checkedPaymentDetail3.view = true;
                                  break;
                                case 4:
                                  checkedPaymentDetail4.view = true;
                                  break;
                                case 5:
                                  checkedPaymentDetail5.view = true;
                                  break;
                                case 6:
                                  checkedPaymentDetail6.view = true;
                                  break;
                                case 7:
                                  checkedPaymentDetail7.view = true;
                                  break;
                                case 8:
                                  checkedPaymentDetail8.view = true;
                                  break;
                                case 9:
                                  checkedPaymentDetail9.view = true;
                                  break;
                              }
                              flag = false;
                            }
                          });
                        }}
                      />
                    </Border2>
                  </div>
                </Border2>
              </div>
            </div>
          </Border>

          <div className="flex h-[600px] flex-col items-start justify-start">
            <Border
              className="mb-2 h-[270px] w-[146px]"
              size="h-[260px] w-full flex-col"
            >
              <div className="flex w-full flex-col p-4">
                <Button bg="orange" natural>
                  伝票破棄
                </Button>
                <Button className="mt-3" natural>
                  立て直し
                </Button>
                {purchaseOrderState[0].advanceDeposit ? (
                  <Button
                    bg="red"
                    natural
                    className="mt-3"
                    onClick={() => {
                      purchaseOrderState[0].advanceDeposit = false;
                    }}
                  >
                    先預取消
                  </Button>
                ) : (
                  <Button
                    natural
                    className="mt-3"
                    onClick={() => {
                      purchaseOrderState[0].advanceDeposit = true;
                    }}
                  >
                    先預
                  </Button>
                )}

                <Button
                  bg="blue"
                  className="mt-3"
                  natural
                  onClick={() => {
                    if (
                      (discountType
                        ? totalPay +
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100)
                        : totalPay -
                          Number(discount) +
                          (Math.ceil(
                            (checkedPaymentDetail0.pay *
                              checkedPaymentDetail0.cahrge) /
                              10000
                          ) *
                            100 +
                            Math.ceil(
                              (checkedPaymentDetail1.pay *
                                checkedPaymentDetail1.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail2.pay *
                                checkedPaymentDetail2.cahrge) /
                                10000
                            ) *
                              100 +
                            Math.ceil(
                              (checkedPaymentDetail3.pay *
                                checkedPaymentDetail3.cahrge) /
                                10000
                            ) *
                              100)) -
                        Math.ceil(
                          (checkedPaymentDetail0.pay *
                            (100 + checkedPaymentDetail0.cahrge)) /
                            10000
                        ) *
                          100 -
                        Math.ceil(
                          (checkedPaymentDetail1.pay *
                            (100 + checkedPaymentDetail1.cahrge)) /
                            10000
                        ) *
                          100 -
                        Math.ceil(
                          (checkedPaymentDetail2.pay *
                            (100 + checkedPaymentDetail2.cahrge)) /
                            10000
                        ) *
                          100 -
                        Math.ceil(
                          (checkedPaymentDetail3.pay *
                            (100 + checkedPaymentDetail3.cahrge)) /
                            10000
                        ) *
                          100 ==
                      0
                    ) {
                      purchaseOrderState[0].checkedPayment = true;
                      // setPurchaseOrder(
                      //   purchaseOrder.filter((v: any) => v.id != seatPreset)
                      // );
                      setSeatPreset("");
                      setIsPurchaseOrder(true);
                      setIsControl("");
                      setIsCard(false);
                    }
                  }}
                  disabled={
                    (discountType
                      ? totalPay +
                        Number(discount) +
                        (Math.ceil(
                          (checkedPaymentDetail0.pay *
                            checkedPaymentDetail0.cahrge) /
                            10000
                        ) *
                          100 +
                          Math.ceil(
                            (checkedPaymentDetail1.pay *
                              checkedPaymentDetail1.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail2.pay *
                              checkedPaymentDetail2.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail3.pay *
                              checkedPaymentDetail3.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail4.pay *
                              checkedPaymentDetail4.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail5.pay *
                              checkedPaymentDetail5.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail6.pay *
                              checkedPaymentDetail6.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail7.pay *
                              checkedPaymentDetail7.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail8.pay *
                              checkedPaymentDetail8.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail9.pay *
                              checkedPaymentDetail9.cahrge) /
                              10000
                          ) *
                            100)
                      : totalPay -
                        Number(discount) +
                        (Math.ceil(
                          (checkedPaymentDetail0.pay *
                            checkedPaymentDetail0.cahrge) /
                            10000
                        ) *
                          100 +
                          Math.ceil(
                            (checkedPaymentDetail1.pay *
                              checkedPaymentDetail1.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail2.pay *
                              checkedPaymentDetail2.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail3.pay *
                              checkedPaymentDetail3.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail4.pay *
                              checkedPaymentDetail4.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail5.pay *
                              checkedPaymentDetail5.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail6.pay *
                              checkedPaymentDetail6.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail7.pay *
                              checkedPaymentDetail7.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail8.pay *
                              checkedPaymentDetail8.cahrge) /
                              10000
                          ) *
                            100 +
                          Math.ceil(
                            (checkedPaymentDetail9.pay *
                              checkedPaymentDetail9.cahrge) /
                              10000
                          ) *
                            100)) -
                      Math.ceil(
                        (checkedPaymentDetail0.pay *
                          (100 + checkedPaymentDetail0.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail1.pay *
                          (100 + checkedPaymentDetail1.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail2.pay *
                          (100 + checkedPaymentDetail2.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail3.pay *
                          (100 + checkedPaymentDetail3.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail4.pay *
                          (100 + checkedPaymentDetail4.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail5.pay *
                          (100 + checkedPaymentDetail5.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail6.pay *
                          (100 + checkedPaymentDetail6.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail7.pay *
                          (100 + checkedPaymentDetail7.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail8.pay *
                          (100 + checkedPaymentDetail8.cahrge)) /
                          10000
                      ) *
                        100 -
                      Math.ceil(
                        (checkedPaymentDetail9.pay *
                          (100 + checkedPaymentDetail9.cahrge)) /
                          10000
                      ) *
                        100 !=
                    0
                  }
                >
                  精算
                </Button>
              </div>
            </Border>
            <Border className="h-[220px] w-[146px]" size="h-[210px] w-full">
              <div className="flex w-full flex-col p-4 py-6">
                <p className="mb-2 text-center font-bold text-accent">
                  レシート発行
                </p>
                <Button natural>合計</Button>
                <Button className="mt-3" natural>
                  明細
                </Button>
                <Button className="mb-1 mt-3" natural>
                  領収書
                </Button>
              </div>
            </Border>
          </div>
        </div>
      </motion.div>
    </>
  );
}
