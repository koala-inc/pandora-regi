import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "../button";
import Image from "next/image";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import { useState } from "react";
import SubBorder from "../subBorder";
import { format } from "date-fns";
import client from "@/connection";
import useSWR, { preload } from "swr";
import { RequestDocument } from "graphql-request";
import { searchAttendanceManagementCast, searchCast } from "@/gqls/query/cast";
import { searchStaff } from "@/gqls/query/staff";
import Calculator2 from "@/components/parts/calculator2";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-[0px] h-[125px] w-[90%] px-4 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return <Border size="h-[680px] w-full px-4 py-2">{children}</Border>;
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderTime() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  let total = 0;
  purchaseOrder[0]?.cast?.map((cast: any) => {
    total += Number(cast.split("##")[1]);
  });
  total += Number(purchaseOrder[0]?.price) * Number(purchaseOrder[0]?.num);
  purchaseOrder[0]?.orderItem?.map((orderItem: any) => {
    total += Number(orderItem.price) * Number(orderItem.lot);
  });
  purchaseOrder[0]?.orderCast?.map((cast: any) => {
    total += Number(cast.price) * Number(cast.lot);
  });

  const totalPay = Math.ceil(Math.floor(total * 1.3 * 1.1) / 100) * 100;
  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState(0);

  const [type, setType] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);
  const searchAData = useSWR<any>(searchAttendanceManagementCast, fetcher);

  const [isCalculator, setIsCalculator] = useState(false);
  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);

  const [setTimeResult, setSetTimeResult] = useState("");

  return (
    <>
      {isCalculator && isCalculatorSelect == 4 && (
        <Calculator2
          result={setTimeResult}
          setResult={setSetTimeResult}
          setIsCalculator={setIsCalculator}
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
        className="absolute left-[390px] top-1/2 z-20 h-[95dvh] max-h-[830px] min-h-[755px] w-[calc(100dvw-420px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <div className="w-[calc(100%+50px)]">
          <ContentHeader>
            <div className="flex flex-col flex-start w-full">
              <div className="flex w-full">
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    開始時間　
                    <span className="bg-red-700 text-white px-[5px] py-[3px] text-xs rounded-md">
                      必須
                    </span>
                  </label>
                  <input
                    type="text"
                    className="mr-4 h-[45px] w-[80px] rounded-md px-2 text-xl"
                    value={setTimeResult}
                    onClick={() => {
                      setIsCalculatorSelect(4);
                      setIsCalculator(true);
                    }}
                    readOnly
                  />
                </div>
                <p className="text-sm mr-4 mt-[50px]">〜</p>
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    終了時間　
                    <span className="bg-red-700  text-white px-[5px] py-[3px] text-xs rounded-md">
                      必須
                    </span>
                  </label>
                  <input
                    type="text"
                    className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl"
                    value={""}
                    onClick={() => {
                      setIsCalculatorSelect(5);
                      setIsCalculator(true);
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </ContentHeader>
        </div>
        <div className="">
          <Content>
            <Border
              className="my-2 h-[90%] w-full"
              rounded="border-white rounded-md h-[100%] !border-[1px]"
              size="p-4 !items-start min-h-full max-h-full overflow-scroll"
              black
            >
              <table className="table table-xs mt-2">
                {/* head */}
                <thead>
                  <tr>
                    <th className="w-[20px] text-center text-accent">
                      <input
                        type="checkbox"
                        className="mt-[8px] h-[20px] w-[20px]"
                      />
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      開始時間
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      退店時間
                    </th>
                    <th className="w-[20px] text-center text-accent">
                      延長本数
                    </th>
                    <th className="min-w-[6.65em] text-left text-accent">
                      セット内容
                    </th>
                    <th className="min-w-[6em] text-center text-accent">
                      セット時間
                    </th>
                    <th className="min-w-[6em] text-center text-accent">
                      料金
                    </th>
                    <th className="min-w-[10.5em] text-left text-thirdary-accent">
                      区分
                    </th>
                    <th className="min-w-[6em] text-center text-secondary-accent">
                      延長
                    </th>
                    <th className="min-w-[3.65em] text-center text-accent">
                      時間ロック
                    </th>
                    <th>削除</th>
                  </tr>
                </thead>
                <tbody>
                  {searchAData?.data?.attendanceManagementCast[0]?.store_attendance_management_cast[0]?.attendance_management_cast?.map(
                    (amc: any, index: any) => (
                      <>
                        {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
                          (cast: any, index: any) => {
                            const size =
                              cast.name.length > 4 ? "text-xs" : "text-lg";
                            if (cast.id == amc.cast_id) {
                              return (
                                <tr key={index} className="h-[80px]">
                                  <th className="w-[20px] text-center text-lg">
                                    <input
                                      type="checkbox"
                                      className="mt-[8px] h-[20px] w-[20px]"
                                    />
                                  </th>
                                  <th className="w-[80px] text-center text-lg">
                                    <input
                                      type="text"
                                      className="h-[45px] w-[80px] rounded-md px-2 text-xl"
                                      value={setTimeResult}
                                      onClick={() => {
                                        setIsCalculatorSelect(4);
                                        setIsCalculator(true);
                                      }}
                                      readOnly
                                    />
                                  </th>
                                  <th className="w-[80px] text-center text-lg">
                                    <input
                                      type="text"
                                      className="h-[45px] w-[80px] rounded-md px-2 text-xl"
                                      value={""}
                                      onClick={() => {
                                        setIsCalculatorSelect(5);
                                        setIsCalculator(true);
                                      }}
                                      readOnly
                                    />
                                  </th>
                                  <th className="w-[20px] text-center">1</th>
                                  <th className="min-w-[8em] text-left text-lg">
                                    メイン6000
                                  </th>
                                  <th className="w-[80px] text-center text-lg opacity-60">
                                    <input
                                      type="text"
                                      className="h-[45px] w-[80px] rounded-md px-2 text-xl"
                                      value={""}
                                      onClick={() => {
                                        setIsCalculatorSelect(5);
                                        setIsCalculator(true);
                                      }}
                                      readOnly
                                    />
                                  </th>
                                  <th className="w-[80px] text-center text-lg opacity-60">
                                    <input
                                      type="text"
                                      className="h-[45px] w-[80px] rounded-md px-2 text-xl"
                                      value={""}
                                      onClick={() => {
                                        setIsCalculatorSelect(5);
                                        setIsCalculator(true);
                                      }}
                                      readOnly
                                    />
                                  </th>
                                  <th className="min-w-[10.5em] text-left text-lg">
                                    案内所　案内所１
                                  </th>
                                  <th className="min-w-[3.5em] text-center items-center h-[80px] flex text-lg">
                                    <Button natural>+30</Button>
                                    <Button natural>-30</Button>
                                  </th>
                                  <th className="w-[100px] text-center text-lg">
                                    <Button natural>在店</Button>
                                  </th>
                                  <th className="min-w-[4em] text-center text-lg">
                                    <input
                                      type="checkbox"
                                      className="mt-[8px] h-[20px] w-[20px]"
                                    />
                                  </th>
                                </tr>
                              );
                            }
                          }
                        )}
                      </>
                    )
                  )}
                </tbody>
              </table>
            </Border>
          </Content>
        </div>
      </motion.div>
    </>
  );
}
