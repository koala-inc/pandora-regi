"use client";

import DebugMenu from "@/components/debug/debugMenu";
import Footer from "@/components/parts/footer";
import Header from "@/components/parts/header";
import OverlayNav from "@/components/parts/overlayNav";
import useIsDebugGlobal from "@/globalstates/isDebug";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Card from "@/components/templates/card";
import useIsCardGlobal from "@/globalstates/isCard";
import DebugButton from "@/components/debug/debugButton";
import SeatMap from "@/components/templates/seatMap";
import Background from "@/components/parts/background";
import { AnimatePresence } from "framer-motion";
import useIsAnimateGlobal from "@/globalstates/isAnimate";
import OrderSheet from "@/components/templates/orderSheetBK";
import OrderSet from "@/components/templates/orderSet";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsCalculatorGlobal from "@/globalstates/isCalculator";
import Calculator from "@/components/parts/calculator";
import useIsControlOrderSetGlobal from "@/globalstates/controls/isControlOrderSet";

export default function Home() {
  const [isDebug] = useIsDebugGlobal();
  const [isHeader] = useIsHeaderGlobal();
  const [isFooter] = useIsFooterGlobal();
  const [isCard] = useIsCardGlobal();
  const [isAnimate] = useIsAnimateGlobal();
  const [isControl] = useIsControlGlobal();
  const [isControlOrderSet] = useIsControlOrderSetGlobal();
  const [isCalculator] = useIsCalculatorGlobal();

  return (
    <main className="relative h-full w-full">
      <Background />
      {isAnimate ? (
        <AnimatePresence>
          {isHeader && <Header />}
          {isFooter && <Footer />}
          {isCard && (
            <Card>
              <OrderSheet />
            </Card>
          )}
        </AnimatePresence>
      ) : (
        <>
          {isHeader && <Header />}
          {isFooter && <Footer />}
          {isCard && (
            <Card>{isControlOrderSet ? <OrderSet /> : <OrderSheet />}</Card>
          )}
        </>
      )}
      {!isControl && <SeatMap />}
      <OverlayNav />
      {isCalculator && <Calculator />}
      <DebugButton />
      {isDebug && <DebugMenu />}
    </main>
  );
}
