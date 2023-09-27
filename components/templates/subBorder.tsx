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
      <div className="absolute top-[-3px] w-[101%] h-2 border border-black rounded-full">
        <div className="bg-secondary rounded-full w-full h-full"></div>
      </div>
      <div className="absolute bottom-[-3px] h-2 w-[101%] border border-black rounded-full">
        <div className="bg-secondary rounded-full w-full h-full"></div>
      </div>
      {children}
    </div>
  );
}
