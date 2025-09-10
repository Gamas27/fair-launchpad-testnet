import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/WagmiProvider";
import { WorldIdProvider } from "@/providers/WorldIdProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FairLaunch UI - Anti-Bot Meme Coin Launchpad",
  description: "A fair meme coin launchpad that uses World ID's Proof of Personhood to prevent bot manipulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <WorldIdProvider
            config={{
              appId: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || 'app_staging_1234567890abcdef',
              action: 'verify-human',
              signal: 'anti-bot-launchpad'
            }}
          >
            {children}
          </WorldIdProvider>
        </Providers>
      </body>
    </html>
  );
}
