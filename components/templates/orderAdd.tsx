import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Button from "./button";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsControlOrderSetGlobal from "@/globalstates/controls/isControlOrderSet";

function Lists({
  lists,
}: {
  lists: {
    title: string;
    subTitle?: string;
    lot: number;
    price: number;
  }[];
}) {
  return (
    <ul className="hidden-scrollbar w-full overflow-y-scroll">
      {lists.map((list, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <div className="w-[40%] text-left">{list.title}</div>
          <div className="w-[10%] text-left">{list.subTitle || ""}</div>
          <div className="w-[20%] text-right">{list.lot}</div>
          <div className="w-[30%] text-right">
            ¥{list.price.toLocaleString()}-
          </div>
        </li>
      ))}
    </ul>
  );
}

function Line({ ml }: { ml?: string }) {
  return (
    <div className={"flex flex-1 justify-between items-center " + ml}>
      <Image src={"/assets/line.svg"} width={26} height={26} alt="" />
      <div className="h-[0.9px] w-[calc(100%-56px)] rounded-full bg-secondary"></div>
      <Image
        src={"/assets/line.svg"}
        width={26}
        height={26}
        className="rotate-180"
        alt=""
      />
    </div>
  );
}

export default function OrderAdd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isControlOrderSet, setIsControlOrderSet] =
    useIsControlOrderSetGlobal();

  return (
    <>
      <div
        className="flex h-full w-[340px] flex-col font-bold"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <section className="flex flex-1 flex-col text-xs"></section>
        <nav className="mt-4 flex w-full items-center justify-center">
          <Button className="mr-2 min-w-[8rem]" natural>
            キャンセル
          </Button>
          <Button
            className="min-w-[8rem]"
            natural
            onClick={() => {
              setIsControlOrderSet(false);
            }}
          >
            確定
          </Button>
        </nav>
      </div>
    </>
  );
}
