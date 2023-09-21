import useIsDebugGlobal from "@/globalstates/isDebug";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsLicenseGlobal from "@/globalstates/isLicense";
import { useState } from "react";
import useIsCardGlobal from "@/globalstates/isCard";

export default function DebugMenu() {
  const [isDebug, setIsDebug] = useIsDebugGlobal();
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isLicense] = useIsLicenseGlobal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center  bg-black/70 p-10 text-white"
      onClick={() => setIsDebug(false)}
    >
      <div
        className="flex w-full max-w-[600px] flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4">デバッグメニュー</h2>
        <div className="mb-4 w-full">
          <p>グローバルステートの現在の値</p>
          <ul>
            <li className="flex">
              <div className="w-[6rem]">isDebug</div>: {String(isDebug)}
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
              <div className="w-[6rem]">isLicense</div>: {String(isLicense)}
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-wrap">
          <div
            className={
              activeTab == 0 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
            }
            onClick={() => setActiveTab(0)}
          >
            リセット系
          </div>
          <div
            className={
              activeTab == 1 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
            }
            onClick={() => setActiveTab(1)}
          >
            表示系
          </div>
          <div
            className={
              activeTab == 2 ? "m-2 border-b-2 border-white p-2" : "m-2 p-2"
            }
            onClick={() => setActiveTab(2)}
          >
            その他
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          {activeTab == 0 && (
            <>
              <button className="m-3 rounded-md bg-accent px-4 py-2">
                全伝票リセット
              </button>
              <button className="m-3 rounded-md bg-accent px-4 py-2">
                勤怠リセット
              </button>
            </>
          )}
          {activeTab == 1 && (
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
            </>
          )}
          {activeTab == 2 && (
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
