import { Metadata } from "next";
import "./globals.css";

const appRoot = "https://laverna.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appRoot),
  title: process.env.npm_package_name || "",
  description: "バージョン：" + process.env.npm_package_version || "",
  applicationName: process.env.npm_package_name || "",
  authors: {
    name: process.env.npm_package_author || "",
    url: "",
  },
  generator: process.env.npm_package_author || "",
  referrer: "origin",
  themeColor: "#000",
  colorScheme: "dark",
  viewport: {
    width: "device-width",
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    interactiveWidget: "resizes-visual",
  },
  creator: process.env.npm_package_author || "",
  publisher: process.env.npm_package_author || "",
  robots:
    "noarchive nositelinkssearchbox nosnippet max-image-preview:none max-video-preview:0 noimageindex",
  alternates: {
    canonical: appRoot,
  },
  icons: [
    { rel: "icon", url: "/icons/logo.png" },
    { rel: "apple-touch-icon", url: "/icons/logo.png" },
    { rel: "shortcut icon", url: "/icons/logo.png" },
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: process.env.npm_package_name || "",
    description: process.env.npm_package_description || "",
    url: appRoot,
    siteName: process.env.npm_package_name || "",
    images: [
      {
        url: "/icons/logo.png",
        width: 800,
        height: 600,
        alt: (process.env.npm_package_name || "") + " logo",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: process.env.npm_package_name || "",
    siteId: process.env.npm_package_name || "",
    creator: "@" + process.env.npm_package_author || "",
    creatorId: "@" + process.env.npm_package_author || "",
    description: process.env.npm_package_description || "",
    title: process.env.npm_package_name || "",
    images: "/icons/logo.png",
  },
  appleWebApp: {
    capable: true,
    title: process.env.npm_package_name || "",
    startupImage: [
      {
        url: "/icons/logo.png",
        media: "all",
      },
    ],
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    date: true,
    address: false,
    email: false,
    url: true,
  },
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
