import type { Metadata } from "next";
import { Inter } from "next/font/google";

import BottomNav from "@/components/layout/BottomNav";
import ChatSuporte from "@/components/layout/ChatSuporte";
import CookieBanner from "@/components/layout/CookieBanner";
import ScrollToTop from "@/components/layout/ScrollToTop";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "NovaBet - Cassino Online",
  description: "O melhor cassino online do Brasil",
  icons: {
    icon: "/images/ICON_NB.webp",
    shortcut: "/images/ICON_NB.webp",
    apple: "/images/ICON_NB.webp"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} ${inter.variable} bg-nova-bg text-nova-text antialiased`}>
        {children}
        <ChatSuporte />
        <CookieBanner />
        <ScrollToTop />
        <BottomNav />
      </body>
    </html>
  );
}
