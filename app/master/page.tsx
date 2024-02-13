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

import "react-cmdk/dist/cmdk.css";
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useSettingsGlobal from "@/globalstates/settings";
import SeatCategory from "@/components/master/(payment)/seatCategory";
import SetPayment from "@/components/master/(payment)/setPayment";
import Designate from "@/components/master/(payment)/designate";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import SeatEditor from "@/components/master/(system)/seatEditor";

export default function Mater() {
  const [settings, setSettings] = useSettingsGlobal();
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();

  if (isHeader || isFooter || isCard || isControl) {
    setIsHeader(false);
    setIsFooter(false);
    setIsCard(false);
    setIsControl(false);
  }

  const [page, setPage] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = filterItems(
    [
      {
        heading: "キャスト",
        id: "page-cast",
        items: [
          {
            id: "cast",
            children: "在籍キャスト",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["cast"],
            onClick: () => {
              setMasterActivePage("在籍キャスト");
            },
          },
          {
            id: "help-cast",
            children: "ヘルプ/体入キャスト",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["cast", "help"],
            onClick: () => {
              setMasterActivePage("ヘルプ・体入キャスト");
            },
          },
        ],
      },
      {
        heading: "スタッフ",
        id: "page-staff",
        items: [
          {
            id: "staff",
            children: "在籍スタッフ",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["staff"],
            onClick: () => {
              setMasterActivePage("在籍スタッフ");
            },
          },
          {
            id: "arbeit-staff",
            children: "アルバイトスタッフ",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["staff", "arbeit"],
            onClick: () => {
              setMasterActivePage("アルバイトスタッフ");
            },
          },
        ],
      },
      {
        heading: "商品",
        id: "page-product",
        items: [
          {
            id: "product-category",
            children: "商品カテゴリー",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["product", "category"],
            onClick: () => {
              setMasterActivePage("商品カテゴリー");
            },
          },
          {
            id: "order-set",
            children: "オーダー配置",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["order", "set"],
            onClick: () => {
              setMasterActivePage("オーダー配置");
            },
          },
          {
            id: "order-add",
            children: "オーダー登録",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["order", "add"],
            onClick: () => {
              setMasterActivePage("オーダー登録");
            },
          },
          {
            id: "bottle-add",
            children: "ボトル登録",
            icon: "HomeIcon",
            closeOnSelect: true,
            keywords: ["bottle", "add"],
            onClick: () => {
              setMasterActivePage("ボトル登録");
            },
          },
        ],
      },
      {
        heading: "デバッグ",
        id: "debug",
        items: [
          {
            id: "developer-settings",
            children: "デバッグモード起動",
            icon: "CodeBracketIcon",
            keywords: ["debug"],
            onClick: () => {
              setSettings({ ...settings, isDebug: !settings.isDebug });
            },
          },
        ],
      },
    ],
    search
  );

  useHotkeys("ctrl+p", () => setOpen((open) => true));

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
          disabled: false,
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
          disabled: false,
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
          disabled: false,
        },
        {
          name: "オーダー登録",
          component: <OrderAdd />,
          disabled: false,
        },
        {
          name: "ボトル登録",
          component: <BottleAdd />,
          disabled: false,
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
          component: <SeatCategory />,
          disabled: false,
        },
        {
          name: "セット料金",
          component: <SetPayment />,
          disabled: false,
        },
        {
          name: "指名料",
          component: <Designate />,
          disabled: false,
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
          name: "席エディター",
          component: <SeatEditor />,
          disabled: false,
        },
        {
          name: "その他",
          component: <Another />,
          disabled: false,
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
      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
        page={page}
      >
        <CommandPalette.Page id="root">
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>

        {/* <CommandPalette.Page id="projects"> */}
        {/* Projects page */}
        {/* </CommandPalette.Page> */}
      </CommandPalette>
      <HomeButton />
    </main>
  );
}
