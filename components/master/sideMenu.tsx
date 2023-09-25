import Image from "next/image";
import Border from "@/components/master/border";

export default function SideMenu() {
  const nav = [
    {
      name: "キャスト",
      href: "",
    },
    {
      name: "スタッフ",
      href: "",
      submenu: [
        {
          name: "在庫スタッフ",
        },
        {
          name: "アルバイトスタッフ",
        },
      ],
    },
    {
      name: "荷物",
      href: "",
    },
    {
      name: "商品",
      href: "",
    },
    {
      name: "他店舗登録",
      href: "",
    },
    {
      name: "案内所/外販/媒体",
      href: "",
    },
    {
      name: "料金システム",
      href: "",
    },
    {
      name: "客層タイプ登録",
      href: "",
    },
    {
      name: "キャスト系統登録",
      href: "",
    },
    {
      name: "システム",
      href: "",
    },
    {
      name: "ヘルプ",
      href: "",
    },
  ];

  return (
    <div className="absolute font-bold top-0 left-0 w-[200px] h-[100dvh] overflow-y-scroll bg-thirdary border-t-8 border-secondary">
      {nav.map((item, index) => (
        <div
          key={index}
          className="relative flex justify-center items-center text-white w-full h-[60px] border-b-8 border-secondary"
        >
          <p className="pr-[30px] text-center w-full">{item.name}</p>
          <nav className="absolute right-[5px] top-[14px] z-10 cursor-pointer">
            <Border rounded="rounded-full" size="h-[20px] w-[20px] p-[3px]">
              <Image
                src={"/assets/arrows.svg"}
                width={12}
                height={12}
                className="ml-[3px] !h-full !w-full"
                alt=""
              />
            </Border>
          </nav>
        </div>
      ))}
    </div>
  );
}
