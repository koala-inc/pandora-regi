import Image from "next/image";
import Border from "./border";
import Button from "./button";
import Toggle from "./toggle";
import Toggle5 from "./toggle5";
import Toggle6 from "./toggle6";
import Card from "@/components/templates/card";
import Border2 from "@/components/templates/border";

// グローバルステート
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsControlGlobal from "@/globalstates/isControl";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import { useState } from "react";
import usePurchaseOrderItemAddGlobal from "@/globalstates/purchaseOrderItemAdd";

import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";
import { searchDesignate } from "@/gqls/query/designate";
import Calculator3 from "../parts/calculator3";
import useIsLockGlobal from "@/globalstates/isLock";
import Lock from "../parts/lock";

function Lists({
  lists,
}: {
  lists: {
    title: string;
    subTitle?: string;
    lot: number;
    price: number;
    tax?: boolean;
  }[];
}) {
  return (
    <ul className="hidden-scrollbar w-full overflow-y-scroll pr-2">
      {lists?.map((list, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <div className="w-[50%] text-left">{list.title.slice(0, 9)}</div>
          {/* <div className="w-[10%] text-left">{list.subTitle || ""}</div> */}
          <div className="w-[10%] text-right">{list.lot}</div>
          <div className="w-[40%] text-right">
            {(list.price * list.lot)?.toLocaleString()}
            {list.tax ? "込" : "円"}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Line({ ml }: { ml?: string }) {
  return (
    <div className={"flex flex-1 justify-between items-center " + ml}>
      <Image src={"/assets/line.svg"} width={26} height={26} alt="" />
      <div className="h-[0.9px] w-[calc(100%-56px)] rounded-full bg-secondary"></div>
      <Image
        src={"/assets/line.svg"}
        width={26}
        height={26}
        className="rotate-180"
        alt=""
      />
    </div>
  );
}

function Base() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [toggle, setToggle] = useState(purchaseOrder[0]?.toggle || false);
  const [isLock, setIsLock] = useIsLockGlobal();

  let total = 0;
  purchaseOrder[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total += Number(purchaseOrder[0]?.price) * Number(purchaseOrder[0]?.num);
  total += Number(purchaseOrder[0]?.roomCharge);
  purchaseOrder[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrder[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay = total;

  return (
    <>
      <section className="flex items-center justify-around text-md">
        <div className="flex-col flex items-center">
          <p className="text-4xl mb-6">A1　</p>
          <Toggle isChecked={toggle} setIsChecked={setToggle} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrder[0]?.num}名</p>
          </div>
          <div className="mt-3 flex min-w-[4em] flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">コール時間</p>
            <p>{toggle ? "-" : purchaseOrder[0]?.callTime}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("TIME");
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrder[0]?.startTime}~{purchaseOrder[0]?.endTime}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Border
              className="mr-1"
              size="px-2 text-red-700"
              natural
              stroke="md"
            >
              -30
            </Border>
            <Border size="px-2 text-blue-700" natural stroke="md">
              +30
            </Border>
          </div>
        </div>
      </section>
      <nav className="flex mt-4 items-start justify-around py-3">
        <div>
          <Border rounded="rounded-full" stroke="md">
            <Image
              src={"/assets/custody.svg"}
              width={24}
              height={24}
              alt=""
              className="p-1"
            />
          </Border>
          <div className="w-full text-center text-[0.5rem] text-accent">
            荷物
          </div>
        </div>
        <div>
          <Border rounded="rounded-full" stroke="md">
            <Image
              src={"/assets/customer.svg"}
              width={24}
              height={24}
              alt=""
              className="p-1"
            />
          </Border>
          <div className="w-full text-center text-[0.5rem] text-accent">
            顧客
          </div>
        </div>
        <div>
          <Border rounded="rounded-full" stroke="md">
            <Image
              src={"/assets/keepbottle.svg"}
              width={24}
              height={24}
              alt=""
              className="p-1"
            />
          </Border>
          <div className="w-full text-center text-[0.5rem] text-accent">
            ボトル
          </div>
        </div>
        <div>
          <Border rounded="rounded-full" stroke="md">
            <Image
              src={"/assets/manager.svg"}
              width={24}
              height={24}
              alt=""
              className="p-1"
            />
          </Border>
          <div className="w-full text-center text-[0.5rem] text-accent">
            販促
          </div>
        </div>
        <div>
          <Border
            rounded="rounded-full"
            size="text-xs w-[26px] h-[26px]"
            stroke="md"
          >
            1
          </Border>
        </div>
        <div>
          <Border
            rounded="rounded-full"
            size="text-xs w-[26px] h-[26px]"
            stroke="md"
          >
            2
          </Border>
        </div>
        <div>
          <Border
            rounded="rounded-full"
            size="text-xs w-[26px] h-[26px]"
            stroke="md"
          >
            3
          </Border>
        </div>
        <div>
          <Border
            rounded="rounded-full"
            size="text-xs w-[26px] h-[26px]"
            stroke="md"
          >
            4
          </Border>
        </div>
      </nav>
      <section className="flex flex-1 flex-col text-xs">
        <div className="mb-1 flex-1 max-h-[120px]">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">セット料金</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex text-sm px-2 h-[120px] max-h-[100px] min-h-[100px]">
            <Lists
              lists={
                purchaseOrder[0]?.roomCharge
                  ? [
                      {
                        title: purchaseOrder[0]?.setName,
                        lot: purchaseOrder[0]?.num,
                        price: purchaseOrder[0]?.price,
                        tax: purchaseOrder[0]?.priceTax,
                      },
                      {
                        title: "ルームチャージ",
                        lot: 1,
                        price: purchaseOrder[0]?.roomCharge,
                        tax: purchaseOrder[0]?.roomTax,
                      },
                    ]
                  : [
                      {
                        title: purchaseOrder[0]?.setName,
                        lot: purchaseOrder[0]?.num,
                        price: purchaseOrder[0]?.price,
                        tax: purchaseOrder[0]?.priceTax,
                      },
                    ]
                // {
                //   title: "メイン",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "┗特別クーポン",
                //   lot: 1,
                //   price: -1000,
                // },
                // {
                //   title: "メイン",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "延長",
                //   lot: 1,
                //   price: 1000,
                // },
              }
            />
            <div
              className="my-auto flex w-[60px] h-full flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("SET");
              }}
            >
              <Border rounded="rounded-full" stroke="lg">
                <Image
                  src={"/assets/add-customer.svg"}
                  width={36}
                  height={36}
                  alt=""
                  className="p-[6px]"
                />
              </Border>
              <div className="w-full text-center text-[0.5rem] text-accent">
                合流
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1 flex-1 max-h-[120px]">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">指名キャスト</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex text-sm px-2 max-h-[100px] min-h-[100px]">
            <Lists
              lists={
                [
                  ...purchaseOrder[0]?.cast?.map((cast: any) => {
                    return {
                      title: cast.split("##")[0],
                      subTitle: "",
                      lot: 1,
                      price: Number(cast.split("##")[1]),
                    };
                  }),
                  ...purchaseOrder[0].orderCast?.map((cast: any) => {
                    return {
                      title: cast.title,
                      subTitle: "",
                      lot: Number(cast.lot),
                      price: Number(cast.price),
                    };
                  }),
                ]
                // [
                // {
                //   title: purchaseOrder[0]?.cast[0] || "",
                //   subTitle: "",
                //   lot: 1,
                //   price: 0,
                // },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // ]
              }
            />
            <div
              className="my-auto flex w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("CAST");
              }}
            >
              <Border rounded="rounded-full" stroke="lg">
                <Image
                  src={"/assets/cast.svg"}
                  width={36}
                  height={36}
                  alt=""
                  className="p-[2px]"
                />
              </Border>
              <div className="w-full text-center text-[0.5rem] text-accent">
                指名
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1 flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">オーダー</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex text-sm px-2 max-h-[130px] min-h-[130px]">
            <Lists lists={purchaseOrder[0]?.orderItem || []} />
            <div
              className="my-auto flex w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("ITEM");
              }}
            >
              <Border rounded="rounded-full" stroke="lg">
                <Image
                  src={"/assets/order.svg"}
                  width={36}
                  height={36}
                  alt=""
                  className="p-[2px]"
                />
              </Border>
              <div className="w-full text-center text-[0.5rem] text-accent">
                オーダー
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <Line />
        </div>
        <div className="flex px-2">
          <div className="w-full">
            <div className="mt-3 flex text-sm w-full items-center justify-between">
              <div>小計</div>
              <div>{Math.floor(totalPay).toLocaleString()}円</div>
            </div>
            <div className="mt-1 flex text-sm w-full items-center justify-between">
              <div>サービス</div>
              <div>
                {Math.floor(
                  purchaseOrder[0]?.priceTax
                    ? purchaseOrder[0]?.roomTax
                      ? (totalPay -
                          purchaseOrder[0]?.price -
                          purchaseOrder[0]?.roomCharge) *
                        0.3
                      : (totalPay - purchaseOrder[0]?.price) * 0.3
                    : totalPay * 0.3
                ).toLocaleString()}
                円
              </div>
            </div>
            <div className="mt-1 flex text-sm w-full items-center justify-between">
              <div>税</div>
              <div>
                {Math.floor(
                  purchaseOrder[0]?.priceTax
                    ? purchaseOrder[0]?.roomTax
                      ? (totalPay -
                          purchaseOrder[0]?.price -
                          purchaseOrder[0]?.roomCharge) *
                        1.3 *
                        0.1
                      : (totalPay - purchaseOrder[0]?.price) * 1.3 * 0.1
                    : totalPay * 1.3 * 0.1
                ).toLocaleString()}
                円
              </div>
            </div>
            <div className="mt-2 flex w-full items-center justify-between text-2xl text-accent">
              <div>合計</div>
              <div className="flex-1 text-right">
                {(
                  Math.ceil(
                    Math.floor(
                      purchaseOrder[0]?.priceTax
                        ? purchaseOrder[0]?.roomTax
                          ? (totalPay -
                              purchaseOrder[0]?.price -
                              purchaseOrder[0]?.roomCharge) *
                              1.3 *
                              1.1 +
                            purchaseOrder[0]?.price
                          : (totalPay - purchaseOrder[0]?.price) * 1.3 * 1.1 +
                            purchaseOrder[0]?.price
                        : totalPay * 1.3 * 1.1
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("END");
            }}
            className="flex h-[116px] w-[60px] flex-col items-center justify-center pl-3"
          >
            <Border rounded="rounded-full" stroke="lg" natural>
              <Image
                src={"/assets/check.svg"}
                width={36}
                height={36}
                alt=""
                className="p-[6px]"
              />
            </Border>
            <div className="w-full text-center text-[0.5rem] text-accent">
              会計
            </div>
          </div>
        </div>
      </section>
      <nav className="mt-4 flex w-full items-center justify-center">
        <Button className="mr-2 min-w-[8rem]" natural disabled>
          分伝/合算
        </Button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsLock(1);
          }}
        >
          <Button className="min-w-[8rem]" natural>
            概算
          </Button>
        </div>
      </nav>
    </>
  );
}

function Add({ isCalculator, setIsCalculator }: any) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();

  let total = 0;
  purchaseOrder[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total += Number(purchaseOrder[0]?.price) * Number(purchaseOrder[0]?.num);
  total += Number(purchaseOrder[0]?.roomCharge);
  purchaseOrder[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrder[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay = total;

  let total2 = 0;
  purchaseOrderItemAdd.map((purchaseOrderItemAdd: any) => {
    total2 +=
      Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
  });

  const totalPay2 = total2 + totalPay;

  // const [isCalculator, setIsCalculator] = useState(false);

  return (
    <>
      <section className="flex items-center justify-around text-md mb-4">
        <div className="flex-col flex items-center w-[77.45px]">
          <p className="text-4xl w-full text-left">A1</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrder[0]?.num}名</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[111.77px]">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("TIME");
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrder[0]?.startTime || "00:00"}~
              {purchaseOrder[0]?.endTime || "00:00"}
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col text-xs">
        <div className="mb-1 flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">オーダー</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex text-sm px-2 max-h-[90px] min-h-[90px]">
            <Lists lists={purchaseOrder[0]?.orderItem || []} />
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="flex w-full border border-white rounded-md my-2 px-3 py-2 pt-4">
            <div className="flex flex-col w-[50px]">
              <p className="h-[20px]"></p>
              <p className="h-[40px] flex items-center">小計</p>
              <p className="h-[40px] flex items-center">合計</p>
            </div>
            <div className="flex flex-col w-[200px] text-right">
              <p className="h-[20px] text-center">現在</p>
              <p
                className={
                  totalPay > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {Math.floor(totalPay).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      purchaseOrder[0]?.priceTax
                        ? purchaseOrder[0]?.roomTax
                          ? (totalPay -
                              purchaseOrder[0]?.price -
                              purchaseOrder[0]?.roomCharge) *
                              1.3 *
                              1.1 +
                            purchaseOrder[0]?.price
                          : (totalPay - purchaseOrder[0]?.price) * 1.3 * 1.1 +
                            purchaseOrder[0]?.price
                        : totalPay * 1.3 * 1.1
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
            <div className="flex flex-col w-[20px] mx-2 text-right">
              <p className="h-[20px]"></p>
              <p className="h-[40px] flex items-center">→</p>
              <p className="h-[40px] flex items-center">→</p>
            </div>
            <div className="flex flex-col w-[200px] text-right">
              <p className="h-[20px] text-center">見込み</p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {Math.floor(totalPay2).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      purchaseOrder[0]?.priceTax
                        ? purchaseOrder[0]?.roomTax
                          ? (totalPay2 -
                              purchaseOrder[0]?.price -
                              purchaseOrder[0]?.roomCharge) *
                              1.3 *
                              1.1 +
                            purchaseOrder[0]?.price
                          : (totalPay2 - purchaseOrder[0]?.price) * 1.3 * 1.1 +
                            purchaseOrder[0]?.price
                        : totalPay2 * 1.3 * 1.1
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="h-[350px] overflow-scroll">
            {purchaseOrderItemAdd?.map(
              (purchaseOrderItemAdd: any, index: any) => (
                <div
                  className="flex flex-col w-full border border-white justify-center rounded-md bg-black my-3 px-3 py-2"
                  key={index}
                >
                  <div className="flex w-full">
                    <div className="flex flex-col w-[200px] text-left">
                      <p className="h-[40px] my-2 text-white text-base leading-5 flex items-center text-left">
                        {purchaseOrderItemAdd.title}
                      </p>
                    </div>
                    <div className="flex flex-col w-[32px] mx-2 text-right justify-center">
                      <input
                        className="h-[40px] px-2 rounded-md text-white text-center"
                        placeholder="個"
                        defaultValue={purchaseOrderItemAdd.lot}
                        onChange={(e) => {
                          purchaseOrderItemAdd.lot = Number(e.target.value);
                        }}
                      />
                    </div>
                    <div className="relative flex flex-col w-[110px] text-right justify-center">
                      <input
                        className="h-[40px] text-xs my-2 px-2 pr-[20px] rounded-md text-white text-right"
                        placeholder="金額"
                        defaultValue={purchaseOrderItemAdd.price?.toLocaleString()}
                        onChange={(e) => {
                          purchaseOrderItemAdd.price = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                        }}
                      />
                      <p className="absolute top-[20px] right-[7px] opacity-60">
                        円
                      </p>
                    </div>
                  </div>
                  <div className="mb-1 flex w-full h-full items-center">
                    <div
                      onClick={() => {
                        setIsCalculator(true);
                      }}
                      className="mr-5"
                    >
                      <Border
                        rounded="rounded-full"
                        stroke="lg"
                        size="h-[32px] w-[32px] p-[6px]"
                      >
                        <Image
                          src={"/assets/add-cast.svg"}
                          width={36}
                          height={36}
                          alt=""
                          className="!w-full !h-full"
                        />
                      </Border>
                    </div>
                    <div className="mr-3">
                      <Toggle5 />
                    </div>
                    <Toggle6 />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex w-full">
          <Line />
        </div>
      </section>
      <nav className="mt-4 flex w-[80%] mx-auto items-center justify-center">
        <div
          className="w-[150px] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            setPurchaseOrderItemAdd([]);
            setIsControl("");
          }}
        >
          <Border2
            natural
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[6px]"
          >
            <Image
              src={"/assets/arrow-left.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border2>
        </div>
        <div className="w-[150px] flex justify-center items-center">
          <Border2
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[8px] bg-reset"
          >
            <div
              onClick={() => {
                setPurchaseOrderItemAdd([]);
              }}
            >
              <Image
                src={"/assets/reset.svg"}
                width={26}
                height={26}
                className="!h-full !w-full"
                alt=""
              />
            </div>
          </Border2>
        </div>
        <div
          className="w-[150px] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            if (purchaseOrderItemAdd.length >= 1) {
              if (purchaseOrder[0]?.orderItem) {
                setPurchaseOrder([
                  {
                    ...purchaseOrder[0],
                    orderItem: [
                      ...purchaseOrder[0]?.orderItem,
                      ...purchaseOrderItemAdd,
                    ],
                  },
                ]);
              } else {
                setPurchaseOrder([
                  {
                    ...purchaseOrder[0],
                    orderItem: purchaseOrderItemAdd,
                  },
                ]);
              }
              setPurchaseOrderItemAdd([]);
              setIsControl("");
            }
          }}
        >
          <Border2
            complate
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[2px]"
          >
            <Image
              src={"/assets/check-list.svg"}
              width={26}
              height={26}
              className="!h-full !w-full mr-[-4px]"
              alt=""
            />
          </Border2>
        </div>
      </nav>
    </>
  );
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

function CastAdd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();

  let total = 0;
  purchaseOrder[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total += Number(purchaseOrder[0]?.price) * Number(purchaseOrder[0]?.num);
  total += Number(purchaseOrder[0]?.roomCharge);
  purchaseOrder[0]?.orderCast?.map((orderCast: any) => {
    total += Number(orderCast.price) * Number(orderCast.lot);
  });
  purchaseOrder[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay = total;

  let total2 = 0;
  purchaseOrderItemAdd.map((purchaseOrderItemAdd: any) => {
    total2 +=
      Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
  });

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });
  const searchData4 = useSWR<any>(searchDesignate, fetcher);

  const totalPay2 = total2 + totalPay;

  const [selectDesignate, setSelectDesignate] = useState(-1);
  const [selectDesignateSymbol, setSelectDesignateSymbol] = useState("");
  const [selectDesignatePrice, setSelectDesignatePrice] = useState(0);

  return (
    <>
      <section className="flex items-center justify-around text-md mb-4">
        <div className="flex-col flex items-center w-[77.45px]">
          <p className="text-4xl w-full text-left">A1</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrder[0]?.num}名</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[111.77px]">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("TIME");
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrder[0]?.startTime || "00:00"}~
              {purchaseOrder[0]?.endTime || "00:00"}
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col text-xs">
        <div className="mb-1 flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">キャスト</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex text-sm px-2 max-h-[90px] min-h-[90px]">
            <Lists
              lists={[
                ...purchaseOrder[0]?.cast?.map((cast: any) => {
                  return {
                    title: cast.split("##")[0],
                    subTitle: "",
                    lot: 1,
                    price: Number(cast.split("##")[1]),
                  };
                }),
                ...purchaseOrder[0]?.orderCast?.map((cast: any) => {
                  return {
                    title: cast.title,
                    subTitle: "",
                    lot: 1,
                    price: Number(cast.price),
                  };
                }),
              ]}
            />
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="flex w-full border border-white rounded-md my-2 px-3 py-2 pt-4">
            <div className="flex flex-col w-[50px]">
              <p className="h-[20px]"></p>
              <p className="h-[40px] flex items-center">小計</p>
              <p className="h-[40px] flex items-center">合計</p>
            </div>
            <div className="flex flex-col w-[200px] text-right">
              <p className="h-[20px] text-center">現在</p>
              <p
                className={
                  totalPay > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {Math.floor(totalPay).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      purchaseOrder[0]?.priceTax
                        ? purchaseOrder[0]?.roomTax
                          ? (totalPay -
                              purchaseOrder[0]?.price -
                              purchaseOrder[0]?.roomCharge) *
                              1.3 *
                              1.1 +
                            purchaseOrder[0]?.price
                          : (totalPay - purchaseOrder[0]?.price) * 1.3 * 1.1 +
                            purchaseOrder[0]?.price
                        : totalPay * 1.3 * 1.1
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
            <div className="flex flex-col w-[20px] mx-2 text-right">
              <p className="h-[20px]"></p>
              <p className="h-[40px] flex items-center">→</p>
              <p className="h-[40px] flex items-center">→</p>
            </div>
            <div className="flex flex-col w-[200px] text-right">
              <p className="h-[20px] text-center">見込み</p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {Math.floor(totalPay2).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "h-[40px] text-accent text-[15px] flex items-center justify-end"
                    : "h-[40px] text-accent text-xl flex items-center justify-end"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      purchaseOrder[0]?.priceTax
                        ? purchaseOrder[0]?.roomTax
                          ? (totalPay2 -
                              purchaseOrder[0]?.price -
                              purchaseOrder[0]?.roomCharge) *
                              1.3 *
                              1.1 +
                            purchaseOrder[0]?.price
                          : (totalPay2 - purchaseOrder[0]?.price) * 1.3 * 1.1 +
                            purchaseOrder[0]?.price
                        : totalPay2 * 1.3 * 1.1
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="h-[350px] overflow-scroll">
            {purchaseOrderItemAdd?.map(
              (purchaseOrderItemAdd: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-col w-full border border-white justify-start rounded-md bg-black my-3 px-3 py-2"
                >
                  <div className="flex mb-2">
                    <div className="flex flex-col w-[145px] text-left">
                      <p className="text-accent h-[20px]　text-xs">
                        キャスト名
                      </p>
                      <div className="h-[44px] text-white text-base justify-start leading-[40px] align-middle flex items-center">
                        {purchaseOrderItemAdd.title.slice(1)}
                      </div>
                    </div>
                    <div className="flex flex-col w-[32px] mx-2 text-center justify-center">
                      <p className="text-accent h-[20px] text-xs">数量</p>
                      <input
                        className="h-[40px] px-2 rounded-md text-center text-white"
                        placeholder="個"
                        value={purchaseOrderItemAdd.lot}
                        onChange={(e) => {
                          purchaseOrderItemAdd.lot = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                        }}
                      />
                    </div>
                    <div className="relative flex flex-col w-[100px] text-right justify-center">
                      <p className="text-accent h-[20px] text-xs">単価</p>
                      <input
                        className="h-[40px] px-2 pr-[24px] rounded-md text-right text-white"
                        placeholder="金額"
                        value={purchaseOrderItemAdd.price?.toLocaleString()}
                        onChange={(e) => {
                          purchaseOrderItemAdd.price = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                        }}
                      />
                      <p className="absolute bottom-[12px] right-[7px] opacity-60">
                        円
                      </p>
                    </div>
                  </div>
                  <Line />
                  <div className="mt-2 flex">
                    <div className="flex flex-col w-[100px] text-xs mr-[53px]">
                      <p className="text-accent h-[20px] text-xs">種別</p>
                      <select
                        className="h-[44px] flex items-center text-base rounded-md mr-1"
                        onChange={(e) => {
                          const data = JSON.parse(e.target.value);
                          setSelectDesignate(data.id);
                          setSelectDesignateSymbol(data.symbol);
                          setSelectDesignatePrice(data.price);
                          purchaseOrderItemAdd.title =
                            data.symbol + purchaseOrderItemAdd.title.slice(1);
                          purchaseOrderItemAdd.price = Number(data.price);
                        }}
                        defaultValue={JSON.stringify({
                          id: purchaseOrderItemAdd.id,
                          symbol: purchaseOrderItemAdd.symbol,
                          price: purchaseOrderItemAdd.price,
                        })}
                      >
                        {searchData4?.data?.designate[0]?.store_designate[0]?.designate?.map(
                          (designate: any, index: any) => {
                            return (
                              <option
                                key={index}
                                value={JSON.stringify({
                                  id: designate.id,
                                  symbol: designate.designate_revision.symbol,
                                  price: designate.designate_revision.price,
                                })}
                              >
                                {designate.designate_revision.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col w-[100px] text-left">
                      <p className="text-accent h-[20px] text-xs">
                        指名開始時間
                      </p>
                      <input
                        type="time"
                        className="h-[44px] px-2 rounded-md text-base text-white"
                        value={purchaseOrderItemAdd.time}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex w-full">
          <Line />
        </div>
      </section>
      <nav className="mt-4 flex w-[80%] mx-auto items-center justify-center">
        <div
          className="w-[150px] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            setPurchaseOrderItemAdd([]);
            setIsControl("");
          }}
        >
          <Border2
            natural
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[6px]"
          >
            <Image
              src={"/assets/arrow-left.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border2>
        </div>
        <div className="w-[150px] flex justify-center items-center">
          <Border2
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[8px] bg-reset"
          >
            <div
              onClick={() => {
                setPurchaseOrderItemAdd([]);
              }}
            >
              <Image
                src={"/assets/reset.svg"}
                width={26}
                height={26}
                className="!h-full !w-full"
                alt=""
              />
            </div>
          </Border2>
        </div>
        <div
          className="w-[150px] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            if (purchaseOrderItemAdd.length >= 1) {
              if (purchaseOrder[0]?.orderCast) {
                setPurchaseOrder([
                  {
                    ...purchaseOrder[0],
                    orderCast: [
                      ...purchaseOrder[0]?.orderCast,
                      ...purchaseOrderItemAdd,
                    ],
                  },
                ]);
              } else {
                setPurchaseOrder([
                  {
                    ...purchaseOrder[0],
                    orderCast: purchaseOrderItemAdd,
                  },
                ]);
              }
              setPurchaseOrderItemAdd([]);
              setIsControl("");
            }
          }}
        >
          <Border2
            complate
            rounded="rounded-full"
            size="h-[42px] w-[42px] p-[2px]"
          >
            <Image
              src={"/assets/check-list.svg"}
              width={26}
              height={26}
              className="!h-full !w-full mr-[-4px]"
              alt=""
            />
          </Border2>
        </div>
      </nav>
    </>
  );
}

export default function OrderSheet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCalculator, setIsCalculator] = useState(false);
  const [isLock, setIsLock] = useIsLockGlobal();

  return (
    <>
      {isLock == 1 && <Lock />}
      {isCalculator && <Calculator3 setIsCalculator={setIsCalculator} />}
      <Card>
        <div
          className="flex h-full w-[340px] flex-col font-bold"
          onClick={() => {
            if (isHeader) setIsHeader(false);
            if (isFooter) setIsFooter(false);
          }}
        >
          {isControl == "ITEM" ? (
            <Add
              isCalculator={isCalculator}
              setIsCalculator={setIsCalculator}
            />
          ) : isControl == "CAST" ? (
            <CastAdd />
          ) : (
            <Base />
          )}
        </div>
      </Card>
    </>
  );
}
