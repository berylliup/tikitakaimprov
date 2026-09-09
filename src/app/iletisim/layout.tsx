import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — TikiTaka Impro",
  description:
    "Bilet, eğitim başvurusu, kurumsal program ya da merak edilen her şey için bize ulaşın. İki iş günü içinde dönüş yapıyoruz.",
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
