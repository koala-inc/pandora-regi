import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Border from "@/components/templates/border";

export default function OverlayNav() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <>
      <nav
        className="absolute left-1/2 top-0 h-[80px] w-2/3 -translate-x-1/2 bg-blue-300/40 opacity-0"
        onClick={(e) => {
          e.stopPropagation();
          setIsHeader(true);
        }}
      ></nav>
      <nav
        className="absolute left-0 top-1/2 h-2/3 w-[80px] -translate-y-1/2 bg-blue-300/40 opacity-0"
        onClick={(e) => {
          // e.stopPropagation();
          //  setIsHeader(true)
        }}
      ></nav>
      <nav
        className="absolute bottom-0 left-1/2 h-[80px] w-2/3 -translate-x-1/2 bg-blue-300/40 opacity-0"
        onClick={(e) => {
          e.stopPropagation();
          setIsFooter(true);
        }}
      ></nav>
      <nav
        className="absolute right-0 top-1/2 h-2/3 w-[80px] -translate-y-1/2 bg-blue-300/40 opacity-0"
        onClick={(e) => {
          // e.stopPropagation();
          // setIsHeader(true)
        }}
      ></nav>
    </>
  );
}
