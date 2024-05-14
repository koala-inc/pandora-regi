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
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import Calculator14 from "@/components/parts/calculator14";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-0 h-[100px] !w-[350px] px-10 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return (
    <Border size="h-[820px] w-full px-4 py-2 flex flex-col">{children}</Border>
  );
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
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const purchaseOrderState = purchaseOrder.filter((purchaseOrder: any) =>
    purchaseOrder.id.includes(seatPreset)
  );

  let count = 0;
  let count2 = 0;

  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);
  const [calculatorIndex, setCalculatorIndex] = useState("");

  return (
    <>
      {purchaseOrderState[0].isTimeCalculator && isCalculatorSelect == 1 && (
        <Calculator14
          result={purchaseOrderState[0].orderItem[calculatorIndex]}
        />
      )}
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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] w-[calc(100dvw-480px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <Content>
          <Border
            className="my-2 h-[100%] w-full"
            rounded="border-white rounded-md h-[100%] !border-[1px]"
            size="py-4 px-2 !items-start min-h-full max-h-full overflow-scroll"
            black
          >
            <table className="table table-xs fixed z-10 mt-[-16px] h-[45px] w-[94%] rounded-none bg-neutral-900">
              {/* head */}
              <thead>
                <tr className="text-accent">
                  <th className="w-[10em] text-left align-bottom">オーダー</th>
                  <th className="w-[10em] text-left align-bottom">価格</th>
                  <th className="w-[25em] text-left align-bottom">キャスト</th>
                  <th className="w-[15em] text-left align-bottom">
                    <label>操作</label>
                  </th>
                </tr>
              </thead>
            </table>
            <table className="table table-xs mt-5">
              {/* head */}
              <thead>
                <tr className="text-accent">
                  <th className="w-[10em] align-bottom"></th>
                  <th className="w-[10em] align-bottom"></th>
                  <th className="w-[25em] align-bottom"></th>
                  <th className="w-[15em] align-bottom"></th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrderState[0]?.orderItem?.map(
                  (orderItem: any, index: any) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className=" text-base">
                            {orderItem.title.slice(0, 9)}
                          </td>
                          <td
                            className=" pr-6 text-right text-base"
                            onClick={() => {
                              purchaseOrderState[0].isTimeCalculator = true;
                              setIsCalculatorSelect(1);
                              setCalculatorIndex(index);
                            }}
                          >
                            {Number(
                              String(orderItem.price).replace(/[^0-9]/g, "")
                            ).toLocaleString()}
                            {orderItem.isTax ? "込" : "円"}
                          </td>
                          <td className="text-base">
                            <div className="flex items-center justify-start">
                              <Border
                                className="mr-3 h-[40px] w-[40px]"
                                rounded="rounded-full"
                                stroke="lg"
                                size="h-[32px] w-[32px] p-[6px]"
                              >
                                <Image
                                  src={"/assets/add-cast.svg"}
                                  width={36}
                                  height={36}
                                  alt=""
                                  className="!h-full !w-full"
                                />
                              </Border>
                              {orderItem.castNames && orderItem.castNames != ""
                                ? orderItem.castNames
                                    .replace(/ /g, ",")
                                    .replace(/.$/, "")
                                : ""}
                            </div>
                          </td>
                          <td className="flex">
                            <Button
                              className="btn btn-ghost btn-xs mr-8 h-full p-0"
                              onClick={() => {
                                setPurchaseOrderItemAdd([
                                  ...purchaseOrderItemAdd,
                                  {
                                    title:
                                      purchaseOrderState[0].orderItem[index]
                                        .title,
                                    lot: 1,
                                    price:
                                      purchaseOrderState[0].orderItem[index]
                                        .price,
                                    isCalculator: false,
                                    isTax:
                                      purchaseOrderState[0].orderItem[index]
                                        .isTax,
                                    isNumCalculator: false,
                                  },
                                ]);
                              }}
                              natural
                            >
                              再注文
                            </Button>
                            <div
                              className="m-[3px] flex"
                              onClick={() => {
                                delete purchaseOrderState[0].orderItem[index];
                                purchaseOrderState[0].orderItem =
                                  purchaseOrderState[0].orderItem.filter(
                                    (v: any) => v
                                  );
                              }}
                            >
                              <Border2
                                rounded="rounded-full"
                                size="h-[28px] w-[28px] p-[6px]"
                              >
                                <div>
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
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
              </tbody>
            </table>
          </Border>
        </Content>
      </motion.div>
    </>
  );
}
