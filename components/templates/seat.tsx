import { useLongPress } from "use-long-press";

import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";

export default function Seat({
  children,
  id,
  area,
}: {
  children: any;
  id: string;
  area: string;
}) {
  const overlay = false;

  const [, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const editMode = useLongPress(() => alert("モード移行"), {
    threshold: Number(process.env.NEXT_PUBLIC_LONG_TAP_MILLI_SECOND) || 1000,
  });

  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();

  const bg = isPurchaseOrder ? " bg-natural" : " bg-blue-300";

  // 指名は0.5rem
  // 入退店は0.8rem
  return (
    <div
      className={
        "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all " +
        area +
        bg
      }
      onClick={() => {
        setIsCard(true);
        if (isControl != "") setIsControl("");
      }}
      {...editMode(id)}
    >
      {overlay ? (
        <>
          <div className="absolute opacity-20">{children}</div>
          <div className="absolute w-[200%] scale-50 text-center text-[1.5rem] font-bold leading-[1.5rem] text-black">
            20:00
            <br />
            ~
            <br />
            21:00
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
