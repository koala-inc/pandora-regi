export default function Border({
  children,
  className,
  rounded = "rounded-md",
  size,
  natural = false,
  black = false,
}: {
  children: any;
  className?: string;
  rounded?: string;
  size?: string;
  natural?: boolean;
  black?: boolean;
}) {
  const text = natural ? "text-black" : "text-white";
  const bg = natural ? "bg-natural" : black ? "bg-neutral-900" : "bg-primary";
  return (
    <div
      className={
        "border border-black " + className + " " + rounded + " " + text
      }
    >
      <div
        className={
          "border-2 border-secondary max-h-[calc(100dvh-50px)] overflow-scroll " +
          rounded
        }
      >
        <span
          className={
            "flex items-center justify-start border border-black " +
            rounded +
            " " +
            size +
            " " +
            bg
          }
        >
          {children}
        </span>
      </div>
    </div>
  );
}
