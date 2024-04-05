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
import Calculator1 from "../parts/calculator1";
import Calculator5 from "../parts/calculator5";
import Calculator6 from "../parts/calculator6";
import Calculator7 from "../parts/calculator7";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Calculator8 from "../parts/calculator8";
import Calculator9 from "../parts/calculator9";
import Calculator from "../parts/calculator";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import Calculator11 from "../parts/calculator11";
import Calculator12 from "../parts/calculator12";

function Lists({
  setControl,
  lists,
}: {
  setControl?: string;
  lists: {
    title: string;
    subTitle?: string;
    lot: number;
    price: number;
    isTax?: boolean;
  }[];
}) {
  const [isControl, setIsControl] = useIsControlGlobal();

  return (
    <ul
      className="hidden-scrollbar w-full overflow-y-scroll pr-2"
      onClick={(e) => {
        e.stopPropagation();
        if (setControl) setIsControl(setControl);
      }}
    >
      {lists?.map((list, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <div className="w-[50%] text-left">
            {list.title ? list.title.slice(0, 9) : ""}
          </div>
          {/* <div className="w-[10%] text-left">{list.subTitle || ""}</div> */}
          <div className="w-[10%] text-right">{list.lot}</div>
          <div className="w-[40%] text-right">
            {(list.price * list.lot)?.toLocaleString()}
            {list.isTax ? "込" : "円"}
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
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );
  const [toggle, setToggle] = useState(purchaseOrderState[0]?.toggle || false);
  const [isLock, setIsLock] = useIsLockGlobal();

  let total = 0;
  let taxNoTotal = 0;
  purchaseOrderState[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total +=
    Number(purchaseOrderState[0]?.price) * Number(purchaseOrderState[0]?.num);
  total += purchaseOrderState[0]?.isRoomCharge
    ? Number(purchaseOrderState[0]?.roomCharge)
    : 0;
  total +=
    Number(purchaseOrderState[0]?.extensionPrice) *
    Number(purchaseOrderState[0]?.orderExtension);
  purchaseOrderState[0]?.orderItem?.map((orderItem: any) => {
    if (!orderItem.isTax) {
      total += Number(orderItem.price) * Number(orderItem.lot);
    } else {
      taxNoTotal += Number(orderItem.price) * Number(orderItem.lot);
    }
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    if (!cast.isTax) {
      total += Number(cast.price) * Number(cast.lot);
    } else {
      taxNoTotal += Number(cast.price) * Number(cast.lot);
    }
  });

  const totalPay = total;

  const [nowDate, setNowDate] = useState(dayjs(new Date()));

  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };

  const checker = () =>
    (Math.floor(
      (Number(
        dayjs(
          date(
            purchaseOrderState[0]?.endTime.split(":")[0],
            purchaseOrderState[0]?.endTime.split(":")[1]
          )
        ).diff(
          date(
            purchaseOrderState[0]?.startTime.split(":")[0],
            purchaseOrderState[0]?.startTime.split(":")[1]
          ),
          "minute"
        )
      ) -
        Number(purchaseOrderState[0]?.setTime) -
        1) /
        30
    ) >= 0
      ? Math.floor(
          (Number(
            dayjs(
              date(
                purchaseOrderState[0]?.endTime.split(":")[0],
                purchaseOrderState[0]?.endTime.split(":")[1]
              )
            ).diff(
              date(
                purchaseOrderState[0]?.startTime.split(":")[0],
                purchaseOrderState[0]?.startTime.split(":")[1]
              ),
              "minute"
            )
          ) -
            Number(purchaseOrderState[0]?.setTime) -
            1) /
            30
        ) + 1
      : 0) * purchaseOrderState[0]?.num;

  return (
    <>
      <section className="text-md flex items-center justify-around">
        <div className="flex flex-col items-center">
          <p className="mb-6 text-4xl">
            {seatPreset.split("#")[0] +
              seatPreset.split("#")[1] +
              seatPreset.split("#")[2]}
          </p>
          <Toggle isChecked={toggle} setIsChecked={setToggle} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => {
              purchaseOrderState[0].isTopNumCalculator = true;
            }}
          >
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrderState[0]?.num}名</p>
          </div>
          <div
            className="mt-3 flex min-w-[4em] flex-col items-center justify-center"
            onClick={() => {
              purchaseOrderState[0].isCallTimeCalculator = true;
            }}
          >
            <p className="text-[0.8rem] text-accent">コール時間</p>
            <p>{toggle ? "-" : purchaseOrderState[0]?.callTime}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              purchaseOrderState[0].isAllTimeCalculator = true;
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrderState[0]?.mainStartTime}~
              {purchaseOrderState[0]?.mainEndTime}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div
              onClick={() => {
                purchaseOrderState[0].mainEndTime = dayjs(
                  date(
                    purchaseOrderState[0]?.mainEndTime.split(":")[0],
                    purchaseOrderState[0]?.mainEndTime.split(":")[1]
                  )
                )
                  .subtract(30, "minute")
                  .format("HH:mm");
                purchaseOrderState[0].endTime =
                  purchaseOrderState[0]?.mainEndTime;
                purchaseOrderState[0].orderExtension = checker();
                if (
                  Number(purchaseOrderState[0]?.callTime.split(":")[0]) <=
                    Number(purchaseOrderState[0]?.mainEndTime.split(":")[0]) &&
                  Number(purchaseOrderState[0]?.callTime.split(":")[0]) >=
                    Number(purchaseOrderState[0]?.mainStartTime.split(":")[0])
                ) {
                  purchaseOrderState[0].callTime = dayjs(
                    date(
                      purchaseOrderState[0]?.mainEndTime.split(":")[0],
                      purchaseOrderState[0]?.mainEndTime.split(":")[1]
                    )
                  )
                    .subtract(10, "minute")
                    .format("HH:mm");
                }
              }}
            >
              <Border
                className="mr-1 w-[3.8rem]"
                size="px-2 text-red-700 flex justify-center items-center align-middle"
                natural
                stroke="md"
              >
                <div className="mr-[1px] mt-[-2px] flex h-full items-center justify-center">
                  -
                </div>
                <span>30</span>
              </Border>
            </div>
            <div
              onClick={() => {
                purchaseOrderState[0].mainEndTime = dayjs(
                  date(
                    purchaseOrderState[0]?.mainEndTime.split(":")[0],
                    purchaseOrderState[0]?.mainEndTime.split(":")[1]
                  )
                )
                  .add(30, "minute")
                  .format("HH:mm");
                purchaseOrderState[0].endTime =
                  purchaseOrderState[0]?.mainEndTime;
                purchaseOrderState[0].orderExtension = checker();
                if (
                  Number(purchaseOrderState[0]?.callTime.split(":")[0]) <=
                    Number(purchaseOrderState[0]?.mainEndTime.split(":")[0]) &&
                  Number(purchaseOrderState[0]?.callTime.split(":")[0]) >=
                    Number(purchaseOrderState[0]?.mainStartTime.split(":")[0])
                ) {
                  purchaseOrderState[0].callTime = dayjs(
                    date(
                      purchaseOrderState[0]?.mainEndTime.split(":")[0],
                      purchaseOrderState[0]?.mainEndTime.split(":")[1]
                    )
                  )
                    .subtract(10, "minute")
                    .format("HH:mm");
                }
              }}
            >
              <Border
                className="w-[3.8rem]"
                size="px-2 text-blue-700 flex justify-center items-center align-middle"
                natural
                stroke="md"
              >
                <div className="mt-[-3px] flex h-full items-center justify-center">
                  +
                </div>
                <span>30</span>
              </Border>
            </div>
          </div>
        </div>
      </section>
      <nav className="mt-4 flex items-start justify-around py-3">
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
        <div className="mb-1 max-h-[120px] flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">セット料金</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex h-[120px] max-h-[100px] min-h-[100px] px-2 text-sm">
            <Lists
              setControl="TIMESET"
              lists={
                purchaseOrderState[0]?.isRoomCharge
                  ? Number(purchaseOrderState[0]?.orderExtension) > 0
                    ? [
                        {
                          title: purchaseOrderState[0]?.setName,
                          lot: purchaseOrderState[0]?.num,
                          price: purchaseOrderState[0]?.price,
                          isTax: purchaseOrderState[0]?.priceTax,
                        },
                        {
                          title:
                            purchaseOrderState[0]?.roomName == ""
                              ? "ルームチャージ"
                              : purchaseOrderState[0]?.roomName,
                          lot: 1,
                          price: purchaseOrderState[0]?.roomCharge,
                          isTax: purchaseOrderState[0]?.roomTax,
                        },
                        {
                          title: "延長料金",
                          lot: Number(purchaseOrderState[0]?.orderExtension),
                          price: Number(purchaseOrderState[0]?.extensionPrice),
                          isTax: false,
                        },
                      ]
                    : [
                        {
                          title: purchaseOrderState[0]?.setName,
                          lot: purchaseOrderState[0]?.num,
                          price: purchaseOrderState[0]?.price,
                          isTax: purchaseOrderState[0]?.priceTax,
                        },
                        {
                          title:
                            purchaseOrderState[0]?.roomName == ""
                              ? "ルームチャージ"
                              : purchaseOrderState[0]?.roomName,
                          lot: 1,
                          price: purchaseOrderState[0]?.roomCharge,
                          isTax: purchaseOrderState[0]?.roomTax,
                        },
                      ]
                  : Number(purchaseOrderState[0]?.orderExtension) > 0
                  ? [
                      {
                        title: purchaseOrderState[0]?.setName,
                        lot: purchaseOrderState[0]?.num,
                        price: purchaseOrderState[0]?.price,
                        isTax: purchaseOrderState[0]?.priceTax,
                      },
                      {
                        title: "延長料金",
                        lot: Number(purchaseOrderState[0]?.orderExtension),
                        price: Number(purchaseOrderState[0]?.extensionPrice),
                        isTax: false,
                      },
                    ]
                  : [
                      {
                        title: purchaseOrderState[0]?.setName,
                        lot: purchaseOrderState[0]?.num,
                        price: purchaseOrderState[0]?.price,
                        isTax: purchaseOrderState[0]?.priceTax,
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
              className="my-auto flex h-full w-[60px] flex-col items-center justify-center pl-3"
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
        <div className="mb-1 max-h-[120px] flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">指名キャスト</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex max-h-[100px] min-h-[100px] px-2 text-sm">
            <Lists
              setControl="TIMEDESIGNATE"
              lists={
                [
                  ...purchaseOrderState[0]?.cast?.map((cast: any) => {
                    return {
                      title: cast.split("##")[0],
                      subTitle: "",
                      lot: 1,
                      price: Number(cast.split("##")[1]),
                      isTax: cast.isTax,
                    };
                  }),
                  ...purchaseOrderState[0]?.orderCast?.map((cast: any) => {
                    return {
                      title: cast.title,
                      subTitle: "",
                      lot: Number(cast.lot),
                      price: Number(cast.price),
                      isTax: cast.isTax,
                    };
                  }),
                ]
                // [
                // {
                //   title: purchaseOrderState[0]?.cast[0] || "",
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
          <div className="flex max-h-[130px] min-h-[130px] px-2 text-sm">
            <Lists
              setControl="ORDEREDIT"
              lists={purchaseOrderState[0]?.orderItem || []}
            />
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
            <div className="mt-3 flex w-full items-center justify-between text-sm">
              <div>小計</div>
              <div>{Math.floor(totalPay + taxNoTotal).toLocaleString()}円</div>
            </div>
            <div className="mt-1 flex w-full items-center justify-between text-sm">
              <div>サービス</div>
              <div>
                {(
                  Math.floor(
                    totalPay -
                      (purchaseOrderState[0]?.priceTax
                        ? purchaseOrderState[0]?.price
                        : 0) -
                      (purchaseOrderState[0]?.isRoomCharge
                        ? purchaseOrderState[0]?.roomTax
                          ? purchaseOrderState[0]?.roomCharge
                          : 0
                        : 0)
                  ) *
                  (Number(purchaseOrderState[0]?.serviceTax) / 100)
                ).toLocaleString()}
                円
              </div>
            </div>
            <div className="mt-1 flex w-full items-center justify-between text-sm">
              <div>税</div>
              <div>
                {(
                  Math.floor(
                    totalPay -
                      (purchaseOrderState[0]?.priceTax
                        ? purchaseOrderState[0]?.price
                        : 0) -
                      (purchaseOrderState[0]?.isRoomCharge
                        ? purchaseOrderState[0]?.roomTax
                          ? purchaseOrderState[0]?.roomCharge
                          : 0
                        : 0)
                  ) *
                  (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                  0.1
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
                      (totalPay -
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) -
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)) *
                        (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                        1.1 +
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) +
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0) +
                        taxNoTotal
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
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );

  let total = 0;
  purchaseOrderState[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total +=
    Number(purchaseOrderState[0]?.price) * Number(purchaseOrderState[0]?.num);
  total += purchaseOrderState[0]?.isRoomCharge
    ? Number(purchaseOrderState[0]?.roomCharge)
    : 0;
  total +=
    Number(purchaseOrderState[0]?.extensionPrice) *
    Number(purchaseOrderState[0]?.orderExtension);
  purchaseOrderState[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
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
      <section className="text-md mb-4 flex items-center justify-around">
        <div className="flex w-[77.45px] flex-col items-center">
          <p className="w-full text-left text-4xl">
            {seatPreset.split("#")[0] +
              seatPreset.split("#")[1] +
              seatPreset.split("#")[2]}
          </p>
        </div>
        <div
          className="flex w-[64px] flex-col items-center justify-center"
          onClick={() => {
            purchaseOrderState[0].isTopNumCalculator = true;
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrderState[0]?.num}名</p>
          </div>
        </div>
        <div className="flex w-[111.77px] flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              purchaseOrderState[0].isAllTimeCalculator = true;
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrderState[0]?.StartTime || "00:00"}~
              {purchaseOrderState[0]?.endTime || "00:00"}
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
          <div
            className="flex max-h-[90px] min-h-[90px] px-2 text-sm"
            onClick={() => {
              setIsControl("ITEMEDIT");
            }}
          >
            <Lists lists={purchaseOrderState[0]?.orderItem || []} />
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="my-2 flex w-full rounded-md border-4 border-white px-3 py-2 pt-4">
            <div className="flex w-[50px] flex-col">
              <p className="h-[20px]"></p>
              <p className="flex h-[40px] items-center">小計</p>
              <p className="flex h-[40px] items-center">合計</p>
            </div>
            <div className="flex w-[200px] flex-col text-right">
              <p className="h-[20px] text-center">現在</p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {Math.floor(totalPay).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      (totalPay -
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) -
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)) *
                        (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                        1.1 +
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) +
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
            <div className="mx-2 flex w-[20px] flex-col text-right">
              <p className="h-[20px]"></p>
              <p className="flex h-[40px] items-center">→</p>
              <p className="flex h-[40px] items-center">→</p>
            </div>
            <div className="flex w-[200px] flex-col text-right">
              <p className="h-[20px] text-center">見込み</p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {Math.floor(totalPay2).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      (totalPay2 -
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) -
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)) *
                        (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                        1.1 +
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) +
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)
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
            {purchaseOrderItemAdd?.map((purchaseOrderItem: any, index: any) => (
              <div
                className="relative my-3 flex w-[97%] flex-col justify-center rounded-md border-4 border-white bg-black px-3 py-2"
                key={index}
              >
                <div className="flex w-full">
                  <div className="flex w-[200px] flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">オーダー名</p>
                    <p className="mb-2 flex h-[40px] items-center text-left text-base leading-5 text-white">
                      {purchaseOrderItem.title}
                    </p>
                  </div>
                  <div className="mx-2 flex w-[32px] flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">数量</p>
                    <input
                      className="h-[40px] rounded-md px-2 text-center text-white"
                      placeholder="個"
                      value={purchaseOrderItem.lot}
                      // onChange={(e) => {
                      //   purchaseOrderItem.lot = Number(e.target.value);
                      // }}
                      onClick={() => {
                        purchaseOrderItem.isNumCalculator = true;
                      }}
                      readOnly
                    />
                  </div>
                  <div className="relative flex w-[110px] flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">金額</p>
                    <input
                      className="mb-2 h-[40px] rounded-md px-2 pr-[22px] text-right text-xs text-white"
                      placeholder="金額"
                      value={purchaseOrderItem.price?.toLocaleString()}
                      onClick={() => {
                        purchaseOrderItem.isCalculator = true;
                      }}
                      // onChange={(e) => {
                      //   purchaseOrderItem.price = Number(
                      //     e.target.value.replace(/[^0-9]/g, "")
                      //   );
                      // }}
                      readOnly
                    />
                    <p className="absolute bottom-[20px] right-[7px] opacity-60">
                      {purchaseOrderItem.isTax ? "込" : "円"}
                    </p>
                  </div>
                </div>
                <div className="mb-1 flex h-full w-full items-center">
                  <div
                    onClick={() => {
                      purchaseOrderItem.isCastsCalculator = true;
                    }}
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
                        className="!h-full !w-full"
                      />
                    </Border>
                  </div>
                  <Toggle5 />
                  <Toggle6 />
                  <div
                    className="absolute right-[-15px] top-[-15px]"
                    onClick={() => {
                      delete purchaseOrderItemAdd[index];
                      setPurchaseOrderItemAdd(() =>
                        purchaseOrderItemAdd.filter((v: any) => v)
                      );
                    }}
                  >
                    <Border2
                      rounded="rounded-full"
                      size="h-[28px] w-[28px] p-[6px]"
                    >
                      <div onClick={() => {}}>
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
                {purchaseOrderItem.castNames &&
                purchaseOrderItem.castNames != "" ? (
                  <div className="mb-1 flex h-full w-full items-center py-2">
                    {purchaseOrderItem.castNames}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full">
          <Line />
        </div>
      </section>
      <nav className="mx-auto mt-4 flex w-[80%] items-center justify-center">
        <div
          className="flex w-[150px] items-center justify-center"
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
        <div className="flex w-[150px] items-center justify-center">
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
          className="flex w-[150px] items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            if (purchaseOrderItemAdd.length >= 1) {
              if (purchaseOrderState[0]?.orderItem) {
                setPurchaseOrder(
                  purchaseOrder.map((e: any) => {
                    if (e.id == seatPreset) {
                      return {
                        ...e,
                        orderItem: [...e?.orderItem, ...purchaseOrderItemAdd],
                      };
                    }
                    return e;
                  })
                );
              } else {
                setPurchaseOrder(
                  purchaseOrder.map((e: any) => {
                    if (e.id == seatPreset) {
                      return {
                        ...e,
                        orderItem: purchaseOrderItemAdd,
                      };
                    }
                    return e;
                  })
                );
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
              className="mr-[-4px] !h-full !w-full"
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
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );

  let total = 0;
  purchaseOrderState[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total +=
    Number(purchaseOrderState[0]?.price) * Number(purchaseOrderState[0]?.num);
  total += purchaseOrderState[0]?.isRoomCharge
    ? Number(purchaseOrderState[0]?.roomCharge)
    : 0;
  total +=
    Number(purchaseOrderState[0]?.extensionPrice) *
    Number(purchaseOrderState[0]?.orderExtension);
  purchaseOrderState[0]?.orderCast?.map((orderCast: any) => {
    total += Number(orderCast.price) * Number(orderCast.lot);
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
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
      <section className="text-md mb-4 flex items-center justify-around">
        <div className="flex w-[77.45px] flex-col items-center">
          <p className="w-full text-left text-4xl">
            {seatPreset.split("#")[0] +
              seatPreset.split("#")[1] +
              seatPreset.split("#")[2]}
          </p>
        </div>
        <div
          className="flex w-[64px] flex-col items-center justify-center"
          onClick={() => {
            purchaseOrderState[0].isTopNumCalculator = true;
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrderState[0]?.num}名</p>
          </div>
        </div>
        <div className="flex w-[111.77px] flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              purchaseOrderState[0].isAllTimeCalculator = true;
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrderState[0]?.StartTime || "00:00"}~
              {purchaseOrderState[0]?.endTime || "00:00"}
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
          <div
            className="flex max-h-[90px] min-h-[90px] px-2 text-sm"
            onClick={() => {
              setIsControl("CASTEDIT");
            }}
          >
            <Lists
              lists={[
                ...purchaseOrderState[0]?.cast?.map((cast: any) => {
                  return {
                    title: cast.split("##")[0],
                    subTitle: "",
                    lot: 1,
                    price: Number(cast.split("##")[1]),
                    isTax: cast.isTax,
                  };
                }),
                ...purchaseOrderState[0]?.orderCast?.map((cast: any) => {
                  return {
                    title: cast.title,
                    subTitle: "",
                    lot: 1,
                    price: Number(cast.price),
                    isTax: cast.isTax,
                  };
                }),
              ]}
            />
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="my-2 flex w-full rounded-md border-4 border-white px-3 py-2 pt-4">
            <div className="flex w-[50px] flex-col">
              <p className="h-[20px]"></p>
              <p className="flex h-[40px] items-center">小計</p>
              <p className="flex h-[40px] items-center">合計</p>
            </div>
            <div className="flex w-[200px] flex-col text-right">
              <p className="h-[20px] text-center">現在</p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {Math.floor(totalPay).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      (totalPay -
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) -
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)) *
                        (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                        1.1 +
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) +
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)
                    ) / 100
                  ) * 100
                ).toLocaleString()}
                円
              </p>
            </div>
            <div className="mx-2 flex w-[20px] flex-col text-right">
              <p className="h-[20px]"></p>
              <p className="flex h-[40px] items-center">→</p>
              <p className="flex h-[40px] items-center">→</p>
            </div>
            <div className="flex w-[200px] flex-col text-right">
              <p className="h-[20px] text-center">見込み</p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {Math.floor(totalPay2).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-xl text-accent"
                }
              >
                {(
                  Math.ceil(
                    Math.floor(
                      (totalPay2 -
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) -
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)) *
                        (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                        1.1 +
                        (purchaseOrderState[0]?.priceTax
                          ? purchaseOrderState[0]?.price
                          : 0) +
                        (purchaseOrderState[0]?.isRoomCharge
                          ? purchaseOrderState[0]?.roomTax
                            ? purchaseOrderState[0]?.roomCharge
                            : 0
                          : 0)
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
            {purchaseOrderItemAdd?.map((purchaseOrderItem: any, index: any) => (
              <div
                key={index}
                className="relative my-3 flex w-[97%] flex-col justify-start rounded-md border-4 border-white bg-black px-3 py-2"
              >
                <div className="mb-2 flex">
                  <div className="flex w-full flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">キャスト名</p>
                    <div className="flex h-[20px] items-center justify-start align-middle text-base leading-[40px] text-white">
                      {purchaseOrderItem.title.slice(1)}
                    </div>
                  </div>
                  <div
                    className="absolute right-[-15px] top-[-15px]"
                    onClick={() => {
                      delete purchaseOrderItemAdd[index];
                      setPurchaseOrderItemAdd(() =>
                        purchaseOrderItemAdd.filter((v: any) => v)
                      );
                    }}
                  >
                    <Border2
                      rounded="rounded-full"
                      size="h-[28px] w-[28px] p-[6px]"
                    >
                      <div onClick={() => {}}>
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
                <div className="mb-1 flex">
                  <div className="mr-1 flex w-[88px] flex-col text-xs">
                    <p className="h-[20px] text-xs text-accent">種別</p>
                    <select
                      className="mr-1 flex h-[44px] items-center rounded-md text-base"
                      onChange={(e) => {
                        const data = JSON.parse(e.target.value);
                        setSelectDesignate(data.id);
                        setSelectDesignateSymbol(data.symbol);
                        setSelectDesignatePrice(data.price);
                        purchaseOrderItem.title =
                          data.symbol + purchaseOrderItem.title.slice(1);
                        purchaseOrderItem.price = Number(data.price);
                      }}
                      defaultValue={JSON.stringify({
                        id: purchaseOrderItem.id,
                        symbol: purchaseOrderItem.symbol,
                        price: purchaseOrderItem.price,
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
                  <div className="mr-2 flex w-[40px] flex-col justify-center text-left">
                    <p className="h-[20px] text-xs text-accent">数量</p>
                    <input
                      className="h-[44px] rounded-md px-2 text-center text-base text-white"
                      placeholder="個"
                      value={purchaseOrderItem.lot}
                      // onChange={(e) => {
                      //   purchaseOrderItem.lot = Number(
                      //     e.target.value.replace(/[^0-9]/g, "")
                      //   );
                      // }}
                      onClick={() => {
                        purchaseOrderItem.isNumCalculator = true;
                      }}
                      readOnly
                    />
                  </div>
                  <div className="relative mr-2 flex w-[110px] flex-col justify-center text-left">
                    <p className="h-[20px] text-xs text-accent">単価</p>
                    <input
                      className="h-[44px] rounded-md px-2  pr-[24px] text-right text-base text-white"
                      placeholder="金額"
                      value={purchaseOrderItem.price?.toLocaleString()}
                      // onChange={(e) => {
                      //   purchaseOrderItem.price = Number(
                      //     e.target.value.replace(/[^0-9]/g, "")
                      //   );
                      // }}
                      onClick={() => {
                        purchaseOrderItem.isCalculator = true;
                      }}
                      readOnly
                    />
                    <p className="absolute bottom-[12px] right-[7px] opacity-60">
                      {purchaseOrderItem.isTax ? "込" : "円"}
                    </p>
                  </div>
                  <div className="flex w-[70px] flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">指名開始時間</p>
                    <input
                      type="text"
                      className="h-[44px] rounded-md px-2 text-center text-base text-white"
                      value={purchaseOrderItem.time}
                      onClick={() => {
                        purchaseOrderItem.isTimeCalculator = true;
                      }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full">
          <Line />
        </div>
      </section>
      <nav className="mx-auto mt-4 flex w-[80%] items-center justify-center">
        <div
          className="flex w-[150px] items-center justify-center"
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
        <div className="flex w-[150px] items-center justify-center">
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
          className="flex w-[150px] items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            if (purchaseOrderItemAdd.length >= 1) {
              if (purchaseOrderState[0]?.orderCast) {
                setPurchaseOrder(
                  purchaseOrder.map((e: any) => {
                    if (e.id == seatPreset) {
                      return {
                        ...e,
                        orderCast: [...e?.orderCast, ...purchaseOrderItemAdd],
                      };
                    }
                    return e;
                  })
                );
              } else {
                setPurchaseOrder(
                  purchaseOrder.map((e: any) => {
                    if (e.id == seatPreset) {
                      return {
                        ...e,
                        orderCast: purchaseOrderItemAdd,
                      };
                    }
                    return e;
                  })
                );
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
              className="mr-[-4px] !h-full !w-full"
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
  const [seatPreset] = useSeatPresetGlobal();
  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );

  const [nowDate, setNowDate] = useState(dayjs(new Date()));
  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };

  const checker = () =>
    (Math.floor(
      (Number(
        dayjs(
          date(
            purchaseOrderState[0]?.endTime.split(":")[0],
            purchaseOrderState[0]?.endTime.split(":")[1]
          )
        ).diff(
          date(
            purchaseOrderState[0]?.startTime.split(":")[0],
            purchaseOrderState[0]?.startTime.split(":")[1]
          ),
          "minute"
        )
      ) -
        Number(purchaseOrderState[0]?.setTime) -
        1) /
        30
    ) >= 0
      ? Math.floor(
          (Number(
            dayjs(
              date(
                purchaseOrderState[0]?.endTime.split(":")[0],
                purchaseOrderState[0]?.endTime.split(":")[1]
              )
            ).diff(
              date(
                purchaseOrderState[0]?.startTime.split(":")[0],
                purchaseOrderState[0]?.startTime.split(":")[1]
              ),
              "minute"
            )
          ) -
            Number(purchaseOrderState[0]?.setTime) -
            1) /
            30
        ) + 1
      : 0) * purchaseOrderState[0].num;

  return (
    <>
      {isLock == 1 && <Lock />}
      {purchaseOrderState[0]?.set?.isCalculator && (
        <Calculator setIsCalculator={setIsCalculator} />
      )}
      {purchaseOrderItemAdd?.map((purchaseOrderItem: any, index: any) => {
        if (purchaseOrderItem.isCalculator) {
          return <Calculator5 key={index} result={purchaseOrderItem} />;
        } else if (purchaseOrderItem.isNumCalculator) {
          return <Calculator6 key={index} result={purchaseOrderItem} />;
        } else if (purchaseOrderItem.isTimeCalculator) {
          return (
            <Calculator7
              key={index}
              result={purchaseOrderItem}
              callback={(hour: any, minite: any) => {
                purchaseOrderItem.time = hour + ":" + minite;
              }}
            />
          );
        } else if (purchaseOrderItem.isCastsCalculator) {
          return (
            <Calculator3
              key={index}
              result={purchaseOrderItem}
              callback={(castNames: any) => {
                purchaseOrderItem.castNames = castNames;
              }}
            />
          );
        }
      })}
      {purchaseOrderState[0]?.isCallTimeCalculator && (
        <Calculator9
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0]?.callTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].callTime = hour + ":" + minite;
          }}
        />
      )}
      {purchaseOrderState[0]?.isTopNumCalculator && (
        <Calculator12 result={purchaseOrderState[0]} />
      )}
      {purchaseOrderState[0].isAllTimeCalculator && (
        <div
          className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
          onClick={() => {}}
        >
          <Calculator11
            result={purchaseOrderState[0]}
            time={purchaseOrderState[0].mainEndTime}
            callback={(hour: any, minite: any) => {
              purchaseOrderState[0].mainEndTime = hour + ":" + minite;
              purchaseOrderState[0].endTime = purchaseOrderState[0].mainEndTime;
              purchaseOrderState[0].orderExtension = checker();
            }}
            title="終了時間"
          />
        </div>
      )}
      <Card>
        <div
          className="flex h-full w-[340px] flex-col font-bold"
          onClick={() => {
            if (isHeader) setIsHeader(false);
            if (isFooter) setIsFooter(false);
          }}
        >
          {isControl == "ITEM" || isControl == "ITEMEDIT" ? (
            <Add
              isCalculator={isCalculator}
              setIsCalculator={setIsCalculator}
            />
          ) : isControl == "CAST" || isControl == "CASTEDIT" ? (
            <CastAdd />
          ) : (
            <Base />
          )}
        </div>
      </Card>
    </>
  );
}
