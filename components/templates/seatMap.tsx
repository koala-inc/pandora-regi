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

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  const searchData = useSWR<any>(searchSeatMap, fetcher);

  return (
    <>
      <GridLayout
        className="absolute top-0 left-0 layout !h-[100dvh] z-10"
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
            if (seat.layer == 3) {
              switch (seat.type) {
                case 0:
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
                        isLock > 1
                          ? "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md bg-green-200 opacity-90"
                          : purchaseOrder.some(
                              (purchaseOrder: any) =>
                                purchaseOrder.id == seat.name
                            )
                          ? "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md bg-blue-200 opacity-90"
                          : "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md bg-natural"
                      }
                      onClick={() => {
                        setSeatPreset(seat.name);
                        if (isLock < 2) {
                          setIsCard(true);
                          if (isControl != "") setIsControl("");
                        } else if (isLock == 2) {
                          setIsLock(3);
                        }
                      }}
                    >
                      {String(seat.name).toLocaleUpperCase()}
                    </div>
                  );
                case 1:
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
                case 2:
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
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className="absolute top-0 left-0 layout !h-[100dvh]"
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
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-cente font-bold text-balck"
                  }
                >
                  <Image
                    width={30}
                    height={30}
                    className={"!w-full !h-full drag-none !select-none"}
                    src={seat.image_url}
                    alt=""
                  />
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className="absolute top-0 left-0 layout !h-[100dvh]"
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
                "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center border border-black font-bold bg-white text-balck";
              switch (seat.text_value) {
                case "床赤":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-red-300 text-balck";
                  break;
                case "床緑":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-[#93b69c] text-balck";
                  break;
                case "床黄":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-[#f2f2b0] text-balck";
                  break;
                case "床黒":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-black text-balck";
                  break;
                case "床白":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-white text-balck";
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
    </>
  );
}
