import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Border2 from "@/components/templates/border";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import Toggle from "@/components/templates/toggle4";
import { RequestDocument } from "graphql-request";
import client from "@/connection";
import { searchCategory } from "@/gqls/query/category";
import useSWR, { preload } from "swr";
import { searchMenu } from "@/gqls/query/menu";
import { createMenu } from "@/gqls/mutation/menu";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function OrderAdd() {
  const [addModal, setAddModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const syokai = [
    {
      prefCode: 1,
      group_code: 2,
      type: 1,
      prefName: "ドリンク",
    },
    {
      prefCode: 2,
      group_code: 2,
      type: 2,
      prefName: "ピッチャー",
    },
    {
      prefCode: 3,
      group_code: 3,
      type: 1,

      prefName: "フード",
    },
    {
      prefCode: 4,
      group_code: 3,
      type: 2,
      prefName: "割り物",
    },
    {
      prefCode: 5,
      group_code: 3,
      type: 3,
      prefName: "サービス",
    },
  ];

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchMenu, fetcher);
  preload(searchCategory, fetcher);

  const searchData = useSWR<any>(searchMenu, fetcher);
  const searchData2 = useSWR<any>(searchCategory, fetcher);

  const [createForm, setCreateForm] = useState<any>({});
  const [searchForm, setSearchForm] = useState<any>({});

  const [updateForm, setUpdateForm] = useState<any>({});

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
          <p className="w-full text-left">オーダーを検索</p>
          <div className="flex w-full flex-wrap">
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
            <div className="mr-4 flex flex-col justify-end">
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
            <tbody>
              {searchData?.data?.menu[0]?.store_menu[0]?.menu?.map(
                (menu: any, index: any) => {
                  return (
                    <tr key={index}>
                      <th>{menu.menu_revision.name}</th>
                      <th>
                        {searchData2?.data?.category[0]?.store_category[0]?.category?.map(
                          (category: any, index: any) => {
                            if (
                              category.category_revision.item_category_id ==
                              menu.menu_revision.item_category_id
                            ) {
                              return <>{category.category_revision.name}</>;
                            }
                          }
                        )}
                      </th>
                      <th>
                        {menu.menu_revision.group_code == 2 &&
                        menu.menu_revision.type == 1
                          ? "ドリンク"
                          : menu.menu_revision.group_code == 2 &&
                            menu.menu_revision.type == 2
                          ? "ピッチャー"
                          : menu.menu_revision.group_code == 3 &&
                            menu.menu_revision.type == 1
                          ? "フード"
                          : menu.menu_revision.group_code == 3 &&
                            menu.menu_revision.type == 2
                          ? "割り物"
                          : menu.menu_revision.group_code == 3 &&
                            menu.menu_revision.type == 3
                          ? "サービス"
                          : ""}
                      </th>
                      <th>
                        {menu.menu_revision.is_notice_kitchen ? "有効" : "無効"}
                      </th>
                      <th>¥{menu.menu_revision.price?.toLocaleString()}</th>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setUpdateForm(() => menu);
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
            <p className="w-full text-left">新規オーダー登録</p>
            <div className="flex w-full flex-wrap">
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  オーダー名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="オーダー名を入力"
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
                  className="mr-2 h-[30px] w-[12rem] rounded-md px-2 text-sm"
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
                  オーダー種別
                </label>
                <select
                  className="mr-2 h-[30px] w-[12rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      let group_code = 0;
                      let type = 0;
                      switch (e.target.value) {
                        case "ドリンク":
                          group_code = 2;
                          type = 1;
                          break;
                        case "ピッチャー":
                          group_code = 2;
                          type = 2;
                          break;
                        case "フード":
                          group_code = 3;
                          type = 1;
                          break;
                        case "割り物":
                          group_code = 3;
                          type = 2;
                          break;
                        case "サービス":
                          group_code = 3;
                          type = 3;
                          break;
                      }
                      return {
                        ...createForm,
                        group_code: group_code,
                        type: type,
                      };
                    });
                  }}
                >
                  <option selected disabled>
                    選択してください。
                  </option>
                  {syokai.map((pref) => {
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

              <div
                className="ml-auto mr-4 flex flex-col justify-end"
                onClick={() => {
                  alert(JSON.stringify(createForm));
                  client
                    .request(createMenu, {
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
                            client.request(searchMenu, {
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
    </>
  );
}
