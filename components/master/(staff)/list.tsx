import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { Schema, schema } from "@/validations/test";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import useRequestGQL from "@/components/fetch/requestGQL";
import { searchCast } from "@/gqls/query/cast";
import useSWR, { preload } from "swr";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import { createCast } from "@/gqls/mutation/cast";
import { useHotkeys } from "react-hotkeys-hook";
import { searchStaff } from "@/gqls/query/staff";
import { createStaff } from "@/gqls/mutation/staff";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function StaffList() {
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchStaff, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});

  const searchData = useSWR<any>(searchStaff, fetcher);
  const createData = useSWR<any>(createStaff, fetcher);

  const [detail, setDetail] = useState(false);
  const [leave, setLeave] = useState(false);

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
      prefName: "紹介A",
    },
    {
      prefCode: 2,
      prefName: "紹介B",
    },
    {
      prefCode: 3,
      prefName: "紹介C",
    },
  ];

  const kikan = [
    {
      prefCode: 1,
      prefName: "入店日",
    },
    {
      prefCode: 2,
      prefName: "誕生日",
    },
    {
      prefCode: 3,
      prefName: "退店日",
    },
  ];

  const hanbai = [
    {
      prefCode: 1,
      prefName: "スタッフ",
    },
    {
      prefCode: 2,
      prefName: "販売促進",
    },
  ];

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col min-h-[170px] overflow-scroll"
          black
        >
          <p className="w-full text-left">スタッフを検索</p>
          <div className="flex w-full flex-wrap">
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">ID</label>
              <input
                type="number"
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="IDを入力"
                onChange={(e) => {
                  if (e.target.value == "") {
                    delete searchForm.staff_code;
                    setSearchForm((searchForm: any) => {
                      return {
                        ...searchForm,
                      };
                    });
                  } else {
                    setSearchForm((searchForm: any) => {
                      return {
                        ...searchForm,
                        staff_code: Number(e.target.value),
                      };
                    });
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchStaff, {
                          ...searchForm,
                          ...defaultVariables,
                        }),
                      {
                        populateCache: true,
                        revalidate: false,
                      }
                    );
                  }
                }}
                value={searchForm?.staff_code || ""}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                スタッフ/販売促進
              </label>
              <select className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm">
                {hanbai.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">氏名</label>
              <input
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="氏名を入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return { ...searchForm, name: e.target.value };
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchStaff, {
                          ...searchForm,
                          ...defaultVariables,
                        }),
                      {
                        populateCache: true,
                        revalidate: false,
                      }
                    );
                  }
                }}
                value={searchForm?.name || ""}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                フリガナ
              </label>
              <input
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="フリガナを入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                電話番号
              </label>
              <input
                type="tel"
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                placeholder="電話番号を入力"
              />
            </div>
            <div
              className="ml-auto mr-4 flex flex-col justify-end"
              onClick={() => {
                searchData.mutate(
                  () =>
                    client.request(searchStaff, {
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
              <Button natural>検索</Button>
            </div>
            <div
              className="mr-4 flex flex-col justify-end"
              onClick={() => {
                setSearchForm(() => {});
                searchData.mutate(
                  () =>
                    client.request(searchStaff, {
                      ...defaultVariables,
                    }),
                  {
                    populateCache: true,
                    revalidate: false,
                  }
                );
              }}
            >
              <Button natural>クリア</Button>
            </div>
          </div>
        </Border>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col min-h-[calc(98dvh-240px)] overflow-scroll"
          black
        >
          <table className="table table-xs fixed z-10 -mt-[17px] h-[45px] w-[94%] rounded-none bg-neutral-900">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom">ID</th>
                <th className="w-[15em] align-bottom">氏名</th>
                <th className="w-[15em] align-bottom">住所</th>
                <th className="w-[15em] align-bottom">電話番号</th>
                <th className="w-[10em] align-bottom">入店日</th>
                <th className="w-[10em] align-bottom">退店日</th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
          </table>
          <table className="table table-xs mt-5">
            <thead>
              <tr>
                <th className="w-[6em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[5em]">
                  <label></label>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchData?.data?.staff[0]?.store_staff[0]?.staff?.map(
                (staff: any) => (
                  <>
                    {staff.staff_code != 0 && (
                      <>
                        <tr key={staff.staff_code}>
                          <td>{staff.staff_code}</td>
                          <td>{staff.name}</td>
                          <td>{staff.address}</td>
                          <td>{staff.phone_number}</td>
                          <td>{staff.entry_date}</td>
                          <td>{staff.leaving__date}</td>
                          <th>
                            <button className="btn btn-ghost btn-xs">
                              編集
                            </button>
                          </th>
                        </tr>
                      </>
                    )}
                  </>
                )
              )}
              {/* <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr> */}
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
            <p className="w-full text-left">新規スタッフ登録</p>
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
                        staff_code: Number(e.target.value),
                      };
                    });
                  }}
                  value={createForm?.staff_code || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  氏名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="氏名を入力"
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
                  フリガナ
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="フリガナを入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  生年月日
                </label>
                <input
                  type="date"
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        birthday: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.birthday || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  入店日
                </label>
                <input
                  type="date"
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        entry_date: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.entry_date || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  住所
                </label>
                <input
                  className="mr-2 h-[30px] w-[17rem] rounded-md px-2 text-sm"
                  placeholder="住所を入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        address: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.address || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  電話番号
                </label>
                <input
                  type="tel"
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="電話番号を入力"
                  onChange={(e) => {
                    setCreateForm((createForm: any) => {
                      return {
                        ...createForm,
                        phone_number: e.target.value,
                      };
                    });
                  }}
                  value={createForm?.phone_number || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  その他
                </label>
                <input
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="備考を入力"
                />
              </div>

              <div
                className="ml-auto mr-4 flex flex-col justify-end"
                onClick={() => {
                  createData
                    .mutate(
                      () =>
                        client.request(createStaff, {
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
                            client.request(searchStaff, {
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
