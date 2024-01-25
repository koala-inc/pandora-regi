"use client";

// 開発用コンポーネント
import DevTool from "@/components/debug/devTool";

// コンポーネント
import Background from "@/components/parts/background";
import Border from "@/components/templates/border";
import Button from "@/components/templates/button";
import Card from "@/components/templates/card";
import HomeButton from "@/components/templates/homeButton";
import SubBorder from "@/components/templates/subBorder";
import client from "@/connection";
import { searchCast } from "@/gqls/query/cast";
import { format } from "date-fns";
import { RequestDocument } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR, { preload } from "swr";
import { ja } from "date-fns/locale/ja";

function Line({ ml }: { ml?: string }) {
  return (
    <div className={"flex flex-1 justify-between items-center " + ml}>
      <Image src={"/assets/line.svg"} width={26} height={26} alt="" />
      <div className="h-[0.9px] w-[calc(100%-56px)] rounded-full bg-secondary"></div>
      <Image
        src={"/assets/line.svg"}
        width={26}
        height={26}
        className="rotate-180"
        alt=""
      />
    </div>
  );
}

function ContentHeader({
  children,
  activeMenu,
}: {
  children: any;
  activeMenu: number;
}) {
  if (activeMenu != 0) {
    return <SubBorder size="h-[220px] w-[90%] px-4 py-2">{children}</SubBorder>;
  } else {
    return <SubBorder size="h-[180px] w-[90%] px-4 py-2">{children}</SubBorder>;
  }
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function TimeCard() {
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);

  const [datetimeH, setDatetimeH] = useState(
    format(new Date(), "HH", { locale: ja })
  );
  const [datetimeM, setDatetimeM] = useState(
    format(new Date(), "mm", { locale: ja })
  );

  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <main className="relative h-full w-full">
      <Background />
      <Card>
        <div className="relative mt-[30px] flex h-full w-[360px] flex-col rounded-md rounded-tl-none border border-white bg-black p-4 py-0 font-bold">
          <div className="absolute left-[3px] top-[-32px]">
            <a
              className={`tab-lg tab ml-[-4px] mr-2 w-[8em] rounded-t-xl border-[1.3px] border-b-0 !border-white p-0 !opacity-100 ${
                activeTab == 0
                  ? "tab-active bg-black text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => {
                setActiveTab((activeTab) => 0);
              }}
            >
              キャスト
            </a>
            <a
              className={`tab-lg tab ml-[-4px] mr-2 w-[8em] rounded-t-xl border-[1.3px] border-b-0 !border-white p-0 !opacity-100 ${
                activeTab == 1
                  ? "tab-active bg-black text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => {
                setActiveTab((activeTab) => 1);
              }}
            >
              スタッフ
            </a>
          </div>
          <div className="my-6 flex justify-center rounded-md border-2 border-white bg-gray-800 px-2 py-6">
            <input
              type="text"
              className="flex h-[40px] w-[50px] items-center justify-center text-center text-4xl"
              value={datetimeH}
            />
            <div className="flex h-[35px] w-[15px] items-center justify-center text-center text-4xl">
              :
            </div>
            <input
              type="text"
              className="flex h-[40px] w-[50px] items-center justify-center text-center text-4xl"
              value={datetimeM}
            />
            <Button
              className="ml-6 min-w-[6rem]"
              natural
              onClick={() => {
                setDatetimeH(format(new Date(), "HH", { locale: ja }));
                setDatetimeM(format(new Date(), "mm", { locale: ja }));
              }}
            >
              現在時刻
            </Button>
          </div>
          <div className="mb-3 flex justify-around">
            <Button className="min-w-[6rem]" natural>
              在籍
            </Button>
            <Button className="min-w-[6rem]" natural>
              体入/ヘルプ
            </Button>
            <Button className="min-w-[6rem]" natural>
              他店舗ヘルプ
            </Button>
          </div>
          <div className="my-4 flex w-full">
            <Line />
          </div>
          <div className="flex justify-around">
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              あ
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              か
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              さ
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              た
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              な
            </div>
          </div>
          <div className="mt-2 flex justify-around">
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              は
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              ま
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              や
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              ら
            </div>
            <div
              className={
                "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
              }
            >
              わ
            </div>
          </div>
          <div className="my-4 flex w-full">
            <Line />
          </div>
          <div className="flex flex-wrap justify-center">
            {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
              (cast: any) => {
                if (cast.leaving_date == null) {
                  return (
                    <>
                      {cast.cast_code != 0 && (
                        <span
                          className={
                            "mx-1 my-2 flex w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] px-1 py-4 text-xs leading-4 tracking-wider"
                          }
                        >
                          {cast.name}
                        </span>
                      )}
                    </>
                  );
                }
              }
            )}
          </div>
        </div>
      </Card>
      <div className="absolute left-[410px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-425px)] max-w-[calc(100dvw-425px)] -translate-y-1/2">
        <div className="w-[calc(100%+50px)]">
          <ContentHeader activeMenu={activeMenu}>
            <div className="flex flex-col">
              <div className="mb-3 flex items-end">
                <div className="flex rounded-md border border-white bg-black p-2">
                  <div className="mx-2 flex w-[5em] flex-col">
                    <p className="text-center text-accent">予定</p>
                    <p className="text-center font-bold text-white">0</p>
                  </div>
                  <div className="mx-2 flex w-[5em] flex-col">
                    <p className="text-center text-accent">実動</p>
                    <p className="text-center font-bold text-white">0</p>
                  </div>
                  <div className="mx-2 flex w-[5em] flex-col">
                    <p className="text-center text-accent">未出勤</p>
                    <p className="text-center font-bold text-white">0</p>
                  </div>
                  <div className="mx-2 flex w-[5em] flex-col">
                    <p className="text-center text-accent">未処理</p>
                    <p className="text-center font-bold text-white">0</p>
                  </div>
                </div>
                <Button natural className={"mx-2 ml-4 h-full w-[6em]"}>
                  出勤固定
                </Button>
                <Button natural className={"mx-2 h-full w-[6em]"}>
                  中抜け
                </Button>
                <Button natural className={"mx-2 h-full w-[6em]"}>
                  貸出
                </Button>
                <div className="flex flex-col">
                  <p className="mb-1 ml-[14px] text-xs font-bold text-accent">
                    ワード検索
                  </p>
                  <input
                    type="text"
                    className="ml-4 mr-2 h-[40px] rounded-md border border-white"
                  />
                </div>
                <Border
                  rounded="rounded-full"
                  size="h-[32px] w-[32px] p-[4px] bg-search"
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
              <div className="flex">
                <Button
                  natural
                  className={"mx-2 h-full w-[6em]"}
                  onClick={() => {
                    setActiveMenu((activeMenu) => (activeMenu != 1 ? 1 : 0));
                  }}
                >
                  絞り込み
                </Button>
                <Button
                  natural
                  className={"mx-2 mr-4 h-full w-[6em]"}
                  onClick={() => {
                    setActiveMenu((activeMenu) => (activeMenu != 2 ? 2 : 0));
                  }}
                >
                  ソート
                </Button>
                <div
                  className="mt-[-1px] "
                  onClick={() => {
                    setActiveMenu(0);
                  }}
                >
                  <Border
                    rounded="rounded-full"
                    size="h-[32px] w-[32px] p-[4px] bg-reset"
                  >
                    <Image
                      src={"/assets/reset.svg"}
                      width={26}
                      height={26}
                      className="!h-full !w-full"
                      alt=""
                    />
                  </Border>
                </div>
              </div>
              {activeMenu != 0 && (
                <div className="mt-2 flex w-[73%] justify-center rounded-md border border-white bg-black p-2">
                  {activeMenu == 1 && (
                    <>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        就業中
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        退勤済
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        未処理
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        在籍
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        体入/ヘルプ
                      </Button>
                    </>
                  )}
                  {activeMenu == 2 && (
                    <>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        指名
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        50音
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        勤怠
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        遅刻
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        貸出
                      </Button>
                      <Button natural className={"mx-2 h-full w-[8em]"}>
                        担当
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </ContentHeader>
        </div>
        <div className="">
          <Content>
            <Border
              className="my-2 w-full"
              rounded="border-white rounded-md !border-[1px]"
              size="p-4 !items-start min-h-[calc(98dvh-400px)] max-h-[calc(98dvh-400px)] overflow-scroll"
              black
            >
              <table className="table table-xs mt-2">
                {/* head */}
                <thead>
                  <tr>
                    <th className="min-w-[3.65em] text-center text-accent">
                      ID
                    </th>
                    <th className="min-w-[3.65em] text-center text-accent">
                      指名
                    </th>
                    <th className="min-w-[6.65em] text-center text-accent">
                      キャスト名
                    </th>
                    <th className="min-w-[6.65em] text-center text-accent">
                      区分
                    </th>
                    <th className="min-w-[6em] text-center text-accent">
                      予定時間
                    </th>
                    <th className="min-w-[6em] text-center text-accent">
                      打刻時間
                    </th>
                    <th className="min-w-[6em] text-center text-thirdary-accent">
                      出勤時間
                    </th>
                    <th className="min-w-[6em] text-center text-secondary-accent">
                      退勤時間
                    </th>
                    <th className="min-w-[3.65em] text-center text-accent">
                      勤怠
                    </th>
                    <th className="min-w-[6em] text-center text-accent">
                      遅刻
                    </th>
                    <th className="min-w-[6.65em] text-center text-accent">
                      担当
                    </th>
                    <th className="min-w-[13.15em] text-left text-accent">
                      ステータス
                    </th>
                    <th className="min-w-[6.65em] text-center text-accent">
                      処理済み
                    </th>
                    <th>
                      <label>削除</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="min-w-[2em] text-center text-lg">000</th>
                    <th className="min-w-[2em] text-center text-lg"> - </th>
                    <th className="min-w-[4em] text-center text-lg">名前</th>
                    <th className="min-w-[4em] text-center text-lg">在籍</th>
                    <th className="min-w-[3.5em] text-center text-lg opacity-60">
                      20:00
                    </th>
                    <th className="min-w-[3.5em] text-center text-lg opacity-60">
                      20:00
                    </th>
                    <th className="min-w-[3.5em] text-center text-lg">20:00</th>
                    <th className="min-w-[3.5em] text-center text-lg">21:00</th>
                    <th className="min-w-[2em] text-center text-lg">×</th>
                    <th className="min-w-[3.5em] text-center text-lg">15分</th>
                    <th className="min-w-[4em] text-center text-lg"> - </th>
                    <th className="flex min-w-[4em] items-center justify-center text-center text-lg">
                      退勤
                      <Button natural className={"ml-6"}>
                        退勤取消
                      </Button>
                    </th>
                    <th className="min-w-[4em] text-center text-lg">
                      <input
                        type="checkbox"
                        className="mt-[8px] h-[20px] w-[20px]"
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </Border>
          </Content>
        </div>
      </div>
      <HomeButton />
      <DevTool />
    </main>
  );
}
