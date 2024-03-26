import Seat from "@/components/templates/seat";
import seatMap from "@/configs/seatMap";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import useIsLockGlobal from "@/globalstates/isLock";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import EditSeat from "./editSeat";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";

import React, { useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { searchSeatArea, searchSeatMap } from "@/gqls/query/seat";
import {
  createSeatMap,
  deleteSeatMap,
  updateSeatMap,
} from "@/gqls/mutation/seat";
import { searchUser } from "@/gqls/query/user";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function EditSeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isLock, setIsLock] = useIsLockGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  const searchData = useSWR<any>(searchSeatMap, fetcher);

  const onLayoutChange = (updateSeatMapDate: any) => {
    updateSeatMapDate.map((seatMap: any) => {
      client.request(updateSeatMap, {
        ...defaultVariables,
        id: seatMap.i,
        location: String(seatMap.x + "/" + seatMap.y),
      });
    });
  };

  const onDrop = (layout: any, layoutItem: any, _event: any) => {
    client
      .request(createSeatMap, {
        ...defaultVariables,
        name: "",
        location: String(layoutItem.x + "/" + layoutItem.y),
        layer: 3,
        type: 0,
      })
      .then(() => {
        searchData.mutate(
          () =>
            client.request(searchSeatMap, {
              ...defaultVariables,
            }),
          {
            populateCache: true,
            revalidate: false,
          }
        );
      });
  };

  return (
    <>
      <div
        draggable
        unselectable="on"
        className={
          "droppable-element absolute text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
        }
      ></div>
      <GridLayout
        className="layout !h-[100dvh]"
        cols={23}
        compactType={null}
        width={
          typeof window !== "undefined" ? window.parent.screen.width : 1200
        }
        rowHeight={60}
        isResizable={false}
        preventCollision={true}
        onDragStop={onLayoutChange}
        onDrop={onDrop}
        isDroppable={true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            switch (seat.type) {
              case 0:
                return (
                  <div
                    key={seat.id}
                    data-grid={{
                      x: Number(seat.location.split("/")[0]),
                      y: Number(seat.location.split("/")[1]),
                      w: 1,
                      h: 1,
                    }}
                    className={
                      "relative text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
                    }
                  >
                    {String(seat.id).toLocaleUpperCase()}
                  </div>
                );
              case 1:
                return (
                  <Image
                    key={index}
                    width={30}
                    height={30}
                    className={seat.area + " !w-full !h-full"}
                    src={seat.objectUrl}
                    alt=""
                  />
                );
              case 2:
                return (
                  <EditSeat
                    key={index}
                    id={seat.id}
                    area={seat.area}
                    bg={
                      isLock > 1
                        ? " bg-green-200 opacity-90"
                        : purchaseOrder[0].id != seat.id
                        ? " bg-natural"
                        : " bg-blue-200 opacity-90"
                    }
                    onClick={() => {
                      if (isLock < 2) {
                        setIsCard(true);
                        if (isControl != "") setIsControl("");
                      } else if (isLock == 2) {
                        setIsLock(3);
                      }
                    }}
                  >
                    {seat.body}
                  </EditSeat>
                );
            }
          }
        )}
      </GridLayout>
    </>
  );
}
