import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import Toggle from "@/components/templates/toggle4";
import { RequestDocument } from "graphql-request";
import client from "@/connection";
import { searchCategory } from "@/gqls/query/category";
import useSWR, { preload } from "swr";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderAdd() {
  const [addModal, setAddModal] = useState(false);

  const baitais = [
    {
      prefCode: 1,
      prefName: "媒体A",
    },
    {
      prefCode: 2,
      prefName: "媒体A",
    },
    {
      prefCode: 3,
      prefName: "媒体C",
    },
  ];

  const syokai = [
    {
      prefCode: 1,
      prefName: "ドリンク",
    },
    {
      prefCode: 2,
      prefName: "ピッチャー",
    },
    {
      prefCode: 3,
      prefName: "割り物",
    },
    {
      prefCode: 4,
      prefName: "フード",
    },
    {
      prefCode: 5,
      prefName: "サービス",
    },
  ];

  const kikan = [
    {
      prefCode: 1,
      prefName: "割り物",
    },
  ];

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const searchData = useSWR<any>(searchCategory, fetcher);

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          rounded="rounded-md border-white"
          size="p-4 flex flex-col min-h-[170px] overflow-scroll"
          black
        >
          <p className="w-full text-left">オーダーを検索</p>
          <div className="flex w-full flex-wrap">
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">ID</label>
              <input
                type="number"
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="IDを入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                オーダー名
              </label>
              <input
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="オーダー名を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                小カテゴリ
              </label>
              <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                {searchData?.data?.category[0]?.store_category[0]?.category?.map(
                  (category: any, index: any) => {
                    if (
                      category.category_revision.parent_id != 0 &&
                      category.category_revision.name != ""
                    ) {
                      return (
                        <option
                          key={index}
                          value={category.category_revision.name}
                        >
                          {category.category_revision.name}
                        </option>
                      );
                    }
                  }
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                オーダー種別
              </label>
              <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                {syokai.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="ml-auto mr-4 flex flex-col justify-end">
              <Button natural>検索</Button>
            </div>
            <div className="mr-4 flex flex-col justify-end">
              <Button natural>クリア</Button>
            </div>
          </div>
        </Border>
        <Border
          className="my-2 w-full"
          rounded="rounded-md border-white"
          size="p-4 flex flex-col min-h-[calc(98dvh-240px)] overflow-scroll"
          black
        >
          <table className="table table-xs fixed z-10 -mt-[17px] h-[45px] w-[94%] rounded-none bg-neutral-900">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom">ID</th>
                <th className="w-[15em] align-bottom">オーダー名</th>
                <th className="w-[15em] align-bottom">小カテゴリ</th>
                <th className="w-[10em] align-bottom">オーダー種別</th>
                <th className="w-[10em] align-bottom">キッチン送信</th>
                <th className="w-[10em] align-bottom">料金</th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
          </table>
          <table className="table table-xs mt-2 min-h-[500px]">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom"></th>
                <th className="w-[15em] align-bottom"></th>
                <th className="w-[15em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </Border>
      </Control>
      <nav
        className="absolute bottom-[15px] right-[15px] z-10 cursor-pointer"
        onClick={() => setAddModal(true)}
      >
        <Border rounded="rounded-full" size="h-[50px] w-[50px] p-[12px]">
          <Image
            src={"/assets/add.svg"}
            width={26}
            height={26}
            className="!h-full !w-full"
            alt=""
          />
        </Border>
      </nav>
      {addModal && (
        <Modal setModal={setAddModal}>
          <Border className="w-full" size="p-4 flex flex-col" black>
            <p className="w-full text-left">新規オーダー登録</p>
            <div className="flex w-full flex-wrap">
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">ID</label>
                <input
                  type="number"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="IDを入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  オーダー名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="オーダー名を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  小カテゴリ
                </label>
                <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                  {searchData?.data?.category[0]?.store_category[0]?.category?.map(
                    (category: any, index: any) => {
                      if (
                        category.category_revision.parent_id != 0 &&
                        category.category_revision.name != ""
                      ) {
                        return (
                          <option
                            key={index}
                            value={category.category_revision.name}
                          >
                            {category.category_revision.name}
                          </option>
                        );
                      }
                    }
                  )}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  オーダー種別
                </label>
                <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                  {syokai.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  キッチン送信
                </label>
                <Toggle />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  料金
                </label>
                <input
                  type="number"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="料金を入力"
                />
              </div>

              <div className="ml-auto mr-4 flex flex-col justify-end">
                <Button natural>登録</Button>
              </div>
            </div>
          </Border>
        </Modal>
      )}
    </>
  );
}
