"use client";

export default function Build() {
  return (
    <>
      <div className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center  bg-black/100 p-10 text-white">
        <div
          className="flex h-full w-full items-center justify-center overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    </>
  );
}
