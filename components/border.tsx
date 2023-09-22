export default function Border({
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
    <div className={"border border-black " + className + " " + rounded}>
      <div className={"border-4 border-secondary " + rounded}>
        <span
          className={
            "flex items-center justify-center border border-black bg-primary " +
            rounded +
            " " +
            size
          }
        >
          {children}
        </span>
      </div>
    </div>
  );
}
