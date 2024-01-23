"use client";

import Control from "@/components/master/(component)/control";
import { useState } from "react";
import Border from "../border";
import Toggle from "@/components/templates/toggle4";
import client from "@/connection";
import { searchCategory } from "@/gqls/query/category";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderSet() {
  const [activeTab, setActiveTab] = useState(12);
  const [activeCategory, setActiveCategory] = useState(1);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const searchData = useSWR<any>(searchCategory, fetcher);
  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col overflow-scroll"
          black
        >
          <div className="mb-4 flex flex-wrap overflow-scroll">
            {searchData?.data?.category[0]?.store_category[0]?.category?.map(
              (category: any, index: any) => {
                if (category.category_revision.parent_id == 0) {
                  return (
                    <div
                      key={index}
                      className={
                        "m-4 flex max-w-[160px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                      }
                      onClick={() => {
                        setActiveCategory((activeCategory) => category.id);
                      }}
                    >
                      {category.category_revision.name}
                    </div>
                  );
                }
              }
            )}
          </div>
          <div className="tabs">
            {searchData?.data?.category[0]?.store_category[0]?.category?.map(
              (subcategory: any, index: any) => {
                if (subcategory.category_revision.parent_id == activeCategory)
                  return (
                    <a
                      key={index}
                      className={`tab-lg tab ml-[-4px] mr-2 w-[8em] rounded-t-xl ${
                        activeTab == subcategory.id
                          ? "tab-active bg-primary text-white"
                          : "tab-lifted bg-secondary text-black"
                      }`}
                      onClick={() => {
                        setActiveTab((activeTab) => subcategory.id);
                      }}
                    >
                      {subcategory.category_revision.name}
                    </a>
                  );
              }
            )}
          </div>
          <div className="mt-[-1px] h-[460px] w-[800px] rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
            {/* <p>
              {activeTab == 0
                ? "メイン"
                : activeTab == 1
                ? "VIP"
                : activeTab == 2
                ? "その他"
                : ""}
            </p> */}
            <Border
              className="my-2 w-full"
              size="p-4 flex overflow-scroll flex-wrap"
              black
            >
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
              <span
                className={
                  "m-4 flex max-w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-6 text-xl leading-4 tracking-wider"
                }
              >
                鏡月
              </span>
            </Border>
          </div>
        </Border>
      </Control>
    </>
  );
}
