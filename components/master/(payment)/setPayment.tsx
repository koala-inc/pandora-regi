"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Border2 from "@/components/templates/border";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR, { preload } from "swr";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import { searchSeatArea } from "@/gqls/query/seat";
import { searchEvent } from "@/gqls/query/event";
import { createEvent, deleteEvent, updateEvent } from "@/gqls/mutation/event";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function SetPayment() {
  const [activeTab, setActiveTab] = useState(-1);
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  // preload(searchSeatArea, fetcher);
  const searchData = useSWR<any>(searchSeatArea, fetcher);
  const searchData2 = useSWR<any>(searchEvent, fetcher);

  let count = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "easeInOut",
        bounce: 0,
        duration: 0.15,
        delay: 0.15,
      }}
      className="absolute left-[220px] top-1/2 z-20 -translate-y-1/2"
    >
      <div className="tabs mt-3 justify-start">
        {searchData?.data?.seatArea[0]?.store_seat_area[0]?.seat_area?.map(
          (area: any, index: any) => {
            if (activeTab == -1 && count == 0) {
              setActiveTab(area.id);
            }
            count += 1;
            return (
              <a
                key={index}
                className={`tab-md tab mr-1 w-[7em] rounded-t-xl ${
                  activeTab == area.id
                    ? "tab-active bg-primary text-white"
                    : "tab-lifted bg-secondary text-black"
                }`}
                onClick={() => setActiveTab(area.id)}
              >
                {area.name}
              </a>
            );
          }
        )}
      </div>
      <div className="mt-[-1px] min-h-[calc(98dvh-80px)] max-h-[calc(98dvh-80px)] min-w-[616.56px] overflow-scroll w-full pr-8 rounded-b-xl rounded-r-xl bg-primary px-4 pt-6 pb-6 text-white">
        {searchData2?.data?.event[0]?.store_event[0]?.event?.map(
          (event: any, index: any) => {
            if (activeTab == event.event_revision.seat_area_id) {
              return (
                <Border
                  key={index}
                  className="relative my-2 w-full mb-8"
                  rounded="rounded-md border-white"
                  size="p-4 flex"
                  black
                >
                  <Border2
                    className="absolute right-[-15px] top-[-15px]"
                    rounded="rounded-full"
                    size="h-[28px] w-[28px] p-[6px]"
                  >
                    <div
                      onClick={() => {
                        client
                          .request(deleteEvent, {
                            id: event.id,
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    >
                      <Image
                        src={"/assets/close.svg"}
                        width={26}
                        height={26}
                        className="!h-full !w-full"
                        alt=""
                      />
                    </div>
                  </Border2>
                  <div className="flex flex-col mr-3">
                    <p className="text-accent">セット名</p>
                    <input
                      type="text"
                      className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                      defaultValue={event.event_revision.name || ""}
                      onBlur={(e) => {
                        client
                          .request(updateEvent, {
                            id: event.id,
                            name: e.target.value,
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    />
                  </div>
                  <div className="flex flex-col mr-3">
                    <p className="text-accent">基本時間（分）</p>
                    <input
                      type="text"
                      className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
                      defaultValue={event.event_revision.set_time || ""}
                      onBlur={(e) => {
                        client
                          .request(updateEvent, {
                            id: event.id,
                            set_time: Number(e.target.value),
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    />
                  </div>
                  <div className="flex flex-col mr-3">
                    <p className="text-accent">基本料金</p>
                    <input
                      type="text"
                      className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                      defaultValue={event.event_revision.price || ""}
                      onBlur={(e) => {
                        client
                          .request(updateEvent, {
                            id: event.id,
                            price: Number(e.target.value),
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    />
                  </div>
                  <div className="flex flex-col mr-3">
                    <p className="text-accent">税/サ</p>
                    <input
                      type="checkbox"
                      className="h-[30px] rounded-md px-2 text-sm"
                      defaultChecked={event.event_revision.is_tax_service == 1}
                      onChange={(e) => {
                        client
                          .request(updateEvent, {
                            id: event.id,
                            is_tax_service: e.target.checked ? 1 : 0,
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    />
                  </div>
                  <div className="flex flex-col mr-3">
                    <p className="text-accent">案内所</p>
                    <input
                      type="checkbox"
                      className="h-[30px] rounded-md px-2 text-sm"
                      defaultChecked={
                        event.event_revision.is_information_center == 1
                      }
                      onChange={(e) => {
                        client
                          .request(updateEvent, {
                            id: event.id,
                            is_information_center: e.target.checked ? 1 : 0,
                            ...defaultVariables,
                          })
                          .then(() => {
                            searchData2.mutate(
                              () =>
                                client.request(searchEvent, {
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          });
                      }}
                    />
                  </div>
                </Border>
              );
            }
          }
        )}
        <div
          className="mt-8 ml-[260px] flex"
          onClick={() => {
            client
              .request(createEvent, {
                seat_area_id: Number(activeTab),
                name: "セット名",
                ...defaultVariables,
              })
              .then(() => {
                searchData2.mutate(
                  () =>
                    client.request(searchEvent, {
                      ...defaultVariables,
                    }),
                  {
                    populateCache: true,
                    revalidate: false,
                  }
                );
              });
          }}
        >
          <Border2
            complate
            rounded="rounded-full"
            size="h-[32px] w-[32px] p-[4px] bg-primary"
          >
            <Image
              src={"/assets/addGreen.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border2>
        </div>
      </div>
    </motion.div>
  );
}
