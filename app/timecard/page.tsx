"use client";

// 開発用コンポーネント
import DevTool from "@/components/debug/devTool";

// コンポーネント
import Background from "@/components/parts/background";
import HomeButton from "@/components/templates/homeButton";
import CastList from "@/components/master/(cast)/list";
import HelpCastList from "@/components/master/(cast)/helpCast";
import StaffList from "@/components/master/(staff)/list";
import ArbeitList from "@/components/master/(staff)/arbeit";
import ItemCategoryList from "@/components/master/(item)/category";
import OrderSet from "@/components/master/(item)/orderSet";
import OrderAdd from "@/components/master/(item)/orderAdd";
import BottleAdd from "@/components/master/(item)/bottleAdd";

// グローバルステート
import useMasterActivePageGlobal from "@/globalstates/masterActivePage";

export default function Mater() {
  const [masterActivePage, setMasterActivePage] = useMasterActivePageGlobal();

  const nav = [
    {
      name: "キャスト",
      disabled: false,
      submenu: [
        {
          name: "在籍キャスト",
          component: <CastList />,
          disabled: false,
        },
        {
          name: "ヘルプ・体入キャスト",
          component: <HelpCastList />,
          disabled: true,
        },
      ],
    },
    {
      name: "スタッフ",
      disabled: false,
      submenu: [
        {
          name: "在籍スタッフ",
          component: <StaffList />,
          disabled: false,
        },
        {
          name: "アルバイトスタッフ",
          component: <ArbeitList />,
          disabled: true,
        },
      ],
    },
    {
      name: "荷物",
      disabled: true,
      component: <></>,
    },
    {
      name: "商品",
      disabled: false,
      submenu: [
        {
          name: "商品カテゴリー",
          component: <ItemCategoryList />,
          disabled: false,
        },
        {
          name: "オーダー配置",
          component: <OrderSet />,
          disabled: true,
        },
        {
          name: "オーダー登録",
          component: <OrderAdd />,
          disabled: true,
        },
        {
          name: "ボトル登録",
          component: <BottleAdd />,
          disabled: true,
        },
      ],
    },
    {
      name: "他店舗登録",
      disabled: true,
      component: <></>,
    },
    {
      name: "案内所/外販/媒体",
      disabled: true,
      component: <></>,
    },
    {
      name: "料金システム",
      disabled: false,
      submenu: [
        {
          name: "席カテゴリー",
          component: <ItemCategoryList />,
          disabled: false,
        },
        {
          name: "セット料金",
          component: <OrderSet />,
          disabled: true,
        },
        {
          name: "指名料",
          component: <OrderAdd />,
          disabled: true,
        },
      ],
    },
    {
      name: "客層タイプ登録",
      disabled: true,
      component: <></>,
    },
    {
      name: "キャスト系統登録",
      disabled: true,
      component: <></>,
    },
    {
      name: "システム",
      disabled: true,
      component: <></>,
    },
    {
      name: "ヘルプ",
      disabled: true,
      component: <></>,
    },
  ];

  return (
    <main className="relative h-full w-full">
      <Background />
      <div className="flex h-full w-full items-center justify-center bg-primary text-white">
        タイムカードコンポーネント
      </div>
      <HomeButton />
      <DevTool />
    </main>
  );
}
