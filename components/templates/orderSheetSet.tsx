import Image from "next/image";
import Button from "./button";
import Card from "@/components/templates/card";
import Border2 from "@/components/templates/border";

// グローバルステート
import useIsControlGlobal from "@/globalstates/isControl";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";

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

export default function OrderSheetSet() {
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();

  return (
    <Card>
      <div
        className="flex h-full w-[340px] flex-col font-bold"
        // onClick={() => {
        //   if (isControl != "") setIsControl("");
        // }}
      >
        <section className="flex flex-1 flex-col text-sm">
          {isPurchaseOrder &&
            purchaseOrder.map((order: any, index: any) => (
              <div
                key={index}
                className="my-1 flex flex-wrap border border-white bg-black p-3"
              >
                <div className="mx-2 flex flex-col">
                  <p>A1</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p>{order.num}名</p>
                </div>
                <div className="mt-2 mx-2 flex w-full flex-col">
                  <p className="text-accent">指名</p>
                  <p>{order.cast?.map((cast: any) => cast + "　")}</p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">区分</p>
                  <p>-</p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">セット</p>
                  <p>-</p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">ルームチャージ</p>
                  <p className="">¥{order.roomCharge?.toLocaleString()}</p>
                </div>
                <hr className="w-full opacity-0" />
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">セット内容</p>
                  <p>
                    {order.setTime}分　{order.startTime}~{order.endTime}　¥
                    {order.price?.toLocaleString()}
                  </p>
                </div>{" "}
              </div>
            ))}
        </section>
        <div className="mb-1 flex w-full">
          <Line />
        </div>
        <nav className="mt-4 flex w-full items-center justify-center">
          <div
            className="w-[150px] flex justify-center items-center"
            onClick={() => {
              setPurchaseOrder([]);
            }}
          >
            <Border2
              rounded="rounded-full"
              size="h-[42px] w-[42px] p-[8px] bg-reset"
            >
              <Image
                src={"/assets/reset.svg"}
                width={26}
                height={26}
                className="!h-full !w-full"
                alt=""
              />
            </Border2>
          </div>
          <div
            className="w-[150px] flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("");
              setIsCard(false);
              setIsPurchaseOrder(false);
            }}
          >
            <Border2
              complate
              rounded="rounded-full"
              size="h-[42px] w-[42px] p-[2px]"
            >
              <Image
                src={"/assets/check-list.svg"}
                width={26}
                height={26}
                className="!h-full !w-full mr-[-4px]"
                alt=""
              />
            </Border2>
          </div>
        </nav>
      </div>
    </Card>
  );
}
