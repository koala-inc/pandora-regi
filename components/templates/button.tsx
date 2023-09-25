export default function Button({
  children,
  onClick = () => false,
  disabled = false,
}: {
  children: any;
  onClick?: Function;
  disabled?: boolean;
}) {
  const disabledCss = disabled ? "opacity-50" : "";
  return (
    <div
      className="cursor-pointer rounded-md border border-black font-bold text-white"
      onClick={() => onClick}
    >
      <div className="rounded-md border-4 border-secondary">
        <span
          className={
            "flex min-h-[50px] min-w-[110px] tracking-wider leading-4 items-center justify-center rounded-md border border-black bg-primary px-4 py-1 text-xs " +
            disabled
          }
        >
          {children}
        </span>
      </div>
    </div>
  );
}
