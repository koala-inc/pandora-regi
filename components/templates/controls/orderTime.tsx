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
import Toggle from "../toggle";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

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
  const [toggle, setToggle] = useState(purchaseOrder[0]?.toggle || false);

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

  const [nowDate, setNowDate] = useState(dayjs(new Date()));
  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };

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
            <div className="flex flex-col flex-start w-full text-white">
              <div className="flex w-full">
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    開始時間
                  </label>
                  <input
                    type="text"
                    className="mr-4 h-[45px] w-[80px] rounded-md px-2 text-xl"
                    value={purchaseOrder[0]?.startTime}
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
                  </label>
                  <input
                    type="text"
                    className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl"
                    value={purchaseOrder[0]?.endTime}
                    onClick={() => {
                      setIsCalculatorSelect(5);
                      setIsCalculator(true);
                    }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col mr-6">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    延長
                  </label>
                  <div className="flex my-auto">
                    <Border
                      className="mr-1"
                      size="px-2 text-red-700"
                      natural
                      stroke="md"
                    >
                      -30
                    </Border>
                    <Border size="px-2 text-blue-700" natural stroke="md">
                      +30
                    </Border>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    コール時間
                  </label>
                  <input
                    type="text"
                    className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl"
                    value={purchaseOrder[0]?.callTime}
                    onClick={() => {
                      setIsCalculatorSelect(5);
                      setIsCalculator(true);
                    }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    {"　"}
                  </label>
                  <div className="flex my-auto">
                    <Toggle isChecked={toggle} setIsChecked={setToggle} />
                  </div>
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
                    <th className="w-[150px] text-left text-accent">
                      セット内容
                    </th>
                    <th className="w-[60px] text-center text-accent">
                      セット時間
                    </th>
                    <th className="w-[103px] text-center text-accent">料金</th>
                    <th className="w-[180px] text-left text-thirdary-accent">
                      区分
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      開始時間
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      退店時間
                    </th>
                    <th className="w-[20px] text-center text-accent">延長数</th>
                    <th className="w-[130px] text-center text-secondary-accent">
                      延長
                    </th>
                    <th className="min-w-[3.65em] text-center text-accent">
                      時間ロック
                    </th>
                    <th>削除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-[80px]">
                    <th className="w-[20px] text-center text-lg">
                      <input
                        type="checkbox"
                        className="mt-[8px] h-[20px] w-[20px]"
                      />
                    </th>
                    <th className="w-[150px] text-left text-base">
                      {purchaseOrder[0]?.setName}
                    </th>
                    <th className="relative w-[60px] text-left text-lg">
                      <input
                        type="text"
                        className="h-[45px] w-[60px] text-right rounded-md px-1 pr-[29px] text-base"
                        value={purchaseOrder[0]?.setTime}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          setIsCalculator(true);
                        }}
                        readOnly
                      />
                      <p className="absolute bottom-[26.5px] left-[43px] opacity-60">
                        分
                      </p>
                    </th>
                    <th className="relative w-[103px] text-left text-lg">
                      <input
                        type="text"
                        className="h-[45px] w-[103px] text-right rounded-md px-2 pr-[32px] text-base"
                        value={purchaseOrder[0]?.price}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          setIsCalculator(true);
                        }}
                        readOnly
                      />
                      <p className="absolute bottom-[26.5px] left-[83px] opacity-60">
                        円
                      </p>
                    </th>
                    <th className="w-[180px] text-left text-base">
                      案内所　案内所１
                    </th>
                    <th className="w-[80px] text-center text-lg">
                      <input
                        type="text"
                        className="h-[45px] w-[70px] text-center rounded-md px-2 text-base"
                        value={purchaseOrder[0]?.startTime}
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
                        className="h-[45px] w-[70px] text-center rounded-md px-2 text-base"
                        value={purchaseOrder[0]?.endTime}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          setIsCalculator(true);
                        }}
                        readOnly
                      />
                    </th>
                    <th className="w-[20px] text-center text-base">
                      {Math.floor(
                        (Number(
                          dayjs(
                            date(
                              purchaseOrder[0]?.endTime.split(":")[0],
                              purchaseOrder[0]?.endTime.split(":")[1]
                            )
                          ).diff(
                            date(
                              purchaseOrder[0]?.startTime.split(":")[0],
                              purchaseOrder[0]?.startTime.split(":")[1]
                            ),
                            "minute"
                          )
                        ) -
                          Number(purchaseOrder[0]?.setTime) -
                          1) /
                          30
                      )}
                    </th>
                    <th className="w-[130px] text-center items-center h-[80px] flex text-base">
                      <div
                        onClick={() => {
                          purchaseOrder[0].endTime = dayjs(
                            date(
                              purchaseOrder[0]?.endTime.split(":")[0],
                              purchaseOrder[0]?.endTime.split(":")[1]
                            )
                          )
                            .subtract(30, "minute")
                            .format("HH:mm");
                        }}
                      >
                        <Border
                          className="mr-1"
                          size="px-2 text-red-700"
                          natural
                          stroke="md"
                        >
                          -30
                        </Border>
                      </div>
                      <div
                        onClick={() => {
                          purchaseOrder[0].endTime = dayjs(
                            date(
                              purchaseOrder[0]?.endTime.split(":")[0],
                              purchaseOrder[0]?.endTime.split(":")[1]
                            )
                          )
                            .add(30, "minute")
                            .format("HH:mm");
                        }}
                      >
                        <Border size="px-2 text-blue-700" natural stroke="md">
                          +30
                        </Border>
                      </div>
                    </th>
                    <th className="w-[80px] text-center text-base">
                      <Border natural stroke="md">
                        在店
                      </Border>
                    </th>
                    <th className="w-[20px] text-center text-base">
                      <Border size="px-2 text-red-700" natural stroke="md">
                        X
                      </Border>
                    </th>
                  </tr>
                </tbody>
              </table>
            </Border>
          </Content>
        </div>
      </motion.div>
    </>
  );
}
