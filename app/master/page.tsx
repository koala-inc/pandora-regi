"use client";

import useIsDebugGlobal from "@/globalstates/isDebug";
import Background from "@/components/parts/background";
import TestForm from "@/components/forms/test";
import DebugButton from "@/components/debug/debugButton";
import DebugMenu from "@/components/debug/debugMenu";
import SideMenu from "@/components/master/sideMenu";
import Border from "@/components/templates/border";
import Image from "next/image";
import Link from "next/link";
import CastList from "@/components/master/(cast)/list";
import useActiveMasterGlobal from "@/globalstates/activeMaster";
import HelpCastList from "@/components/master/(cast)/helpCast";
import StaffList from "@/components/master/(staff)/list";
import ArbeitList from "@/components/master/(staff)/arbeit";
import ItemCategoryList from "@/components/master/(item)/category";
import OrderSet from "@/components/master/(item)/orderSet";
import OrderAdd from "@/components/master/(item)/orderAdd";
import BottleAdd from "@/components/master/(item)/bottleAdd";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isDebug] = useIsDebugGlobal();
  const [activeMaster] = useActiveMasterGlobal();

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
      <SideMenu nav={nav} />
      <AnimatePresence>
        {nav.map((item) => {
          if (item.submenu) {
            return item.submenu?.map(
              (item) => item.name == activeMaster && item.component
            );
          } else {
            return item.name == activeMaster && item.component;
          }
        })}
      </AnimatePresence>
      <DebugButton />
      <Link href={"/"}>
        <nav className="absolute right-[15px] top-[15px] z-10 cursor-pointer">
          <Border rounded="rounded-full" size="h-[50px] w-[50px]">
            <Image
              src={"/assets/home.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border>
        </nav>
      </Link>
      {isDebug && <DebugMenu />}
    </main>
  );
}
