import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import { useState } from "react";

const makeFullScreen = (el: any) => {
  if (!document.fullscreenElement) {
    el.requestFullscreen();
    return;
  }
  document.exitFullscreen();
};

export default function OverlayNav() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <nav
        className="absolute right-[15px] top-[15px] z-10 cursor-pointer rounded-full border border-black"
        onClick={() => setIsHeader(true)}
      >
        <div className="rounded-full border-4 border-secondary">
          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-black bg-primary p-[12px]">
            <Image
              src={"/assets/menu.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </span>
        </div>
      </nav>
      <nav
        className="absolute left-0 top-1/2 h-2/3 w-[80px] -translate-y-1/2 bg-blue-300/40"
        onClick={() => setIsHeader(true)}
      ></nav>
      <nav
        className="absolute bottom-0 left-1/2 h-[80px] w-2/3 -translate-x-1/2 bg-blue-300/40"
        onClick={() => setIsFooter(true)}
      ></nav>
      <nav
        className="absolute right-0 top-1/2 h-2/3 w-[80px] -translate-y-1/2 bg-blue-300/40"
        onClick={() => setIsHeader(true)}
      ></nav>
      <nav
        className="absolute bottom-[15px] right-[15px] z-10 h-[50px] w-[50px] p-[10px]"
        onClick={() => {
          setIsFullscreen((isFullscreen) => !isFullscreen);
          makeFullScreen(document.querySelector("main"));
        }}
      >
        <Image
          src={
            isFullscreen
              ? "/assets/exit-fullscreen.svg"
              : "/assets/fullscreen.svg"
          }
          width={30}
          height={30}
          className="!h-full !w-full"
          alt=""
        />
      </nav>
    </>
  );
}
