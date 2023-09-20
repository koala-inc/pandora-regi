export default function Seat({
  children,
  id,
  area,
}: {
  children: any;
  id: string;
  area: string;
}) {
  return (
    <div
      className={
        "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-black bg-[#f3e1bc] font-bold text-[#e97e00] shadow-md transition-all " +
        area
      }
    >
      <div className={"absolute opacity-20"}>{children}</div>
      <div className="absolute w-[200%] scale-50 text-center text-[0.5rem] leading-[0.8rem] text-black">
        ◯キャストXA
        <br />
        ◯キャストXB
        <br />
        ◯キャストXC
      </div>
    </div>
  );
}
