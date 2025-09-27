import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MiniAppWrapper } from "@/components/WorldApp/MiniAppWrapper";

export const metadata: Metadata = {
  title: "FairLaunch UI - Anti-Bot Meme Coin Launchpad",
  description: "A fair meme coin launchpad that uses World ID's Proof of Personhood to prevent bot manipulation",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FairLaunch",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FairLaunch" />
      </head>
      <body className="font-sans antialiased">
        <MiniAppWrapper>
          {children}
        </MiniAppWrapper>
      </body>
    </html>
  );
}
