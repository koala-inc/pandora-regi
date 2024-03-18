"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Settings
 *
 * theme        = ライトモードまたはダークモード（今はダークモード固定）
 * license      = ライセンスコード
 * isAnimation  = アニメーションのオンオフのフラグ（動作が重い場合に使用する）
 * isDebug      = デバッグ画面の表示非表示のフラグ
 *
 */

export default function useSeatPresetGlobal() {
  return useGlobal("seatPreset", "");
}
