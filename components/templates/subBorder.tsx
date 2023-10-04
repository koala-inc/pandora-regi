export default function SubBorder({
  children,
  className,
  rounded = "rounded-md",
  size,
}: {
  children: any;
  className?: string;
  rounded?: string;
  size?: string;
}) {
  return (
    <div
      className={
        "relative flex items-center justify-center bg-primary w-[80%] mb-[11px] mt-[4px] " +
        size
      }
    >
      <div className="absolute top-[-3px] h-2 w-[101%] rounded-full border border-black">
        <div className="h-full w-full rounded-full bg-secondary"></div>
      </div>
      <div className="absolute bottom-[-3px] h-2 w-[101%] rounded-full border border-black">
        <div className="h-full w-full rounded-full bg-secondary"></div>
      </div>
      {children}
    </div>
  );
}
