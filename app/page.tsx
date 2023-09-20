"use client";

import DebugMenu from "@/components/debugMenu";
import Footer from "@/components/footer";
import Header from "@/components/header";
import OverlayNav from "@/components/overlayNav";
import Seat from "@/components/seat";
import seatMap from "@/configs/seatMap";
import useIsDebugGlobal from "@/globalstates/isDebug";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [isDebug, setIsDebug] = useIsDebugGlobal();
  const [isHeader] = useIsHeaderGlobal();
  const [isFooter] = useIsFooterGlobal();

  return (
    <main className="relative h-full w-full">
      <AnimatePresence>{isHeader && <Header />}</AnimatePresence>
      <AnimatePresence>{isFooter && <Footer />}</AnimatePresence>
      <Image
        src={"/assets/background.jpg"}
        fill
        className="-z-50 object-cover object-center"
        alt=""
      />
      <section id="map" className="h-full w-full">
        {seatMap.map((seat, index) => {
          switch (seat.type) {
            case "seat":
              return (
                <Seat key={index} id={seat.id} area={seat.area}>
                  {seat.id.toLocaleUpperCase()}
                </Seat>
              );
            case "object":
              return (
                <Image
                  width={30}
                  height={30}
                  className={seat.area + " !w-full !h-full"}
                  src={seat.objectUrl}
                  alt=""
                />
              );
            case "text":
              return (
                <Seat key={index} id={seat.id} area={seat.area}>
                  {seat.body}
                </Seat>
              );
          }
        })}
      </section>
      <div
        className="absolute z-50 w-[50px] h-[50px] top-[15px] left-[15px]"
        onClick={() => setIsDebug(!isDebug)}
      >
        <Image
          src="/assets/debug.svg"
          width={30}
          height={30}
          className="!h-full !w-full"
          alt=""
        />
      </div>
      <OverlayNav />
      {isDebug && <DebugMenu />}
    </main>
  );
}
