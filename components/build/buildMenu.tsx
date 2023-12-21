"use client";

export default function Build() {
  return (
    <>
      <div className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center  bg-white/100 p-10 text-white">
        <div
          className="flex h-[90%] w-full max-w-[1000px] flex-col items-center justify-start overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    </>
  );
}
