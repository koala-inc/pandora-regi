"use client";

import { useState } from "react";

import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useSettingsGlobal from "@/globalstates/settings";

export default function DebugMenu() {
  const [settings, setSettings] = useSettingsGlobal();
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);

  return (
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
            その他
          </div>
        </div>
        <div className="flex w-full flex-wrap">
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
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">-</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
