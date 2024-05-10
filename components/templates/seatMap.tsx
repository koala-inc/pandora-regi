import Seat from "@/components/templates/seat";
import seatMap from "@/configs/seatMap";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import useIsLockGlobal from "@/globalstates/isLock";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import GridLayout, { Layout } from "react-grid-layout";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";
import { searchSeatMap } from "@/gqls/query/seat";
import dayjs from "dayjs";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import useIsSeatExModeGlobal from "@/globalstates/isSeatExMode";
import useExSeatGlobal from "@/globalstates/exSeat";
import useMyExSeatGlobal from "@/globalstates/myExSeat";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function SeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isLock, setIsLock] = useIsLockGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const [isSeatExMode, setIsSeatExMode] = useIsSeatExModeGlobal();
  const [exSeat, setExSeat] = useExSeatGlobal();
  const [myExSeat, setMyExSeat] = useMyExSeatGlobal();
  const [longFlag, setLongFlag] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  const searchData = useSWR<any>(searchSeatMap, fetcher);

  const [nowDate, setNowDate] = useState(dayjs(new Date()));

  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };

  const editMode = useLongPress(
    (e, { context }) => {
      if (
        purchaseOrder.some((purchaseOrder: any) =>
          purchaseOrder.id.includes(context)
        ) &&
        !longFlag
      ) {
        setLongFlag(true);
        setSeatPreset(context);
        setIsSeatExMode(true);
        let flag = false;
        exSeat.map((ex: any) => {
          if (ex.includes(context)) {
            setMyExSeat(ex);
            flag = true;
          }
        });

        if (!flag) {
          setExSeat([...exSeat, [context]]);
          setMyExSeat([context]);
        }
      }
    },
    {
      threshold: Number(process.env.NEXT_PUBLIC_LONG_TAP_MILLI_SECOND) || 1000,
    }
  );

  console.log(JSON.stringify(exSeat));
  console.log(JSON.stringify(myExSeat));
  console.log(JSON.stringify(isSeatExMode));

  return (
    <div
      className="!h-[100dvh] !w-[100dvw]"
      onClick={() => {
        setLongFlag(false);
        setIsSeatExMode(false);
      }}
    >
      <GridLayout
        className="layout absolute left-0 top-0 z-10 !h-[100dvh]"
        cols={133}
        compactType={null}
        width={2000}
        rowHeight={5}
        isDraggable={false}
        isResizable={false}
        // onDrag={onDragStop}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            let flag = true;

            exSeat.map((ex: any) => {
              if (ex.includes(seat.name)) {
                flag = false;
              }
            });
            if (seat.layer == 3) {
              return (
                <div
                  key={seat.id}
                  data-grid={{
                    x: Number(seat.location.split("/")[0]),
                    y: Number(seat.location.split("/")[1]),
                    w: 4,
                    h: 4,
                  }}
                  className={
                    !isSeatExMode
                      ? purchaseOrder.some((purchaseOrder: any) =>
                          purchaseOrder.id.includes(seat.name)
                        ) ||
                        exSeat.some((exSeat: any) => exSeat.includes(seat.name))
                        ? purchaseOrder.some(
                            (purchaseOrder: any) =>
                              purchaseOrder.id.includes(seat.name) &&
                              purchaseOrder.callTime.split(":")[0] <=
                                dayjs(new Date()).format("HH") &&
                              purchaseOrder.callTime.split(":")[1] <=
                                dayjs(new Date()).format("mm")
                          )
                          ? "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-rose-300 text-2xl font-bold text-accent opacity-90 shadow-md"
                          : "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-blue-200 text-2xl font-bold text-accent opacity-90 shadow-md"
                        : "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-2xl font-bold text-accent opacity-90 shadow-md"
                      : myExSeat.includes(seat.name)
                      ? seatPreset == seat.name
                        ? "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border-4 border-orange-500 bg-amber-800 text-2xl font-bold text-white opacity-90 shadow-md"
                        : "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-amber-800 text-2xl font-bold text-white opacity-90 shadow-md"
                      : flag
                      ? "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-2xl font-bold text-accent opacity-90 shadow-md"
                      : "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-2xl font-bold text-accent opacity-20 shadow-md"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSeatExMode) {
                      let mySeat: any = myExSeat;
                      let flag2 = true;
                      exSeat.map((ex: any) => {
                        if (!ex.includes(mySeat[0])) {
                          if (ex.includes(seat.name)) {
                            flag2 = false;
                          }
                        }
                      });
                      if (flag2) {
                        if (myExSeat.includes(seat.name)) {
                          if (myExSeat.length > 1) {
                            mySeat = myExSeat.filter(
                              (n: any) => n != seat.name
                            );
                            setMyExSeat(mySeat);
                          }
                        } else {
                          mySeat.push(seat.name);
                          setMyExSeat(mySeat);
                        }
                        setExSeat(
                          exSeat.map((ex: any) => {
                            if (ex.includes(mySeat[0])) {
                              return mySeat;
                            }
                            return ex;
                          })
                        );
                        purchaseOrder.map((purchaseOrder: any) => {
                          if (purchaseOrder.id.includes(mySeat[0])) {
                            purchaseOrder.id = mySeat;
                          }
                        });
                      }
                    }
                    if (!isSeatExMode) {
                      setSeatPreset(seat.name);
                      if (isLock < 2) {
                        setIsCard(true);

                        const purchaseOrderState = purchaseOrder.filter(
                          (purchaseOrder: any) =>
                            purchaseOrder.id.includes(seat.name)
                        );

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
                                  purchaseOrderState[0]?.startTime.split(
                                    ":"
                                  )[0],
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
                                      purchaseOrderState[0]?.endTime.split(
                                        ":"
                                      )[0],
                                      purchaseOrderState[0]?.endTime.split(
                                        ":"
                                      )[1]
                                    )
                                  ).diff(
                                    date(
                                      purchaseOrderState[0]?.startTime.split(
                                        ":"
                                      )[0],
                                      purchaseOrderState[0]?.startTime.split(
                                        ":"
                                      )[1]
                                    ),
                                    "minute"
                                  )
                                ) -
                                  Number(purchaseOrderState[0]?.setTime) -
                                  1) /
                                  30
                              ) + 1
                            : 0) * purchaseOrderState[0]?.lot;

                        const checker_new = (
                          endTime: any,
                          startTime: any,
                          setTime: any,
                          num: any
                        ) =>
                          (Math.floor(
                            (Number(
                              dayjs(
                                date(
                                  endTime.split(":")[0],
                                  endTime.split(":")[1]
                                )
                              ).diff(
                                date(
                                  startTime.split(":")[0],
                                  startTime.split(":")[1]
                                ),
                                "minute"
                              )
                            ) -
                              Number(setTime) -
                              1) /
                              30
                          ) >= 0
                            ? Math.floor(
                                (Number(
                                  dayjs(
                                    date(
                                      endTime.split(":")[0],
                                      endTime.split(":")[1]
                                    )
                                  ).diff(
                                    date(
                                      startTime.split(":")[0],
                                      startTime.split(":")[1]
                                    ),
                                    "minute"
                                  )
                                ) -
                                  Number(setTime) -
                                  1) /
                                  30
                              ) + 1
                            : 0) * num;

                        if (purchaseOrderState[0]) {
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
                        }
                      } else if (isLock == 2) {
                        setIsLock(3);
                      }
                    }
                    // setSeatPreset(seat.name);
                    // if (isLock < 2) {
                    //   setIsCard(true);

                    //   const purchaseOrderState = purchaseOrder.filter(
                    //     (purchaseOrder: any) => purchaseOrder.id.includes(seat.name)
                    //   );

                    //   const checker = () =>
                    //     (Math.floor(
                    //       (Number(
                    //         dayjs(
                    //           date(
                    //             purchaseOrderState[0]?.endTime.split(":")[0],
                    //             purchaseOrderState[0]?.endTime.split(":")[1]
                    //           )
                    //         ).diff(
                    //           date(
                    //             purchaseOrderState[0]?.startTime.split(":")[0],
                    //             purchaseOrderState[0]?.startTime.split(":")[1]
                    //           ),
                    //           "minute"
                    //         )
                    //       ) -
                    //         Number(purchaseOrderState[0]?.setTime) -
                    //         1) /
                    //         30
                    //     ) >= 0
                    //       ? Math.floor(
                    //           (Number(
                    //             dayjs(
                    //               date(
                    //                 purchaseOrderState[0]?.endTime.split(
                    //                   ":"
                    //                 )[0],
                    //                 purchaseOrderState[0]?.endTime.split(":")[1]
                    //               )
                    //             ).diff(
                    //               date(
                    //                 purchaseOrderState[0]?.startTime.split(
                    //                   ":"
                    //                 )[0],
                    //                 purchaseOrderState[0]?.startTime.split(
                    //                   ":"
                    //                 )[1]
                    //               ),
                    //               "minute"
                    //             )
                    //           ) -
                    //             Number(purchaseOrderState[0]?.setTime) -
                    //             1) /
                    //             30
                    //         ) + 1
                    //       : 0) * purchaseOrderState[0]?.lot;

                    //   const checker_new = (
                    //     endTime: any,
                    //     startTime: any,
                    //     setTime: any,
                    //     num: any
                    //   ) =>
                    //     (Math.floor(
                    //       (Number(
                    //         dayjs(
                    //           date(endTime.split(":")[0], endTime.split(":")[1])
                    //         ).diff(
                    //           date(
                    //             startTime.split(":")[0],
                    //             startTime.split(":")[1]
                    //           ),
                    //           "minute"
                    //         )
                    //       ) -
                    //         Number(setTime) -
                    //         1) /
                    //         30
                    //     ) >= 0
                    //       ? Math.floor(
                    //           (Number(
                    //             dayjs(
                    //               date(
                    //                 endTime.split(":")[0],
                    //                 endTime.split(":")[1]
                    //               )
                    //             ).diff(
                    //               date(
                    //                 startTime.split(":")[0],
                    //                 startTime.split(":")[1]
                    //               ),
                    //               "minute"
                    //             )
                    //           ) -
                    //             Number(setTime) -
                    //             1) /
                    //             30
                    //         ) + 1
                    //       : 0) * num;

                    //   if (purchaseOrderState[0]) {
                    //     purchaseOrderState[0].orderExtension = checker();
                    //     purchaseOrderState[0].orderSet.map((set: any) => {
                    //       if (!set.isLock) {
                    //         set.endTime = purchaseOrderState[0]?.mainEndTime;
                    //         set.orderExtension = checker_new(
                    //           set.endTime,
                    //           set.startTime,
                    //           set.setTime,
                    //           set.lot
                    //         );
                    //       }
                    //     });
                    //     purchaseOrderState[0].orderCast.map((cast: any) => {
                    //       if (!cast.isLock) {
                    //         cast.endTime = purchaseOrderState[0]?.mainEndTime;
                    //         cast.orderExtension = checker_new(
                    //           cast.endTime,
                    //           purchaseOrderState[0].orderSet[
                    //             cast.targetSet.split("/")[1]
                    //           ].startTime,
                    //           purchaseOrderState[0].orderSet[
                    //             cast.targetSet.split("/")[1]
                    //           ].setTime,
                    //           cast.lot
                    //         );
                    //       }
                    //     });
                    //   }
                    // } else if (isLock == 2) {
                    //   setIsLock(3);
                    // }
                  }}
                  {...editMode(seat.name)}
                >
                  {seat.name.split("#")[1] + seat.name.split("#")[2]}
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className={
          isSeatExMode
            ? "layout absolute left-0 top-0 !h-[100dvh] opacity-20 grayscale"
            : "layout absolute left-0 top-0 !h-[100dvh]"
        }
        cols={133}
        compactType={null}
        width={2000}
        rowHeight={5}
        preventCollision={true}
        isDraggable={false}
        isResizable={false}
        allowOverlap={true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 2) {
              return (
                <div
                  key={seat.id}
                  data-grid={{
                    x: Number(seat.location.split("/")[0]),
                    y: Number(seat.location.split("/")[1]),
                    w: 4,
                    h: 4,
                  }}
                  className={
                    seat.image_url == "/seatMap/line.svg" ||
                    seat.image_url == "/seatMap/middle-line.svg" ||
                    seat.image_url == "/seatMap/short-line.svg" ||
                    seat.image_url == "/seatMap/substract.svg" ||
                    seat.image_url == "/seatMap/substract-right.svg" ||
                    seat.image_url == "/seatMap/substract-left.svg" ||
                    seat.image_url == "A" ||
                    seat.image_url == "B" ||
                    seat.image_url == "C" ||
                    seat.image_url == "D" ||
                    seat.image_url == "E" ||
                    seat.image_url == "F" ||
                    seat.image_url == "S" ||
                    seat.image_url == "V" ||
                    seat.image_url == "I" ||
                    seat.image_url == "P"
                      ? "relative flex !h-[60px] !w-[60px] items-center justify-center text-5xl font-bold text-[#4f38107b]"
                      : "relative flex !h-[60px] !w-[60px] items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
                  }
                >
                  {seat.image_url == "A" ? (
                    "A"
                  ) : seat.image_url == "B" ? (
                    "B"
                  ) : seat.image_url == "C" ? (
                    "C"
                  ) : seat.image_url == "D" ? (
                    "D"
                  ) : seat.image_url == "E" ? (
                    "E"
                  ) : seat.image_url == "F" ? (
                    "F"
                  ) : seat.image_url == "S" ? (
                    "S"
                  ) : seat.image_url == "V" ? (
                    "V"
                  ) : seat.image_url == "I" ? (
                    "I"
                  ) : seat.image_url == "P" ? (
                    "P"
                  ) : (
                    <Image
                      width={30}
                      height={30}
                      className={"drag-none !h-full !w-full !select-none"}
                      src={seat.image_url}
                      alt=""
                    />
                  )}
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className={
          isSeatExMode
            ? "layout absolute left-0 top-0 !h-[100dvh] opacity-30 grayscale"
            : "layout absolute left-0 top-0 !h-[100dvh] opacity-30"
        }
        cols={133}
        compactType={null}
        width={2000}
        rowHeight={5}
        preventCollision={true}
        isDraggable={false}
        isResizable={false}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 1) {
              let color =
                "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center border border-black font-bold bg-white text-balck";
              switch (seat.text_value) {
                case "床赤":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center font-bold bg-red-300 text-balck";
                  break;
                case "床緑":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center font-bold bg-[#93b69c] text-balck";
                  break;
                case "床黄":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center font-bold bg-[#f2f2b0] text-balck";
                  break;
                case "床黒":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center font-bold bg-black text-balck";
                  break;
                case "床白":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] items-center justify-center font-bold bg-white text-balck";
                  break;
              }
              return (
                <div
                  key={seat.id}
                  data-grid={{
                    x: Number(seat.location.split("/")[0]),
                    y: Number(seat.location.split("/")[1]),
                    w: 4,
                    h: 4,
                  }}
                  className={color}
                >
                  {seat.text_value == "木" ||
                  seat.text_value == "壁" ||
                  seat.text_value == "ﾄｲﾚ"
                    ? seat.text_value
                    : ""}
                </div>
              );
            }
          }
        )}
      </GridLayout>
    </div>
  );
}
