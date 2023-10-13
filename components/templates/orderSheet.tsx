import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Border from "./border";
import Button from "./button";
import useIsControlGlobal from "@/globalstates/isControl";
import Toggle from "./toggle";
import Toggle2 from "./toggle2";
import Toggle3 from "./toggle3";

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

export default function OrderSheet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();

  return (
    <>
      <div
        className="flex h-full w-[340px] flex-col font-bold"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <section className="flex h-[70px] items-center justify-between">
          <div className="flex h-full items-center justify-center p-1 text-3xl">
            A1
          </div>
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="flex h-1/2 w-full items-center justify-between text-xs">
              <div className="flex min-w-[4em] flex-col items-center justify-center">
                <p className="text-[0.5rem] text-accent">人数</p>
                <p>1名</p>
              </div>
              <div className="flex min-w-[7em] flex-col items-center justify-center">
                <p className="text-[0.5rem] text-accent">時間🕛</p>
                <p>20:00〜23:00</p>
              </div>
              <div className="flex min-w-[5em] flex-col items-center justify-center">
                <p className="text-[0.5rem] text-accent">コール時間</p>
                <p className="inline-flex">
                  <div className="mr-[2px] rounded-sm border-[0.5px] border-secondary px-1">
                    20
                  </div>
                  :
                  <div className="ml-[2px] rounded-sm border-[0.5px] border-secondary px-1">
                    00
                  </div>
                </p>
              </div>
              <div className="mt-[15.3px]">
                <Toggle />
              </div>
            </div>
            <div className="flex h-1/2 w-full items-center justify-center text-xs">
              <Border
                className="ml-[89px] mr-1"
                size="px-2 text-red-700"
                natural
                stroke="md"
              >
                -30
              </Border>
              <Border size="px-2 text-blue-700" natural stroke="md">
                +30
              </Border>
            </div>
          </div>
        </section>

        <section className="flex flex-1 flex-col text-xs">
          <div className="mb-1 flex-1">
            <div className="mb-1 flex w-full">
              <div className="text-sm text-accent">オーダー</div>
              <Line ml="ml-10" />
            </div>
            <div className="flex h-[13.1%] max-h-[107px] min-h-[98px]">
              <Lists
                lists={[
                  {
                    title: "吉四六",
                    lot: 1,
                    price: 1000,
                  },
                  {
                    title: "生ビール",
                    lot: 1,
                    price: 1000,
                  },
                  {
                    title: "ドンペリ白",
                    lot: 1,
                    price: 1000,
                  },
                ]}
              />
            </div>
            <div className="mb-1 flex w-full">
              <div className="text-sm text-accent">追加オーダー</div>
              <Line ml="ml-10" />
            </div>
            <div className="flex h-[33.1%] max-h-[107px] min-h-[98px]">
              <ul className="h-full w-full">
                <li className="flex w-full justify-between rounded-md border border-white bg-neutral-900 px-1 py-2">
                  <div className="flex h-[50px] flex-col justify-between">
                    <Toggle2 />
                    <Toggle3 />
                  </div>
                  <p className="my-auto flex-1 px-4">鏡月</p>
                  <Border
                    className="my-auto"
                    size="px-2 text-red-700"
                    natural
                    stroke="md"
                  >
                    -
                  </Border>
                  <input className="my-auto w-[20px] rounded-md" />
                  <Border
                    className="my-auto"
                    size="px-2 text-blue-700"
                    natural
                    stroke="md"
                  >
                    +
                  </Border>
                  <p className="my-auto">￥</p>
                  <input
                    className="my-auto w-[70px] rounded-md text-left"
                    type="text"
                  />
                  <p className="my-auto">込</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full">
            <Line />
          </div>
          <div className="flex">
            <div className="w-full">
              <div className="mt-4 flex w-full items-center justify-between text-base text-white">
                <div className="w-[15%]"></div>
                <div className="w-[30%] text-center">現在</div>
                <div className="w-[5%]"></div>
                <div className="w-[30%] text-center">見込み</div>
              </div>
              <div className="mt-2 flex w-full items-center justify-between text-xl text-accent">
                <div className="w-[15%] text-white">小計</div>
                <div className="w-[30%] text-right">¥10,000-</div>
                <div className="mx-2 w-[5%]">⇒</div>
                <div className="w-[30%] text-right">¥12,000-</div>
              </div>
              <div className="mt-2 flex w-full items-center justify-between text-xl text-accent">
                <div className="w-[15%] text-white">合計</div>
                <div className="w-[30%] text-right">¥15,300-</div>
                <div className="mx-2 w-[5%]">⇒</div>
                <div className="w-[30%] text-right">¥16,000-</div>
              </div>
            </div>
          </div>
        </section>
        <nav className="mt-4 flex w-full items-center justify-center">
          <Button className="mr-2 min-w-[8rem]" natural>
            キャンセル
          </Button>
          <Button className="min-w-[8rem]" natural>
            確定
          </Button>
        </nav>
      </div>
    </>
  );
}
