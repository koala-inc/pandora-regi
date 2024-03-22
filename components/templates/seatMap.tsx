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

export default function SeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isLock, setIsLock] = useIsLockGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

  return (
    <GridLayout
      className="layout !h-[100dvh]"
      cols={23}
      compactType={null}
      width={window.parent.screen.width}
      rowHeight={60}
      isDraggable={false}
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
                  x: seat.x,
                  y: seat.y,
                  w: 1,
                  h: 1,
                }}
                className={
                  isLock > 1
                    ? "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-green-200 opacity-90"
                    : purchaseOrder.some(
                        (purchaseOrder: any) => purchaseOrder.id == seat.id
                      )
                    ? "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-blue-200 opacity-90"
                    : "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
                }
                onClick={() => {
                  setSeatPreset(seat.id);
                  if (isLock < 2) {
                    setIsCard(true);
                    if (isControl != "") setIsControl("");
                  } else if (isLock == 2) {
                    setIsLock(3);
                  }
                }}
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
              <Seat
                key={index}
                id={seat.id}
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
              </Seat>
            );
        }
      })}
    </GridLayout>
  );
}
