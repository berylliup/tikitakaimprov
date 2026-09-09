import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./tt.css";

export const metadata: Metadata = {
  title: "TikiTaka Impro — Her an başka. Her an Tiki Taka.",
  description:
    "Kadıköy merkezli uzun form doğaçlama tiyatro kolektifi. Aylık gösteriler, eğitim programları, kurumsal atölyeler.",
  keywords: ["doğaçlama tiyatro", "impro", "tiyatro istanbul", "kadıköy tiyatro", "tikitaka"],
  openGraph: {
    title: "TikiTaka Impro — Her an başka. Her an Tiki Taka.",
    description:
      "Kadıköy merkezli uzun form doğaçlama tiyatro kolektifi. Aylık gösteriler, eğitim programları, kurumsal atölyeler.",
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
    title: "TikiTaka Impro — Her an başka. Her an Tiki Taka.",
    description:
      "Kadıköy merkezli uzun form doğaçlama tiyatro kolektifi. Aylık gösteriler, eğitim programları, kurumsal atölyeler.",
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
      <body className="tt antialiased">
        <Header />
        {children}
        <Footer />
        <Script async src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
