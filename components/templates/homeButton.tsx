import Link from "next/link";
import Border from "./border";
import Image from "next/image";
import useIsCardGlobal from "@/globalstates/isCard";
import usePurchaseOrderItemAddGlobal from "@/globalstates/purchaseOrderItemAdd";

export default function HomeButton() {
  const [isCard, setIsCard] = useIsCardGlobal();
  const [purchaseOrderItemAdd, setPurchaseOrderItemAdd] =
    usePurchaseOrderItemAddGlobal();

  return (
    <Link
      href={"/"}
      onClick={() => {
        setIsCard(false);
        setPurchaseOrderItemAdd([]);
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
