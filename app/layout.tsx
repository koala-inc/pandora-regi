import "./globals.css";
import "@/configs/mapStyle.css";

export const metadata = {
  title: process.env.npm_package_name,
  description: "バージョン：" + process.env.npm_package_version,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
