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
import Calculator7 from "@/components/parts/calculator7";
import Calculator8 from "@/components/parts/calculator8";
import { searchSeatArea } from "@/gqls/query/seat";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="mt-[0px] h-[100px] w-[90%] px-4 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return (
    <Border size="h-[690px] w-full px-4 py-2 flex flex-col">{children}</Border>
  );
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
  const searchData2 = useSWR<any>(searchSeatArea, fetcher);

  const [isCalculator, setIsCalculator] = useState(false);
  const [isCalculatorSelect, setIsCalculatorSelect] = useState(0);

  const [setTimeResult, setSetTimeResult] = useState("");

  const [nowDate, setNowDate] = useState(dayjs(new Date()));
  const date = (hour: any, minite: any) => {
    const a = nowDate.hour(Number(hour));
    const b = a.minute(Number(minite));
    return b;
  };
  let count = 0;

  const [activeTab, setActiveTab] = useState(-1);

  const checker = () =>
    (Math.floor(
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
    ) >= 0
      ? Math.floor(
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
        ) + 1
      : 0) * purchaseOrder[0].num;

  return (
    <>
      {purchaseOrder[0].isTimeCalculator && isCalculatorSelect == 1 && (
        <Calculator8
          result={purchaseOrder[0]}
          time={purchaseOrder[0].callTime}
          callback={(hour: any, minite: any) => {
            purchaseOrder[0].callTime = hour + ":" + minite;
          }}
        />
      )}
      {purchaseOrder[0].isTimeCalculator && isCalculatorSelect == 2 && (
        <Calculator8
          result={purchaseOrder[0]}
          time={purchaseOrder[0].mainStartTime}
          callback={(hour: any, minite: any) => {
            purchaseOrder[0].mainStartTime = hour + ":" + minite;
            purchaseOrder[0].startTime = purchaseOrder[0].mainStartTime;
            purchaseOrder[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrder[0].isTimeCalculator && isCalculatorSelect == 3 && (
        <Calculator8
          result={purchaseOrder[0]}
          time={purchaseOrder[0].mainEndTime}
          callback={(hour: any, minite: any) => {
            purchaseOrder[0].mainEndTime = hour + ":" + minite;
            purchaseOrder[0].endTime = purchaseOrder[0].mainEndTime;
            purchaseOrder[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrder[0].isTimeCalculator && isCalculatorSelect == 4 && (
        <Calculator8
          result={purchaseOrder[0]}
          time={purchaseOrder[0].startTime}
          callback={(hour: any, minite: any) => {
            purchaseOrder[0].startTime = hour + ":" + minite;
            purchaseOrder[0].orderExtension = checker();
          }}
        />
      )}
      {purchaseOrder[0].isTimeCalculator && isCalculatorSelect == 5 && (
        <Calculator8
          result={purchaseOrder[0]}
          time={purchaseOrder[0].endTime}
          callback={(hour: any, minite: any) => {
            purchaseOrder[0].endTime = hour + ":" + minite;
            purchaseOrder[0].orderExtension = checker();
          }}
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
                    className="mr-4 h-[45px] w-[80px] rounded-md px-2 text-xl text-center"
                    value={purchaseOrder[0]?.mainStartTime}
                    onClick={() => {
                      setIsCalculatorSelect(2);
                      // setIsCalculator(true);
                      purchaseOrder[0].isTimeCalculator = true;
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
                    className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl text-center"
                    value={purchaseOrder[0]?.mainEndTime}
                    onClick={() => {
                      setIsCalculatorSelect(3);
                      // setIsCalculator(true);
                      purchaseOrder[0].isTimeCalculator = true;
                    }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    席カテゴリー
                  </label>
                  <select
                    className="mr-8 h-[45px] w-[120px] rounded-md px-2 text-xl text-center"
                    value={purchaseOrder[0].room_name}
                    onChange={(e) => {
                      {
                        searchData2?.data?.seatArea[0]?.store_seat_area[0]?.seat_area?.map(
                          (area: any, index: any) => {
                            if (area.room_name == e.target.value) {
                              purchaseOrder[0].roomName = area.room_name;
                              purchaseOrder[0].roomCharge = area.charge_price;
                              purchaseOrder[0].extensionPrice =
                                area.extra_price;
                              purchaseOrder[0].serviceTax = area.service_tax;
                            }
                          }
                        );
                      }
                    }}
                  >
                    {searchData2?.data?.seatArea[0]?.store_seat_area[0]?.seat_area?.map(
                      (area: any, index: any) => {
                        return (
                          <option key={index} value={area.room_name}>
                            {area.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-6 text-xs font-bold text-accent"></label>
                  <div
                    className={"my-auto"}
                    onClick={() => {
                      purchaseOrder[0].isRoomCharge = true;
                    }}
                  >
                    <Button natural>ルームチャージ追加</Button>
                  </div>
                </div>

                {/* <div className="flex flex-col mr-6">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    延長
                  </label>
                  <div className="flex my-auto">
                    <div
                      onClick={() => {
                        purchaseOrder[0].mainEndTime = dayjs(
                          date(
                            purchaseOrder[0]?.mainEndTime.split(":")[0],
                            purchaseOrder[0]?.mainEndTime.split(":")[1]
                          )
                        )
                          .subtract(30, "minute")
                          .format("HH:mm");
                        purchaseOrder[0].endTime = purchaseOrder[0].mainEndTime;
                        purchaseOrder[0].orderExtension = checker();
                      }}
                    >
                      <Border
                        className="mr-1 w-[3.8rem]"
                        size="px-2 text-red-700 flex justify-center items-center align-middle"
                        natural
                        stroke="md"
                      >
                        <div className="flex justify-center items-center h-full mt-[-2px] mr-[1px]">
                          -
                        </div>
                        <span>30</span>
                      </Border>
                    </div>
                    <div
                      onClick={() => {
                        purchaseOrder[0].mainEndTime = dayjs(
                          date(
                            purchaseOrder[0]?.mainEndTime.split(":")[0],
                            purchaseOrder[0]?.mainEndTime.split(":")[1]
                          )
                        )
                          .add(30, "minute")
                          .format("HH:mm");
                        purchaseOrder[0].endTime = purchaseOrder[0].mainEndTime;
                        purchaseOrder[0].orderExtension = checker();
                      }}
                    >
                      <Border
                        className="w-[3.8rem]"
                        size="px-2 text-blue-700 flex justify-center items-center align-middle"
                        natural
                        stroke="md"
                      >
                        <div className="flex justify-center items-center h-full mt-[-3px]">
                          +
                        </div>
                        <span>30</span>
                      </Border>
                    </div>
                  </div>
                </div> */}
                {/* <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    コール時間
                  </label>
                  {!purchaseOrder[0].callToggle ? (
                    <input
                      type="text"
                      className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl text-center"
                      value={purchaseOrder[0]?.callTime}
                      onClick={() => {
                        setIsCalculatorSelect(1);
                        purchaseOrder[0].isTimeCalculator = true;
                      }}
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      className="mr-8 h-[45px] w-[80px] rounded-md px-2 text-xl text-center"
                      value={"-"}
                      readOnly
                    />
                  )}
                </div> */}
                {/* <div className="flex flex-col">
                  <label className="mt-3 mb-2 text-xs font-bold text-accent">
                    {"　"}
                  </label>
                  <div className="flex my-auto">
                    <Toggle isChecked={toggle} setIsChecked={setToggle} />
                  </div>
                </div> */}
              </div>
            </div>
          </ContentHeader>
        </div>
        <div className="">
          <Content>
            <Border
              className="my-2 h-[49%] w-full"
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
                    <th className="w-[120px] text-left text-accent">
                      セット内容
                    </th>
                    <th className="w-[60px] text-left text-accent">
                      セット時間
                    </th>
                    <th className="w-[103px] text-left text-accent">料金</th>
                    <th className="w-[210px] text-left text-accent">区分</th>
                    <th className="w-[80px] text-center text-accent">
                      開始時間
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      退店時間
                    </th>
                    <th className="w-[20px] text-left text-accent">延長数</th>
                    <th className="w-[130px] text-center text-accent">延長</th>
                    <th className="min-w-[3.65em] text-left text-accent">
                      在店/退店
                    </th>
                    <th className="pl-[12px] text-left text-accent">削除</th>
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
                    <th className="w-[120px] text-left text-sm">
                      <select className="h-[40px] w-[120px] rounded-md text-left px-1 text-sm">
                        <option>{purchaseOrder[0]?.setName}</option>
                      </select>
                    </th>
                    <th className="relative w-[60px] text-left text-lg">
                      <input
                        type="text"
                        className="h-[40px] w-[60px] text-right rounded-md px-1 pr-[27px] text-sm"
                        value={purchaseOrder[0]?.setTime}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          setIsCalculator(true);
                        }}
                        readOnly
                      />
                      <p className="absolute bottom-[30.5px] text-sm left-[46px] opacity-60">
                        分
                      </p>
                    </th>
                    <th className="relative w-[103px] text-left text-lg">
                      <input
                        type="text"
                        className="h-[40px] w-[103px] text-right rounded-md px-2 pr-[26px] text-sm"
                        value={purchaseOrder[0]?.price}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          setIsCalculator(true);
                        }}
                        readOnly
                      />
                      <p className="absolute bottom-[30.5px] text-sm left-[90px] opacity-60">
                        円
                      </p>
                    </th>
                    <th className="w-[210px] flex text-left text-sm">
                      <select className="h-[40px] w-[90px] rounded-md text-left px-1 text-sm mr-2">
                        <option>案内所</option>
                      </select>
                      <select className="h-[40px] w-[120px] rounded-md text-left px-1 text-sm">
                        <option>案内所１</option>
                      </select>
                    </th>
                    <th className="w-[80px] text-center text-lg">
                      <input
                        type="text"
                        className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                        value={purchaseOrder[0]?.startTime}
                        onClick={() => {
                          setIsCalculatorSelect(4);
                          purchaseOrder[0].isTimeCalculator = true;
                        }}
                        readOnly
                      />
                    </th>
                    <th className="w-[80px] text-center text-lg">
                      <input
                        type="text"
                        className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                        value={purchaseOrder[0]?.endTime}
                        onClick={() => {
                          setIsCalculatorSelect(5);
                          purchaseOrder[0].isTimeCalculator = true;
                        }}
                        readOnly
                      />
                    </th>
                    <th className="w-[20px] text-center text-sm">
                      {checker()}
                    </th>
                    <th className="w-[130px] text-center items-center h-[80px] flex text-sm">
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
                          purchaseOrder[0].orderExtension = checker();
                        }}
                      >
                        <Border
                          className="mr-1 w-[3.8rem]"
                          size="px-2 text-red-700 flex justify-center items-center align-middle"
                          natural
                          stroke="md"
                        >
                          <div className="flex justify-center items-center h-full mt-[-2px] mr-[1px]">
                            -
                          </div>
                          <span>30</span>
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
                          purchaseOrder[0].orderExtension = checker();
                        }}
                      >
                        <Border
                          className="w-[3.8rem]"
                          size="px-2 text-blue-700 flex justify-center items-center align-middle"
                          natural
                          stroke="md"
                        >
                          <div className="flex justify-center items-center h-full mt-[-3px]">
                            +
                          </div>
                          <span>30</span>
                        </Border>
                      </div>
                    </th>
                    <th className="w-[80px] text-center text-sm">
                      <Border natural stroke="md">
                        <p className="text-red-700">退店</p>
                      </Border>
                    </th>
                    <th className="w-[20px] text-center text-sm">
                      <div className="flex">
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
                    </th>
                  </tr>
                  {purchaseOrder[0].isRoomCharge ? (
                    <tr className="h-[80px]">
                      <th className="w-[20px] text-center text-lg">
                        <input
                          type="checkbox"
                          className="mt-[8px] h-[20px] w-[20px]"
                        />
                      </th>
                      <th className="w-[120px] text-left text-sm">
                        <input
                          className="h-[40px] w-[120px] rounded-md text-left px-2 text-sm"
                          value={
                            purchaseOrder[0]?.roomName == ""
                              ? "ルームチャージ"
                              : purchaseOrder[0]?.roomName
                          }
                          readOnly
                        />
                      </th>
                      <th className="relative w-[60px] text-left text-lg"></th>
                      <th className="relative w-[103px] text-left text-lg">
                        <input
                          type="text"
                          className="h-[40px] w-[103px] text-right rounded-md px-2 pr-[26px] text-sm"
                          value={purchaseOrder[0]?.roomCharge}
                          onClick={() => {
                            setIsCalculatorSelect(5);
                            setIsCalculator(true);
                          }}
                          readOnly
                        />
                        <p className="absolute bottom-[30.5px] text-sm left-[90px] opacity-60">
                          円
                        </p>
                      </th>
                      <th className="w-[210px] flex text-left text-sm"></th>
                      <th className="w-[80px] text-center text-lg">
                        <input
                          type="text"
                          className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                          value={purchaseOrder[0]?.startTime}
                          onClick={() => {
                            setIsCalculatorSelect(4);
                            purchaseOrder[0].isTimeCalculator = true;
                          }}
                          readOnly
                        />
                      </th>
                      <th className="w-[80px] text-center text-lg">
                        <input
                          type="text"
                          className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                          value={purchaseOrder[0]?.endTime}
                          onClick={() => {
                            setIsCalculatorSelect(5);
                            purchaseOrder[0].isTimeCalculator = true;
                          }}
                          readOnly
                        />
                      </th>
                      <th className="w-[20px] text-center text-sm">
                        {checker()}
                      </th>
                      <th className="w-[130px] text-center items-center h-[80px] flex text-sm">
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
                            purchaseOrder[0].orderExtension = checker();
                          }}
                        >
                          <Border
                            className="mr-1 w-[3.8rem]"
                            size="px-2 text-red-700 flex justify-center items-center align-middle"
                            natural
                            stroke="md"
                          >
                            <div className="flex justify-center items-center h-full mt-[-2px] mr-[1px]">
                              -
                            </div>
                            <span>30</span>
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
                            purchaseOrder[0].orderExtension = checker();
                          }}
                        >
                          <Border
                            className="w-[3.8rem]"
                            size="px-2 text-blue-700 flex justify-center items-center align-middle"
                            natural
                            stroke="md"
                          >
                            <div className="flex justify-center items-center h-full mt-[-3px]">
                              +
                            </div>
                            <span>30</span>
                          </Border>
                        </div>
                      </th>
                      <th className="w-[80px] text-center text-sm"></th>
                      <th className="w-[20px] text-center text-sm">
                        <div
                          className="flex"
                          onClick={() => {
                            purchaseOrder[0].isRoomCharge = false;
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
                      </th>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </Border>
            <Border
              className="my-2 h-[49%] w-full"
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
                    <th className="w-[120px] text-left text-accent">
                      セット内容
                    </th>
                    <th className="w-[60px] text-left text-accent">
                      セット時間
                    </th>
                    <th className="w-[103px] text-left text-accent">料金</th>
                    <th className="w-[210px] text-left text-accent">区分</th>
                    <th className="w-[80px] text-center text-accent">
                      開始時間
                    </th>
                    <th className="w-[80px] text-center text-accent">
                      退店時間
                    </th>
                    <th className="w-[20px] text-left text-accent">延長数</th>
                    <th className="w-[130px] text-center text-accent">延長</th>
                    <th className="min-w-[3.65em] text-left text-accent">
                      在店/退店
                    </th>
                    <th className="pl-[12px] text-left text-accent">削除</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder[0]?.cast?.map((cast: any, index: any) => {
                    return (
                      <tr className="h-[80px]" key={index}>
                        <th className="w-[20px] text-center text-lg">
                          <input
                            type="checkbox"
                            className="mt-[8px] h-[20px] w-[20px]"
                          />
                        </th>
                        <th className="w-[120px] text-left text-sm">
                          <select className="h-[40px] w-[120px] rounded-md text-left px-1 text-sm">
                            <option>{cast.split("##")[0]}</option>
                          </select>
                        </th>
                        <th className="relative w-[60px] text-left text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[60px] text-right rounded-md px-1 pr-[27px] text-sm"
                            value={0}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              setIsCalculator(true);
                            }}
                            readOnly
                          />
                          <p className="absolute bottom-[30.5px] text-sm left-[46px] opacity-60">
                            分
                          </p>
                        </th>
                        <th className="relative w-[103px] text-left text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[103px] text-right rounded-md px-2 pr-[26px] text-sm"
                            value={cast.split("##")[1]}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              setIsCalculator(true);
                            }}
                            readOnly
                          />
                          <p className="absolute bottom-[30.5px] text-sm left-[90px] opacity-60">
                            {cast.isTax ? "込" : "円"}
                          </p>
                        </th>
                        <th className="w-[210px] flex text-left text-sm"></th>
                        <th className="w-[80px] text-center text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                            value={purchaseOrder[0]?.startTime}
                            onClick={() => {
                              setIsCalculatorSelect(4);
                              purchaseOrder[0].isTimeCalculator = true;
                            }}
                            readOnly
                          />
                        </th>
                        <th className="w-[80px] text-center text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                            value={purchaseOrder[0]?.endTime}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              purchaseOrder[0].isTimeCalculator = true;
                            }}
                            readOnly
                          />
                        </th>
                        <th className="w-[20px] text-center text-sm">
                          {checker()}
                        </th>
                        <th className="w-[130px] text-center items-center h-[80px] flex text-sm">
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
                              purchaseOrder[0].orderExtension = checker();
                            }}
                          >
                            <Border
                              className="mr-1 w-[3.8rem]"
                              size="px-2 text-red-700 flex justify-center items-center align-middle"
                              natural
                              stroke="md"
                            >
                              <div className="flex justify-center items-center h-full mt-[-2px] mr-[1px]">
                                -
                              </div>
                              <span>30</span>
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
                              purchaseOrder[0].orderExtension = checker();
                            }}
                          >
                            <Border
                              className="w-[3.8rem]"
                              size="px-2 text-blue-700 flex justify-center items-center align-middle"
                              natural
                              stroke="md"
                            >
                              <div className="flex justify-center items-center h-full mt-[-3px]">
                                +
                              </div>
                              <span>30</span>
                            </Border>
                          </div>
                        </th>
                        <th className="w-[80px] text-center text-sm">
                          <Border natural stroke="md">
                            <p className="text-red-700">退店</p>
                          </Border>
                        </th>
                        <th className="w-[20px] text-center text-sm">
                          <div className="flex">
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
                        </th>
                      </tr>
                    );
                  })}
                  {purchaseOrder[0].orderCast?.map((cast: any, index: any) => {
                    return (
                      <tr className="h-[80px]" key={index}>
                        <th className="w-[20px] text-center text-lg">
                          <input
                            type="checkbox"
                            className="mt-[8px] h-[20px] w-[20px]"
                          />
                        </th>
                        <th className="w-[120px] text-left text-sm">
                          <select className="h-[40px] w-[120px] rounded-md text-left px-1 text-sm">
                            <option>{cast.title}</option>
                          </select>
                        </th>
                        <th className="relative w-[60px] text-left text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[60px] text-right rounded-md px-1 pr-[27px] text-sm"
                            value={0}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              setIsCalculator(true);
                            }}
                            readOnly
                          />
                          <p className="absolute bottom-[30.5px] text-sm left-[46px] opacity-60">
                            分
                          </p>
                        </th>
                        <th className="relative w-[103px] text-left text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[103px] text-right rounded-md px-2 pr-[26px] text-sm"
                            value={cast.price}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              setIsCalculator(true);
                            }}
                            readOnly
                          />
                          <p className="absolute bottom-[30.5px] text-sm left-[90px] opacity-60">
                            {cast.isTax ? "込" : "円"}
                          </p>
                        </th>
                        <th className="w-[210px] flex text-left text-sm"></th>
                        <th className="w-[80px] text-center text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                            value={purchaseOrder[0]?.startTime}
                            onClick={() => {
                              setIsCalculatorSelect(4);
                              purchaseOrder[0].isTimeCalculator = true;
                            }}
                            readOnly
                          />
                        </th>
                        <th className="w-[80px] text-center text-lg">
                          <input
                            type="text"
                            className="h-[40px] w-[70px] text-center rounded-md px-2 text-sm"
                            value={purchaseOrder[0]?.endTime}
                            onClick={() => {
                              setIsCalculatorSelect(5);
                              purchaseOrder[0].isTimeCalculator = true;
                            }}
                            readOnly
                          />
                        </th>
                        <th className="w-[20px] text-center text-sm">
                          {checker()}
                        </th>
                        <th className="w-[130px] text-center items-center h-[80px] flex text-sm">
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
                              purchaseOrder[0].orderExtension = checker();
                            }}
                          >
                            <Border
                              className="mr-1 w-[3.8rem]"
                              size="px-2 text-red-700 flex justify-center items-center align-middle"
                              natural
                              stroke="md"
                            >
                              <div className="flex justify-center items-center h-full mt-[-2px] mr-[1px]">
                                -
                              </div>
                              <span>30</span>
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
                              purchaseOrder[0].orderExtension = checker();
                            }}
                          >
                            <Border
                              className="w-[3.8rem]"
                              size="px-2 text-blue-700 flex justify-center items-center align-middle"
                              natural
                              stroke="md"
                            >
                              <div className="flex justify-center items-center h-full mt-[-3px]">
                                +
                              </div>
                              <span>30</span>
                            </Border>
                          </div>
                        </th>
                        <th className="w-[80px] text-center text-sm">
                          <Border natural stroke="md">
                            <p className="text-red-700">退店</p>
                          </Border>
                        </th>
                        <th className="w-[20px] text-center text-sm">
                          <div className="flex">
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
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Border>
          </Content>
        </div>
      </motion.div>
    </>
  );
}