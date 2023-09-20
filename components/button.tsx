export default function Button({
  children,
  onClick,
}: {
  children: any;
  onClick: Function;
}) {
  return (
    <div
      className="cursor-pointer rounded-md border border-black"
      onClick={() => onClick}
    >
      <div className="rounded-md border-4 border-secondary">
        <span className="flex items-center justify-center rounded-md border border-black bg-primary px-4 py-2">
          {children}
        </span>
      </div>
    </div>
  );
}
