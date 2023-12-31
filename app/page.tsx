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
      return (
        <div className="absolute right-[15px] top-1/2 flex w-full max-w-[calc(100%-420px)] items-center justify-center bg-primary text-white">
          セット時間管理コンポーネント
        </div>
      );
    case "SET":
      // 合流コンポーネント
      return <OrderSet />;
    case "CAST":
      // セットの追加コンポーネント
      return (
        <div className="absolute right-[15px] top-1/2 flex w-full max-w-[calc(100%-420px)] items-center justify-center bg-primary text-white">
          指名追加コンポーネント
        </div>
      );
    case "ITEM":
      // オーダー追加コンポーネント
      return <OrderAdd />;
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
  const [isHeader] = useIsHeaderGlobal();
  const [isFooter] = useIsFooterGlobal();
  const [isCard] = useIsCardGlobal();
  const [isControl] = useIsControlGlobal();

  return (
    <main className="relative h-full w-full">
      <AnimatePresence>
        {isHeader && <Header />}
        {isFooter && <Footer />}
        {isCard && (
          <>
            <OrderSheet />
            {Control(isControl)}
          </>
        )}
      </AnimatePresence>
      {isControl == "" && <SeatMap />}
      <OverlayNav />
    </main>
  );
}
