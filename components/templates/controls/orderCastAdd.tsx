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
import { searchCast } from "@/gqls/query/cast";
import usePurchaseOrderItemAddGlobal from "@/globalstates/purchaseOrderItemAdd";
import { searchDesignate } from "@/gqls/query/designate";
import dayjs from "dayjs";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-0 h-[100px] !w-[900px] px-10 py-2">
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

export default function OrderCastAdd() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [activeTab, setActiveTab] = useState(-1);
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);
  const searchData2 = useSWR<any>(searchDesignate, fetcher);

  const [categoryActive, setCategoryActive] = useState(-2);
  const [subCategoryActive, setSubCategoryActive] = useState(-1);

  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();

  const [selectDesignate, setSelectDesignate] = useState(-1);
  const [selectDesignateSymbol, setSelectDesignateSymbol] = useState("");
  const [selectDesignatePrice, setSelectDesignatePrice] = useState(0);
  const [searchType, setSearchType] = useState("全て");

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
          <div className="w-full flex justify-start items-center">
            <div className="w-[150px] flex flex-col">
              <p className="text-accent">指名開始時間</p>
              <input className="h-[50px] w-[100px]" type="time" />
            </div>
            <div className="w-full flex flex-col">
              <p className="text-accent">指名種別</p>
              <div className="flex">
                {searchData2?.data?.designate[0]?.store_designate[0]?.designate?.map(
                  (designate: any, index: any) => {
                    if (selectDesignate == -1 && count2 == 0) {
                      setSelectDesignate(designate.id);
                      setSelectDesignateSymbol(
                        designate.designate_revision.symbol
                      );
                      setSelectDesignatePrice(
                        designate.designate_revision.price
                      );
                    }
                    count2 += 1;
                    return (
                      <Button
                        className={
                          designate.id == selectDesignate
                            ? "min-w-[7rem] mb-2 mr-2"
                            : "min-w-[7rem] mb-2 mr-2 opacity-60"
                        }
                        key={index}
                        natural
                        textXL
                        onClick={() => {
                          setSelectDesignate(designate.id);
                          setSelectDesignateSymbol(
                            designate.designate_revision.symbol
                          );
                          setSelectDesignatePrice(
                            designate.designate_revision.price
                          );
                        }}
                      >
                        {designate.designate_revision.name}
                      </Button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </ContentHeader>
        <div className="mt-[-1px] flex h-[700px] w-[calc(100vw-405px)] flex-col rounded-xl bg-primary p-4 text-white">
          <div className="w-full flex justify-center mb-3">
            <div className="flex justify-around items-center w-[200px] mr-2 border border-white bg-black p-3 rounded-md text-white">
              <Button
                className={
                  searchType != "出勤"
                    ? "min-w-[5rem] opacity-50"
                    : "min-w-[5rem]"
                }
                natural
                onClick={() => {
                  setSearchType("出勤");
                }}
              >
                出勤
              </Button>
              <Button
                className={
                  searchType != "全て"
                    ? "ml-3 min-w-[5rem] opacity-50"
                    : "ml-3 min-w-[5rem]"
                }
                natural
                onClick={() => {
                  setSearchType("全て");
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                全て
              </Button>
            </div>
            <div className="flex justify-around w-[800px] border border-white bg-black p-3 rounded-md">
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                全
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 1,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                あ
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 2,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                か
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 3,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                さ
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 4,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                た
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 5,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                な
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 6,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                は
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 7,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                ま
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 8,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                や
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 9,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                ら
              </div>
              <div
                className={
                  "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                }
                onClick={() => {
                  searchData.mutate(
                    () =>
                      client.request(searchCast, {
                        name_ruby_syllabary_search_code: 10,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  );
                }}
              >
                わ
              </div>
            </div>
            <div className="flex justify-around items-center w-[200px] ml-2 border border-white bg-black p-3 rounded-md text-white">
              <Button className={"min-w-[5rem]"} natural>
                伝票内指名編集
              </Button>
            </div>
          </div>
          <div className="grid w-full grid-cols-7 grid-rows-5 content-start items-center justify-center rounded-md border border-white bg-black p-4 min-h-[580px]">
            {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
              (cast: any, index: any) => {
                if (cast.leaving_date == null && cast.cast_code != 0) {
                  return (
                    <div
                      className={
                        "mx-auto flex h-[75px] w-[130px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#416d6d] p-2 text-center text-base leading-5 tracking-widest"
                      }
                      key={index}
                      onClick={() => {
                        const nowDate = dayjs(new Date());
                        setPurchaseOrderItemAdd([
                          ...purchaseOrderItemAdd,
                          {
                            id: selectDesignate,
                            symbol: selectDesignateSymbol,
                            title: selectDesignateSymbol + cast.name,
                            lot: 1,
                            price: Number(selectDesignatePrice),
                            time: nowDate
                              .minute(Math.round(nowDate.minute() / 5) * 5)
                              .format("HH:mm"),
                          },
                        ]);
                      }}
                    >
                      {cast.name}
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
