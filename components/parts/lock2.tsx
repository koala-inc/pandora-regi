"use client";

import { useState } from "react";
import Button from "../templates/button";
import Border from "../templates/border";
import Image from "next/image";
import useIsLockGlobal from "@/globalstates/isLock";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

export default function Lock2() {
  const [isLock, setIsLock] = useIsLockGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {}}
    >
      <div
        className="flex h-[170px] w-[350px] items-center justify-around rounded-md border border-secondary bg-primary px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={() => {
            setIsLock(0);
            purchaseOrder.map((purchaseOrder: any) => {
              if (purchaseOrder.id.includes(seatPreset)) {
                purchaseOrder.checkedPayment = false;
              }
            });
          }}
        >
          <Border
            className="ml-2"
            rounded="rounded-full"
            size="h-[80px] w-[80px] p-[15px]"
          >
            {/* <Image
              src={"/assets/padunlock.svg"}
              width={26}
              height={26}
              className="mt-[-3px] !h-full !w-full"
              alt=""
            /> */}
            復帰
          </Border>
        </div>
        <div
          onClick={() => {
            setIsLock(0);
            setPurchaseOrder(
              purchaseOrder.filter((v: any) => v.id != seatPreset)
            );
          }}
        >
          <Border
            className="ml-2"
            rounded="rounded-full"
            size="h-[80px] w-[80px] p-[20px]"
          >
            {/* <Image
              src={"/assets/close.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            /> */}
            退店
          </Border>
        </div>
      </div>
    </div>
  );
}
