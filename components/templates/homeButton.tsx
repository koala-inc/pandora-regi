import Link from "next/link";
import Border from "./border";
import Image from "next/image";
import useIsCardGlobal from "@/globalstates/isCard";
import usePurchaseOrderItemAddGlobal from "@/globalstates/purchaseOrderItemAdd";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import useIsControlGlobal from "@/globalstates/isControl";
import useOrderGlobal from "@/globalstates/order";

export default function HomeButton() {
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();
  const [order, setOrder] = useOrderGlobal();

  return (
    <Link
      href={"/"}
      onClick={() => {
        setIsCard(false);
        setIsControl("");
        setPurchaseOrderItemAdd([]);
        setSeatPreset("");
        setOrder([]);
      }}
    >
      <nav className="absolute right-[15px] top-[15px] z-30 cursor-pointer">
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
  );
}
