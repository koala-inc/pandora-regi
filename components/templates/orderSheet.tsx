import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Image from "next/image";
import Border from "../master/border";

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
    <ul className="h-[70px] overflow-y-scroll">
      {lists.map((list) => (
        <li className="flex w-full justify-between items-center">
          <div className="w-1/4 text-left">{list.title}</div>
          <div className="w-1/4 text-left">{list.subTitle || ""}</div>
          <div className="w-1/4 text-right">{list.lot}</div>
          <div className="w-1/4 text-right">
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
      <div className="h-[0.9px] w-[calc(100%-56px)] bg-secondary rounded-full"></div>
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

  return (
    <>
      <div
        className="w-full h-full"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <section className="h-[200px]"></section>
        <nav className="flex justify-around items-start py-4">
          <div>
            <Border rounded="rounded-full" size="px-2">
              1
            </Border>
            <div className="text-[0.5rem] font-bold text-accent w-full text-center">
              荷物
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              2
            </Border>
            <div className="text-[0.5rem] font-bold text-accent w-full text-center">
              顧客
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              3
            </Border>
            <div className="text-[0.5rem] font-bold text-accent w-full text-center">
              ボトル
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              4
            </Border>
            <div className="text-[0.5rem] font-bold text-accent w-full text-center">
              販促
            </div>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              1
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              2
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              3
            </Border>
          </div>
          <div>
            <Border rounded="rounded-full" size="px-2">
              4
            </Border>
          </div>
        </nav>
        <section className="text-xs">
          <div className="mb-3">
            <div className="w-full flex mb-1">
              <div className="text-accent text-sm font-bold">指名キャスト</div>
              <Line ml="ml-10" />
            </div>
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
          </div>
          <div className="mb-3">
            <div className="w-full flex mb-1">
              <div className="text-accent text-sm font-bold">セット料金</div>
              <Line ml="ml-10" />
            </div>
            <Lists
              lists={[
                {
                  title: "メイン",
                  lot: 1,
                  price: 1000,
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
          </div>
          <div className="mb-3">
            <div className="w-full flex mb-1">
              <div className="text-accent text-sm font-bold">オーダー</div>
              <Line ml="ml-10" />
            </div>
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
          <Line />
          <div className="flex w-full justify-between items-center mt-3">
            <div>小計</div>
            <div>¥10,000-</div>
          </div>
          <div className="flex w-full justify-between items-center mt-1">
            <div>サービス</div>
            <div>¥3,000-</div>
          </div>
          <div className="flex w-full justify-between items-center mt-1">
            <div>税</div>
            <div>¥1,300-</div>
          </div>
          <div className="flex w-full justify-between items-center mt-3 text-2xl text-accent font-bold">
            <div>合計</div>
            <div>¥15,300-</div>
            <div>
              <Border rounded="rounded-full" size="px-1">
                →
              </Border>
            </div>
          </div>
        </section>
        <nav></nav>
      </div>
    </>
  );
}
