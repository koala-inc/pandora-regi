import useIsDebugGlobal from "@/globalstates/isDebug";
import Image from "next/image";

export default function DebugButton() {
  const [isDebug, setIsDebug] = useIsDebugGlobal();

  return (
    <div
      className="absolute bottom-[15px] left-[15px] z-50 h-[50px] w-[50px]"
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
  );
}
