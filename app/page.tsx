"use client";

import { AnimatePresence } from "framer-motion";

// コンポーネント
import Header from "@/components/parts/header";
import Footer from "@/components/parts/footer";
import SeatMap from "@/components/templates/seatMap";
import OverlayNav from "@/components/parts/overlayNav";
import OrderSheet from "@/components/templates/orderSheet";
import OrderSet from "@/components/templates/orderSet";
import OrderItemAdd from "@/components/templates/controls/orderItemAdd";
import OrderEnd from "@/components/templates/controls/orderEnd";

// グローバルステート
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";

function Control(isControl: any) {
  switch (isControl) {
    case "TIME":
      // セット時間の管理コンポーネント
      break;
    case "SET":
      // 合流コンポーネント
      break;
    case "CAST":
      // セットの追加コンポーネント
      return <OrderSet />;
    case "ITEM":
      // オーダー追加コンポーネント
      return <OrderItemAdd />;
    case "APPROX":
      // 概算コンポーネント
      break;
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
            <OrderSet />
          </>
        )}
      </AnimatePresence>
      {isControl == "" && <SeatMap />}
      <OverlayNav />
    </main>
  );
}
