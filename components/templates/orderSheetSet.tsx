import Image from "next/image";
import Button from "./button";
import Card from "@/components/templates/card";

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
        <section className="flex flex-1 flex-col text-xs">
          {isPurchaseOrder &&
            purchaseOrder.map((order: any, index: any) => (
              <div
                key={index}
                className="my-1 flex flex-wrap border border-white bg-black p-2"
              >
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">卓番</p>
                  <p>A1</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">人数</p>
                  <p>{order.num}</p>
                </div>
                <div className="mx-2 flex w-full flex-col">
                  <p className="text-accent">指名</p>
                  <p>{order.cast?.map((cast: any) => cast + " ")}</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">セット</p>
                  <p></p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">区分</p>
                  <p></p>
                </div>
                <hr className="w-full opacity-0" />
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">セット料金</p>
                  <p>
                    {order.setTime}分　¥{order.price?.toLocaleString()}{" "}
                    {order.startTime}~{order.endTime}
                  </p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">コール</p>
                  <p>{order.callTime}</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">ルームチャージ</p>
                  <p>{order.roomCharge}</p>
                </div>
              </div>
            ))}
        </section>
        <div className="mb-1 flex w-full">
          <Line />
        </div>
        <nav className="mt-4 flex w-full items-center justify-center">
          <Button className="mr-2 min-w-[8rem]" natural disabled>
            キャンセル
          </Button>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsControl("");
              setIsCard(false);
              setIsPurchaseOrder(false);
            }}
          >
            <Button className="min-w-[8rem]" natural>
              確定
            </Button>
          </div>
        </nav>
      </div>
    </Card>
  );
}
