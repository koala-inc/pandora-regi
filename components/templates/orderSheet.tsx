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
import { useEffect, useState } from "react";
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
import useOrderGlobal from "@/globalstates/order";

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

  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  const [orderSets, setOrderSets] = useState<any>([]);
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );
  useEffect(() => {
    const orderSets = [...purchaseOrderState[0]?.orderSet];

    setOrderSets(orderSets);
  }, [purchaseOrderState]);

  let mainFlag = false;

  return (
    <ul
      className="hidden-scrollbar w-full overflow-y-scroll pr-2"
      onClick={(e) => {
        e.stopPropagation();
        if (setControl) setIsControl(setControl);
      }}
    >
      {setControl == "TIMEDESIGNATE" &&
        purchaseOrderState[0]?.orderCast?.map((cast: any, index: any) => {
          if (orderSets.length > Number(cast.targetSet.split("/")[1])) {
            let flag = true;
            orderSets.map((orderSet: any, index: any) => {
              if (orderSet.title + "/" + index == cast.targetSet) {
                flag = false;
              }
            });
            if (flag) {
              mainFlag = true;
            }
          }
        })}
      {mainFlag && (
        <p className="text-red-500">セットが紐づいていない指名があります。</p>
      )}
      {lists?.map((list, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <div className="w-[50%] text-left">
            {list.title ? list.title.slice(0, 9) : ""}
          </div>
          {/* <div className="w-[10%] text-left">{list.subTitle || ""}</div> */}
          <div className="w-[10%] text-right">{Number(list.lot)}</div>
          <div className="w-[40%] text-right">
            {(list.isTax
              ? Number(String(list.price).replace(/[^0-9]/g, "")) *
                Number(list.lot)
              : Number(list.price) * Number(list.lot)
            )?.toLocaleString()}
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
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );
  const [toggle, setToggle] = useState(purchaseOrderState[0]?.toggle || false);
  const [isLock, setIsLock] = useIsLockGlobal();

  let total = 0;
  let taxNoTotal = 0;
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
      taxNoTotal +=
        Number(String(orderItem.price).replace(/[^0-9]/g, "")) *
        Number(orderItem.lot);
    }
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    if (!cast.isTax) {
      total += Number(cast.price) * Number(cast.lot);
    } else {
      taxNoTotal +=
        Number(String(cast.price).replace(/[^0-9]/g, "")) * Number(cast.lot);
    }
  });
  purchaseOrderState[0]?.orderSet?.map((set: any) => {
    if (!set.isTax) {
      total += Number(set.price) * Number(set.lot);
    } else {
      taxNoTotal +=
        Number(String(set.price).replace(/[^0-9]/g, "")) * Number(set.lot);
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
      : 0) * purchaseOrderState[0]?.lot;

  const checker_new = (endTime: any, startTime: any, setTime: any, num: any) =>
    (Math.floor(
      (Number(
        dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
          date(startTime.split(":")[0], startTime.split(":")[1]),
          "minute"
        )
      ) -
        Number(setTime) -
        1) /
        30
    ) >= 0
      ? Math.floor(
          (Number(
            dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
              date(startTime.split(":")[0], startTime.split(":")[1]),
              "minute"
            )
          ) -
            Number(setTime) -
            1) /
            30
        ) + 1
      : 0) * num;

  const [countOrderItem, setCountOrderItem] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    purchaseOrderState[0]?.orderItem.map((orderItem: any, index: any) => {
      const state = purchaseOrderState[0]?.orderItem.filter(
        (n: any) =>
          n.title === orderItem?.title &&
          n.price === orderItem?.price &&
          n.isTax === orderItem?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderItem?.title,
        subTitle: orderItem?.subTitle,
        lot: count,
        price: orderItem?.price,
        isTax: orderItem?.isTax,
      });
    });
    setCountOrderItem(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [countOrderCast, setCountOrderCast] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderCast.map((cast: any) => {
      if (cast.orderExtension > 0) {
        orderExtensions.push({
          title: "指名延長料",
          lot: Number(cast.orderExtension),
          price: Number(cast.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderCasts = [
      ...purchaseOrderState[0]?.orderCast?.map((cast: any) => {
        return {
          title: cast.title,
          subTitle: "",
          lot: Number(cast.lot),
          price: cast.isTax
            ? Number(String(cast.price).replace(/[^0-9]/g, ""))
            : Number(cast.price),
          isTax: cast.isTax,
        };
      }),
      ...orderExtensions,
    ];
    orderCasts.map((orderCast: any, index: any) => {
      const state = orderCasts.filter(
        (n: any) =>
          n.title === orderCast?.title &&
          n.price === orderCast?.price &&
          n.isTax === orderCast?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderCast?.title,
        subTitle: orderCast?.subTitle,
        lot: count,
        price: orderCast?.price,
        isTax: orderCast?.isTax,
      });
    });
    setCountOrderCast(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (set.orderExtension > 0) {
        orderExtensions.push({
          title: "延長料(" + set.categoryTitle.slice(0, 3) + ")",
          lot: Number(set.orderExtension),
          price: Number(set.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderSets = purchaseOrderState[0]?.isRoomCharge
      ? Number(purchaseOrderState[0]?.orderExtension) > 0
        ? [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
        : [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
      : Number(purchaseOrderState[0]?.orderExtension) > 0
      ? [...purchaseOrderState[0]?.orderSet, ...orderExtensions]
      : [...purchaseOrderState[0]?.orderSet, ...orderExtensions];

    orderSets.map((orderSet: any, index: any) => {
      const state = orderSets.filter(
        (n: any) =>
          n.title === orderSet?.title &&
          n.price === orderSet?.price &&
          n.isTax === orderSet?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderSet?.title,
        subTitle: "",
        lot: count,
        price: orderSet?.price,
        isTax: orderSet?.isTax,
      });
    });
    setCountOrderSet(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [order, setOrder] = useOrderGlobal();

  if (!order.startTime) {
    purchaseOrderState[0].orderExtension = checker();
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (!set.isLock) {
        set.orderExtension = checker_new(
          set.endTime,
          set.startTime,
          set.setTime,
          set.lot
        );
      }
    });
    purchaseOrderState[0].orderCast.map((cast: any) => {
      if (!cast.isLock) {
        cast.orderExtension = checker_new(
          cast.endTime,
          purchaseOrderState[0]?.orderSet[cast.targetSet.split("/")[1]]
            ?.startTime || "00:00",
          purchaseOrderState[0]?.orderSet[cast.targetSet.split("/")[1]]
            ?.setTime || "1440",
          cast.lot
        );
      }
    });
  }

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
                purchaseOrderState[0].callTime = dayjs(
                  date(
                    purchaseOrderState[0]?.mainEndTime.split(":")[0],
                    purchaseOrderState[0]?.mainEndTime.split(":")[1]
                  )
                )
                  .subtract(10, "minute")
                  .format("HH:mm");
                purchaseOrderState[0].orderExtension = checker();
                purchaseOrderState[0].orderSet.map((set: any) => {
                  if (!set.isLock) {
                    set.endTime = purchaseOrderState[0]?.mainEndTime;
                    set.orderExtension = checker_new(
                      set.endTime,
                      set.startTime,
                      set.setTime,
                      set.lot
                    );
                  }
                });
                purchaseOrderState[0].orderCast.map((cast: any) => {
                  if (!cast.isLock) {
                    cast.endTime = purchaseOrderState[0]?.mainEndTime;
                    cast.orderExtension = checker_new(
                      cast.endTime,
                      purchaseOrderState[0].orderSet[
                        cast.targetSet.split("/")[1]
                      ].startTime,
                      purchaseOrderState[0].orderSet[
                        cast.targetSet.split("/")[1]
                      ].setTime,
                      cast.lot
                    );
                  }
                });

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
                purchaseOrderState[0].callTime = dayjs(
                  date(
                    purchaseOrderState[0]?.mainEndTime.split(":")[0],
                    purchaseOrderState[0]?.mainEndTime.split(":")[1]
                  )
                )
                  .subtract(10, "minute")
                  .format("HH:mm");
                purchaseOrderState[0].orderExtension = checker();
                purchaseOrderState[0].orderSet.map((set: any) => {
                  if (!set.isLock) {
                    set.endTime = purchaseOrderState[0]?.mainEndTime;
                    set.orderExtension = checker_new(
                      set.endTime,
                      set.startTime,
                      set.setTime,
                      set.lot
                    );
                  }
                });
                purchaseOrderState[0].orderCast.map((cast: any) => {
                  if (!cast.isLock) {
                    cast.endTime = purchaseOrderState[0]?.mainEndTime;
                    cast.orderExtension = checker_new(
                      cast.endTime,
                      purchaseOrderState[0].orderSet[
                        cast.targetSet.split("/")[1]
                      ].startTime,
                      purchaseOrderState[0].orderSet[
                        cast.targetSet.split("/")[1]
                      ].setTime,
                      cast.lot
                    );
                  }
                });
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
            <Lists setControl="TIMESET" lists={countOrderSet || []} />
            <div
              className="my-auto flex h-full w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("SETADD");
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
            <Lists setControl="TIMEDESIGNATE" lists={countOrderCast || []} />
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
            <Lists setControl="ITEMEDIT" lists={countOrderItem || []} />
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
                {Math.floor(
                  totalPay * (Number(purchaseOrderState[0]?.serviceTax) / 100)
                ).toLocaleString()}
                円
              </div>
            </div>
            <div className="mt-1 flex w-full items-center justify-between text-sm">
              <div>税</div>
              <div>
                {Math.floor(
                  totalPay *
                    (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                    0.1
                ).toLocaleString()}
                円
              </div>
            </div>
            <div className="mt-2 flex w-full items-center justify-between text-2xl text-accent">
              <div>合計</div>
              <div className="flex-1 text-right">
                {Math.floor(
                  Math.ceil(
                    (totalPay *
                      (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                      1.1 +
                      taxNoTotal) /
                      100
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
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );

  let total = 0;
  let taxNoTotal = 0;
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
      taxNoTotal +=
        Number(String(orderItem.price).replace(/[^0-9]/g, "")) *
        Number(orderItem.lot);
    }
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    if (!cast.isTax) {
      total += Number(cast.price) * Number(cast.lot);
    } else {
      taxNoTotal +=
        Number(String(cast.price).replace(/[^0-9]/g, "")) * Number(cast.lot);
    }
  });
  purchaseOrderState[0]?.orderSet?.map((set: any) => {
    if (!set.isTax) {
      total += Number(set.price) * Number(set.lot);
    } else {
      taxNoTotal +=
        Number(String(set.price).replace(/[^0-9]/g, "")) * Number(set.lot);
    }
  });

  const totalPay = total;

  let total2 = 0;
  let total2noTax = 0;
  purchaseOrderItemAdd.map((purchaseOrderItemAdd: any) => {
    if (purchaseOrderItemAdd.isTax) {
      total2noTax +=
        Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
    } else {
      total2 +=
        Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
    }
  });

  const totalPay2 = total2 + totalPay;

  // const [isCalculator, setIsCalculator] = useState(false);

  const [countOrderItem, setCountOrderItem] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    purchaseOrderState[0]?.orderItem.map((orderItem: any, index: any) => {
      const state = purchaseOrderState[0]?.orderItem.filter(
        (n: any) =>
          n.title === orderItem?.title &&
          n.price === orderItem?.price &&
          n.isTax === orderItem?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderItem?.title,
        subTitle: orderItem?.subTitle,
        lot: count,
        price: orderItem?.price,
        isTax: orderItem?.isTax,
      });
    });
    setCountOrderItem(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [countOrderCast, setCountOrderCast] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderCast.map((cast: any) => {
      if (cast.orderExtension > 0) {
        orderExtensions.push({
          title: "指名延長料",
          lot: Number(cast.orderExtension),
          price: Number(cast.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderCasts = [
      ...purchaseOrderState[0]?.orderCast?.map((cast: any) => {
        return {
          title: cast.title,
          subTitle: "",
          lot: Number(cast.lot),
          price: cast.isTax
            ? Number(String(cast.price).replace(/[^0-9]/g, ""))
            : Number(cast.price),
          isTax: cast.isTax,
        };
      }),
      ...orderExtensions,
    ];
    orderCasts.map((orderCast: any, index: any) => {
      const state = orderCasts.filter(
        (n: any) =>
          n.title === orderCast?.title &&
          n.price === orderCast?.price &&
          n.isTax === orderCast?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderCast?.title,
        subTitle: orderCast?.subTitle,
        lot: count,
        price: orderCast?.price,
        isTax: orderCast?.isTax,
      });
    });
    setCountOrderCast(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (set.orderExtension > 0) {
        orderExtensions.push({
          title: "延長料(" + set.categoryTitle.slice(0, 3) + ")",
          lot: Number(set.orderExtension),
          price: Number(set.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderSets = purchaseOrderState[0]?.isRoomCharge
      ? Number(purchaseOrderState[0]?.orderExtension) > 0
        ? [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
        : [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
      : Number(purchaseOrderState[0]?.orderExtension) > 0
      ? [...purchaseOrderState[0]?.orderSet, ...orderExtensions]
      : [...purchaseOrderState[0]?.orderSet, ...orderExtensions];

    orderSets.map((orderSet: any, index: any) => {
      const state = orderSets.filter(
        (n: any) =>
          n.title === orderSet?.title &&
          n.price === orderSet?.price &&
          n.isTax === orderSet?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderSet?.title,
        subTitle: "",
        lot: count,
        price: orderSet?.price,
        isTax: orderSet?.isTax,
      });
    });
    setCountOrderSet(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

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
              {purchaseOrderState[0]?.startTime || "00:00"}~
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
            <Lists lists={countOrderItem || []} />
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
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(totalPay + taxNoTotal).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  Math.ceil(
                    (totalPay *
                      (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                      1.1 +
                      taxNoTotal) /
                      100
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
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  totalPay2 + taxNoTotal + total2noTax
                ).toLocaleString()}
                円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  Math.ceil(
                    (totalPay2 *
                      (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                      1.1 +
                      taxNoTotal +
                      total2noTax) /
                      100
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
                    <p className="mb-2 flex h-[40px] items-center text-left text-[14px] leading-5 text-white">
                      {purchaseOrderItem.title}
                    </p>
                  </div>
                  <div className="mx-2 flex w-[32px] flex-col text-left">
                    <p className="h-[20px] text-xs text-accent">数量</p>
                    <input
                      className="h-[40px] rounded-md px-2 text-center text-[14px] text-white"
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
                      className="mb-2 h-[40px] rounded-md px-2 pr-[22px] text-right text-[14px] text-white"
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
                    {purchaseOrderItem.castNames
                      .replace(/ /g, ",")
                      .replace(/.$/, "")}
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
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );

  let total = 0;
  let taxNoTotal = 0;
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
      taxNoTotal +=
        Number(String(orderItem.price).replace(/[^0-9]/g, "")) *
        Number(orderItem.lot);
    }
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    if (!cast.isTax) {
      total += Number(cast.price) * Number(cast.lot);
    } else {
      taxNoTotal +=
        Number(String(cast.price).replace(/[^0-9]/g, "")) * Number(cast.lot);
    }
  });
  purchaseOrderState[0]?.orderSet?.map((set: any) => {
    if (!set.isTax) {
      total += Number(set.price) * Number(set.lot);
    } else {
      taxNoTotal +=
        Number(String(set.price).replace(/[^0-9]/g, "")) * Number(set.lot);
    }
  });

  const totalPay = total;

  let total2 = 0;
  let total2noTax = 0;
  purchaseOrderItemAdd.map((purchaseOrderItemAdd: any) => {
    if (purchaseOrderItemAdd.isTax) {
      total2noTax +=
        Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
    } else {
      total2 +=
        Number(purchaseOrderItemAdd.price) * Number(purchaseOrderItemAdd.lot);
    }
  });

  const totalPay2 = total2 + totalPay;

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });
  const searchData4 = useSWR<any>(searchDesignate, fetcher);

  const [selectDesignate, setSelectDesignate] = useState(-1);
  const [selectDesignateSymbol, setSelectDesignateSymbol] = useState("");
  const [selectDesignatePrice, setSelectDesignatePrice] = useState(0);

  const [countOrderItem, setCountOrderItem] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    purchaseOrderState[0]?.orderItem.map((orderItem: any, index: any) => {
      const state = purchaseOrderState[0]?.orderItem.filter(
        (n: any) =>
          n.title === orderItem?.title &&
          n.price === orderItem?.price &&
          n.isTax === orderItem?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderItem?.title,
        subTitle: orderItem?.subTitle,
        lot: count,
        price: orderItem?.price,
        isTax: orderItem?.isTax,
      });
    });
    setCountOrderItem(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [countOrderCast, setCountOrderCast] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderCast.map((cast: any) => {
      if (cast.orderExtension > 0) {
        orderExtensions.push({
          title: "指名延長料",
          lot: Number(cast.orderExtension),
          price: Number(cast.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderCasts = [
      ...purchaseOrderState[0]?.orderCast?.map((cast: any) => {
        return {
          title: cast.title,
          subTitle: "",
          lot: Number(cast.lot),
          price: cast.isTax
            ? Number(String(cast.price).replace(/[^0-9]/g, ""))
            : Number(cast.price),
          isTax: cast.isTax,
        };
      }),
      ...orderExtensions,
    ];
    orderCasts.map((orderCast: any, index: any) => {
      const state = orderCasts.filter(
        (n: any) =>
          n.title === orderCast?.title &&
          n.price === orderCast?.price &&
          n.isTax === orderCast?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderCast?.title,
        subTitle: orderCast?.subTitle,
        lot: count,
        price: orderCast?.price,
        isTax: orderCast?.isTax,
      });
    });
    setCountOrderCast(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

  const [orderSets, setOrderSets] = useState<any>([]);
  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (set.orderExtension > 0) {
        orderExtensions.push({
          title: "延長料(" + set.categoryTitle.slice(0, 3) + ")",
          lot: Number(set.orderExtension),
          price: Number(set.extensionPrice),
          isTax: false,
        });
      }
    });
    const orderSets2 = purchaseOrderState[0]?.isRoomCharge
      ? Number(purchaseOrderState[0]?.orderExtension) > 0
        ? [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
        : [
            ...purchaseOrderState[0]?.orderSet,
            {
              title:
                purchaseOrderState[0]?.roomName == ""
                  ? "ルームチャージ"
                  : purchaseOrderState[0]?.roomName,
              lot: 1,
              price: purchaseOrderState[0]?.roomCharge,
              isTax: purchaseOrderState[0]?.roomTax,
            },
            ...orderExtensions,
          ]
      : Number(purchaseOrderState[0]?.orderExtension) > 0
      ? [...purchaseOrderState[0]?.orderSet, ...orderExtensions]
      : [...purchaseOrderState[0]?.orderSet, ...orderExtensions];
    setOrderSets(orderSets2);
    orderSets2.map((orderSet: any, index: any) => {
      const state = orderSets2.filter(
        (n: any) =>
          n.title === orderSet?.title &&
          n.price === orderSet?.price &&
          n.isTax === orderSet?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderSet?.title,
        subTitle: "",
        lot: count,
        price: orderSet?.price,
        isTax: orderSet?.isTax,
      });
    });
    setCountOrderSet(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

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
              {purchaseOrderState[0]?.startTime || "00:00"}~
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
            <Lists lists={countOrderCast || []} />
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
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(totalPay + taxNoTotal).toLocaleString()}円
              </p>
              <p
                className={
                  totalPay > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  Math.ceil(
                    (totalPay *
                      (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                      1.1 +
                      taxNoTotal) /
                      100
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
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  totalPay2 + taxNoTotal + total2noTax
                ).toLocaleString()}
                円
              </p>
              <p
                className={
                  totalPay2 > 9999999
                    ? "flex h-[40px] items-center justify-end text-[15px] text-accent"
                    : "flex h-[40px] items-center justify-end text-[18px] text-accent"
                }
              >
                {Math.floor(
                  Math.ceil(
                    (totalPay2 *
                      (Number(purchaseOrderState[0]?.serviceTax) / 100 + 1) *
                      1.1 +
                      taxNoTotal +
                      total2noTax) /
                      100
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
                      className="mr-1 flex h-[44px] items-center rounded-md text-center text-base"
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
                              {designate.designate_revision.symbol}
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
                      value={purchaseOrderItem.startTime}
                      onClick={() => {
                        purchaseOrderItem.isTimeCalculator = true;
                      }}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-1 mr-1 flex w-full flex-col text-xs">
                  <p className="h-[20px] text-xs text-accent">対象セット</p>
                  <select
                    className="mr-1 flex h-[44px] items-center rounded-md text-base"
                    value={purchaseOrderItem.targetSet}
                    onChange={(e) => {
                      purchaseOrderItem.targetSet = e.target.value;
                    }}
                  >
                    {orderSets.map((orderSet: any, index: any) => {
                      if (
                        !orderSet.title.includes("延長") &&
                        !orderSet.title.includes("ルームチャージ")
                      )
                        return (
                          <option
                            key={index}
                            value={orderSet.title + "/" + index}
                          >
                            {orderSet.title} {orderSet.startTime}
                          </option>
                        );
                    })}
                  </select>
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
            const orderItemAdd: any = [];
            purchaseOrderItemAdd.map((item: any, index: any) => {
              if (item.lot > 1) {
                let lot = item.lot - 1;
                item.lot = 1;
                [...Array(lot)].map((_, i) =>
                  orderItemAdd.push({ ...item, id: item.id + "-" + i })
                );
              }
            });
            if (purchaseOrderItemAdd.length >= 1) {
              if (purchaseOrderState[0]?.orderCast) {
                setPurchaseOrder(
                  purchaseOrder.map((e: any) => {
                    if (e.id == seatPreset) {
                      return {
                        ...e,
                        orderCast: [
                          ...e?.orderCast,
                          ...purchaseOrderItemAdd,
                          ...orderItemAdd,
                        ],
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
                        orderCast: [...purchaseOrderItemAdd, ...orderItemAdd],
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
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
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
      : 0) * purchaseOrderState[0].lot;

  const checker_new = (endTime: any, startTime: any, setTime: any, num: any) =>
    (Math.floor(
      (Number(
        dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
          date(startTime.split(":")[0], startTime.split(":")[1]),
          "minute"
        )
      ) -
        Number(setTime) -
        1) /
        30
    ) >= 0
      ? Math.floor(
          (Number(
            dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
              date(startTime.split(":")[0], startTime.split(":")[1]),
              "minute"
            )
          ) -
            Number(setTime) -
            1) /
            30
        ) + 1
      : 0) * num;

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
                purchaseOrderItem.startTime = hour + ":" + minite;
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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Calculator11
            result={purchaseOrderState[0]}
            time={purchaseOrderState[0].mainEndTime}
            callback={(hour: any, minite: any) => {
              purchaseOrderState[0].mainEndTime = hour + ":" + minite;
              purchaseOrderState[0].endTime = purchaseOrderState[0].mainEndTime;
              purchaseOrderState[0].orderSet.map((set: any) => {
                set.endTime = purchaseOrderState[0].mainEndTime;
                set.orderExtension = checker_new(
                  set.endTime,
                  set.startTime,
                  set.setTime,
                  set.lot
                );
              });
              purchaseOrderState[0].orderCast.map((cast: any) => {
                cast.endTime = purchaseOrderState[0].mainEndTime;
                cast.orderExtension = checker_new(
                  cast.endTime,
                  cast.startTime,
                  cast.setTime,
                  cast.lot
                );
              });
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
