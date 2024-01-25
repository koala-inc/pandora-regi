export default function Button({
  children,
  onClick = () => false,
  disabled = false,
  className,
  natural = false,
  bg,
}: {
  children: any;
  onClick?: Function;
  disabled?: boolean;
  className?: String;
  natural?: boolean;
  bg?: string;
}) {
  const disabledCss = disabled ? "grayscale opacity-50" : "";
  const naturalText = natural ? " text-black" : " text-white";
  const naturalBg = natural
    ? " bg-natural min-h-[30px]"
    : " bg-primary min-h-[50px] min-w-[110px]";

  let bgColor = "";
  let bgText = "";

  switch (bg) {
    case "red":
      bgColor = " bg-[#6b0012]";
      bgText = " text-white";
      break;
    case "blue":
      bgColor = " bg-[#002d6b]";
      bgText = " text-white";
      break;
    case "green":
      bgColor = " bg-[#006b3e]";
      bgText = " text-white";
      break;
    case "orange":
      bgColor = " bg-[#e83929]";
      bgText = " text-white";
      break;
  }

  return (
    <div
      className={
        "cursor-pointer rounded-md border border-black bg-black font-bold " +
        className +
        naturalText +
        bgText
      }
      onClick={() => (onClick ? onClick() : "")}
    >
      <div className="rounded-md border-4 border-secondary bg-secondary">
        <div
          className={
            "flex tracking-wider leading-4 items-center justify-center rounded-md border border-black px-4 py-1 text-xs " +
            disabledCss +
            naturalBg +
            bgColor
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
