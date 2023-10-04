import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Border from "./border";
import Button from "./button";
import useIsControlGlobal from "@/globalstates/isControl";
import Toggle from "./toggle";

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
    <ul className="h-[90px] w-full overflow-y-scroll">
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
        className="h-full w-full font-bold"
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
        <nav className="flex items-start justify-around py-3">
          <div>
            <Border rounded="rounded-full" stroke="md">
              <Image
                src={"/assets/custody.svg"}
                width={24}
                height={24}
                alt=""
                className="p-1"
              />
            </Border>
            <div className="w-full text-center text-[0.5rem] text-accent">
              荷物
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" stroke="md">
              <Image
                src={"/assets/customer.svg"}
                width={24}
                height={24}
                alt=""
                className="p-1"
              />
            </Border>
            <div className="w-full text-center text-[0.5rem] text-accent">
              顧客
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" stroke="md">
              <Image
                src={"/assets/keepbottle.svg"}
                width={24}
                height={24}
                alt=""
                className="p-1"
              />
            </Border>
            <div className="w-full text-center text-[0.5rem] text-accent">
              ボトル
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" stroke="md">
              <Image
                src={"/assets/manager.svg"}
                width={24}
                height={24}
                alt=""
                className="p-1"
              />
            </Border>
            <div className="w-full text-center text-[0.5rem] text-accent">
              販促
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2" stroke="md">
              1
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2" stroke="md">
              2
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2" stroke="md">
              3
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2" stroke="md">
              4
            </Border>
          </div>
        </nav>
        <section className="text-xs">
          <div className="mb-3">
            <div className="mb-1 flex w-full">
              <div className="text-sm text-accent">セット料金</div>
              <Line ml="ml-10" />
            </div>
            <div className="flex">
              <Lists
                lists={[
                  {
                    title: "メイン",
                    lot: 1,
                    price: 1000,
                  },
                  {
                    title: "┗特別クーポン",
                    lot: 1,
                    price: -1000,
                  },
                  {
                    title: "メイン",
                    lot: 1,
                    price: 1000,
                  },
                  {
                    title: "延長",
                    lot: 1,
                    price: 1000,
                  },
                ]}
              />
              <div className="flex h-[90px] w-[60px] flex-col items-center justify-center pl-3">
                <Border rounded="rounded-full" stroke="lg">
                  <Image
                    src={"/assets/add-customer.svg"}
                    width={36}
                    height={36}
                    alt=""
                    className="p-[6px]"
                  />
                </Border>
                <div className="w-full text-center text-[0.5rem] text-accent">
                  合流
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-1 flex w-full">
              <div className="text-sm text-accent">指名キャスト</div>
              <Line ml="ml-10" />
            </div>
            <div className="flex">
              <Lists
                lists={[
                  {
                    title: "キャストA",
                    subTitle: "◯",
                    lot: 1,
                    price: 1000,
                  },
                  {
                    title: "A",
                    subTitle: "◯",
                    lot: 100,
                    price: 1000,
                  },
                  {
                    title: "aaaaaaaaaA",
                    subTitle: "◯",
                    lot: 1,
                    price: 105500,
                  },
                  {
                    title: "キャストA",
                    subTitle: "◯",
                    lot: 12,
                    price: 1000,
                  },
                  {
                    title: "キャストA",
                    subTitle: "◯",
                    lot: 1,
                    price: 1000,
                  },
                ]}
              />
              <div className="flex h-[90px] w-[60px] flex-col items-center justify-center pl-3">
                <Border rounded="rounded-full" stroke="lg">
                  <Image
                    src={"/assets/cast.svg"}
                    width={36}
                    height={36}
                    alt=""
                    className="p-[2px]"
                  />
                </Border>
                <div className="w-full text-center text-[0.5rem] text-accent">
                  指名
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-1 flex w-full">
              <div className="text-sm text-accent">オーダー</div>
              <Line ml="ml-10" />
            </div>
            <div className="flex">
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
              <div className="flex h-[90px] w-[60px] flex-col items-center justify-center pl-3">
                <Border rounded="rounded-full" stroke="lg">
                  <Image
                    src={"/assets/order.svg"}
                    width={36}
                    height={36}
                    alt=""
                    className="p-[2px]"
                  />
                </Border>
                <div className="w-full text-center text-[0.5rem] text-accent">
                  オーダー
                </div>
              </div>
            </div>
          </div>
          <Line />
          <div className="flex">
            <div className="w-full">
              <div className="mt-3 flex w-full items-center justify-between">
                <div>小計</div>
                <div>¥10,000-</div>
              </div>
              <div className="mt-1 flex w-full items-center justify-between">
                <div>サービス</div>
                <div>¥3,000-</div>
              </div>
              <div className="mt-1 flex w-full items-center justify-between">
                <div>税</div>
                <div>¥1,300-</div>
              </div>
              <div className="mt-4 flex w-full items-center justify-between text-2xl text-accent">
                <div>合計</div>
                <div className="flex-1 text-right">¥15,300-</div>
              </div>
            </div>
            <div
              onClick={() => setIsControl(true)}
              className="flex h-[116px] w-[60px] flex-col items-center justify-center pl-3"
            >
              <Border rounded="rounded-full" stroke="lg" natural>
                <Image
                  src={"/assets/check.svg"}
                  width={36}
                  height={36}
                  alt=""
                  className="p-[6px]"
                />
              </Border>
              <div className="w-full text-center text-[0.5rem] text-accent">
                会計
              </div>
            </div>
          </div>
        </section>
        <nav className="mt-4 flex w-full items-center justify-center">
          <Button className="mr-2 min-w-[8rem]" natural>
            分伝/合算
          </Button>
          <Button className="min-w-[8rem]" natural>
            概算
          </Button>
        </nav>
      </div>
    </>
  );
}
