"use client";

import useIsDebugGlobal from "@/globalstates/isDebug";
import Background from "@/components/parts/background";
import TestForm from "@/components/forms/test";
import DebugButton from "@/components/debug/debugButton";
import DebugMenu from "@/components/debug/debugMenu";

export default function Home() {
  const [isDebug] = useIsDebugGlobal();

  return (
    <main className="relative h-full w-full">
      <Background />
      <TestForm />
      <DebugButton />
      {isDebug && <DebugMenu />}
    </main>
  );
}
