"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TICKET_URL = "https://biletinial.com/tr-tr/tiyatro/tiki-taka-dogaclama-tiyatro";
const IG_URL = "https://instagram.com/tikitakaimpro";

const NAV_LINKS = [
  { href: "/", label: "GÖSTERİLER" },
  { href: "/hakkimizda", label: "HAKKIMIZDA" },
  { href: "/egitim", label: "EĞİTİM" },
  { href: "/kurumsal", label: "KURUMSAL" },
  { href: "/iletisim", label: "İLETİŞİM" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col justify-between">
      <span className={`block h-0.5 w-full bg-black transition-all duration-300 origin-top-left ${open ? "rotate-45 translate-x-px" : ""}`} />
      <span className={`block h-0.5 bg-black transition-all duration-300 ${open ? "w-0 opacity-0" : "w-full opacity-100"}`} />
      <span className={`block h-0.5 w-full bg-black transition-all duration-300 origin-bottom-left ${open ? "-rotate-45 translate-x-px" : ""}`} />
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7.5a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm4.75-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image src="/logo.png" alt="TikiTaka Impro" width={56} height={56} priority className="h-14 w-14 shrink-0 object-contain" />
          <span className="text-xl font-extrabold leading-none tracking-tight whitespace-nowrap">TikiTaka Impro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-lg font-extrabold uppercase tracking-wide">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:opacity-70 transition ${isActive(l.href) ? "border-b-2 border-[#FFCB00] pb-0.5" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <a href={IG_URL} target="_blank" rel="noreferrer" className="hover:opacity-70 transition" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={TICKET_URL} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#FFCB00] px-5 py-2 text-base font-bold hover:opacity-90 transition">
            Bilet Al
          </a>
          <button
            className="flex md:hidden items-center justify-center p-2 -mr-1 rounded-lg hover:bg-black/5 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-base font-extrabold uppercase tracking-wide hover:bg-[#FFCB00]/20 transition ${isActive(l.href) ? "bg-[#FFCB00]/10" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <a href={TICKET_URL} target="_blank" rel="noreferrer" onClick={closeMenu} className="mt-2 flex items-center justify-center rounded-full bg-[#FFCB00] px-6 py-3 text-base font-bold hover:opacity-90 transition">
            Bilet Al
          </a>
        </nav>
      </div>

      <div className="h-[2px] bg-[#FFCB00]" />
    </header>
  );
}
