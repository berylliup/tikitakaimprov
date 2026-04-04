import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikiTaka Impro — Doğaçlama Tiyatro",
  description:
    "Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında yazılan oyunlar. İstanbul Kadıköy'de her ay sahnedeyiz.",
  keywords: ["doğaçlama tiyatro", "impro", "tiyatro istanbul", "kadıköy tiyatro", "tikitaka"],
  openGraph: {
    title: "TikiTaka Impro — Doğaçlama Tiyatro",
    description:
      "Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında yazılan oyunlar.",
    url: "https://tikitakaimprov.com",
    siteName: "TikiTaka Impro",
    images: [
      {
        url: "https://tikitakaimprov.com/group.jpeg",
        width: 1200,
        height: 630,
        alt: "TikiTaka Impro",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikiTaka Impro — Doğaçlama Tiyatro",
    description:
      "Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında yazılan oyunlar.",
    images: ["https://tikitakaimprov.com/group.jpeg"],
  },
  metadataBase: new URL("https://tikitakaimprov.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Script async src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}