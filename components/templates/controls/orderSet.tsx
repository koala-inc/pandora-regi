import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "../button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import { useState } from "react";
import Toggle from "../toggle";
import { searchCast } from "@/gqls/query/cast";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] max-w-[550px]">{children}</SubBorder>;
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function ControlOrderSet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [activeTab, setActiveTab] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) => alert(JSON.stringify(data));

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);

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
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <ContentHeader>
          <div className="flex items-end rounded-md border border-white bg-black px-8 py-4">
            <div className="flex flex-col justify-end">
              <label className="mt-3 text-xs font-bold text-accent">卓番</label>
              <div className="flex">
                <select className="mr-2 h-[60px] w-[60px] rounded-md bg-black px-2 text-center text-4xl font-bold text-white">
                  {seatAlphabet.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <select className="mr-2 h-[60px] w-[60px] rounded-md bg-black px-2 text-center text-4xl font-bold text-white">
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
        <div className="mt-[-1px] flex min-h-[520px] min-w-[920px] max-w-[calc(100dvw-405px)] flex-wrap rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
          <div className="flex min-h-[150px] min-w-full items-center justify-start overflow-x-scroll rounded-md border border-white bg-black p-4">
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
          <div className="flex flex-wrap">
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">区分</label>
              <div className="flex">
                <select className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm">
                  {type.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <select className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm">
                  {staff.map((pref) => {
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
              <label className="mt-3 text-xs font-bold text-accent">
                販売促進スタッフ
              </label>
              <div className="relative flex">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="mr-2 h-[30px] w-[12rem] rounded-md px-2 text-sm"
                    placeholder="スタッフ"
                  />
                </div>
                <div className="badge badge-info absolute left-[10px] top-[5px] w-[120px] gap-2">
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
                </div>
              </div>
            </div>
            {/* <div>
              <input type="checkbox" className="checkbox checkbox-md" />
            </div> */}
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                ルームチャージ
              </label>
              <input
                type="number"
                {...register("age")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="チャージ料を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">人数</label>
              <input
                type="number"
                {...register("age")}
                defaultValue={1}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="人数を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                セット時間
              </label>
              <input
                type="number"
                {...register("age")}
                defaultValue={60}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="時間を入力"
              />
              <p>分</p>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">料金</label>
              <input
                type="number"
                {...register("age")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="料金を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                セット開始時間
              </label>
              <input
                type="date"
                {...register("birthday")}
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
              />
              <p>〜</p>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                終了時間
              </label>
              <input
                type="date"
                {...register("birthday")}
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
              />
            </div>
            <Toggle />
            <div className="flex flex-col">
              <select
                {...register("baitai")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
              >
                {callTimeHour.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
              <select
                {...register("baitai")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
              >
                {callTimeMinite.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col">
              <p className="text-xs font-bold text-accent">指名種</p>
              <div className="flex flex-col rounded-md border border-white bg-black p-4">
                <Button className="min-w-[5rem]" natural>
                  本指
                </Button>
                <Button className="min-w-[5rem]" natural>
                  同伴
                </Button>
                <Button className="min-w-[5rem]" natural>
                  場内
                </Button>
              </div>
            </div>
            <div className="mx-4 flex flex-col">
              <p className="text-xs font-bold text-accent">キャスト検索</p>
              <div className="flex">
                <Button className="min-w-[5rem]" natural>
                  出勤
                </Button>
                <Button className="min-w-[5rem]" natural>
                  全て
                </Button>
              </div>
              <div className="mt-4 flex flex-col">
                <div className="flex justify-around">
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    あ
                  </div>
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    は
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    か
                  </div>
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    ま
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    さ
                  </div>
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    や
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    た
                  </div>
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    ら
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    な
                  </div>
                  <div
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md bg-natural p-2 text-2xl leading-4 tracking-wider text-accent"
                    }
                  >
                    わ
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
                (cast: any) => {
                  if (cast.leaving_date == null) {
                    return (
                      <>
                        {cast.cast_code != 0 && (
                          <div
                            className={
                              "mx-1 my-2 flex w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] px-1 py-4 text-xs leading-4 tracking-wider"
                            }
                            onClick={() => {}}
                          >
                            {cast.name}
                          </div>
                        )}
                      </>
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
