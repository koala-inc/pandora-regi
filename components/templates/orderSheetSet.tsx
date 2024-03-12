import Image from "next/image";
import Button from "./button";
import Card from "@/components/templates/card";
import Border2 from "@/components/templates/border";

// グローバルステート
import useIsControlGlobal from "@/globalstates/isControl";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import useOrderGlobal from "@/globalstates/order";

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
            {list.price.toLocaleString()}円
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
  const [order, setOrder] = useOrderGlobal();

  return (
    <Card>
      <div
        className="flex h-full w-[340px] flex-col font-bold"
        // onClick={() => {
        //   if (isControl != "") setIsControl("");
        // }}
      >
        <section className="flex flex-1 flex-col text-sm max-h-[700px] p-1 py-3 overflow-scroll">
          {isPurchaseOrder &&
            purchaseOrder.map((order: any, index: any) => (
              <div
                key={index}
                className="relative my-1 mb-6 mx-[auto] w-[95%] flex flex-wrap border border-white bg-black p-3"
              >
                <div
                  onClick={() => {
                    delete purchaseOrder[index];
                    setPurchaseOrder(() => purchaseOrder.filter((v: any) => v));
                  }}
                >
                  <Border2
                    className="absolute right-[-15px] top-[-15px]"
                    rounded="rounded-full"
                    size="h-[28px] w-[28px] p-[6px]"
                  >
                    <Image
                      src={"/assets/close.svg"}
                      width={26}
                      height={26}
                      className="!h-full !w-full"
                      alt=""
                    />
                  </Border2>
                </div>
                <div
                  onClick={() => {
                    setOrder(purchaseOrder.order);
                    // setResult("0");
                    // setSelectCast([]);
                    // setSetTimeResult("0");
                    // setNumResult("0");
                    // setRoomResult("0");
                    // setSetName("");
                    // setStatus("なし");
                    delete purchaseOrder[index];
                    setPurchaseOrder(() => purchaseOrder.filter((v: any) => v));
                  }}
                >
                  <Border2
                    className="absolute right-[30px] top-[-15px]"
                    rounded="rounded-full"
                    size="h-[28px] w-[28px] p-[6px]"
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
                <div className="mx-2 flex flex-col">
                  <p>A1</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p>{order?.num}名</p>
                </div>
                <div className="mt-2 mx-2 flex w-full flex-col">
                  <p className="text-accent">指名</p>
                  <p>
                    {order?.cast?.map(
                      (cast: any) => cast.split("##")[0] + "　"
                    )}
                  </p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">区分</p>
                  <p>{order?.status}</p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">セット</p>
                  <p>{order?.setName}</p>
                </div>
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">ルームチャージ</p>
                  <p className="">
                    {Number(order.roomCharge) == 0
                      ? "なし"
                      : order?.roomCharge?.toLocaleString()}
                    {Number(order.roomCharge) == 0
                      ? ""
                      : order?.roomTax
                      ? "込"
                      : "円"}
                  </p>
                </div>
                <hr className="w-full opacity-0" />
                <div className="mx-2 flex flex-col mt-2">
                  <p className="text-accent">セット内容</p>
                  <p>
                    {order?.setTime}分　{order?.startTime}~{order?.endTime}　
                    {order?.price?.toLocaleString()}
                    {order?.priceTax ? "込" : "円"}
                  </p>
                </div>
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
              if (purchaseOrder.length >= 1) {
                setIsControl("");
                setIsCard(false);
                setIsPurchaseOrder(false);
              }
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
