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

export default function Home() {
  const [isDebug] = useIsDebugGlobal();

  return (
    <main className="relative h-full w-full">
      <Background />
      <SideMenu />
      <TestForm />
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
