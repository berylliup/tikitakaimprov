"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Label, TICKET_URL, TICKET_ALT_URL, IG_URL } from "@/components/ds";

const NAV_LINKS = [
  { href: "/", label: "Gösteriler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/egitim", label: "Eğitim" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Footer() {
  const pathname = usePathname();
  // Ekip alanı tam ekran çalışıyor, site alt bilgisi orada gizleniyor.
  if (pathname.startsWith("/ekip")) return null;

  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="stack" style={{ gap: "var(--s4)" }}>
          <Image src="/logo-negatif.png" alt="Tiki Taka Impro" width={65} height={50} unoptimized style={{ height: 50, width: "auto", alignSelf: "flex-start" }} />
          <p className="b2" style={{ maxWidth: "34ch" }}>
            Kadıköy merkezli doğaçlama tiyatro kolektifi. 2018&apos;den beri sahnedeyiz.
          </p>
        </div>
        <div className="ft-col">
          <Label tone="brand">Sayfalar</Label>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>
        <div className="ft-col">
          <Label tone="brand">Neredeyiz</Label>
          <span>Kadıköy</span>
          <span>İstanbul</span>
        </div>
        <div className="ft-col">
          <Label tone="brand">İletişim</Label>
          <a href="mailto:info@tikitakaimprov.com">info@tikitakaimprov.com</a>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer">@tikitakaimpro</a>
          <a href={TICKET_URL} target="_blank" rel="noopener noreferrer">Biletinial</a>
          <a href={TICKET_ALT_URL} target="_blank" rel="noopener noreferrer">Bubilet</a>
        </div>
      </div>
      <div className="ft-bot">
        <div className="mono" style={{ display: "flex", gap: "var(--s4)", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "var(--tt-sari)" }}>×&nbsp;·&nbsp;+</span>
          tikitakaimprov.com · {new Date().getFullYear()} · her an başka, her an Tiki Taka
        </div>
      </div>
    </footer>
  );
}
