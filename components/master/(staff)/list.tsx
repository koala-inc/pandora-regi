import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { Schema, schema } from "@/validations/test";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import useSWR, { preload } from "swr";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import { searchStaff } from "@/gqls/query/staff";
import { createStaff, updateStaff } from "@/gqls/mutation/staff";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function StaffList() {
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchStaff, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [searchCategory, setSearchCategory] = useState("入店日");

  const searchData = useSWR<any>(searchStaff, fetcher);
  const createData = useSWR<any>(createStaff, fetcher);
  const updateData = useSWR<any>(updateStaff, fetcher);

  const [detail, setDetail] = useState(false);
  const [leave, setLeave] = useState(false);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

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
      prefCode: 0,
      prefName: "スタッフ",
    },
    {
      prefCode: 1,
      prefName: "販売促進",
    },
  ];

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          rounded="rounded-md border-white"
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
              <select
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                onChange={(e) => {
                  const tmp =
                    e.target.value == "スタッフ"
                      ? 0
                      : e.target.value == "販売促進"
                      ? 1
                      : 0;
                  setSearchForm((searchForm: any) => {
                    return { ...searchForm, section: tmp };
                  });
                }}
              >
                {hanbai.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefName}>
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
            {/* <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                フリガナ
              </label>
              <input
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="フリガナを入力"
              />
            </div> */}
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
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                期間カテゴリ
              </label>
              <select
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                onChange={(e) => {
                  setSearchCategory(e.target.value);
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
              <label className="mt-3 text-xs font-bold text-accent">期間</label>
              <input
                type="date"
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      entry_date_from: e.target.value,
                      leaving_date_from: e.target.value,
                      birthday_from: e.target.value,
                    };
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
                value={
                  searchCategory == "入店日"
                    ? searchForm?.entry_date_from || ""
                    : searchCategory == "退店日"
                    ? searchForm?.leaving_date_from || ""
                    : searchCategory == "生年月日"
                    ? searchForm?.birthday_from || ""
                    : ""
                }
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="mr-2 mt-3 flex h-[30px] items-center justify-center text-xs font-bold text-white">
                〜
              </label>
            </div>
            <div className="flex flex-col justify-end">
              <label className="mt-3 text-xs font-bold text-accent"></label>
              <input
                type="date"
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      entry_date_to: e.target.value,
                      leaving_date_to: e.target.value,
                      birthday_to: e.target.value,
                    };
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
                value={
                  searchCategory == "入店日"
                    ? searchForm?.entry_date_to || ""
                    : searchCategory == "退店日"
                    ? searchForm?.leaving_date_to || ""
                    : searchCategory == "生年月日"
                    ? searchForm?.birthday_to || ""
                    : ""
                }
              />
            </div>
            <div
              className="ml-auto mr-4 flex flex-col justify-end"
              onClick={() => {
                switch (searchCategory) {
                  case "入店日":
                    delete searchForm.leaving_date_from;
                    delete searchForm.leaving_date_to;
                    delete searchForm.birthday_from;
                    delete searchForm.birthday_to;
                    break;
                  case "退店日":
                    delete searchForm.entry_date_from;
                    delete searchForm.entry_date_to;
                    delete searchForm.birthday_from;
                    delete searchForm.birthday_to;
                    break;
                  case "生年月日":
                    delete searchForm.entry_date_from;
                    delete searchForm.entry_date_to;
                    delete searchForm.leaving_date_from;
                    delete searchForm.leaving_date_to;
                    break;
                }
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
            <div
              className="mr-4 flex flex-col justify-end"
              onClick={() => {
                setDetail((detail) => !detail);
              }}
            >
              <Button natural>{detail ? "詳細を非表示" : "詳細を表示"}</Button>
            </div>
            <div
              className="mr-4 flex flex-col justify-end"
              onClick={() => {
                setLeave((leave) => !leave);
              }}
            >
              <Button natural>
                {leave ? "退店者を表示" : "退店者を非表示"}
              </Button>
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
                <th className="w-[10em] align-bottom">ID</th>
                <th className="w-[15em] align-bottom">スタッフ/販売促進</th>
                <th className="w-[15em] align-bottom">氏名</th>
                <th className="w-[15em] align-bottom">入店日</th>
                <th className="w-[15em] align-bottom">退店日</th>
                <th className="w-[5em] align-bottom">
                  <label>編集</label>
                </th>
              </tr>
            </thead>
          </table>
          <table className="table table-xs mt-5">
            <thead>
              <tr>
                <th className="w-[10em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[5em]">
                  <label></label>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchData?.data?.staff[0]?.store_staff[0]?.staff?.map(
                (staff: any) => {
                  if (leave) {
                    if (staff.leaving_date == null) {
                      return (
                        <>
                          {staff.staff_code != 0 && (
                            <>
                              <tr key={staff.staff_code}>
                                <td>{staff.staff_code}</td>
                                <td>
                                  {staff.section == 0 ? "スタッフ" : "販売促進"}
                                </td>
                                <td>{staff.name}</td>
                                <td>{staff.entry_date}</td>
                                <td>{staff.leaving_date}</td>
                                <th>
                                  <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => {
                                      setUpdateForm(() => staff);
                                      setUpdateModal(true);
                                    }}
                                  >
                                    編集
                                  </button>
                                </th>
                              </tr>
                              {detail && (
                                <>
                                  <tr
                                    key={staff.staff_code + "1"}
                                    className="mt-3 border-b-0 border-t border-gray-300 opacity-50"
                                  >
                                    <th>生年月日</th>
                                    <th>住所</th>
                                    <th>電話番号</th>
                                    <th>その他</th>
                                    <th>媒体</th>
                                    <th>紹介者</th>
                                  </tr>
                                  <tr
                                    key={staff.staff_code + "2"}
                                    className="border-b border-gray-500 opacity-50"
                                  >
                                    <td>{staff.birthday}</td>
                                    <td>{staff.address}</td>
                                    <td>{staff.phone_number}</td>
                                    <td>{staff.remarks}</td>
                                    <td>-</td>
                                    <td>-</td>
                                  </tr>
                                </>
                              )}
                            </>
                          )}
                        </>
                      );
                    }
                  } else {
                    return (
                      <>
                        {staff.staff_code != 0 && (
                          <>
                            <tr key={staff.staff_code}>
                              <td>{staff.staff_code}</td>
                              <td>
                                {staff.section == 0 ? "スタッフ" : "販売促進"}
                              </td>
                              <td>{staff.name}</td>
                              <td>{staff.entry_date}</td>
                              <td>{staff.leaving_date}</td>
                              <th>
                                <button
                                  className="btn btn-ghost btn-xs"
                                  onClick={() => {
                                    setUpdateForm(() => staff);
                                    setUpdateModal(true);
                                  }}
                                >
                                  編集
                                </button>
                              </th>
                            </tr>
                            {detail && (
                              <>
                                <tr
                                  key={staff.cast_code + "1"}
                                  className="mt-3 border-b-0 border-t border-gray-300 opacity-50"
                                >
                                  <th>生年月日</th>
                                  <th>住所</th>
                                  <th>電話番号</th>
                                  <th>その他</th>
                                  <th>媒体</th>
                                  <th>紹介者</th>
                                </tr>
                                <tr
                                  key={staff.cast_code + "2"}
                                  className="border-b border-gray-500 opacity-50"
                                >
                                  <td>{staff.birthday}</td>
                                  <td>{staff.address}</td>
                                  <td>{staff.phone_number}</td>
                                  <td>{staff.remarks}</td>
                                  <td>-</td>
                                  <td>-</td>
                                </tr>
                              </>
                            )}
                          </>
                        )}
                      </>
                    );
                  }
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
          <Border
            className="w-full"
            rounded="rounded-md border-white"
            size="p-4 flex flex-col"
            black
          >
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
                  スタッフ/販売促進
                </label>
                <select
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    const tmp =
                      e.target.value == "スタッフ"
                        ? 0
                        : e.target.value == "販売促進"
                        ? 1
                        : 0;
                    setCreateForm((createForm: any) => {
                      return { ...createForm, section: tmp };
                    });
                  }}
                >
                  {hanbai.map((pref) => {
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
              <hr className="w-full opacity-0" />
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
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  媒体
                </label>
                <select className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm">
                  <option value="" selected disabled>
                    媒体を選択
                  </option>
                  {baitais.map((pref) => {
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
                  紹介者
                </label>
                <select className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm">
                  <option value="" selected disabled>
                    紹介者を選択
                  </option>
                  {syokai.map((pref) => {
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
      {updateModal && (
        <Modal setModal={setUpdateModal}>
          <Border
            className="w-full"
            rounded="rounded-md border-white"
            size="p-4 flex flex-col"
            black
          >
            <p className="w-full text-left">スタッフ編集</p>
            <div className="flex w-full flex-wrap">
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">ID</label>
                <input
                  type="number"
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  value={updateForm?.staff_code || ""}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  スタッフ/販売促進
                </label>
                <select
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    const tmp =
                      e.target.value == "スタッフ"
                        ? 0
                        : e.target.value == "販売促進"
                        ? 1
                        : 0;
                    setUpdateForm((updateForm: any) => {
                      return { ...updateForm, section: tmp };
                    });
                  }}
                >
                  {hanbai.map((pref) => {
                    return (
                      <option
                        key={pref.prefCode}
                        value={pref.prefName}
                        selected={updateForm?.section == pref.prefCode}
                      >
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  氏名
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="氏名を入力"
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
                  フリガナ
                </label>
                <input
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="フリガナを入力"
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
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        entry_date: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.entry_date || ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  退店日
                </label>
                <input
                  type="date"
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        leaving_date: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.leaving_date || ""}
                />
              </div>
              <hr className="w-full opacity-0" />
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  生年月日
                </label>
                <input
                  type="date"
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                  onChange={(e) => {
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        birthday: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.birthday || ""}
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
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        address: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.address || ""}
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
                    setUpdateForm((updateForm: any) => {
                      return {
                        ...updateForm,
                        phone_number: e.target.value,
                      };
                    });
                  }}
                  value={updateForm?.phone_number || ""}
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
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  媒体
                </label>
                <select className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm">
                  <option value="" selected disabled>
                    媒体を選択
                  </option>
                  {baitais.map((pref) => {
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
                  紹介者
                </label>
                <select className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm">
                  <option value="" selected disabled>
                    紹介者を選択
                  </option>
                  {syokai.map((pref) => {
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
                  Object.keys(updateForm).map((key: any) => {
                    if (updateForm[key] == null) {
                      delete updateForm[key];
                    }
                  });

                  client
                    .request(updateStaff, {
                      ...updateForm,
                      ...defaultVariables,
                    })
                    .then(() => {
                      setUpdateForm(() => {});
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
                          setUpdateModal(false);
                        });
                    });
                }}
              >
                <Button natural>更新</Button>
              </div>
            </div>
          </Border>
        </Modal>
      )}
    </>
  );
}
