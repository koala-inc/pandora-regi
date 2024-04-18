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
  const purchaseOrderState = purchaseOrder.filter(
    (purchaseOrder: any) => purchaseOrder.id == seatPreset
  );

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

        <div className="mt-[-1px] flex h-[700px] w-[calc(100vw-405px)] flex-wrap items-start justify-start rounded-xl bg-primary p-4 text-white">
          <table className="table table-xs fixed z-10 mt-[-16px] h-[45px] w-[94%] rounded-none">
            <thead>
              <tr className="text-accent">
                <th className="w-[15em] align-bottom">オーダー名</th>
                <th className="w-[10em] align-bottom">金額</th>
                <th className="w-[10em] align-bottom">レディース</th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
          </table>
          <table className="table table-xs mt-5">
            <thead>
              <tr className="text-accent">
                <th className="w-[15em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[5em]">
                  <label></label>
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrderState[0]?.orderItem?.map(
                (orderItem: any, index: any) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{orderItem.title}</td>
                        <td onClick={() => {}}>
                          {orderItem.price?.toLocaleString()}
                          {orderItem.isTax ? "込" : "円"}
                        </td>
                        <td>
                          {orderItem.castNames && orderItem.castNames != ""
                            ? orderItem.castNames
                                .replace(/ /g, ",")
                                .replace(/.$/, "")
                            : ""}
                        </td>
                        <th className="flex">
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => {
                              delete purchaseOrderState[0].orderItem[index];
                              purchaseOrderState[0].orderItem =
                                purchaseOrderState[0].orderItem.filter(
                                  (v: any) => v
                                );
                            }}
                            // onClick={() => {
                            // client
                            //   .request(deleteCast, {
                            //     id: cast.id,
                            //     ...defaultVariables,
                            //   })
                            //   .then(() => {
                            //     searchData.mutate(
                            //       () =>
                            //         client.request(searchCast, {
                            //           ...defaultVariables,
                            //         }),
                            //       {
                            //         populateCache: true,
                            //         revalidate: false,
                            //       }
                            //     );
                            //   });
                            // }}
                          >
                            削除
                          </button>
                        </th>
                      </tr>
                    </>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
