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
  });
  const [checkedPaymentDetail1, setCheckedPaymentDetail1] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
  });
  const [checkedPaymentDetail2, setCheckedPaymentDetail2] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
  });
  const [checkedPaymentDetail3, setCheckedPaymentDetail3] = useState({
    pay: 0,
    cahrge: 0,
    type: false,
  });

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
                  <div className="w-full text-right text-2xl text-red-400">
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
                        支払方法
                      </div>
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        カード種類
                      </div>
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        手数料
                      </div>
                      <select
                        className={
                          checkedPaymentDetail0.type
                            ? "box-border h-[42px] w-full rounded-md p-2 text-right"
                            : "box-border h-[42px] w-full rounded-md p-2 text-right opacity-20 grayscale"
                        }
                        disabled={!checkedPaymentDetail0.type}
                        onChange={(e) => {
                          setCheckedPaymentDetail0((checkedPaymentDetail0) => {
                            return {
                              ...checkedPaymentDetail0,
                              cahrge: Number(e.target.value),
                            };
                          });
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        金額
                      </div>
                      <input
                        value={checkedPaymentDetail0.pay}
                        className="box-border h-[42px] w-full rounded-md border p-2 text-right"
                        onChange={(e) => {
                          setCheckedPaymentDetail0((checkedPaymentDetail0) => {
                            return {
                              ...checkedPaymentDetail0,
                              pay: Number(e.target.value),
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="mr-4 flex w-[25rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        預り金
                      </div>
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
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay
                          : totalPay -
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay;
                        // setPay(totalPay - discount);
                      }}
                    >
                      <Button natural className={"w-[5em]"}>
                        残金
                      </Button>
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        支払方法
                      </div>
                      <select
                        className="w-full rounded-md p-2"
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        カード種類
                      </div>
                      <select
                        className={
                          checkedPaymentDetail1.type
                            ? "w-full rounded-md p-2"
                            : "w-full rounded-md p-2 opacity-20 grayscale"
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
                    <div className="mr-4 flex w-[20rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        手数料
                      </div>
                      <select
                        className={
                          checkedPaymentDetail1.type
                            ? "w-full rounded-md p-2 text-right"
                            : "w-full rounded-md p-2 text-right opacity-20 grayscale"
                        }
                        disabled={!checkedPaymentDetail1.type}
                        onChange={(e) => {
                          setCheckedPaymentDetail1((checkedPaymentDetail1) => {
                            return {
                              ...checkedPaymentDetail1,
                              cahrge: Number(e.target.value),
                            };
                          });
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
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        金額
                      </div>
                      <input
                        value={checkedPaymentDetail1.pay}
                        className="w-full rounded-md border p-[6px] text-right"
                        onChange={(e) => {
                          setCheckedPaymentDetail1((checkedPaymentDetail1) => {
                            return {
                              ...checkedPaymentDetail1,
                              pay: Number(e.target.value),
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        預り金
                      </div>
                      <div className="w-full rounded-md p-[6px] text-right">
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
                      className="mr-4 flex h-full min-w-[6rem] flex-col justify-end"
                      onClick={() => {
                        checkedPaymentDetail1.pay = discountType
                          ? totalPay +
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay
                          : totalPay -
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay;
                        // setPay(totalPay - discount);
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        支払方法
                      </div>
                      <select
                        className="w-full rounded-md p-2"
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        カード種類
                      </div>
                      <select
                        className={
                          checkedPaymentDetail2.type
                            ? "w-full rounded-md p-2"
                            : "w-full rounded-md p-2 opacity-20 grayscale"
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
                    <div className="mr-4 flex w-[20rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        手数料
                      </div>
                      <select
                        className={
                          checkedPaymentDetail2.type
                            ? "w-full rounded-md p-2 text-right"
                            : "w-full rounded-md p-2 text-right opacity-20 grayscale"
                        }
                        disabled={!checkedPaymentDetail2.type}
                        onChange={(e) => {
                          setCheckedPaymentDetail2((checkedPaymentDetail2) => {
                            return {
                              ...checkedPaymentDetail2,
                              cahrge: Number(e.target.value),
                            };
                          });
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
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        金額
                      </div>
                      <input
                        value={checkedPaymentDetail2.pay}
                        className="w-full rounded-md border p-[6px] text-right"
                        onChange={(e) => {
                          setCheckedPaymentDetail2((checkedPaymentDetail2) => {
                            return {
                              ...checkedPaymentDetail2,
                              pay: Number(e.target.value),
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        預り金
                      </div>
                      <div className="w-full rounded-md p-[6px] text-right">
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
                      className="mr-4 flex h-full min-w-[6rem] flex-col justify-end"
                      onClick={() => {
                        checkedPaymentDetail2.pay = discountType
                          ? totalPay +
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay
                          : totalPay -
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay;
                        // setPay(totalPay - discount);
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        支払方法
                      </div>
                      <select
                        className="w-full rounded-md p-2"
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
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        カード種類
                      </div>
                      <select
                        className={
                          checkedPaymentDetail3.type
                            ? "w-full rounded-md p-2"
                            : "w-full rounded-md p-2 opacity-20 grayscale"
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
                    <div className="mr-4 flex w-[20rem] flex-col">
                      <div className="mb-4 w-full text-left text-xs text-accent">
                        手数料
                      </div>
                      <select
                        className={
                          checkedPaymentDetail3.type
                            ? "w-full rounded-md p-2 text-right"
                            : "w-full rounded-md p-2 text-right opacity-20 grayscale"
                        }
                        disabled={!checkedPaymentDetail3.type}
                        onChange={(e) => {
                          setCheckedPaymentDetail3((checkedPaymentDetail3) => {
                            return {
                              ...checkedPaymentDetail3,
                              cahrge: Number(e.target.value),
                            };
                          });
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
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        金額
                      </div>
                      <input
                        value={checkedPaymentDetail3.pay}
                        className="w-full rounded-md border p-[6px] text-right"
                        onChange={(e) => {
                          setCheckedPaymentDetail3((checkedPaymentDetail3) => {
                            return {
                              ...checkedPaymentDetail3,
                              pay: Number(e.target.value),
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="mr-4 flex w-[30rem] flex-col">
                      <div className="mb-3 w-full text-left text-xs text-accent">
                        預り金
                      </div>
                      <div className="w-full rounded-md p-[6px] text-right">
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
                      className="mr-4 flex h-full min-w-[6rem] flex-col justify-end"
                      onClick={() => {
                        checkedPaymentDetail3.pay = discountType
                          ? totalPay +
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay
                          : totalPay -
                            Number(discount) -
                            checkedPaymentDetail0.pay -
                            checkedPaymentDetail1.pay -
                            checkedPaymentDetail2.pay -
                            checkedPaymentDetail3.pay;
                        // setPay(totalPay - discount);
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
                      Number(
                        discountType
                          ? totalPay + Number(discount) - pay
                          : totalPay - Number(discount) - pay
                      ) == 0
                    ) {
                      purchaseOrderState[0].checkedPayment = true;
                      setPurchaseOrder(
                        purchaseOrder.filter((v: any) => v.id != seatPreset)
                      );
                      setSeatPreset("");
                      setIsPurchaseOrder(true);
                      setIsControl("");
                      setIsCard(false);
                    }
                  }}
                  disabled={
                    Number(
                      discountType
                        ? totalPay + Number(discount) - pay
                        : totalPay - Number(discount) - pay
                    ) != 0
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
