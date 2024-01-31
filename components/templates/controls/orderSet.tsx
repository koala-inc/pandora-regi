import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import Border2 from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import Button from "../button";
import { useState } from "react";
import Toggle from "../toggle";
import { searchCast } from "@/gqls/query/cast";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";
import Image from "next/image";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="h-[110px] mt-[0px] max-w-[550px]">{children}</SubBorder>
  );
}

function Line({ ml }: { ml?: string }) {
  return (
    <div className={"w-full flex flex-1 justify-between items-center " + ml}>
      {/* <Image src={"/assets/line.svg"} width={26} height={26} alt="" /> */}
      <div className="h-[0.9px] w-[calc(100%-56px)] rounded-full bg-white"></div>
      {/* <Image
        src={"/assets/line.svg"}
        width={26}
        height={26}
        className="rotate-180"
        alt=""
      /> */}
    </div>
  );
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function ControlOrderSet() {
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [order, setOrder] = useState<any>({});
  const [activeTab, setActiveTab] = useState(0);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);
  const [selectCast, setSelectCast] = useState<any>([]);

  const seatAlphabet = [
    {
      prefCode: "A",
      prefName: "A",
    },
    {
      prefCode: "B",
      prefName: "B",
    },
    {
      prefCode: "C",
      prefName: "C",
    },
  ];
  const seatNumber = [
    {
      prefCode: "1",
      prefName: "1",
    },
    {
      prefCode: "2",
      prefName: "2",
    },
    {
      prefCode: "3",
      prefName: "3",
    },
  ];
  const type = [
    {
      prefCode: "なし",
      prefName: "なし",
    },
    {
      prefCode: "外販",
      prefName: "外販",
    },
    {
      prefCode: "案内所",
      prefName: "案内所",
    },
  ];
  const staff = [
    {
      prefCode: "スタッフ１",
      prefName: "スタッフ１",
    },
    {
      prefCode: "スタッフ２",
      prefName: "スタッフ２",
    },
    {
      prefCode: "スタッフ３",
      prefName: "スタッフ３",
    },
  ];

  const callTimeHour = [
    {
      prefCode: "00",
      prefName: "00",
    },
    {
      prefCode: "01",
      prefName: "01",
    },
    {
      prefCode: "02",
      prefName: "02",
    },
    {
      prefCode: "03",
      prefName: "03",
    },
  ];

  const callTimeMinite = [
    {
      prefCode: "00",
      prefName: "00",
    },
    {
      prefCode: "01",
      prefName: "01",
    },
    {
      prefCode: "02",
      prefName: "02",
    },
    {
      prefCode: "03",
      prefName: "03",
    },
  ];

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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-425px)] -translate-y-1/2"
      >
        <ContentHeader>
          <div className="flex items-end rounded-md border border-white bg-black px-8 py-3">
            <div className="flex flex-col justify-end">
              <label className="mb-1 text-xs font-bold text-accent">卓番</label>
              <div className="flex">
                <select className="mr-2 h-[45px] w-[60px] rounded-md bg-black px-2 text-center text-4xl font-bold text-white">
                  {seatAlphabet.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <select className="mr-2 h-[45px] w-[60px] rounded-md bg-black px-2 text-center text-4xl font-bold text-white">
                  {seatNumber.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex">
              <Button natural className={"ml-4 mr-2 w-[8em]"}>
                オーダー伝票
              </Button>
              <Button natural className={"w-[8em]"}>
                復帰
              </Button>
            </div>
          </div>
        </ContentHeader>
        <div className="tabs mt-3">
          <a
            className={`tab-md tab mr-1 w-[7em] rounded-t-xl ${
              activeTab == 0
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(0)}
          >
            -
          </a>
        </div>
        <div className="mt-[-1px] flex min-h-[630px] min-w-[920px] max-w-[calc(100dvw-405px)] flex-wrap rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
          <div className="flex min-h-[100px] min-w-full items-center justify-start overflow-x-scroll rounded-md border border-white bg-black p-4">
            {/* <div
              className={
                "mr-2 flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              20:00~
            </div>
            <div
              className={
                "mr-1 flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              21:00~
            </div>
            <div
              className={
                "mr-1 flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              22:00~
            </div> */}
          </div>
          <div className="flex h-[220px] mt-[-30px] px-2 mb-[30px] flex-wrap py-10 justify-start">
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                区分
              </label>
              <div className="flex">
                <select className="mr-1 h-[45px] w-[7rem] rounded-md px-2 text-xl">
                  {type.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <select className="mr-8 h-[45px] w-[7rem] rounded-md px-2 text-xl">
                  {type.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                販売促進スタッフ
              </label>
              <div className="relative flex">
                <select className="mr-1 h-[45px] w-[10rem] rounded-md px-2 text-xl">
                  {staff.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="mr-8 h-[45px] w-[19rem] rounded-md px-2 text-xl"
                    placeholder="スタッフ"
                  />
                </div>
                {/* <div className="badge badge-info absolute left-[10px] top-[5px] w-[120px] gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  スタッフ名
                </div> */}
              </div>
            </div>
            {/* <div>
              <input type="checkbox" className="checkbox checkbox-md" />
            </div> */}
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                ルームチャージ
              </label>
              <input
                type="number"
                className="mr-4 h-[45px] w-[14rem] rounded-md px-2 text-xl"
                placeholder="チャージ料を入力"
                onChange={(e) => {
                  setOrder((order: any) => {
                    return {
                      ...order,
                      roomCharge: Number(e.target.value),
                    };
                  });
                }}
              />
            </div>
            <hr className="w-full opacity-0" />
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                人数
              </label>
              <input
                type="number"
                defaultValue={0}
                className="mr-4 h-[45px] w-[6rem] rounded-md px-2 text-xl"
                placeholder="人数を入力"
                onChange={(e) => {
                  setOrder((order: any) => {
                    return {
                      ...order,
                      num: Number(e.target.value),
                    };
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                セット時間
              </label>
              <input
                type="number"
                defaultValue={0}
                className="mr-4 h-[45px] w-[6rem] rounded-md px-2 text-xl"
                placeholder="時間を入力"
                onChange={(e) => {
                  setOrder((order: any) => {
                    return {
                      ...order,
                      setTime: Number(e.target.value),
                    };
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                料金
              </label>
              <input
                type="number"
                className="mr-4 h-[45px] w-[12rem] rounded-md px-2 text-xl"
                placeholder="料金を入力"
                onChange={(e) => {
                  setOrder((order: any) => {
                    return {
                      ...order,
                      price: Number(e.target.value),
                    };
                  });
                }}
              />
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <label className="mt-3 mb-1 text-xs font-bold text-accent">
                  セット開始時間
                </label>
                <input
                  type="time"
                  className="mr-4 h-[45px] rounded-md px-2 text-xl"
                  onChange={(e) => {
                    setOrder((order: any) => {
                      return {
                        ...order,
                        startTime: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <p className="text-sm mr-4 mt-[40px]">〜</p>
              <div className="flex flex-col">
                <label className="mt-3 mb-1 text-xs font-bold text-accent">
                  終了時間
                </label>
                <input
                  type="time"
                  className="mr-8 h-[45px] rounded-md px-2 text-xl"
                  onChange={(e) => {
                    setOrder((order: any) => {
                      return {
                        ...order,
                        endTime: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 mb-1 text-xs font-bold text-accent">
                コール時間
              </label>
              <div className="flex">
                <Toggle />
                <input
                  type="time"
                  className="ml-4 mr-4 h-[45px] rounded-md px-2 text-xl"
                  onChange={(e) => {
                    setOrder((order: any) => {
                      return {
                        ...order,
                        callTime: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-6 flex justify-center mt-[-30px] ml-[20px] opacity-50">
            <Line />
          </div>
          <div className="flex w-full justify-around">
            <div className="flex flex-col">
              <p className="mb-1 text-xs font-bold text-accent">指名種</p>
              <div className="flex h-[235px] flex-col overflow-scroll rounded-md border border-white bg-black p-4">
                <Button className="min-w-[5rem]" natural>
                  本指
                </Button>
                <Button className="mt-2 min-w-[5rem]" natural>
                  同伴
                </Button>
                <Button className="mt-2 min-w-[5rem]" natural>
                  場内
                </Button>
              </div>
            </div>
            <div className="mx-4 flex flex-col">
              <p className="mb-1 text-xs font-bold text-accent">キャスト検索</p>
              <div className="mt-4 flex w-[300px]">
                <Button className="min-w-[5rem]" natural>
                  出勤
                </Button>
                <Button className="ml-3 min-w-[5rem]" natural>
                  全て
                </Button>
              </div>
              <div className="mt-6 flex flex-col rounded-md border border-white bg-black p-5">
                <div className="flex justify-around">
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    あ
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    か
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    さ
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    た
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    な
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    は
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    ま
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    や
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    ら
                  </div>
                  <div
                    className={
                      "m-1 flex cursor-pointer items-center justify-center rounded-md bg-natural p-3 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    わ
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-2 flex flex-col">
              <p className="mb-1 text-xs font-bold text-accent">キャスト検索</p>
              <div className="flex max-h-[235px] w-[260px] flex-wrap justify-center overflow-scroll rounded-md border border-white bg-black p-2">
                {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
                  (cast: any, index: any) => {
                    if (cast.leaving_date == null) {
                      return (
                        <div key={index}>
                          {cast.cast_code != 0 && (
                            <div
                              className={
                                "m-2 flex h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] px-1 py-2 text-xs leading-4 tracking-wider"
                              }
                              onClick={() => {
                                setSelectCast((selectCast: any) => [
                                  ...selectCast,
                                  cast.name,
                                ]);
                                setOrder((order: any) => {
                                  return {
                                    ...order,
                                    cast: [...selectCast, cast.name],
                                  };
                                });
                              }}
                            >
                              {cast.name}
                            </div>
                          )}
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
            <div className="mx-4 flex flex-col">
              <p className="mb-1 text-xs font-bold text-accent">選択キャスト</p>
              <div className="flex max-h-[200px] min-h-[200px] w-[350px] flex-col justify-start overflow-scroll rounded-md border border-white bg-black p-1">
                <div className="mt-1 flex px-2 text-xs text-accent">
                  <p className="w-[180px]">キャスト名</p>
                  <p className="mx-2 h-[25px] w-[30px] rounded-md text-center">
                    個数
                  </p>
                  <p className="ml-5 h-[25px] w-[70px] rounded-md px-2">料金</p>
                </div>
                {selectCast.map((cast: any, index: any) => (
                  <div className="my-1 flex px-2" key={index}>
                    <p className="w-[180px]">{cast}</p>
                    <input
                      type="text"
                      className="mx-2 h-[25px] w-[30px] rounded-md text-center"
                      defaultValue={1}
                    />
                    <input
                      type="text"
                      className="ml-5 h-[25px] w-[70px] rounded-md px-2 text-right"
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-end p-4">
                <div className="mr-4">
                  <Border2
                    rounded="rounded-full"
                    size="h-[36px] w-[36px] p-[6px] bg-reset"
                  >
                    <Image
                      src={"/assets/reset.svg"}
                      width={26}
                      height={26}
                      className="!h-full !w-full"
                      alt=""
                    />
                  </Border2>
                </div>
                <div
                  onClick={() => {
                    setPurchaseOrder([...purchaseOrder, order]);
                  }}
                >
                  <Border2
                    complate
                    rounded="rounded-full"
                    size="h-[36px] w-[36px] p-[6px]"
                  >
                    <Image
                      src={"/assets/complate.svg"}
                      width={26}
                      height={26}
                      className="!h-full !w-full"
                      alt=""
                    />
                  </Border2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
