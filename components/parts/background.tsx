import Image from "next/image";

export default function Background() {
  return (
    <Image
      src={"/assets/background.jpg"}
      fill
      className="-z-50 object-cover object-center"
      alt=""
    />
  );
}
