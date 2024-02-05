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

export default function Designate() {
  const [type, setType] = useState("同伴");
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchCategory, fetcher);

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
        className="absolute left-[210px] top-1/2 z-0 h-[98dvh] w-[720px] -translate-y-1/2"
      >
        <Border2 size="h-full min-h-[calc(98dvh-10px)] w-full px-4 py-2 flex flex-col !justify-start !items-start">
          <div className="flex max-w-full flex-wrap overflow-scroll">
            <div className="flex w-full flex-col mt-3">
              <p className="text-accent">指名延長料発生条件</p>
              <div className="flex">
                <input
                  type="text"
                  className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                />
                <p>分以上で発生させる</p>
              </div>
            </div>
            <div className="relative mr-4 w-full pt-4">
              <Border2
                className="absolute right-[-15px] top-[10px]"
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
              <Border
                className="my-2 w-full"
                rounded="rounded-md border-white"
                size="p-4 flex overflow-scroll flex-wrap"
                black
              >
                <div className="flex flex-col mr-3">
                  <p className="text-accent">指名種（入力用）</p>
                  <input
                    type="text"
                    className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="flex flex-col mr-3">
                  <p className="text-accent">指名料</p>
                  <input
                    type="text"
                    className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="flex flex-col mr-3">
                  <p className="text-accent">指名延長料</p>
                  <input
                    type="text"
                    className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="flex flex-col mr-3">
                  <p className="text-accent">税/サ</p>
                  <input
                    type="checkbox"
                    className="h-[30px] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="flex flex-col mr-3">
                  <p className="text-accent">指名種判定</p>
                  <select
                    className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value={"同伴"}>同伴</option>
                    <option value={"本指名"}>本指名</option>
                    <option value={"場内"}>場内</option>
                  </select>
                </div>
                <div className="flex flex-col mr-3">
                  <p className="text-accent">記号表記</p>
                  <input
                    type="text"
                    className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  />
                </div>
                {type == "同伴" && (
                  <>
                    <div className="mt-3 flex flex-1 justify-center items-end flex-col mr-3"></div>
                    <div className="mt-6 flex flex-col">
                      <p className="text-secondary-accent">
                        同伴：レシート表記
                      </p>
                      <div className="flex">
                        <div className="flex flex-col mr-3">
                          <p className="text-accent">同伴料</p>
                          <input
                            type="text"
                            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mr-3">
                          <p className="text-accent">指名料</p>
                          <input
                            type="text"
                            className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Border>
              <div className="mt-8 ml-[300px] flex" onClick={() => {}}>
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
