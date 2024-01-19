"use client";

import { AnimatePresence } from "framer-motion";

// コンポーネント
import SideMenu from "@/components/master/sideMenu";
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
import ShopInfo from "@/components/master/(system)/shopInfo";
import Another from "@/components/master/(system)/another";

export default function Mater() {
  const [masterActivePage, setMasterActivePage] = useMasterActivePageGlobal();

  const nav = [
    {
      name: "キャスト",
      disabled: false,
      open: false,
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
      open: false,
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
      open: false,
      component: <></>,
    },
    {
      name: "商品",
      disabled: false,
      open: false,
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
      open: false,
      component: <></>,
    },
    {
      name: "案内所/外販/媒体",
      disabled: true,
      open: false,
      component: <></>,
    },
    {
      name: "料金システム",
      disabled: false,
      open: false,
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
      open: false,
      component: <></>,
    },
    {
      name: "キャスト系統登録",
      disabled: true,
      open: false,
      component: <></>,
    },
    {
      name: "システム",
      disabled: false,
      open: false,
      submenu: [
        {
          name: "店舗情報",
          component: <ShopInfo />,
          disabled: false,
        },
        {
          name: "時間設定",
          component: <></>,
          disabled: true,
        },
        {
          name: "その他",
          component: <Another />,
          disabled: true,
        },
      ],
    },
    {
      name: "ヘルプ",
      disabled: true,
      open: false,
      component: <></>,
    },
  ];

  return (
    <main className="relative h-full w-full">
      <SideMenu nav={nav} />
      <AnimatePresence>
        {nav.map((item) => {
          if (item.submenu) {
            return item.submenu?.map(
              (item) => item.name == masterActivePage && item.component
            );
          } else {
            return item.name == masterActivePage && item.component;
          }
        })}
      </AnimatePresence>
      <HomeButton />
    </main>
  );
}
