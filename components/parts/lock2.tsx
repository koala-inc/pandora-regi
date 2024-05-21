"use client";

import { useState } from "react";
import Button from "../templates/button";
import Border from "../templates/border";
import Image from "next/image";
import useIsLockGlobal from "@/globalstates/isLock";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import useExSeatGlobal from "@/globalstates/exSeat";

export default function Lock2() {
  const [isLock, setIsLock] = useIsLockGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const [exSeat, setExSeat] = useExSeatGlobal();

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={(e) => {
        e.stopPropagation();
        setIsLock(0);
      }}
    >
      <div
        className="flex h-[170px] w-[350px] items-center justify-around rounded-md border-4 border-secondary bg-primary px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
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
            size="h-[80px] w-[80px] p-[15px] text-xl"
            complate
          >
            {/* <Image
              src={"/assets/padunlock.svg"}
              width={26}
              height={26}
              className="mt-[-3px] !h-full !w-full"
              alt=""
            /> */}
            復 帰
          </Border>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsLock(0);
            setPurchaseOrder(
              purchaseOrder.filter((v: any) => !v.id.includes(seatPreset))
            );
            const exSeatData = exSeat.filter(
              (v: any) => !v.includes(seatPreset)
            );
            setExSeat(exSeatData);
          }}
        >
          <Border
            className="ml-2"
            rounded="rounded-full"
            size="h-[80px] w-[80px] p-[15px] text-xl"
            red
          >
            {/* <Image
              src={"/assets/close.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            /> */}
            退 店
          </Border>
        </div>
      </div>
    </div>
  );
}
