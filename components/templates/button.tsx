export default function Button({
  children,
  onClick = () => false,
  disabled = false,
  className,
  natural = false,
}: {
  children: any;
  onClick?: Function;
  disabled?: boolean;
  className?: String;
  natural?: boolean;
}) {
  const disabledCss = disabled ? "grayscale opacity-50" : "";
  const naturalText = natural ? " text-black" : " text-white";
  const naturalBg = natural
    ? " bg-natural min-h-[30px]"
    : " bg-primary min-h-[50px] min-w-[110px]";
  return (
    <div
      className={
        "cursor-pointer rounded-md border border-black bg-black font-bold " +
        className +
        naturalText
      }
      onClick={() => onClick}
    >
      <div className="rounded-md border-4 border-secondary bg-secondary">
        <span
          className={
            "flex tracking-wider leading-4 items-center justify-center rounded-md border border-black px-4 py-1 text-xs " +
            disabledCss +
            naturalBg
          }
        >
          {children}
        </span>
      </div>
    </div>
  );
}
