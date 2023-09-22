import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import useIsFullscreenGlobal from "@/globalstates/isFullscreen";
import makeFullscreen from "./makeFullscreen";
import Border from "./border";

export default function OverlayNav() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isFullscreen, setIsFullscreen] = useIsFullscreenGlobal();

  return (
    <>
      <nav
        className="absolute right-[15px] top-[15px] z-10 cursor-pointer"
        onClick={() => setIsHeader(true)}
      >
        <Border rounded="rounded-full" size="h-[50px] w-[50px] p-[12px]">
          <Image
            src={"/assets/menu.svg"}
            width={26}
            height={26}
            className="!h-full !w-full"
            alt=""
          />
        </Border>
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
          setIsFullscreen(!isFullscreen);
          makeFullscreen(document.querySelector("main"));
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
