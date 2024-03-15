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
import Toggle5 from "@/components/templates/toggle5";
import Toggle6 from "@/components/templates/toggle6";
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
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-0 h-[100px] !w-[800px] px-10 py-2">
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

export default function OrderItemEdit() {
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
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();

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
          <div className="w-full flex justify-center items-center">
            <Button className="mr-3">オーダー入力</Button>
            <Button className="mr-3 opacity-50">店内履歴</Button>
            <Button className="mr-6 opacity-50">オーダー修正</Button>
            <input
              className="p-4 h-[45px] w-[180px] text-lg text-white rounded-md mr-4 ml-4"
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
        </ContentHeader>

        <div className="mt-[-1px] flex h-[700px] w-[calc(100vw-405px)] flex-wrap justify-start items-start rounded-xl bg-primary p-4 text-white">
          {purchaseOrder[0]?.orderItem?.map((orderItem: any, index: any) => (
            <div
              className="flex flex-col w-full mx-1 max-w-[340px] max-h-[180px] border border-white justify-center rounded-md bg-black my-3 px-3 py-2"
              // key={index}
            >
              <div className="flex w-full">
                <div className="flex flex-col w-[200px] text-left">
                  <p className="text-accent h-[20px] text-xs">オーダー名</p>
                  <p className="h-[40px] mb-2 text-white text-base leading-5 flex items-center text-left">
                    {orderItem.title}
                  </p>
                </div>
                <div className="flex flex-col w-[32px] mx-2 text-left">
                  <p className="text-accent h-[20px] text-xs">数量</p>
                  <input
                    className="h-[40px] px-2 rounded-md text-white text-center"
                    placeholder="個"
                    value={orderItem.lot}
                    // onChange={(e) => {
                    //   purchaseOrderItem.lot = Number(e.target.value);
                    // }}
                    onClick={() => {
                      orderItem.isNumCalculator = true;
                    }}
                    readOnly
                  />
                </div>
                <div className="relative flex flex-col w-[110px] text-left">
                  <p className="text-accent h-[20px] text-xs">金額</p>
                  <input
                    className="h-[40px] mb-2 text-xs px-2 pr-[24px] rounded-md text-white text-right"
                    placeholder="金額"
                    value={orderItem.price?.toLocaleString()}
                    onClick={() => {
                      orderItem.isCalculator = true;
                    }}
                    // onChange={(e) => {
                    //   purchaseOrderItem.price = Number(
                    //     e.target.value.replace(/[^0-9]/g, "")
                    //   );
                    // }}
                    readOnly
                  />
                  <p className="absolute bottom-[16px] right-[7px] opacity-60">
                    {orderItem.isTax ? "込" : "円"}
                  </p>
                </div>
              </div>
              <div className="mb-1 flex w-full h-full items-center">
                <div
                  onClick={() => {
                    // setIsCalculator(true);
                  }}
                >
                  <Border
                    rounded="rounded-full"
                    stroke="lg"
                    size="h-[32px] w-[32px] p-[6px]"
                  >
                    <Image
                      src={"/assets/add-cast.svg"}
                      width={36}
                      height={36}
                      alt=""
                      className="!w-full !h-full"
                    />
                  </Border>
                </div>
                <Toggle5 />
                <Toggle6 />
                <div
                  onClick={() => {
                    delete orderItem[index];
                    purchaseOrder[0].orderItem = orderItem.filter(
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
              {orderItem.castNames && orderItem.castNames != "" ? (
                <div className="mb-1 flex w-full py-2 h-full items-center">
                  {orderItem.castNames}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
