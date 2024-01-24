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

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function ItemCategoryLists() {
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchCategory, fetcher);
  const createData = useSWR<any>(createCategory, fetcher);
  const updateData = useSWR<any>(updateCategory, fetcher);

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
        className="absolute left-[210px] top-1/2 z-0 h-[98dvh] w-[calc(100dvw-300px)] -translate-y-1/2"
      >
        <Border2 size="h-full max-h-[calc(98dvh-10px)] min-w-full px-4 py-2 flex flex-col justify-start !items-start">
          <div className="flex max-w-full overflow-scroll">
            <div className="relative mr-4 w-[540px]">
              <Border
                className="absolute right-[-5px] top-[0px]"
                rounded="rounded-full"
                size="h-[20px] w-[20px] p-[2px] text-red-600"
              >
                <div
                  className="ml-[1px] mt-[-3px] flex h-full w-full items-center justify-center"
                  onClick={() => {}}
                >
                  ×
                </div>
              </Border>
              <Border
                className="my-2 w-full"
                size="p-4 flex flex-col overflow-scroll"
                black
              >
                <div className="flex flex-wrap">
                  <p className="text-accent">席カテゴリー名</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">延長時間（分）</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">延長料金</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">サービス料</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">ルームチャージ料</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">
                    ルームチャージ延長時間（分）
                  </p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                  <p className="mt-2 text-accent">ルームチャージ延長料</p>
                  <input
                    type="text"
                    className="h-[30px] w-[32rem] rounded-md px-2 text-sm"
                  />
                </div>
              </Border>
              <div
                className="ml-[243px] mt-2 h-[45px] w-[45px]"
                onClick={() => {}}
              >
                <Border
                  rounded="rounded-full"
                  size="h-[40px] w-[40px] p-[12px]"
                >
                  <Image
                    src={"/assets/add.svg"}
                    width={26}
                    height={26}
                    className="!h-full !w-full"
                    alt=""
                  />
                </Border>
              </div>
            </div>
          </div>
        </Border2>
      </motion.div>
    </>
  );
}
