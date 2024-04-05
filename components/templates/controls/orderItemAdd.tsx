import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/settings";
import Button from "../button";
import { useState } from "react";
import Control from "@/components/master/(component)/control";
import Toggle from "@/components/templates/toggle4";
import Toggle3 from "@/components/templates/toggle3";
import client from "@/connection";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/gqls/mutation/category";
import { searchCategory } from "@/gqls/query/category";
import { RequestDocument } from "graphql-request";
import Image from "next/image";
import useSWR, { preload } from "swr";
import { searchBottle } from "@/gqls/query/bottle";
import { searchMenu } from "@/gqls/query/menu";
import usePurchaseOrderItemAddGlobal from "@/globalstates/purchaseOrderItemAdd";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-0 h-[100px] !w-[350px] px-10 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderItemAdd() {
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

  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();

  let count = 0;
  let count2 = 0;

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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-405px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <ContentHeader>
          <div className="flex items-end rounded-md border-4 border-white bg-black px-4 py-3">
            <div className="flex w-full items-center justify-center">
              <input
                className="mx-4 h-[45px] w-[220px] rounded-md p-4 text-lg text-white"
                placeholder="オーダー名を入力"
              />
              <div>
                <Border
                  rounded="rounded-full"
                  size="h-[36px] w-[36px] p-[6px] bg-search"
                >
                  <Image
                    src={"/assets/search.svg"}
                    width={26}
                    height={26}
                    className="!h-full !w-full"
                    alt=""
                  />
                </Border>
              </div>
            </div>
          </div>
        </ContentHeader>
        <div className="flex py-2">
          <div className="mr-4 flex items-center justify-center rounded-md bg-primary p-2">
            <Toggle3 />
          </div>
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
                        : "mr-3 opacity-30 grayscale"
                    }
                  >
                    <div className="mx-auto flex h-[50px] w-[180px] cursor-pointer items-center justify-center rounded-md bg-gradient-to-b from-[#cdd8e8] from-0% via-[#b9c5d8] via-50% to-[#a7bad4] p-2 text-center text-base leading-4 tracking-wider text-black shadow-md">
                      {category.category_revision.name}
                    </div>
                  </div>
                );
              }
            }
          )}
        </div>
        <div className="tabs mt-3 justify-start ">
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
                    className={`tab-md tab mr-1 h-[3.5em] w-[9em] rounded-t-xl !text-xs ${
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
          <div className="grid w-full grid-cols-7 grid-rows-5 content-start items-center justify-center rounded-md border-4 border-white bg-black p-4">
            {searchData2?.data?.bottle[0]?.store_bottle[0]?.bottle?.map(
              (bottle: any, index: any) => {
                if (
                  bottle.bottle_revision.item_category_id == subCategoryActive
                ) {
                  return (
                    <div
                      className={
                        "mx-auto flex h-[75px] w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#416d6d] p-2 text-center text-base leading-5 tracking-widest"
                      }
                      key={index}
                      onClick={() => {
                        setPurchaseOrderItemAdd([
                          ...purchaseOrderItemAdd,
                          {
                            title: bottle.bottle_revision.name,
                            lot: 1,
                            price: bottle.bottle_revision.price,
                            isCalculator: false,
                            isTax: false,
                          },
                        ]);
                      }}
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
                        "mx-auto flex h-[75px] w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#416d6d] p-2 text-center text-base leading-5 tracking-widest"
                      }
                      key={index}
                      onClick={() => {
                        setPurchaseOrderItemAdd([
                          ...purchaseOrderItemAdd,
                          {
                            title: menu.menu_revision.name,
                            lot: 1,
                            price: menu.menu_revision.price,
                            isCalculator: false,
                            isTax: false,
                            isNumCalculator: false,
                          },
                        ]);
                      }}
                    >
                      {menu.menu_revision.name}
                    </div>
                  );
                }
              }
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
