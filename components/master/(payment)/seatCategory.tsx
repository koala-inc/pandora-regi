"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { motion } from "framer-motion";
import Border2 from "@/components/templates/border";
import Toggle from "@/components/templates/toggle4";
import client from "@/connection";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/gqls/mutation/category";
import { searchCategory } from "@/gqls/query/category";
import { RequestDocument } from "graphql-request";
import Image from "next/image";
import { useState } from "react";
import useSWR, { preload } from "swr";
import { searchSeatArea } from "@/gqls/query/seat";
import { createSeatArea } from "@/gqls/mutation/seat";
import { deleteSeatArea } from "@/gqls/mutation/seat copy";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function ItemCategoryLists() {
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchSeatArea, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchSeatArea, fetcher);
  const createData = useSWR<any>(createSeatArea, fetcher);

  return (
    <>
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
        className="absolute left-[210px] top-1/2 z-0 h-[98dvh] w-[calc(100dvw-300px)] max-w-[820px] -translate-y-1/2"
      >
        <Border2 size="h-full min-h-[calc(98dvh-10px)] w-full px-4 py-2 flex flex-col !justify-start !items-start">
          <div className="flex max-w-full flex-wrap overflow-scroll">
            <div className="w-full mt-3 text-accent">※ RC = ルームチャージ</div>

            <div className="relative mr-4 w-[780px] pt-4">
              {searchData?.data?.seatArea[0]?.store_seat_area[0]?.seat_area?.map(
                (area: any, index: any) => {
                  <div key={index}>
                    <Border2
                      className="absolute right-[-15px] top-[10px]"
                      rounded="rounded-full"
                      size="h-[28px] w-[28px] p-[6px]"
                    >
                      <div
                        onClick={() => {
                          client
                            .request(deleteSeatArea, {
                              id: area.id,
                              ...defaultVariables,
                            })
                            .then(() => {
                              searchData.mutate(
                                () =>
                                  client.request(searchSeatArea, {
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
                    <Border
                      className="my-2 w-full"
                      rounded="rounded-md border-white"
                      size="p-4 flex flex-col overflow-scroll"
                      black
                    >
                      <div className="flex flex-wrap">
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">席カテゴリー名</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">延長時間</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">延長料金</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">サービス料</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">RC料</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">RC延長時間</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col py-2 mx-2">
                          <p className="text-accent">RC延長料</p>
                          <input
                            type="text"
                            className="h-[30px] w-[10rem] rounded-md px-2 text-sm"
                          />
                        </div>
                      </div>
                    </Border>
                  </div>;
                }
              )}
              <div
                className="mt-8 ml-[330px] flex"
                onClick={() => {
                  client
                    .request(createSeatArea, {
                      name: "タイトルなし",
                      ...defaultVariables,
                    })
                    .then(() => {
                      alert();
                      searchData.mutate(
                        () =>
                          client.request(searchSeatArea, {
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
          </div>
        </Border2>
      </motion.div>
    </>
  );
}
