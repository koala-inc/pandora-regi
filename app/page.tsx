"use client";

import { AnimatePresence } from "framer-motion";

// コンポーネント
import Header from "@/components/parts/header";
import Footer from "@/components/parts/footer";
import SeatMap from "@/components/templates/seatMap";
import OverlayNav from "@/components/parts/overlayNav";
import OrderSheet from "@/components/templates/orderSheet";
import OrderAdd from "@/components/templates/orderAdd";
import OrderSet from "@/components/templates/controls/orderSet";
import OrderItemAdd from "@/components/templates/controls/orderItemAdd";
import OrderEnd from "@/components/templates/controls/orderEnd";

// グローバルステート
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import OrderSheetSet from "@/components/templates/orderSheetSet";
import HomeButton from "@/components/templates/homeButton";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import { useEffect, useState } from "react";
import OrderCastAdd from "@/components/templates/controls/orderCastAdd";
import Lock from "@/components/parts/lock";
import Calculator2 from "@/components/parts/calculator2";
import Lock2 from "@/components/parts/lock2";
import useIsLockGlobal from "@/globalstates/isLock";
import OrderTime from "@/components/templates/controls/orderTime";
import OrderCastEdit from "@/components/templates/controls/orderCastEdit";
import OrderItemEdit from "@/components/templates/controls/orderItemEdit";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import usePurchaseOrderSetGlobal from "@/globalstates/purchaseOrderSet";
import OrderTimeDesignate from "@/components/templates/controls/orderTimeDesignate";
import OrderTimeSet from "@/components/templates/controls/orderTimeSet";
import ControlOrderSetAdd from "@/components/templates/controls/orderSetAdd";

function Control(isControl: any) {
  switch (isControl) {
    case "START":
      // セット時間の管理コンポーネント
      return (
        <div className="absolute right-[15px] top-1/2 flex w-full max-w-[calc(100%-420px)] items-center justify-center bg-primary text-white">
          入店伝票
        </div>
      );
    case "TIME":
      // セット時間の管理コンポーネント
      return <OrderTime />;
    case "TIMESET":
      return <OrderTimeSet />;
    case "TIMEDESIGNATE":
      return <OrderTimeDesignate />;
    case "SET":
      // 合流コンポーネント
      return <OrderSet />;
    case "SETADD":
      // 合流コンポーネント
      return <ControlOrderSetAdd />;
    case "CAST":
      // セットの追加コンポーネント
      return <OrderCastAdd />;
    case "CASTEDIT":
      return <OrderCastEdit />;
    case "ITEM":
      // オーダー追加コンポーネント
      return <OrderItemAdd />;
    case "ITEMEDIT":
      return <OrderItemEdit />;
    case "APPROX":
      // 概算コンポーネント
      return (
        <div className="absolute right-[15px] top-1/2 flex w-full max-w-[calc(100%-420px)] items-center justify-center bg-primary text-white">
          概算表示コンポーネント
        </div>
      );
    case "END":
      return <OrderEnd />;
    default:
      return <></>;
  }
}

export default function Home() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl] = useIsControlGlobal();
  const [isLock] = useIsLockGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder] = usePurchaseOrderGlobal();
  const [purchaseOrderSet] = usePurchaseOrderSetGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDatetime(new Date());
    }, 1000);
  }, []);

  return (
    <main
      className="relative h-full w-full"
      onClick={() => {
        if (
          isCard &&
          isControl == "" &&
          seatPreset != "" &&
          purchaseOrder.some((purchaseOrder: any) =>
            purchaseOrder.id.includes(seatPreset)
          ) &&
          isLock == 0
        ) {
          setIsCard(false);
          setSeatPreset("");
        }
        setIsHeader(false);
        setIsFooter(false);
      }}
    >
      <AnimatePresence>
        {isLock == 3 && <Lock2 key={1} />}
        {purchaseOrder.some((purchaseOrder: any) =>
          purchaseOrder.id.includes(seatPreset)
        ) ? (
          isControl == "" && <SeatMap key={2} />
        ) : isCard ? (
          <></>
        ) : (
          <SeatMap key={3} />
        )}
        {isHeader && !isCard && <Header datetime={datetime} key={4} />}
        {isFooter && !isCard && <Footer key={5} />}
        {purchaseOrder.length != 0 && seatPreset != "" ? (
          purchaseOrder.some((purchaseOrder: any) =>
            purchaseOrder.id.includes(seatPreset)
          ) ? (
            isCard && (
              <>
                <OrderSheet key={6} />
                {Control(isControl)}
                {isControl != "" && <HomeButton key={7} />}
              </>
            )
          ) : (
            isCard && (
              <>
                <OrderSheetSet key={8} />
                <OrderSet key={9} />
                <HomeButton key={10} />
              </>
            )
          )
        ) : (
          <>
            {isCard ? (
              <>
                <OrderSheetSet key={11} />
                <OrderSet key={12} />
                <HomeButton key={13} />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </AnimatePresence>

      {!isCard && <OverlayNav />}
    </main>
  );
}
