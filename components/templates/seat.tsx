import useIsCardGlobal from "@/globalstates/isCard";
import { useLongPress } from "use-long-press";
import useIsControlOrderCustomerAddGlobal from "@/globalstates/controls/isControlOrderCustomerAdd";
import useIsControlOrderItemAddGlobal from "@/globalstates/controls/isControlOrderItemAdd";
import useIsControlOrderCastAddGlobal from "@/globalstates/controls/isControlOrderCastAdd";
import useIsControlOrderSetGlobal from "@/globalstates/controls/isControlOrderSet";
import useIsControlOrderEndGlobal from "@/globalstates/controls/isControlOrderEnd";
import useIsControlGlobal from "@/globalstates/isControl";

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

  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isControlOrderSet, setIsControlOrderSet] =
    useIsControlOrderSetGlobal();
  const [isControlOrderCastAdd, setIsControlOrderCastAdd] =
    useIsControlOrderCastAddGlobal();
  const [isControlOrderItemAdd, setIsControlOrderItemAdd] =
    useIsControlOrderItemAddGlobal();
  const [isControlOrderCustomerAdd, setIsControlOrderCustomerAdd] =
    useIsControlOrderCustomerAddGlobal();
  const [isControlOrderEnd, setIsControlOrderEnd] =
    useIsControlOrderEndGlobal();
  const editMode = useLongPress(() => alert("モード移行"), {
    threshold: Number(process.env.NEXT_PUBLIC_LONG_TAP_MILLI_SECOND) || 1000,
  });

  // 指名は0.5rem
  // 入退店は0.8rem
  return (
    <div
      className={
        "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-black bg-natural font-bold text-accent shadow-md transition-all " +
        area
      }
      onClick={() => {
        setIsCard(true);
        if (!isControl) setIsControl(true);
        if (isControlOrderCastAdd) setIsControlOrderCastAdd(false);
        if (isControlOrderCustomerAdd) setIsControlOrderCustomerAdd(false);
        if (isControlOrderItemAdd) setIsControlOrderItemAdd(false);
        if (!isControlOrderSet) setIsControlOrderSet(true);
        if (isControlOrderEnd) setIsControlOrderEnd(false);
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
