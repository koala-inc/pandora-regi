import useIsCardGlobal from "@/globalstates/isCard";
import { useLongPress } from "use-long-press";

export default function Seat({
  children,
  id,
  area,
}: {
  children: any;
  id: string;
  area: string;
}) {
  const overlay = true;

  const [isCard, setIsCard] = useIsCardGlobal();
  const editMode = useLongPress(() => {
    alert("転卓、拡張、縮小モード移行");
  });

  // 指名は0.5rem
  // 入退店は0.8rem
  return (
    <div
      className={
        "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-black bg-natural font-bold text-accent shadow-md transition-all " +
        area
      }
      onClick={() => setIsCard(true)}
      {...editMode()}
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
