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
import SeatMap from "@/components/seatMap";
import Background from "@/components/background";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isDebug] = useIsDebugGlobal();
  const [isHeader] = useIsHeaderGlobal();
  const [isFooter] = useIsFooterGlobal();
  const [isCard] = useIsCardGlobal();

  return (
    <main className="relative h-full w-full">
      <Background />
      <AnimatePresence>{isHeader && <Header />}</AnimatePresence>
      <AnimatePresence>{isFooter && <Footer />}</AnimatePresence>
      <AnimatePresence>{isCard && <Card>aaa</Card>}</AnimatePresence>
      <SeatMap />
      <OverlayNav />
      <DebugButton />
      {isDebug && <DebugMenu />}
    </main>
  );
}
