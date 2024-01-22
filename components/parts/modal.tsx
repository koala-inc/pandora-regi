import Image from "next/image";

export default function Modal({ children, setModal }: any) {
  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-start justify-center bg-black/70 p-10 text-white"
      onClick={() => setModal(false)}
    >
      <div
        className="relative rounded-md border border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => setModal(false)}
        >
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black bg-primary p-[6px]">
            <Image
              src={"/assets/close.svg"}
              width={18}
              height={18}
              className="z-10 !h-full !w-full"
              alt=""
            />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
