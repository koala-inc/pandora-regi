import Image from "next/image";
import Border from "./border";
import Button from "./button";
import Toggle from "./toggle";
import Card from "@/components/templates/card";

// グローバルステート
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsControlGlobal from "@/globalstates/isControl";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

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

function Base() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();

  return (
    <>
      <section className="flex items-center justify-around text-md">
        <div className="flex-col flex items-center">
          <p className="text-4xl mb-6">A1　</p>
          <Toggle />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrder[0]?.num}名</p>
          </div>
          <div className="mt-3 flex min-w-[4em] flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">コール時間</p>
            <p>
              {purchaseOrder[0]?.callTimeHour || "00"}:
              {purchaseOrder[0]?.callTimeMinite || "00"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("TIME");
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrder[0]?.startTime || "00:00"}~
              {purchaseOrder[0]?.endTime || "00:00"}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Border
              className="mr-1"
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
      <nav className="flex mt-4 items-start justify-around py-3">
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
      <section className="flex flex-1 flex-col text-xs">
        <div className="mb-1 flex-1 max-h-[120px]">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">セット料金</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex h-[13.1%] max-h-[70px] min-h-[70px]">
            <Lists
              lists={
                [
                  // {
                  //   title: "メイン",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                  // {
                  //   title: "┗特別クーポン",
                  //   lot: 1,
                  //   price: -1000,
                  // },
                  // {
                  //   title: "メイン",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                  // {
                  //   title: "延長",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                ]
              }
            />
            <div
              className="my-auto flex w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("SET");
              }}
            >
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
        <div className="mb-1 flex-1 max-h-[120px]">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">指名キャスト</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex h-[13.1%] max-h-[70px] min-h-[70px]">
            <Lists
              lists={[
                {
                  title: purchaseOrder[0]?.cast[0],
                  subTitle: "",
                  lot: 1,
                  price: 0,
                },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
                // {
                //   title: "A",
                //   subTitle: "◯",
                //   lot: 100,
                //   price: 1000,
                // },
                // {
                //   title: "aaaaaaaaaA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 105500,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 12,
                //   price: 1000,
                // },
                // {
                //   title: "キャストA",
                //   subTitle: "◯",
                //   lot: 1,
                //   price: 1000,
                // },
              ]}
            />
            <div
              className="my-auto flex w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("CAST");
              }}
            >
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
        <div className="mb-1 flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">オーダー</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex h-[13.1%] max-h-[107px] min-h-[98px]">
            <Lists
              lists={
                [
                  // {
                  //   title: "吉四六",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                  // {
                  //   title: "生ビール",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                  // {
                  //   title: "ドンペリ白",
                  //   lot: 1,
                  //   price: 1000,
                  // },
                ]
              }
            />
            <div
              className="my-auto flex w-[60px] flex-col items-center justify-center pl-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsControl("ITEM");
              }}
            >
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
        <div className="flex w-full">
          <Line />
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="mt-3 flex w-full items-center justify-between">
              <div>小計</div>
              <div>¥{(0).toLocaleString()}-</div>
            </div>
            <div className="mt-1 flex w-full items-center justify-between">
              <div>サービス</div>
              <div>¥{(0).toLocaleString()}-</div>
            </div>
            <div className="mt-1 flex w-full items-center justify-between">
              <div>税</div>
              <div>¥{(0).toLocaleString()}-</div>
            </div>
            <div className="mt-4 flex w-full items-center justify-between text-2xl text-accent">
              <div>合計</div>
              <div className="flex-1 text-right">¥{(0).toLocaleString()}-</div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("END");
            }}
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
        <Button className="mr-2 min-w-[8rem]" natural disabled>
          分伝/合算
        </Button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsControl("APPROX");
          }}
        >
          <Button className="min-w-[8rem]" natural>
            概算
          </Button>
        </div>
      </nav>
    </>
  );
}

function Add() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();

  return (
    <>
      <section className="flex items-center justify-around text-md mb-4">
        <div className="flex-col flex items-center w-[77.45px]">
          <p className="text-4xl w-full text-left">A1</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem] text-accent">人数</p>
            <p>{purchaseOrder[0]?.num}名</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[111.77px]">
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("TIME");
            }}
          >
            <p className="text-[0.8rem] text-accent">時間</p>
            <p>
              {purchaseOrder[0]?.startTime || "00:00"}~
              {purchaseOrder[0]?.endTime || "00:00"}
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col text-xs">
        <div className="mb-1 flex-1">
          <div className="mb-1 flex w-full">
            <div className="text-sm text-accent">オーダー</div>
            <Line ml="ml-10" />
          </div>
          <div className="flex h-[39.3%] max-h-[307px] min-h-[294px]">
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
        </div>
        <div className="flex w-full">
          <Line />
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="mt-4 flex w-full items-center justify-between text-2xl text-accent">
              <div>合計</div>
              <div className="flex-1 text-right">¥{(0).toLocaleString()}-</div>→
              <div className="flex-1 text-right">
                ¥{(3000).toLocaleString()}-
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav className="mt-4 flex w-full items-center justify-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsControl("");
          }}
        >
          <Button className="mr-2 min-w-[8rem]" natural disabled>
            キャンセル
          </Button>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsControl("");
          }}
        >
          <Button className="min-w-[8rem]" natural>
            確定
          </Button>
        </div>
      </nav>
    </>
  );
}

export default function OrderSheet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();

  return (
    <Card>
      <div
        className="flex h-full w-[340px] flex-col font-bold"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
          if (isControl != "") setIsControl("");
        }}
      >
        {isControl == "" || isControl == "END" ? <Base /> : <Add />}
      </div>
    </Card>
  );
}
