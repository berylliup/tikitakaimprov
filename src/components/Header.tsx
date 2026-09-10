"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TICKET_URL = "https://biletinial.com/tr-tr/tiyatro/tiki-taka-dogaclama-tiyatro";

// short: mobilde tek satira sigsin diye kisa etiket.
const NAV_LINKS = [
  { href: "/", label: "Gösteriler", short: "Oyunlar" },
  { href: "/hakkimizda", label: "Hakkımızda", short: "Hakkında" },
  { href: "/egitim", label: "Eğitim", short: "Eğitim" },
  { href: "/kurumsal", label: "Kurumsal", short: "Kurumsal" },
  { href: "/iletisim", label: "İletişim", short: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();
  // Ekip alanının kendi koyu başlığı var, site başlığı orada gizleniyor.
  if (pathname.startsWith("/ekip")) return null;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link href="/" style={{ display: "flex" }}>
          <Image src="/logo-ana.png" alt="Tiki Taka Impro" width={50} height={38} priority unoptimized style={{ height: 38, width: "auto" }} />
        </Link>
        <nav className="nav">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "on" : ""}>
              <span className="nav-full">{l.label}</span>
              <span className="nav-short">{l.short}</span>
            </Link>
          ))}
        </nav>
        <a className="btn btn-sm" href={TICKET_URL} target="_blank" rel="noopener noreferrer">
          Bilet Al
        </a>
      </div>
    </header>
  );
}
