import Link from "next/link";
import Border from "./border";
import Image from "next/image";

export default function HomeButton() {
  return (
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
  );
}
