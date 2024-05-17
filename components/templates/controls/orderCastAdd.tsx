import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/settings";
import Button from "../button";
import { useEffect, useState } from "react";
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
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useSeatPresetGlobal from "@/globalstates/seatPreset";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-0 h-[100px] !w-[565px] px-0 py-2">{children}</SubBorder>
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
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );

  const [selectDesignate, setSelectDesignate] = useState(-1);
  const [selectDesignateSymbol, setSelectDesignateSymbol] = useState("");
  const [selectDesignatePrice, setSelectDesignatePrice] = useState(0);
  const [selectDesignateSet, setSelectDesignateSet] = useState(0);
  const [selectDesignateExPrice, setSelectDesignateExPrice] = useState(0);
  const [searchType, setSearchType] = useState("全て");

  let count = 0;
  let count2 = 0;

  const [nowDate, setNowDate] = useState(dayjs(new Date()));

  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };

  const checker = (endTime: any, startTime: any, setTime: any, num: any) =>
    (Math.floor(
      (Number(
        dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
          date(startTime.split(":")[0], startTime.split(":")[1]),
          "minute"
        )
      ) -
        Number(setTime) -
        1) /
        30
    ) >= 0
      ? Math.floor(
          (Number(
            dayjs(date(endTime.split(":")[0], endTime.split(":")[1])).diff(
              date(startTime.split(":")[0], startTime.split(":")[1]),
              "minute"
            )
          ) -
            Number(setTime) -
            1) /
            30
        ) + 1
      : 0) * num;

  const [targetSet, setTargetSet] = useState("");

  const [countOrderSet, setCountOrderSet] = useState<any>([]);
  const [orderSets, setOrderSets] = useState<any>([]);
  useEffect(() => {
    const orderData: any = [];
    const orderExtensions: any = [];
    purchaseOrderState[0].orderSet.map((set: any) => {
      if (set.orderExtension > 0) {
        orderExtensions.push({
          title: "延長料(" + set.categoryTitle.slice(0, 3) + ")",
          lot: Number(set.orderExtension),
          price: Number(set.extensionPrice),
          isTax: false,
          startTime: set.startTime,
        });
      }
    });
    const orderSets = purchaseOrderState[0]?.isRoomCharge
      ? [
          ...purchaseOrderState[0]?.orderSet,
          {
            title:
              purchaseOrderState[0]?.roomName == ""
                ? "ルームチャージ"
                : purchaseOrderState[0]?.roomName,
            lot: 1,
            price: purchaseOrderState[0]?.roomCharge,
            isTax: purchaseOrderState[0]?.roomTax,
          },
          ...orderExtensions,
        ]
      : [...purchaseOrderState[0]?.orderSet, ...orderExtensions];
    let flag = true;
    orderSets.map((orderSet: any, index: any) => {
      if (flag) {
        setTargetSet(orderSet.title + "/" + index);
        flag = false;
      }
      const state = orderSets.filter(
        (n: any) =>
          n.title === orderSet?.title &&
          n.price === orderSet?.price &&
          n.isTax === orderSet?.isTax
      );
      let count = 0;
      state.map((state: any) => (count += state.lot));
      orderData.push({
        title: orderSet?.title,
        subTitle: "",
        lot: count,
        price: orderSet?.price,
        isTax: orderSet?.isTax,
      });
    });
    setOrderSets(orderSets);
    setCountOrderSet(
      Array.from(
        new Map(
          orderData.map((data: any) => [
            data.title + data.price + data.isTax,
            data,
          ])
        ).values()
      )
    );
  }, [purchaseOrderState]);

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
          <div className="flex w-[535px] items-end rounded-md border-4 border-white bg-black px-8 py-0">
            <div className="flex w-full items-center justify-start">
              <div className="flex w-full flex-col">
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
                        setSelectDesignateSet(
                          designate.designate_revision.extra_time
                        );
                        setSelectDesignateExPrice(
                          designate.designate_revision.extra_price
                        );
                      }
                      count2 += 1;
                      return (
                        <Button
                          className={
                            designate.id == selectDesignate
                              ? "mb-2 mr-2 min-w-[7rem]"
                              : "mb-2 mr-2 min-w-[7rem] opacity-60"
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
                            setSelectDesignateSet(
                              designate.designate_revision.extra_time
                            );
                            setSelectDesignateExPrice(
                              designate.designate_revision.extra_price
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
          </div>
        </ContentHeader>
        <div className="mt-[-1px] flex h-[700px] w-[calc(100vw-405px)] flex-col rounded-xl bg-primary p-4 text-white">
          <div className="mb-3 flex w-full justify-center">
            <div className="mr-2 flex w-[200px] items-center justify-around rounded-md border-4 border-white bg-black p-3 text-white">
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
            <div className="flex w-[1100px] justify-around rounded-md border-4 border-white bg-black p-3">
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
            <div className="flex w-[300px] flex-col px-2 text-xs">
              <p className="h-[20px] text-xs text-accent">対象セット</p>
              <select
                className="flex h-[50px] items-center rounded-md px-2 text-base text-white"
                value={targetSet}
                onChange={(e) => {
                  setTargetSet(e.target.value);
                }}
              >
                {orderSets.map((orderSet: any, index: any) => {
                  if (
                    !orderSet.title.includes("延長") &&
                    !orderSet.title.includes("ルームチャージ")
                  )
                    return (
                      <option key={index} value={orderSet.title + "/" + index}>
                        {orderSet.title} {orderSet.startTime}
                      </option>
                    );
                })}
              </select>
            </div>
          </div>
          <div className="grid min-h-[580px] w-full grid-cols-7 grid-rows-5 content-start items-center justify-center rounded-md border-4 border-white bg-black p-4">
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
                            startTime: nowDate
                              .minute(Math.round(nowDate.minute() / 5) * 5)
                              .format("HH:mm"),
                            endTime: purchaseOrderState[0].mainEndTime,
                            setTime: Number(selectDesignateSet),
                            orderExtension: checker(
                              purchaseOrderState[0].mainEndTime,
                              nowDate
                                .minute(Math.round(nowDate.minute() / 5) * 5)
                                .format("HH:mm"),
                              Number(selectDesignateSet),
                              1
                            ),
                            extensionPrice: Number(selectDesignateExPrice),
                            isCalculator: false,
                            isTax: false,
                            isNumCalculator: false,
                            targetSet: targetSet,
                            isLock: false,
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
