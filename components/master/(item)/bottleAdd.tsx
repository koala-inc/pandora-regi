import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Border2 from "@/components/templates/border";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import Toggle from "@/components/templates/toggle4";
import { RequestDocument } from "graphql-request";
import client from "@/connection";
import { searchCategory } from "@/gqls/query/category";
import useSWR, { preload } from "swr";
import { createBottle, updateBottle } from "@/gqls/mutation/bottle";
import { searchBottle } from "@/gqls/query/bottle";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function BottleAdd() {
  const kikan = [
    {
      prefCode: 1,
      prefName: "焼酎",
    },
    {
      prefCode: 2,
      prefName: "シャンパン",
    },
    {
      prefCode: 3,
      prefName: "ワイン",
    },
    {
      prefCode: 4,
      prefName: "日本酒",
    },
    {
      prefCode: 5,
      prefName: "ウイスキー",
    },
    {
      prefCode: 6,
      prefName: "ブランデー",
    },
    {
      prefCode: 7,
      prefName: "その他",
    },
  ];

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);
  preload(searchBottle, fetcher);

  const searchData = useSWR<any>(searchBottle, fetcher);
  const searchData2 = useSWR<any>(searchCategory, fetcher);
  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});

  const createData = useSWR<any>(createBottle, fetcher);
  const updateData = useSWR<any>(updateBottle, fetcher);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          rounded="rounded-md border-white"
          size="p-4 flex flex-col min-h-[170px] overflow-scroll"
          black
        >
          <p className="w-full text-left">ボトルを検索</p>
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
                ボトル名
              </label>
              <input
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="ボトル名を入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return { ...searchForm, name: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                小カテゴリ
              </label>
              <select
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      item_category_id: Number(e.target.value),
                    };
                  });
                }}
              >
                {searchData2?.data?.category[0]?.store_category[0]?.category?.map(
                  (category: any, index: any) => {
                    if (
                      category.category_revision.parent_id != 0 &&
                      category.category_revision.name != ""
                    ) {
                      return (
                        <option
                          key={index}
                          value={category.category_revision.item_category_id}
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
                ボトル種別
              </label>
              <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                {kikan.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              className="ml-auto mr-4 flex flex-col justify-end"
              onClick={() => {
                searchData.mutate(
                  () =>
                    client.request(searchBottle, {
                      ...searchForm,
                      ...defaultVariables,
                    }),
                  {
                    populateCache: true,
                    revalidate: false,
                  }
                );
              }}
            >
              <Border2
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
              </Border2>
            </div>
            <div
              className="mr-4 flex flex-col justify-end"
              onClick={() => {
                setSearchForm(() => {});
                searchData.mutate(
                  () =>
                    client.request(searchBottle, {
                      ...defaultVariables,
                    }),
                  {
                    populateCache: true,
                    revalidate: false,
                  }
                );
              }}
            >
              <Border2
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
              </Border2>
            </div>
          </div>
        </Border>
        <Border
          className="my-2 w-full"
          rounded="rounded-md border-white"
          size="p-4 flex flex-col min-h-[calc(98dvh-240px)] overflow-scroll"
          black
        >
          <table className="table table-xs fixed z-10 -mt-[16px] h-[45px] w-[94%] rounded-none bg-neutral-900">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom">ID</th>
                <th className="w-[15em] align-bottom">ボトル名</th>
                <th className="w-[15em] align-bottom">小カテゴリ</th>
                <th className="w-[10em] align-bottom">ボトル種別</th>
                <th className="w-[10em] align-bottom">キッチン送信</th>
                <th className="w-[10em] align-bottom">原価</th>
                <th className="w-[10em] align-bottom">料金</th>
                <th className="w-[10em] align-bottom">ボトル期限</th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
          </table>
          <table className="table table-xs mt-5">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom"></th>
                <th className="w-[15em] align-bottom"></th>
                <th className="w-[15em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[10em] align-bottom"></th>
                <th className="w-[5em] align-bottom">
                  <label></label>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchData?.data?.bottle[0]?.store_bottle[0]?.bottle?.map(
                (bottle: any, index: any) => {
                  return (
                    <tr key={index}>
                      <th>{bottle.bottle_revision.item_code}</th>
                      <th>{bottle.bottle_revision.name}</th>
                      <th>
                        {searchData2?.data?.category[0]?.store_category[0]?.category?.map(
                          (category: any, index: any) => {
                            if (
                              category.category_revision.item_category_id ==
                              bottle.bottle_revision.item_category_id
                            ) {
                              return <>{category.category_revision.name}</>;
                            }
                          }
                        )}
                      </th>
                      <th>-</th>
                      <th>-</th>
                      <th>{bottle.bottle_revision.cost}</th>
                      <th>{bottle.bottle_revision.price}</th>
                      <th>-</th>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setUpdateForm(() => bottle);
                            setUpdateModal(true);
                          }}
                        >
                          編集
                        </button>
                      </th>
                    </tr>
                  );
                }
              )}
            </tbody>
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
            <p className="w-full text-left">新規ボトル登録</p>
            <div className="flex w-full flex-wrap">
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">ID</label>
                <input
                  type="number"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="IDを入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        item_code: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.item_code || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  ボトル名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="ボトル名を入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        name: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.name || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  小カテゴリ
                </label>
                <select
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        item_category_id: Number(e.target.value),
                      };
                    });
                  }}
                  value={createForm?.item_category_id || ""}
                >
                  {searchData2?.data?.category[0]?.store_category[0]?.category?.map(
                    (category: any, index: any) => {
                      if (
                        category.category_revision.parent_id != 0 &&
                        category.category_revision.name != ""
                      ) {
                        return (
                          <option
                            key={index}
                            value={category.category_revision.item_category_id}
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
                  ボトル種別
                </label>
                <select className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm">
                  {kikan.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefName}>
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
                  原価
                </label>
                <input
                  type="text"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="原価を入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        cost: Number(e.target.value),
                      };
                    });
                  }}
                  value={createForm?.cost || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  料金
                </label>
                <input
                  type="text"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="料金を入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        price: Number(e.target.value),
                      };
                    });
                  }}
                  value={createForm?.price || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  ボトル期限
                </label>
                <div>
                  <input
                    type="number"
                    className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                    placeholder="ボトル期限を入力"
                  />
                  ヶ月
                </div>
              </div>
              <div
                className="ml-auto mr-4 flex flex-col justify-end"
                onClick={() => {
                  createData
                    .mutate(
                      () =>
                        client.request(createBottle, {
                          ...createForm,
                          ...defaultVariables,
                        }),
                      {
                        populateCache: true,
                        revalidate: false,
                      }
                    )
                    .then(() => {
                      setCreateForm(() => {});
                      setSearchForm(() => {});
                      searchData
                        .mutate(
                          () =>
                            client.request(searchBottle, {
                              ...defaultVariables,
                            }),
                          {
                            populateCache: true,
                            revalidate: false,
                          }
                        )
                        .then(() => {
                          setAddModal(false);
                        });
                    });
                }}
              >
                <Button natural>登録</Button>
              </div>
            </div>
          </Border>
        </Modal>
      )}
    </>
  );
}
