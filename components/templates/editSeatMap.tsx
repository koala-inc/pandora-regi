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
import EditSeat from "./editSeat";

import React, { useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";

export default function EditSeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isLock, setIsLock] = useIsLockGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

  const [buttons, setButtons] = useState([
    { i: "1", x: 10, y: 2, w: 1, h: 1 },
    { i: "2", x: 6, y: 5, w: 1, h: 1 },
    { i: "3", x: 8, y: 6, w: 1, h: 1 },
  ]);

  return (
    <GridLayout
      className="layout !h-[100dvh]"
      cols={23}
      layout={buttons}
      compactType={null}
      width={window.parent.screen.width}
      rowHeight={60}
      // onDrag={onDragStop}
    >
      {seatMap.map((seat, index) => {
        switch (seat.type) {
          case "seat":
            return (
              <div
                key={index}
                id={seat.id}
                data-grid={{
                  x: buttons[index].x,
                  y: buttons[index].y,
                  w: buttons[index].w,
                  h: buttons[index].h,
                }}
                className={
                  "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
                }
              >
                {seat.id.toLocaleUpperCase()}
              </div>
            );
          case "object":
            return (
              <Image
                key={index}
                width={30}
                height={30}
                className={seat.area + " !w-full !h-full"}
                src={seat.objectUrl}
                alt=""
              />
            );
          case "text":
            return (
              <EditSeat
                key={index}
                id={seat.id}
                area={seat.area}
                bg={
                  isLock > 1
                    ? " bg-green-200 opacity-90"
                    : purchaseOrder[0].id != seat.id
                    ? " bg-natural"
                    : " bg-blue-200 opacity-90"
                }
                onClick={() => {
                  if (isLock < 2) {
                    setIsCard(true);
                    if (isControl != "") setIsControl("");
                  } else if (isLock == 2) {
                    setIsLock(3);
                  }
                }}
              >
                {seat.body}
              </EditSeat>
            );
        }
      })}
    </GridLayout>
  );
}
