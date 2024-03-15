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
    <TransformWrapper initialScale={1}>
      <TransformComponent>
        <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
          <section
            id="map"
            onClick={() => {
              if (isCard) setIsCard(false);
              if (isControl == "") setIsControl("");
            }}
          >
            {seatMap.map((seat, index) => {
              switch (seat.type) {
                case "seat":
                  return (
                    <Seat
                      key={index}
                      id={seat.id}
                      area={seat.area}
                      bg={
                        isLock > 1
                          ? " bg-green-200 opacity-90"
                          : purchaseOrder[0]?.id != seat.id
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
                        setSeatPreset(seat.id);
                      }}
                    >
                      {seat.id.toLocaleUpperCase()}
                    </Seat>
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
                    </Seat>
                  );
              }
            })}
          </section>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
