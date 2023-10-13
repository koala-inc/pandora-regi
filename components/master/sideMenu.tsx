import Image from "next/image";
import Border from "@/components/master/border";
import useActiveMasterGlobal from "@/globalstates/activeMaster";

export default function SideMenu({
  nav,
}: {
  nav: {
    name: string;
    disabled: boolean;
    submenu?: {
      name: string;
      component: JSX.Element;
      disabled: boolean;
    }[];
    component?: JSX.Element;
  }[];
}) {
  const [, setActiveMaster] = useActiveMasterGlobal();

  return (
    <div className="absolute left-0 top-0 h-[100dvh] w-[200px] overflow-y-scroll border-t-8 border-secondary bg-thirdary font-bold">
      {nav.map((item, index) => (
        <>
          <div
            key={index}
            className={`relative flex h-[60px] w-full items-center justify-center border-b-8 border-secondary text-white first-letter:relative ${
              item.disabled ? "disabled" : ""
            }`}
          >
            <p className="w-full pr-[30px] text-center">{item.name}</p>

            <nav className="absolute right-[5px] top-[14px] z-10 rotate-90 cursor-pointer transition-transform">
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
          {item.submenu && (
            <div
              key={index}
              className={`relative flex w-full flex-col items-center justify-center border-b-8 border-secondary bg-neutral-600 py-2 text-white first-letter:relative ${
                item.disabled ? "disabled" : ""
              }`}
            >
              {item.submenu?.map((item, index) => (
                <div
                  key={index}
                  className="my-2 w-full text-center"
                  onClick={() => setActiveMaster(item.name)}
                >
                  {item.name}
                  <div className="mx-auto mt-1 w-1/2 border-[0.5px]" />
                </div>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
