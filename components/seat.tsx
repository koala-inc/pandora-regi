export default function Seat({
  children,
  id,
  area,
}: {
  children: any;
  id: string;
  area: string;
}) {
  const overlay = true;

  // 指名は0.5rem
  // 入退店は0.8rem
  return (
    <div
      className={
        "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-black bg-[#f3e1bc] font-bold text-[#e97e00] shadow-md transition-all " +
        area
      }
    >
      {overlay ? (
        <>
          <div className="absolute opacity-20">{children}</div>
          <div className="absolute w-[200%] scale-50 text-center text-[1.5rem] font-bold leading-[1.5rem] text-black">
            20:00
            <br />
            ~
            <br />
            21:00
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
