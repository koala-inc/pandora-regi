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

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

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
                value={searchForm?.name || ""}
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
                value={searchForm?.item_category_id || 0}
              >
                <option value={0}>選択してください。</option>
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
              <select
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      type:
                        e.target.value == "焼酎"
                          ? 1
                          : e.target.value == "シャンパン"
                          ? 2
                          : e.target.value == "ブランデー"
                          ? 3
                          : e.target.value == "ウイスキー"
                          ? 4
                          : e.target.value == "日本酒"
                          ? 5
                          : e.target.value == "ワイン"
                          ? 6
                          : e.target.value == "その他"
                          ? 7
                          : 0,
                    };
                  });
                }}
                value={
                  Number(searchForm?.type) == 1
                    ? "焼酎"
                    : Number(searchForm?.type) == 2
                    ? "シャンパン"
                    : Number(searchForm?.type) == 3
                    ? "ブランデー"
                    : Number(searchForm?.type) == 4
                    ? "ウイスキー"
                    : Number(searchForm?.type) == 5
                    ? "日本酒"
                    : Number(searchForm?.type) == 6
                    ? "ワイン"
                    : Number(searchForm?.type) == 7
                    ? "その他"
                    : "-" || 0
                }
              >
                <option value={0}>選択してください。</option>
                {kikan.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefName}>
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
          size="p-4 flex flex-col min-h-[calc(98dvh-240px)] max-h-[calc(98dvh-240px)] overflow-scroll"
          black
        >
          <table className="table table-xs fixed z-10 -mt-[16px] h-[45px] w-[94%] rounded-none bg-neutral-900">
            {/* head */}
            <thead>
              <tr className="text-accent">
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
                      <th>
                        {Number(bottle.bottle_revision.type) == 1
                          ? "焼酎"
                          : Number(bottle.bottle_revision.type) == 2
                          ? "シャンパン"
                          : Number(bottle.bottle_revision.type) == 3
                          ? "ブランデー"
                          : Number(bottle.bottle_revision.type) == 4
                          ? "ウイスキー"
                          : Number(bottle.bottle_revision.type) == 5
                          ? "日本酒"
                          : Number(bottle.bottle_revision.type) == 6
                          ? "ワイン"
                          : Number(bottle.bottle_revision.type) == 7
                          ? "その他"
                          : "-"}
                      </th>
                      <th>
                        {bottle.bottle_revision.is_notice_kitchen
                          ? "有効"
                          : "無効"}
                      </th>
                      <th>{bottle.bottle_revision.cost?.toLocaleString()}円</th>
                      <th>
                        {bottle.bottle_revision.price?.toLocaleString()}円
                      </th>
                      <th>
                        {bottle.bottle_revision.keep_expiration_day || 0}日
                      </th>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setUpdateForm(() => {
                              return {
                                ...bottle.bottle_revision,
                                id: bottle.id,
                              };
                            });
                            setUpdateModal(true);
                            setIsChecked(
                              bottle.bottle_revision.is_notice_kitchen
                            );
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
        <Border2 rounded="rounded-full" size="h-[50px] w-[50px] p-[12px]">
          <Image
            src={"/assets/add.svg"}
            width={26}
            height={26}
            className="!h-full !w-full"
            alt=""
          />
        </Border2>
      </nav>
      {addModal && (
        <Modal setModal={setAddModal}>
          <Border className="w-full" size="p-4 flex flex-col" black>
            <p className="w-full text-left">新規ボトル登録</p>
            <div className="flex w-full flex-wrap">
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
                >
                  <option selected disabled>
                    選択してください。
                  </option>
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
                <select
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      let type = 0;
                      switch (e.target.value) {
                        case "焼酎":
                          type = 1;
                          break;
                        case "シャンパン":
                          type = 2;
                          break;
                        case "ブランデー":
                          type = 3;
                          break;
                        case "ウイスキー":
                          type = 4;
                          break;
                        case "日本酒":
                          type = 5;
                          break;
                        case "ワイン":
                          type = 6;
                          break;
                        case "その他":
                          type = 7;
                          break;
                      }
                      return {
                        ...createForm,
                        type: type,
                      };
                    });
                  }}
                >
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
                <Toggle isChecked={isChecked} setIsChecked={setIsChecked} />
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
                    onChange={(e) => {
                      setCreateForm((createForm: any) => {
                        return {
                          ...createForm,
                          keep_expiration_day: Number(e.target.value),
                        };
                      });
                    }}
                    value={createForm?.keep_expiration_day || ""}
                  />
                  日
                </div>
              </div>
              <div
                className="ml-auto mr-4 flex flex-col justify-end"
                onClick={() => {
                  client
                    .request(createBottle, {
                      ...createForm,
                      is_notice_kitchen: isChecked ? 1 : 0,
                      ...defaultVariables,
                    })
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
                <Border2
                  complate
                  rounded="rounded-full"
                  size="h-[32px] w-[32px] p-[4px]"
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
          </Border>
        </Modal>
      )}
      {updateModal && (
        <Modal setModal={setUpdateModal}>
          <Border className="w-full" size="p-4 flex flex-col" black>
            <p className="w-full text-left">ボトル編集</p>
            <div className="flex w-full flex-wrap">
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  ボトル名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="ボトル名を入力"
                  onChange={(e) => {
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        name: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.name || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  小カテゴリ
                </label>
                <select
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  defaultValue={updateForm?.item_category_id}
                  onChange={(e) => {
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
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
                <select
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setUpdateForm((updateForm: any) => {
                      let type = 0;
                      switch (e.target.value) {
                        case "焼酎":
                          type = 1;
                          break;
                        case "シャンパン":
                          type = 2;
                          break;
                        case "ブランデー":
                          type = 3;
                          break;
                        case "ウイスキー":
                          type = 4;
                          break;
                        case "日本酒":
                          type = 5;
                          break;
                        case "ワイン":
                          type = 6;
                          break;
                        case "その他":
                          type = 7;
                          break;
                      }
                      return {
                        ...updateForm,
                        type: type,
                      };
                    });
                  }}
                  defaultValue={
                    Number(updateForm?.type) == 1
                      ? "焼酎"
                      : Number(updateForm?.type) == 2
                      ? "シャンパン"
                      : Number(updateForm?.type) == 3
                      ? "ブランデー"
                      : Number(updateForm?.type) == 4
                      ? "ウィスキー"
                      : Number(updateForm?.type) == 5
                      ? "日本酒"
                      : Number(updateForm?.type) == 6
                      ? "ワイン"
                      : Number(updateForm?.type) == 7
                      ? "その他"
                      : "-"
                  }
                >
                  <option value={"-"}>-</option>
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
                <Toggle isChecked={isChecked} setIsChecked={setIsChecked} />
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
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        cost: Number(e.target.value),
                      };
                    });
                  }}
                  value={updateForm?.cost || ""}
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
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        price: Number(e.target.value),
                      };
                    });
                  }}
                  value={updateForm?.price || ""}
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
                    onChange={(e) => {
                      setUpdateForm((updateForm: any) => {
                        return {
                          ...updateForm,
                          keep_expiration_day: Number(e.target.value),
                        };
                      });
                    }}
                    value={updateForm?.keep_expiration_day || ""}
                  />
                  日
                </div>
              </div>
              <div
                className="ml-auto mr-4 flex flex-col justify-end"
                onClick={() => {
                  client
                    .request(updateBottle, {
                      id: updateForm.id,
                      name: updateForm.name,
                      item_code: updateForm.item_code,
                      item_category_id: updateForm.item_category_id,
                      price: updateForm.price || 0,
                      cost: updateForm.cost || 0,
                      keep_expiration_day: updateForm.keep_expiration_day || 0,
                      is_notice_kitchen: isChecked ? 1 : 0,
                      type: updateForm.type || 0,
                      ...defaultVariables,
                    })
                    .then(() => {
                      setUpdateForm(() => {});
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
                          setUpdateModal(false);
                        });
                    });
                }}
              >
                <Border2
                  complate
                  rounded="rounded-full"
                  size="h-[32px] w-[32px] p-[4px]"
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
          </Border>
        </Modal>
      )}
    </>
  );
}
