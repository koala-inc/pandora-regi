export default function Border({
  children,
  className,
  rounded = "rounded-xl",
  size,
  natural = false,
  stroke = "xl",
  black = false,
  complate = false,
  red = false,
}: {
  children: any;
  className?: string;
  rounded?: string;
  size?: string;
  natural?: boolean;
  stroke?: string;
  black?: boolean;
  complate?: boolean;
  red?: boolean;
}) {
  const text = natural ? "text-black" : "text-white";
  const bg = red
    ? "bg-redc"
    : complate
    ? "bg-complate"
    : natural
    ? "bg-natural"
    : black
    ? "bg-neutral-900"
    : "bg-primary";
  const type =
    stroke == "xl"
      ? "border-4"
      : stroke == "lg"
      ? "border-[3px]"
      : stroke == "md"
      ? "border-2"
      : "border";
  return (
    <div
      className={
        "border border-black bg-black " + className + " " + rounded + " " + text
      }
    >
      <div className={"border-secondary bg-secondary " + rounded + " " + type}>
        <span
          className={
            "flex items-center justify-center border border-black " +
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
