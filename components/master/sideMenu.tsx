import Image from "next/image";
import Border from "@/components/master/border";
import useMasterActivePageGlobal from "@/globalstates/masterActivePage";
import { useState } from "react";

export default function SideMenu({
  nav,
}: {
  nav: {
    name: string;
    disabled: boolean;
    open: boolean;
    submenu?: {
      name: string;
      component: JSX.Element;
      disabled: boolean;
    }[];
    component?: JSX.Element;
  }[];
}) {
  const [, setMasterActivePage] = useMasterActivePageGlobal();

  const initNav = nav;

  const [open, setOpen] = useState(initNav);
  const [update, setUpdate] = useState(false);

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

            <div
              className={
                open[index].open
                  ? "absolute right-[5px] top-[14px] z-10 rotate-90 cursor-pointer transition-transform"
                  : "absolute right-[5px] top-[14px] z-10 cursor-pointer transition-transform"
              }
              onClick={() => {
                if (!open[index].open) {
                  let temp = nav.map((item) => {
                    item.open = false;
                    return item;
                  });
                  temp[index].open = true;
                  setOpen(temp);
                } else {
                  setOpen(
                    nav.map((item) => {
                      item.open = false;
                      return item;
                    })
                  );
                }
                setUpdate((update) => !update);
              }}
            >
              <Border rounded="rounded-full" size="h-[20px] w-[20px] p-[3px]">
                <Image
                  src={"/assets/arrows.svg"}
                  width={12}
                  height={12}
                  className="ml-[1px] !h-full !w-full"
                  alt=""
                />
              </Border>
            </div>
          </div>
          {item.submenu && open[index].open && (
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
                  onClick={() => setMasterActivePage(item.name)}
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
