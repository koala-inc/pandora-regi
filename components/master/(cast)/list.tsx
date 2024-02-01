import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import Border2 from "@/components/templates/border";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createCast, updateCast } from "@/gqls/mutation/cast";
import { useHotkeys } from "react-hotkeys-hook";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function CastList() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [searchCategory, setSearchCategory] = useState("入店日");

  const searchData = useSWR<any>(searchCast, fetcher);
  const createData = useSWR<any>(createCast, fetcher);
  const updateData = useSWR<any>(updateCast, fetcher);

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
      prefName: "退店日",
    },
    {
      prefCode: 3,
      prefName: "生年月日",
    },
  ];

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          rounded="border-white rounded-md"
          size="p-4 flex flex-col min-h-[100px] overflow-scroll"
          black
        >
          <p className="w-full text-left">キャストを検索</p>
          <div className="flex w-full flex-wrap">
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">ID</label>
              <input
                type="number"
                className="mr-2 h-[30px] mt-1 w-[6rem] rounded-md px-2 text-sm"
                placeholder="IDを入力"
                onChange={(e) => {
                  if (e.target.value == "") {
                    delete searchForm.cast_code;
                    setSearchForm((searchForm: any) => {
                      return {
                        ...searchForm,
                      };
                    });
                  } else {
                    setSearchForm((searchForm: any) => {
                      return {
                        ...searchForm,
                        cast_code: Number(e.target.value),
                      };
                    });
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchCast, {
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
                value={searchForm?.cast_code || ""}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                キャスト名
              </label>
              <input
                className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                placeholder="源氏名を入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return { ...searchForm, name: e.target.value };
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchCast, {
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
              <label className="mt-3 text-xs font-bold text-accent">本名</label>
              <input
                className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                placeholder="本名を入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return { ...searchForm, real_name: e.target.value };
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchCast, {
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
                value={searchForm?.real_name || ""}
              />
            </div>
            {/* <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                フリガナ
              </label>
              <input
                className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                placeholder="フリガナを入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      real_name_ruby: e.target.value,
                    };
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchCast, {
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
                value={searchForm?.real_name_ruby || ""}
              />
            </div> */}
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                電話番号
              </label>
              <input
                type="tel"
                className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
                placeholder="電話番号を入力"
                onChange={(e) => {
                  setSearchForm((searchForm: any) => {
                    return {
                      ...searchForm,
                      phone_number: e.target.value,
                    };
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchData.mutate(
                      () =>
                        client.request(searchCast, {
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
                value={searchForm?.phone_number || ""}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                期間カテゴリ
              </label>
              <select
                className="mr-2 h-[30px] mt-1 w-[6rem] rounded-md px-2 text-sm"
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
                className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
                        client.request(searchCast, {
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
                className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
                        client.request(searchCast, {
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
                    client.request(searchCast, {
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
                    client.request(searchCast, {
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
          rounded="border-white rounded-md"
          size="p-4 flex flex-col min-h-[calc(98dvh-240px)] max-h-[calc(98dvh-240px)] overflow-scroll"
          black
        >
          <table className="table table-xs fixed z-10 -mt-[16px] h-[45px] w-[94%] rounded-none bg-neutral-900">
            {/* head */}
            <thead>
              <tr className="text-accent">
                <th className="w-[6em] align-bottom">ID</th>
                <th className="w-[15em] align-bottom">キャスト名</th>
                <th className="w-[15em] align-bottom">本名</th>
                <th className="w-[10em] align-bottom">時給</th>
                <th className="w-[10em] align-bottom">日給</th>
                <th className="w-[10em] align-bottom">入店日</th>
                <th className="w-[10em] align-bottom">退店日</th>
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
                <th className="w-[6em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[15em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[10em]"></th>
                <th className="w-[5em]">
                  <label></label>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <pre>{JSON.stringify(data.cast[0].store_cast[0].cast[0])}</pre> */}
              {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
                (cast: any) => {
                  if (leave) {
                    if (cast.leaving_date == null) {
                      return (
                        <>
                          {cast.cast_code != 0 && cast.section == 1 && (
                            <>
                              <tr key={cast.cast_code}>
                                <td>{cast.cast_code}</td>
                                <td>{cast.name}</td>
                                <td>{cast.real_name}</td>
                                <td>{0}円</td>
                                <td>{0}円</td>
                                <td>{cast.entry_date}</td>
                                <td>{cast.leaving_date}</td>
                                <th>
                                  <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => {
                                      setUpdateForm(() => cast);
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
                                    key={cast.cast_code + "1"}
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
                                    key={cast.cast_code + "2"}
                                    className="border-b border-gray-500 opacity-50"
                                  >
                                    <td>{cast.birthday}</td>
                                    <td>{cast.address}</td>
                                    <td>{cast.remarks}</td>
                                    <td>{cast.phone_number}</td>
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
                        {cast.cast_code == 0 && cast.section == 1 && (
                          <>
                            <tr key={cast.cast_code}>
                              <td>{cast.cast_code}</td>
                              <td>{cast.name}</td>
                              <td>{cast.real_name}</td>
                              <td>{0}円</td>
                              <td>{0}円</td>
                              <td>{cast.entry_date}</td>
                              <td>{cast.leaving_date}</td>
                              <th>
                                <button
                                  className="btn btn-ghost btn-xs"
                                  onClick={() => {
                                    setUpdateForm(() => cast);
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
                                  key={cast.cast_code + "1"}
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
                                  key={cast.cast_code + "2"}
                                  className="border-b border-gray-500 opacity-50"
                                >
                                  <td>{cast.birthday}</td>
                                  <td>{cast.address}</td>
                                  <td>{cast.phone_number}</td>
                                  <td>{cast.remarks}</td>
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
            src={"/assets/add-customer.svg"}
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
            <p className="w-full text-left">
              新規キャスト登録
              <small className="ml-5 text-red-600">＊は必須項目です。</small>
            </p>
            <div className="flex w-full flex-wrap">
              <div className="flex w-full flex-wrap">
                {/* <div className="flex flex-col">
                  <label className="mt-3 text-center text-xs font-bold text-accent">
                    在籍
                  </label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  />
                </div> */}
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    ID{" "}
                    <span className="bg-rose-500 text-white px-[5px] py-[3px] text-xs rounded-md">
                      必須
                    </span>
                  </label>
                  <input
                    type="number"
                    className="mr-2 h-[30px] mt-1 w-[6rem] rounded-md px-2 text-sm"
                    placeholder="IDを入力"
                    onChange={(e) => {
                      setCreateForm((createForm: any) => {
                        return {
                          ...createForm,
                          cast_code: Number(e.target.value),
                        };
                      });
                    }}
                    value={createForm?.cast_code || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    キャスト名
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="源氏名を入力"
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
                    フリガナ(キャスト名)
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="フリガナを入力"
                    // onChange={(e) => {
                    //   setCreateForm((createForm: any) => {
                    //     return {
                    //       ...createForm,
                    //       real_name_ruby: e.target.value,
                    //     };
                    //   });
                    // }}
                    // value={createForm?.real_name_ruby || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    本名{" "}
                    <span className="bg-rose-500 text-white px-[5px] py-[3px] text-xs rounded-md">
                      必須
                    </span>
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="本名を入力"
                    onChange={(e) => {
                      setCreateForm((createForm: any) => {
                        return {
                          ...createForm,
                          real_name: e.target.value,
                        };
                      });
                    }}
                    value={createForm?.real_name || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    フリガナ(本名)
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="フリガナを入力"
                    onChange={(e) => {
                      setCreateForm((createForm: any) => {
                        return {
                          ...createForm,
                          real_name_ruby: e.target.value,
                        };
                      });
                    }}
                    value={createForm?.real_name_ruby || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    時給
                  </label>
                  <input
                    type="number"
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
                    placeholder="時給を入力"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    日給
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
                    placeholder="日給を入力"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    入店日
                  </label>
                  <input
                    type="date"
                    className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
              </div>
              <div className="flex w-full flex-wrap">
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    生年月日
                  </label>
                  <input
                    type="date"
                    className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[17rem] rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
                    placeholder="備考を入力"
                    onChange={(e) => {
                      setCreateForm((createForm: any) => {
                        return {
                          ...createForm,
                          remarks: e.target.value,
                        };
                      });
                    }}
                    value={createForm?.remarks || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    媒体
                  </label>
                  <select className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm">
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
                  {errors.firstName?.message && (
                    <p>{errors.firstName?.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    紹介者
                  </label>
                  <select className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm">
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
                          client.request(createCast, {
                            ...createForm,
                            section: 1,
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
                              client.request(searchCast, {
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
            <p className="w-full text-left">
              キャスト編集
              <small className="ml-5 text-red-600">＊は必須項目です。</small>
            </p>
            <div className="flex w-full flex-wrap">
              <div className="flex w-full flex-wrap">
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    ID
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    value={updateForm?.cast_code || ""}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    キャスト名
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="源氏名を入力"
                    onChange={(e) => {
                      setUpdateForm((upadteForm: any) => {
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
                    フリガナ(キャスト名)
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="フリガナを入力"
                    // onChange={(e) => {
                    //   setCreateForm((createForm: any) => {
                    //     return {
                    //       ...createForm,
                    //       real_name_ruby: e.target.value,
                    //     };
                    //   });
                    // }}
                    // value={createForm?.real_name_ruby || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    本名 <small className="text-red-600">＊</small>
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="本名を入力"
                    onChange={(e) => {
                      setUpdateForm((updateForm: any) => {
                        return {
                          ...updateForm,
                          real_name: e.target.value,
                        };
                      });
                    }}
                    value={updateForm?.real_name || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    フリガナ(本名)
                  </label>
                  <input
                    className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm"
                    placeholder="フリガナを入力"
                    onChange={(e) => {
                      setUpdateForm((updateForm: any) => {
                        return {
                          ...updateForm,
                          real_name_ruby: e.target.value,
                        };
                      });
                    }}
                    value={updateForm?.real_name_ruby || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    入店日
                  </label>
                  <input
                    type="date"
                    className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
              </div>
              <div className="flex w-full flex-wrap">
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    生年月日
                  </label>
                  <input
                    type="date"
                    className="mr-2 h-[30px] mt-1 rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[17rem] rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
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
                    className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm"
                    placeholder="備考を入力"
                    onChange={(e) => {
                      setUpdateForm((updateForm: any) => {
                        return {
                          ...updateForm,
                          remarks: e.target.value,
                        };
                      });
                    }}
                    value={updateForm?.remarks || ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    媒体
                  </label>
                  <select className="mr-2 h-[30px] mt-1 w-[7rem] rounded-md px-2 text-sm">
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
                  {errors.firstName?.message && (
                    <p>{errors.firstName?.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 text-xs font-bold text-accent">
                    紹介者
                  </label>
                  <select className="mr-2 h-[30px] mt-1 w-[8rem] rounded-md px-2 text-sm">
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
                      .request(updateCast, {
                        ...updateForm,
                        ...defaultVariables,
                      })
                      .then(() => {
                        setUpdateForm(() => {});
                        setSearchForm(() => {});
                        searchData
                          .mutate(
                            () =>
                              client.request(searchCast, {
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
            </div>
          </Border>
        </Modal>
      )}
    </>
  );
}
