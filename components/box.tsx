export default function Box({ children }: { children: any }) {
  return (
    <div className="cursor-pointer rounded-md border border-black">
      <div className="rounded-md border-4 border-secondary">
        <span className="flex items-center justify-center rounded-md border border-black bg-primary px-4 py-2">
          {children}
        </span>
      </div>
    </div>
  );
}
