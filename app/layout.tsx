import { Metadata, Viewport } from "next";
import "./globals.css";
import DevTool from "@/components/debug/devTool";
import Background from "@/components/parts/background";
import Build from "@/components/build/buildMenu";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
  title: process.env.npm_package_name || "",
  description: "バージョン：" + process.env.npm_package_version || "",
  applicationName: process.env.npm_package_name || "",
  authors: {
    name: process.env.npm_package_author || "",
    url: "",
  },
  generator: process.env.npm_package_author || "",
  referrer: "origin",
  creator: process.env.npm_package_author || "",
  publisher: process.env.npm_package_author || "",
  robots:
    "noarchive nositelinkssearchbox nosnippet max-image-preview:none max-video-preview:0 noimageindex",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "",
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
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
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

export const viewport: Viewport = {
  themeColor: "#000",
  colorScheme: "dark",
  width: "device-width",
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="relative h-full w-full">
        <Background />
        {children}
        <DevTool />
        <Build />
      </body>
    </html>
  );
}
