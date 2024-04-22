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
import { useEffect, useState } from "react";
import SubBorder from "../subBorder";
import { format } from "date-fns";
import client from "@/connection";
import useSWR, { preload } from "swr";
import { RequestDocument } from "graphql-request";
import { searchAttendanceManagementCast, searchCast } from "@/gqls/query/cast";
import { searchStaff } from "@/gqls/query/staff";
import Calculator2 from "@/components/parts/calculator2";
import Toggle from "../toggle";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Calculator7 from "@/components/parts/calculator7";
import Calculator8 from "@/components/parts/calculator8";
import { searchSeatArea } from "@/gqls/query/seat";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import { searchEvent } from "@/gqls/query/event";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-[0px] h-[100px] w-[90%] px-4 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return (
    <Border size="h-[820px] w-full px-4 py-2 flex flex-col">{children}</Border>
  );
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderTimeDesignate() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );
  const [toggle, setToggle] = useState(purchaseOrderState[0]?.toggle || false);

  let total = 0;
  purchaseOrderState[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total +=
    Number(purchaseOrderState[0]?.price) * Number(purchaseOrderState[0]?.num);
  purchaseOrderState[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrderState[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay = Math.ceil(Math.floor(total * 1.3 * 1.1) / 100) * 100;
  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState(0);

  const [type, setType] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);
  const searchAData = useSWR<any>(searchAttendanceManagementCast, fetcher);
  const searchData2 = useSWR<any>(searchSeatArea, fetcher);
  const searchData3 = useSWR<any>(searchEvent, fetcher);

  const [isCalculator, setIsCalculator] = useState(false);
  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);
  const [isCalculatorSelectData, setIsCalculatorSelectData] = useState<any>("");

  const [setTimeResult, setSetTimeResult] = useState("");

  const [nowDate, setNowDate] = useState(dayjs(new Date()));
  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };
  let count = 0;

  const [activeTab, setActiveTab] = useState(-1);

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

  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  const [orderSets, setOrderSets] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (set.orderExtension > 0) {
        orderExtensions.push({
          title: "延長料(" + set.title.slice(0, 3) + ")",
          lot: Number(set.orderExtension),
          price: Number(set.extensionPrice),
          isTax: false,
          startTime: set.startTime,
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
            {
              title:
                "延長料(" + purchaseOrderState[0]?.setName.slice(0, 3) + ")",
              lot: Number(purchaseOrderState[0]?.orderExtension),
              price: Number(purchaseOrderState[0]?.extensionPrice),
              isTax: false,
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
      ? [
          ...purchaseOrderState[0]?.orderSet,
          {
            title: "延長料(" + purchaseOrderState[0]?.setName.slice(0, 3) + ")",
            lot: Number(purchaseOrderState[0]?.orderExtension),
            price: Number(purchaseOrderState[0]?.extensionPrice),
            isTax: false,
          },
          ...orderExtensions,
        ]
      : [...purchaseOrderState[0]?.orderSet, ...orderExtensions];

    setOrderSets(orderSets);

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
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 1 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0].callTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].callTime = hour + ":" + minite;
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 2 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0].mainStartTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].mainStartTime = hour + ":" + minite;
            purchaseOrderState[0].startTime =
              purchaseOrderState[0].mainStartTime;
            purchaseOrderState[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 3 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0].mainEndTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].mainEndTime = hour + ":" + minite;
            purchaseOrderState[0].endTime = purchaseOrderState[0].mainEndTime;
            purchaseOrderState[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 4 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0].startTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].startTime = hour + ":" + minite;
            purchaseOrderState[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 5 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={purchaseOrderState[0].endTime}
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].endTime = hour + ":" + minite;
            purchaseOrderState[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 6 && (
        <Calculator8
          result={isCalculatorSelectData}
          time={isCalculatorSelectData.startTime}
          callback={(hour: any, minite: any) => {
            isCalculatorSelectData.startTime = hour + ":" + minite;
            isCalculatorSelectData.orderExtension =
              checker_new(
                isCalculatorSelectData.endTime,
                purchaseOrderState[0].orderSet[
                  isCalculatorSelectData.targetSet.split("/")[1]
                ].startTime,
                isCalculatorSelectData.setTime,
                isCalculatorSelectData.lot
              ) -
              checker_new(
                isCalculatorSelectData.startTime,
                purchaseOrderState[0].orderSet[
                  isCalculatorSelectData.targetSet.split("/")[1]
                ].startTime,
                isCalculatorSelectData.setTime,
                isCalculatorSelectData.lot
              );
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 8 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].endTime
          }
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].endTime = hour + ":" + minite;
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].orderExtension =
              checker_new(
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].endTime,
                purchaseOrderState[0].orderSet[
                  purchaseOrderState[0].orderCast[
                    purchaseOrderState[0].orderCastIndex
                  ].targetSet.split("/")[1]
                ].startTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].setTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].lot
              ) -
              checker_new(
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].startTime,
                purchaseOrderState[0].orderSet[
                  purchaseOrderState[0].orderCast[
                    purchaseOrderState[0].orderCastIndex
                  ].targetSet.split("/")[1]
                ].startTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].setTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].lot
              );
          }}
        />
      )}
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 7 && (
        <Calculator8
          result={purchaseOrderState[0]}
          time={
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].startTime
          }
          callback={(hour: any, minite: any) => {
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].startTime = hour + ":" + minite;
            purchaseOrderState[0].orderCast[
              purchaseOrderState[0].orderCastIndex
            ].orderExtension =
              checker_new(
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].endTime,
                purchaseOrderState[0].orderSet[
                  purchaseOrderState[0].orderCast[
                    purchaseOrderState[0].orderCastIndex
                  ].targetSet.split("/")[1]
                ].startTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].setTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].lot
              ) -
              checker_new(
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].startTime,
                purchaseOrderState[0].orderSet[
                  purchaseOrderState[0].orderCast[
                    purchaseOrderState[0].orderCastIndex
                  ].targetSet.split("/")[1]
                ].startTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].setTime,
                purchaseOrderState[0].orderCast[
                  purchaseOrderState[0].orderCastIndex
                ].lot
              );
          }}
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
        className="absolute left-[390px] top-1/2 z-20 h-[95dvh] max-h-[830px] min-h-[755px] w-[calc(100dvw-480px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <div className="">
          <Content>
            <Border
              className="my-2 h-[100%] w-full"
              rounded="border-white rounded-md h-[100%] !border-[1px]"
              size="py-4 px-2 !items-start min-h-full max-h-full overflow-scroll"
              black
            >
              <table className="table table-xs mt-2">
                {/* head */}
                <thead>
                  <tr>
                    <th className="w-[170px] text-left text-accent">
                      対象セット
                    </th>
                    <th className="w-[60px] text-left text-accent">指名種別</th>
                    <th className="w-[100px] text-left text-accent">
                      指名キャスト
                    </th>
                    <th className="w-[103px] text-left text-accent">料金</th>
                    <th className="w-[80px] text-center text-accent">
                      開始時間
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      退店時間
                    </th>
                    <th className="w-[20px] text-left text-accent">延長数</th>
                    <th className="w-[130px] text-center text-accent">延長</th>
                    <th className="min-w-[3.65em] text-center text-accent">
                      ロック
                    </th>
                    <th className="pl-[12px] text-left text-accent">削除</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrderState[0]?.orderCast?.map(
                    (cast: any, index: any) => {
                      return (
                        <tr className="h-[80px]" key={index}>
                          <th className="w-[170px] text-left text-sm">
                            <select
                              className="h-[40px] w-[170px] rounded-md px-1 text-left text-sm"
                              value={cast.targetSet}
                              onChange={(e) => {
                                cast.targetSet = e.target.value;
                              }}
                            >
                              <option value={""}>選択してください。</option>
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
                          </th>
                          <th className="w-[60px] text-left text-sm">
                            <select className="h-[40px] w-[60px] rounded-md px-1 text-left text-sm">
                              <option>{cast.symbol.slice(0, 1)}</option>
                            </select>
                          </th>
                          <th className="w-[100px] text-left text-sm">
                            {cast.title.slice(1)}
                          </th>
                          <th className="relative w-[103px] text-left text-lg">
                            <input
                              type="text"
                              className="h-[40px] w-[103px] rounded-md px-2 pr-[26px] text-right text-sm"
                              value={cast.price}
                              onClick={() => {
                                setIsCalculatorSelect(6);
                                setIsCalculator(true);
                                purchaseOrderState[0].orderCastIndex = index;
                              }}
                              readOnly
                            />
                            <p className="absolute bottom-[30.5px] left-[90px] text-sm opacity-60">
                              {cast.isTax ? "込" : "円"}
                            </p>
                          </th>
                          <th className="w-[80px] text-center text-lg">
                            <input
                              type="text"
                              className="h-[40px] w-[70px] rounded-md px-2 text-center text-sm"
                              value={cast.startTime}
                              onClick={() => {
                                setIsCalculatorSelect(7);
                                purchaseOrderState[0].isTimeCalculator = true;
                                purchaseOrderState[0].orderCastIndex = index;
                              }}
                              readOnly
                            />
                          </th>
                          <th className="w-[80px] text-center text-lg">
                            <input
                              type="text"
                              className="h-[40px] w-[70px] rounded-md px-2 text-center text-sm"
                              value={cast.endTime}
                              onClick={() => {
                                setIsCalculatorSelect(8);
                                purchaseOrderState[0].isTimeCalculator = true;
                                purchaseOrderState[0].orderCastIndex = index;
                              }}
                              readOnly
                            />
                          </th>
                          <th className="w-[20px] text-center text-sm">
                            {checker_new(
                              cast.endTime,
                              purchaseOrderState[0].orderSet[
                                cast.targetSet.split("/")[1]
                              ].startTime,
                              cast.setTime,
                              cast.lot
                            ) -
                              checker_new(
                                cast.startTime,
                                purchaseOrderState[0].orderSet[
                                  cast.targetSet.split("/")[1]
                                ].startTime,
                                cast.setTime,
                                cast.lot
                              )}
                          </th>
                          <th className="flex h-[80px] w-[130px] items-center text-center text-sm">
                            <div
                              onClick={() => {
                                cast.endTime = dayjs(
                                  date(
                                    cast.endTime.split(":")[0],
                                    cast.endTime.split(":")[1]
                                  )
                                )
                                  .subtract(30, "minute")
                                  .format("HH:mm");
                                cast.orderExtension =
                                  checker_new(
                                    cast.endTime,
                                    purchaseOrderState[0].orderSet[
                                      cast.targetSet.split("/")[1]
                                    ].startTime,
                                    cast.setTime,
                                    cast.lot
                                  ) -
                                  checker_new(
                                    cast.startTime,
                                    purchaseOrderState[0].orderSet[
                                      cast.targetSet.split("/")[1]
                                    ].startTime,
                                    cast.setTime,
                                    cast.lot
                                  );
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
                                cast.endTime = dayjs(
                                  date(
                                    cast.endTime.split(":")[0],
                                    cast.endTime.split(":")[1]
                                  )
                                )
                                  .add(30, "minute")
                                  .format("HH:mm");
                                cast.orderExtension =
                                  checker_new(
                                    cast.endTime,
                                    purchaseOrderState[0].orderSet[
                                      cast.targetSet.split("/")[1]
                                    ].startTime,
                                    cast.setTime,
                                    cast.lot
                                  ) -
                                  checker_new(
                                    cast.startTime,
                                    purchaseOrderState[0].orderSet[
                                      cast.targetSet.split("/")[1]
                                    ].startTime,
                                    cast.setTime,
                                    cast.lot
                                  );
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
                          </th>
                          <th className="w-[80px] text-center text-sm">
                            <Border natural stroke="md">
                              <p className="text-red-700">ロック</p>
                            </Border>
                          </th>
                          <th className="w-[20px] text-center text-sm">
                            <div className="flex">
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
                          </th>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Border>
          </Content>
        </div>
      </motion.div>
    </>
  );
}
