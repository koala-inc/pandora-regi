"use client";

import useGlobal from "@/globalstates/useGlobal";

/*
 * Control Types
 * 同時に操作させないタイプの操作について、どの操作を行うかの判定フラグ
 * 空の時は非表示
 *
 * TIME         = セット時間の管理
 * SET          = 合流
 * CAST         = 指名追加
 * ITEM         = オーダー追加
 * APPROX       = 概算
 * END          = 会計
 *
 */

export default function useIsControlGlobal() {
  return useGlobal("isControl", "");
}
