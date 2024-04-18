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
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

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

export default function OrderCastEdit() {
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
        <div className="mt-[-1px] flex h-[700px] w-[calc(100vw-405px)] flex-wrap items-start justify-start rounded-xl bg-primary p-4 text-white">
          {purchaseOrder[0]?.cast?.map((cast: any, index: any) => (
            <div
              key={index}
              className="mx-1 my-3 flex max-h-[135px] w-full max-w-[340px] flex-col justify-start rounded-md border border-white bg-black px-3 py-2"
            >
              <div className="mb-2 flex">
                <div className="flex w-full flex-col text-left">
                  <p className="h-[20px] text-xs text-accent">キャスト名</p>
                  <div className="flex h-[20px] items-center justify-start align-middle text-base leading-[40px] text-white">
                    {cast.split("##")[0].slice(1)}
                  </div>
                </div>
                <div
                  onClick={() => {
                    delete cast[index];
                    purchaseOrder[0].cast = purchaseOrder[0]?.cast.filter(
                      (v: any) => v
                    );
                  }}
                >
                  <Border2
                    rounded="rounded-full"
                    size="h-[28px] w-[28px] p-[6px]"
                  >
                    <div onClick={() => {}}>
                      <Image
                        src={"/assets/close.svg"}
                        width={26}
                        height={26}
                        className="!h-full !w-full"
                        alt=""
                      />
                    </div>
                  </Border2>
                </div>
              </div>
              <div className="mb-1 flex">
                <div className="mr-1 flex w-[88px] flex-col text-xs">
                  <p className="h-[20px] text-xs text-accent">種別</p>
                  <select
                    className="mr-1 flex h-[44px] items-center rounded-md text-base"
                    onChange={(e) => {
                      const data = JSON.parse(e.target.value);
                      setSelectDesignate(data.id);
                      setSelectDesignateSymbol(data.symbol);
                      setSelectDesignatePrice(data.price);
                      cast.title = data.symbol + cast.title.slice(1);
                      cast.price = Number(data.price);
                    }}
                    defaultValue={JSON.stringify({
                      id: cast.id,
                      symbol: cast.symbol,
                      price: cast.price,
                    })}
                  >
                    {searchData2?.data?.designate[0]?.store_designate[0]?.designate?.map(
                      (designate: any, index: any) => {
                        return (
                          <option
                            key={index}
                            value={JSON.stringify({
                              id: designate.id,
                              symbol: designate.designate_revision.symbol,
                              price: designate.designate_revision.price,
                            })}
                          >
                            {designate.designate_revision.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className="mr-2 flex w-[40px] flex-col justify-center text-left">
                  <p className="h-[20px] text-xs text-accent">数量</p>
                  <input
                    className="h-[44px] rounded-md px-2 text-center text-base text-white"
                    placeholder="個"
                    value={cast.lot}
                    // onChange={(e) => {
                    //   cast.lot = Number(
                    //     e.target.value.replace(/[^0-9]/g, "")
                    //   );
                    // }}
                    onClick={() => {
                      cast.isNumCalculator = true;
                    }}
                    readOnly
                  />
                </div>
                <div className="relative mr-2 flex w-[110px] flex-col justify-center text-left">
                  <p className="h-[20px] text-xs text-accent">単価</p>
                  <input
                    className="h-[44px] rounded-md px-2  pr-[24px] text-right text-base text-white"
                    placeholder="金額"
                    value={Number(cast.split("##")[1])?.toLocaleString()}
                    // onChange={(e) => {
                    //   cast.price = Number(
                    //     e.target.value.replace(/[^0-9]/g, "")
                    //   );
                    // }}
                    onClick={() => {
                      cast.isCalculator = true;
                    }}
                    readOnly
                  />
                  <p className="absolute bottom-[12px] right-[7px] opacity-60">
                    {cast.isTax ? "込" : "円"}
                  </p>
                </div>
                <div className="flex w-[70px] flex-col text-left">
                  <p className="h-[20px] text-xs text-accent">指名開始時間</p>
                  <input
                    type="text"
                    className="h-[44px] rounded-md px-2 text-center text-base text-white"
                    value={purchaseOrder[0].startTime}
                    onClick={() => {
                      cast.isTimeCalculator = true;
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
          {purchaseOrder[0]?.orderCast?.map((cast: any, index: any) => (
            <div
              key={index}
              className="mx-1 my-3 flex max-h-[135px] w-full max-w-[340px] flex-col justify-start rounded-md border border-white bg-black px-3 py-2"
            >
              <div className="mb-2 flex">
                <div className="flex w-full flex-col text-left">
                  <p className="h-[20px] text-xs text-accent">キャスト名</p>
                  <div className="flex h-[20px] items-center justify-start align-middle text-base leading-[40px] text-white">
                    {cast.title.slice(1)}
                  </div>
                </div>
                <div
                  onClick={() => {
                    delete cast[index];
                    purchaseOrder[0].orderCast =
                      purchaseOrder[0]?.orderCast.filter((v: any) => v);
                  }}
                >
                  <Border2
                    rounded="rounded-full"
                    size="h-[28px] w-[28px] p-[6px]"
                  >
                    <div onClick={() => {}}>
                      <Image
                        src={"/assets/close.svg"}
                        width={26}
                        height={26}
                        className="!h-full !w-full"
                        alt=""
                      />
                    </div>
                  </Border2>
                </div>
              </div>
              <div className="mb-1 flex">
                <div className="mr-1 flex w-[88px] flex-col text-xs">
                  <p className="h-[20px] text-xs text-accent">種別</p>
                  <select
                    className="mr-1 flex h-[44px] items-center rounded-md text-base"
                    onChange={(e) => {
                      const data = JSON.parse(e.target.value);
                      setSelectDesignate(data.id);
                      setSelectDesignateSymbol(data.symbol);
                      setSelectDesignatePrice(data.price);
                      cast.title = data.symbol + cast.title.slice(1);
                      cast.price = Number(data.price);
                    }}
                    defaultValue={JSON.stringify({
                      id: cast.id,
                      symbol: cast.symbol,
                      price: cast.price,
                    })}
                  >
                    {searchData2?.data?.designate[0]?.store_designate[0]?.designate?.map(
                      (designate: any, index: any) => {
                        return (
                          <option
                            key={index}
                            value={JSON.stringify({
                              id: designate.id,
                              symbol: designate.designate_revision.symbol,
                              price: designate.designate_revision.price,
                            })}
                          >
                            {designate.designate_revision.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className="mr-2 flex w-[40px] flex-col justify-center text-left">
                  <p className="h-[20px] text-xs text-accent">数量</p>
                  <input
                    className="h-[44px] rounded-md px-2 text-center text-base text-white"
                    placeholder="個"
                    value={cast.lot}
                    // onChange={(e) => {
                    //   cast.lot = Number(
                    //     e.target.value.replace(/[^0-9]/g, "")
                    //   );
                    // }}
                    onClick={() => {
                      cast.isNumCalculator = true;
                    }}
                    readOnly
                  />
                </div>
                <div className="relative mr-2 flex w-[110px] flex-col justify-center text-left">
                  <p className="h-[20px] text-xs text-accent">単価</p>
                  <input
                    className="h-[44px] rounded-md px-2  pr-[24px] text-right text-base text-white"
                    placeholder="金額"
                    value={Number(cast.price)?.toLocaleString()}
                    // onChange={(e) => {
                    //   cast.price = Number(
                    //     e.target.value.replace(/[^0-9]/g, "")
                    //   );
                    // }}
                    onClick={() => {
                      cast.isCalculator = true;
                    }}
                    readOnly
                  />
                  <p className="absolute bottom-[12px] right-[7px] opacity-60">
                    {cast.isTax ? "込" : "円"}
                  </p>
                </div>
                <div className="flex w-[70px] flex-col text-left">
                  <p className="h-[20px] text-xs text-accent">指名開始時間</p>
                  <input
                    type="text"
                    className="h-[44px] rounded-md px-2 text-center text-base text-white"
                    value={cast.time}
                    onClick={() => {
                      cast.isTimeCalculator = true;
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
