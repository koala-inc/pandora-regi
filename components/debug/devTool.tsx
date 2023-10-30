"use client";

import DebugButton from "./debugButton";
import DebugMenu from "./debugMenu";

import useSettingsGlobal from "@/globalstates/settings";

export default function DevTool() {
  const [settings] = useSettingsGlobal();
  if (process.env.NEXT_PUBLIC_MODE == "dev") {
    return (
      <>
        <DebugButton />
        {settings.isDebug && <DebugMenu />}
      </>
    );
  }
  return <></>;
}
