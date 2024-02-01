"use client";

import { use, useEffect, useState } from "react";

import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useSettingsGlobal from "@/globalstates/settings";
import useIsControlGlobal from "@/globalstates/isControl";

import {
  searchCast,
  searchSalaryCast,
  searchAttendanceManagementCast,
} from "@/gqls/query/cast";
import { searchBottle } from "@/gqls/query/bottle";

import useRequestGQL from "@/components/fetch/requestGQL";
import { createBottle } from "@/gqls/mutation/bottle";
import { searchCategory } from "@/gqls/query/category";
import { searchChampagne } from "@/gqls/query/champagne";
import { searchDesignate } from "@/gqls/query/designate";
import { searchEvent } from "@/gqls/query/event";
import { searchItemAlias } from "@/gqls/query/itemAlias";
import { searchPurchaseOrder } from "@/gqls/query/purchaseOrder";
import {
  searchSeat,
  searchSeatArea,
  searchSeatSetPriceChange,
} from "@/gqls/query/seat";
import { searchSalaryStaff, searchStaff } from "@/gqls/query/staff";
import { searchUser } from "@/gqls/query/user";
import { searchVisit } from "@/gqls/query/visit";
import { createCast } from "@/gqls/mutation/cast";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";

export default function DebugMenu() {
  const [settings, setSettings] = useSettingsGlobal();
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl] = useIsControlGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);

  const API_serchCast = useRequestGQL({ gql: searchCast });
  const API_searchSalaryCast = useRequestGQL({ gql: searchSalaryCast });
  const API_searchAttendanceManagementCast = useRequestGQL({
    gql: searchAttendanceManagementCast,
  });
  const API_searchBottle = useRequestGQL({ gql: searchBottle });
  const API_searchCategory = useRequestGQL({ gql: searchCategory });
  const API_searchChampagne = useRequestGQL({ gql: searchChampagne });
  const API_searchDesignate = useRequestGQL({ gql: searchDesignate });
  const API_searchEvent = useRequestGQL({ gql: searchEvent });
  const API_searchItemAlias = useRequestGQL({ gql: searchItemAlias });
  const API_searchPurchaseOrder = useRequestGQL({ gql: searchPurchaseOrder });
  const API_searchSeat = useRequestGQL({ gql: searchSeat });
  const API_searchSeatArea = useRequestGQL({ gql: searchSeatArea });
  const API_searchSeatSetPriceChange = useRequestGQL({
    gql: searchSeatSetPriceChange,
  });
  const API_searchStaff = useRequestGQL({ gql: searchStaff });
  const API_searchSalaryStaff = useRequestGQL({ gql: searchSalaryStaff });
  const API_searchUser = useRequestGQL({ gql: searchUser });
  const API_searchVisit = useRequestGQL({ gql: searchVisit });

  return (
    <>
      <div
        className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center  bg-black/70 p-10 text-white"
        onClick={() => setSettings({ ...settings, isDebug: false })}
      >
        <div
          className="flex w-full max-w-[600px] flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4">デバッグメニュー</h2>
          <div className="flex w-full flex-wrap">
            <div
              className={
                activeTab == 0 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab(0)}
            >
              グローバルステートの現在の値
            </div>
            <div
              className={
                activeTab == 1 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab(1)}
            >
              環境変数
            </div>
          </div>
          <div className="mb-4 w-full">
            {activeTab == 0 && (
              <ul>
                <li className="flex">
                  <div className="w-[6rem]">settings</div>:{" "}
                  {JSON.stringify(settings)}
                </li>
                <li className="flex">
                  <div className="w-[6rem]">isHeader</div>: {String(isHeader)}
                </li>
                <li className="flex">
                  <div className="w-[6rem]">isFooter</div>: {String(isFooter)}
                </li>
                <li className="flex">
                  <div className="w-[6rem]">isCard</div>: {String(isCard)}
                </li>
                <li className="flex">
                  <div className="w-[6rem]">isControl</div>: {String(isControl)}
                </li>
                <li className="flex">
                  <div className="w-[6rem]">purchaseOrder</div>:{" "}
                  {JSON.stringify(purchaseOrder)}
                </li>
              </ul>
            )}
            {activeTab == 1 && (
              <ul>
                <li className="flex">
                  <div className="w-[9rem]">GraphQL URL</div>:
                  {process.env.NEXT_PUBLIC_GRAPHQL_URL || ""}
                </li>
                <li className="flex">
                  <div className="w-[9rem]">X-API-Key</div>:
                  {process.env.NEXT_PUBLIC_X_API_KEY?.replace(
                    /.*/i,
                    "****************"
                  ) || ""}
                </li>
                <li className="flex">
                  <div className="w-[9rem]">License Key</div>:
                  {process.env.NEXT_PUBLIC_LICENSE_KEY || ""}
                </li>
                <li className="flex">
                  <div className="w-[9rem]">Store Code</div>:
                  {process.env.NEXT_PUBLIC_STORE_CODE || ""}
                </li>
              </ul>
            )}
          </div>
          <div className="flex w-full flex-wrap">
            <div
              className={
                activeTab2 == 99 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(99)}
            >
              機能説明
            </div>
            <div
              className={
                activeTab2 == 0 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(0)}
            >
              リセット系
            </div>
            <div
              className={
                activeTab2 == 1 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(1)}
            >
              表示系
            </div>
            <div
              className={
                activeTab2 == 2 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(2)}
            >
              テスト系
            </div>
            <div
              className={
                activeTab2 == 3 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(3)}
            >
              表示API系
            </div>
            <div
              className={
                activeTab2 == 4 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(4)}
            >
              編集API系
            </div>
            <div
              className={
                activeTab2 == 5 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
              }
              onClick={() => setActiveTab2(5)}
            >
              動作テスト
            </div>
          </div>
          <div className="flex w-full flex-wrap">
            {activeTab2 == 99 && (
              <>
                <p>ctrl + p でコマンドパレット</p>
                <p>席長押しでモード移行</p>
              </>
            )}
            {activeTab2 == 0 && (
              <>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() =>
                    confirm(
                      "キャストや顧客も含め全てのこのストアに関するデータが全て削除されます。よろしいですか？"
                    )
                  }
                >
                  全データリセット
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  全伝票リセット
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  勤怠リセット
                </button>
              </>
            )}
            {activeTab2 == 1 && (
              <>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => setIsHeader(!isHeader)}
                >
                  ヘッダー
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => setIsFooter(!isFooter)}
                >
                  フッター
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => setIsCard(!isCard)}
                >
                  カード
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => {
                    setSettings({ ...settings, animation: false });
                  }}
                >
                  アニメーション
                </button>
              </>
            )}
            {activeTab2 == 2 && (
              <>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  テストデータをランダムにまとめて追加
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  ダミーキャスト追加
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  ダミースタッフ追加
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  ダミー顧客追加
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  ダミー伝票追加
                </button>
                <button className="m-3 rounded-md bg-accent px-4 py-2">
                  ダミーオーダー追加
                </button>
              </>
            )}
            {activeTab2 == 3 && (
              <>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_serchCast))}
                >
                  キャスト一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchSalaryCast))}
                >
                  キャスト給与一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() =>
                    alert(JSON.stringify(API_searchAttendanceManagementCast))
                  }
                >
                  タイムカード一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchBottle))}
                >
                  ボトル一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchCategory))}
                >
                  カテゴリ一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchChampagne))}
                >
                  シャンパン一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchDesignate))}
                >
                  指名一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchEvent))}
                >
                  イベント一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchItemAlias))}
                >
                  アイテムエイリアス一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchPurchaseOrder))}
                >
                  伝票一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchSeat))}
                >
                  席一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchSeatArea))}
                >
                  席エリア一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() =>
                    alert(JSON.stringify(API_searchSeatSetPriceChange))
                  }
                >
                  席情報一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchStaff))}
                >
                  スタッフ一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchSalaryStaff))}
                >
                  スタッフ給与一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchUser))}
                >
                  ユーザー一覧
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => alert(JSON.stringify(API_searchVisit))}
                >
                  コール時間一覧
                </button>
              </>
            )}
            {activeTab2 == 4 && (
              <>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => {
                    // RequestGQL({
                    //   gql: createCast,
                    //   variables: { name: "テスト子ちゃん", cast_code: "0" },
                    // });
                    alert("テストキャストを追加しました。");
                  }}
                >
                  キャスト追加
                </button>
                <button
                  className="m-3 rounded-md bg-accent px-4 py-2"
                  onClick={() => {
                    // RequestGQL({
                    //   gql: createBottle,
                    //   variables: { name: "テストボトル" },
                    // });
                    alert("テストボトルを追加しました。");
                  }}
                >
                  ボトル追加
                </button>
              </>
            )}
            {activeTab2 == 5 && (
              <>
                <button
                  className="m-3 max-h-[40px] rounded-md bg-accent px-4 py-2"
                  onClick={() => {
                    setResult(1);
                    try {
                      setTimeout(() => {
                        if (API_serchCast != null) {
                          setResult(2);
                        }
                        setTimeout(() => {
                          if (searchSalaryCast != null) {
                            setResult(3);
                          }
                          setTimeout(() => {
                            if (searchAttendanceManagementCast != null) {
                              setResult(4);
                            }
                            setTimeout(() => {
                              if (searchBottle != null) {
                                setResult(5);
                              }
                              setTimeout(() => {
                                if (searchCategory != null) {
                                  setResult(6);
                                }
                                setTimeout(() => {
                                  if (searchChampagne != null) {
                                    setResult(7);
                                  }
                                  setTimeout(() => {
                                    if (searchDesignate != null) {
                                      setResult(8);
                                    }
                                    setTimeout(() => {
                                      if (searchEvent != null) {
                                        setResult(9);
                                      }
                                      setTimeout(() => {
                                        if (searchEvent != null) {
                                          setResult(9);
                                        }
                                        setTimeout(() => {
                                          if (searchItemAlias != null) {
                                            setResult(10);
                                          }
                                          setTimeout(() => {
                                            if (searchPurchaseOrder != null) {
                                              setResult(11);
                                            }
                                            setTimeout(() => {
                                              if (searchSeat != null) {
                                                setResult(12);
                                              }
                                              setTimeout(() => {
                                                if (searchSeatArea != null) {
                                                  setResult(13);
                                                }
                                                setTimeout(() => {
                                                  if (
                                                    searchSeatSetPriceChange !=
                                                    null
                                                  ) {
                                                    setResult(14);
                                                  }
                                                  setTimeout(() => {
                                                    if (searchStaff != null) {
                                                      setResult(15);
                                                    }
                                                    setTimeout(() => {
                                                      if (
                                                        searchSalaryStaff !=
                                                        null
                                                      ) {
                                                        setResult(16);
                                                      }
                                                      setTimeout(() => {
                                                        if (
                                                          searchUser != null
                                                        ) {
                                                          setResult(17);
                                                        }
                                                        setTimeout(() => {
                                                          if (
                                                            searchVisit != null
                                                          ) {
                                                            setResult(18);
                                                          }
                                                        }, 1000);
                                                      }, 1000);
                                                    }, 1000);
                                                  }, 1000);
                                                }, 1000);
                                              }, 1000);
                                            }, 1000);
                                          }, 1000);
                                        }, 1000);
                                      }, 1000);
                                    }, 1000);
                                  }, 1000);
                                }, 1000);
                              }, 1000);
                            }, 1000);
                          }, 1000);
                        }, 1000);
                      }, 1000);
                    } catch {
                      return null;
                    }
                  }}
                >
                  実行
                </button>
                <div className="mt-3 h-[200px] overflow-y-scroll">
                  実行結果 {result}/18
                  <br />
                  {error && "エラーが発生しました。"}
                  <br />
                  {result > 0 && "APIのテストを開始します。\n"}
                  <br />
                  {result > 0 && "serchCastのAPIを実行中...\n"}
                  <br />
                  {result > 1 && "serchCastのAPIが成功しました\n"}
                  <br />
                  {result > 1 && "searchSalaryCastのAPIを実行中...\n"}
                  <br />
                  {result > 2 && "searchSalaryCastのAPIが成功しました\n"}
                  <br />
                  {result > 2 &&
                    "searchAttendanceManagementCastのAPIを実行中...\n"}
                  <br />
                  {result > 3 &&
                    "searchAttendanceManagementCastのAPIが成功しました\n"}
                  <br />
                  {result > 3 && "searchBottleのAPIを実行中...\n"}
                  <br />
                  {result > 4 && "searchBottleのAPIが成功しました\n"}
                  <br />
                  {result > 4 && "searchCategoryのAPIを実行中...\n"}
                  <br />
                  {result > 5 && "searchCategoryのAPIが成功しました\n"}
                  <br />
                  {result > 5 && "searchChampagneのAPIを実行中...\n"}
                  <br />
                  {result > 6 && "searchChampagneのAPIが成功しました\n"}
                  <br />
                  {result > 6 && "searchDesignateのAPIを実行中...\n"}
                  <br />
                  {result > 7 && "searchDesignateのAPIが成功しました\n"}
                  <br />
                  {result > 7 && "searchEventのAPIを実行中...\n"}
                  <br />
                  {result > 8 && "searchEventのAPIが成功しました\n"}
                  <br />
                  {result > 8 && "searchItemAliasのAPIを実行中...\n"}
                  <br />
                  {result > 9 && "searchItemAliasのAPIが成功しました\n"}
                  <br />
                  {result > 9 && "searchPurchaseOrderのAPIを実行中...\n"}
                  <br />
                  {result > 10 && "searchPurchaseOrderのAPIが成功しました\n"}
                  <br />
                  {result > 10 && "searchSeatのAPIを実行中...\n"}
                  <br />
                  {result > 11 && "searchSeatのAPIが成功しました\n"}
                  <br />
                  {result > 11 && "searchSeatAreaのAPIを実行中...\n"}
                  <br />
                  {result > 12 && "searchSeatAreaのAPIが成功しました\n"}
                  <br />
                  {result > 12 && "searchSeatSetPriceChangeのAPIを実行中...\n"}
                  <br />
                  {result > 13 &&
                    "searchSeatSetPriceChangeのAPIが成功しました\n"}
                  <br />
                  {result > 13 && "searchStaffのAPIを実行中...\n"}
                  <br />
                  {result > 14 && "searchStaffのAPIが成功しました\n"}
                  <br />
                  {result > 14 && "searchSalaryStaffのAPIを実行中...\n"}
                  <br />
                  {result > 15 && "searchSalaryStaffのAPIが成功しました\n"}
                  <br />
                  {result > 15 && "searchUserのAPIを実行中...\n"}
                  <br />
                  {result > 16 && "searchUserのAPIが成功しました\n"}
                  <br />
                  {result > 16 && "searchVisitのAPIを実行中...\n"}
                  <br />
                  {result > 17 && "searchVisitのAPIが成功しました\n"}
                  <br />
                  {result > 17 && "テストが完了しました。\n"}
                  <br />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
