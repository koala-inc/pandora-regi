import Image from "next/image";
import useSettingsGlobal from "@/globalstates/settings";

export default function DebugButton() {
  const [settings, setSettings] = useSettingsGlobal();

  return (
    <div
      className="absolute bottom-[15px] left-[15px] z-50 h-[50px] w-[50px]"
      onClick={() => setSettings({ ...settings, isDebug: !settings.isDebug })}
    >
      <Image
        src="/assets/debug.svg"
        width={30}
        height={30}
        className="!h-full !w-full"
        alt=""
      />
    </div>
  );
}
