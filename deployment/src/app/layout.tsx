import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/WagmiProvider";
import { SafeWorldIdProvider } from "@/providers/SafeWorldIdProvider";
import { MiniAppWrapper } from "@/components/WorldApp/MiniAppWrapper";

export const metadata: Metadata = {
  title: "FairLaunch UI - Anti-Bot Meme Coin Launchpad",
  description: "A fair meme coin launchpad that uses World ID's Proof of Personhood to prevent bot manipulation",
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FairLaunch",
  },
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
          <Providers>
            <SafeWorldIdProvider
              config={{
                appId: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || 'app_staging_1234567890abcdef',
                action: 'verify-human',
                signal: 'anti-bot-launchpad'
              }}
            >
              {children}
            </SafeWorldIdProvider>
          </Providers>
        </MiniAppWrapper>
      </body>
    </html>
  );
}
