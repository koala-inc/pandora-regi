import Image from "next/image";

export default function Background() {
  return (
    <Image
      src={"/assets/background.jpg"}
      width={2000}
      height={2000}
      className="fixed left-0 top-0 -z-50 !h-[100dvh] !w-[100dvw] object-cover object-center"
      alt=""
    />
  );
}
