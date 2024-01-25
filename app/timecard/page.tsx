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

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] w-[90%] px-4 py-2">{children}</SubBorder>;
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

  return (
    <main className="relative h-full w-full">
      <Background />
      <Card>
        <div className="flex h-full w-[340px] flex-col font-bold">
          <div className="">
            <a
              className={`tab-lg tab ml-[-4px] mr-2 w-[8em] rounded-t-xl p-0 ${
                activeTab == 0
                  ? "tab-active bg-primary text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => {
                setActiveTab((activeTab) => 0);
              }}
            >
              キャスト
            </a>
            <a
              className={`tab-lg tab ml-[-4px] mr-2 w-[8em] rounded-t-xl p-0 ${
                activeTab == 1
                  ? "tab-active bg-primary text-white"
                  : "tab-lifted bg-secondary text-black"
              }`}
              onClick={() => {
                setActiveTab((activeTab) => 1);
              }}
            >
              スタッフ
            </a>
          </div>
          <div className="my-3 flex rounded-md border-2 border-white bg-black p-3">
            <input
              type="text"
              className="flex w-[50px] items-center justify-center text-center"
              value={datetimeH}
              disabled
            />
            <div className="flex w-[10px] items-center justify-center text-center">
              :
            </div>
            <input
              type="text"
              className="flex w-[50px] items-center justify-center text-center"
              value={datetimeM}
              disabled
            />
            <Button
              className="ml-2 min-w-[8rem]"
              natural
              onClick={() => {
                alert();
                setDatetimeH(format(new Date(), "HH", { locale: ja }));
                setDatetimeM(format(new Date(), "mm", { locale: ja }));
                console.log(datetimeH + datetimeM);
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
          <div className="my-2 flex w-full">
            <Line />
          </div>
          <div className="flex justify-around">
            <Button natural>
              <input type="button" value="あ" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="か" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="さ" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="た" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="な" className="p-1" />
            </Button>
          </div>
          <div className="flex justify-around">
            <Button natural>
              <input type="button" value="は" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="ま" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="や" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="ら" className="p-1" />
            </Button>
            <Button natural>
              <input type="button" value="わ" className="p-1" />
            </Button>
          </div>
          <div className="my-2 flex w-full">
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
      <div className="absolute left-[410px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-450px)] -translate-y-1/2">
        <div>
          <ContentHeader>
            <div className="flex flex-col">
              <div className="flex">
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">予定</p>
                  <p className="font-bold text-white">0</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">実動</p>
                  <p className="font-bold text-white">0</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">未出勤</p>
                  <p className="font-bold text-white">0</p>
                </div>
                <div className="mx-2 flex flex-col">
                  <p className="text-accent">未処理</p>
                  <p className="font-bold text-white">0</p>
                </div>
                <Button natural className={"mx-2 h-full"}>
                  出勤固定
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  中抜け
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  貸出
                </Button>
                <input type="text" className="h-[40px]" />
                <Button natural className={"h-full"}>
                  検索
                </Button>
              </div>
              <div className="flex">
                <div>絞り込み</div>
                <Button natural className={"mx-2 h-full"}>
                  就業中
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  退勤済
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  未処理
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  在籍
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  体入/ヘルプ
                </Button>
                <div>ソート</div>
                <Button natural className={"mx-2 h-full"}>
                  指名
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  50音
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  勤怠
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  遅刻
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  貸出
                </Button>
                <Button natural className={"mx-2 h-full"}>
                  担当
                </Button>
                <Button natural className={"h-full"}>
                  リセット
                </Button>
              </div>
            </div>
          </ContentHeader>
        </div>
        <div>
          <Content>
            <Border
              className="my-2 w-full"
              size="p-4 flex flex-col overflow-scroll"
              black
            >
              <table className="table table-xs mt-2 min-h-[500px]">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-accent">ID</th>
                    <th className="text-accent">指名</th>
                    <th className="text-accent">キャスト名</th>
                    <th className="text-accent">区分</th>
                    <th className="text-accent">予定時間</th>
                    <th className="text-accent">打刻時間</th>
                    <th className="text-thirdary-accent">出勤時間</th>
                    <th className="text-secondary-accent">退勤時間</th>
                    <th className="text-accent">勤怠</th>
                    <th className="text-accent">遅刻</th>
                    <th className="text-accent">担当</th>
                    <th className="text-accent">ステータス</th>
                    <th className="text-accent">処理済み</th>
                    <th>
                      <label>削除</label>
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
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
