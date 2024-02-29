"use client";

import Control from "@/components/master/(component)/control";
import { useState } from "react";
import Border from "../border";
import Toggle from "@/components/templates/toggle4";
import client from "@/connection";
import { searchCategory } from "@/gqls/query/category";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";
import { searchBottle } from "@/gqls/query/bottle";
import { searchMenu } from "@/gqls/query/menu";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "@/components/templates/button";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderSet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [activeTab, setActiveTab] = useState(-1);
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchCategory, fetcher);
  const searchData2 = useSWR<any>(searchBottle, fetcher);
  const searchData3 = useSWR<any>(searchMenu, fetcher);

  const [categoryActive, setCategoryActive] = useState(-2);
  const [subCategoryActive, setSubCategoryActive] = useState(-1);

  let count = 0;
  let count2 = 0;

  return (
    <>
      <div className="ml-[250px] h-full w-full items-start flex-col flex justify-center">
        <div className="flex py-2">
          {searchData?.data?.category[0]?.store_category[0]?.category?.map(
            (category: any, index: any) => {
              if (category.category_revision.parent_id == 0) {
                if (categoryActive == -2 && count2 == 0) {
                  setCategoryActive(category.id);
                  setSubCategoryActive(-1);
                  setActiveTab(-1);
                }
                count2 += 1;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCategoryActive(category.id);
                      setSubCategoryActive(-1);
                      setActiveTab(-1);
                    }}
                    className={
                      category.id == categoryActive
                        ? "mr-3"
                        : "mr-3 grayscale opacity-30"
                    }
                  >
                    <div className="text-black mx-auto flex h-[50px] w-[180px] cursor-pointer items-center justify-center rounded-md shadow-md bg-gradient-to-b from-[#cdd8e8] from-0% via-[#b9c5d8] via-50% to-[#a7bad4] p-2 text-center text-base leading-4 tracking-wider">
                      {category.category_revision.name}
                    </div>
                  </div>
                );
              }
            }
          )}
        </div>
        <div className="tabs mt-3 justify-start">
          {searchData?.data?.category[0]?.store_category[0]?.category?.map(
            (category: any, index: any) => {
              if (category.category_revision.parent_id == categoryActive) {
                if (activeTab == -1 && count == 0) {
                  setActiveTab(category.id);
                  setSubCategoryActive(category.id);
                }
                count += 1;
                return (
                  <a
                    className={`!text-xs tab tab-md mr-1 w-[9em] h-[3.5em] rounded-t-xl ${
                      activeTab == category.id
                        ? "tab-active bg-primary text-white"
                        : "tab-lifted bg-secondary text-black"
                    }`}
                    onClick={() => {
                      setActiveTab(category.id);
                      setSubCategoryActive(category.id);
                    }}
                    key={index}
                  >
                    {category.category_revision.name}
                  </a>
                );
              }
            }
          )}

          {/* <a className="tab tab-lifted tab-lg w-[8em] rounded-t-xl bg-neutral-400 text-black">
          +
        </a> */}
        </div>
        <div className="mt-[-1px] flex h-[590px] w-[calc(100vw-405px)] rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
          <div className="grid w-full grid-cols-8 grid-rows-5 content-start items-center justify-center rounded-md border border-white bg-black p-4">
            {searchData2?.data?.bottle[0]?.store_bottle[0]?.bottle?.map(
              (bottle: any, index: any) => {
                if (
                  bottle.bottle_revision.item_category_id == subCategoryActive
                ) {
                  return (
                    <div
                      className={
                        "mx-auto flex h-[75px] w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
                      }
                      key={index}
                    >
                      {bottle.bottle_revision.name}
                    </div>
                  );
                }
              }
            )}
            {searchData3?.data?.menu[0]?.store_menu[0]?.menu?.map(
              (menu: any, index: any) => {
                if (menu.menu_revision.item_category_id == subCategoryActive) {
                  return (
                    <div
                      className={
                        "mx-auto flex h-[75px] w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
                      }
                      key={index}
                    >
                      {menu.menu_revision.name}
                    </div>
                  );
                }
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
