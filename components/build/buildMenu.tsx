"use client";

export default function Build() {
  return (
    <>
      <div className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center  bg-black/100 p-10 text-white">
        <div
          className="flex h-full w-full flex-col items-center justify-center overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <p>ERROR: Could not complete.</p>
          <div role="alert" className="alert alert-error mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>エラーが1件、発生しています。</span>
          </div>
          <div role="alert" className="alert alert-warning mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              FATAL ERROR: Reached heap limit Allocation failed - JavaScript
              heap out of memory
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
