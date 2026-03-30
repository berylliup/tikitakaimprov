"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE  = "service_r5nfslt";
const EMAILJS_TEMPLATE = "template_8rlm4b7";
const EMAILJS_KEY      = "A2YS30u-Pv8tSCZ-V";

const GALLERY = Array.from({ length: 9 }, (_, i) => `/gallery${i + 1}.jpg`);

function GallerySection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold mb-10">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY.map((src) => (
          <button
            key={src}
            onClick={() => setActive(src)}
            className="relative overflow-hidden rounded-2xl focus:outline-none group"
            style={{ aspectRatio: "3 / 2" }}
          >
            <Image
              src={src}
              alt="TikiTaka Impro"
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-4xl w-full" style={{ aspectRatio: "3 / 2" }} onClick={(e) => e.stopPropagation()}>
            <Image src={active} alt="TikiTaka Impro" fill className="object-contain rounded-2xl" />
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-black/60 text-white text-lg font-bold hover:bg-black transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const TICKET_URL = "https://biletinial.com/tr-tr/tiyatro/tiki-taka-dogaclama-tiyatro";
const IG_URL = "https://instagram.com/tikitakaimpro";

const NAV_LINKS = [
  { href: "#shows", label: "GÖSTERİLER" },
  { href: "#about", label: "HAKKIMIZDA" },
  { href: "#education", label: "EĞİTİM" },
  { href: "#corporate", label: "KURUMSAL" },
  { href: "#contact", label: "İLETİŞİM" },
];

const SHOWS = [
  { date: new Date("2026-04-01T20:00") },
  { date: new Date("2026-04-09T20:00") },
  { date: new Date("2026-04-17T20:00") },
  { date: new Date("2026-04-24T20:00") },
  { date: new Date("2026-05-01T20:00") },
  { date: new Date("2026-05-13T20:00") },
  { date: new Date("2026-05-20T20:00") },
];

const PLAYERS = [
  { name: "ARZU", src: "/arzu.png" },
  { name: "BERİL", src: "/beril.png" },
  { name: "BARANSEL", src: "/baransel.png" },
  { name: "HİKMET", src: "/hikmet.png" },
  { name: "VEYİS", src: "/veyis.png" },
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormState("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY);
      setFormState("success");
      formRef.current.reset();
    } catch {
      setFormState("error");
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image src="/logo.png" alt="TikiTaka Impro" width={56} height={56} priority className="h-14 w-14 shrink-0 object-contain" />
            <span className="text-xl font-extrabold leading-none tracking-tight whitespace-nowrap">TikiTaka Impro</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-lg font-extrabold uppercase tracking-wide">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:opacity-70 transition">{l.label}</a>
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
              <a key={l.href} href={l.href} onClick={closeMenu} className="rounded-xl px-4 py-3 text-base font-extrabold uppercase tracking-wide hover:bg-[#FFCB00]/20 transition">
                {l.label}
              </a>
            ))}
            <a href={TICKET_URL} target="_blank" rel="noreferrer" onClick={closeMenu} className="mt-2 flex items-center justify-center rounded-full bg-[#FFCB00] px-6 py-3 text-base font-bold hover:opacity-90 transition">
              Bilet Al
            </a>
          </nav>
        </div>

        <div className="h-[2px] bg-[#FFCB00]" />
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen w-full">
        <Image src="/group.png" alt="TikiTaka Impro ekip" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Her an başka. Her an Tiki Taka.</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında yazılan oyunlar.</p>
          <a href={TICKET_URL} target="_blank" rel="noreferrer" className="mt-8 rounded-full bg-[#FFCB00] px-10 py-4 text-lg font-semibold text-black hover:opacity-90 transition">
            Bilet Al
          </a>
        </div>
      </section>

      {/* ── OYUNCULAR ── */}
      <section className="w-full bg-[#FFCB00] py-16">
        <div className="mx-auto flex max-w-none flex-col items-center px-6 sm:px-10">
          <h2 className="mb-10 sm:mb-14 text-4xl sm:text-5xl font-extrabold uppercase tracking-widest text-black text-center">OYUNCULAR</h2>
          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-nowrap gap-8 sm:gap-14 px-2 sm:justify-center">
              {PLAYERS.map((p) => (
                <div key={p.name} className="flex flex-col items-center shrink-0">
                  <div className="relative h-[360px] w-[210px] sm:h-[420px] sm:w-[240px]">
                    <Image src={p.src} alt={p.name} fill className="rounded-[40px] object-cover" />
                  </div>
                  <div className="mt-5 sm:mt-6 rounded-xl bg-white px-8 sm:px-10 py-2">
                    <span className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-black">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GÖSTERİLER ── */}
      <section id="shows" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold">Gösteriler</h2>
          <a href={TICKET_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold underline hover:opacity-70 transition">Biletinial →</a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {SHOWS.map((show, i) => {
            const dateLabel = show.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
            const timeLabel = show.date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
            return (
              <a key={i} href={TICKET_URL} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-black/10 bg-white hover:-translate-y-0.5 hover:shadow-lg transition">
                <img src="/poster.jpeg" alt={`TikiTaka - ${dateLabel}`} className="h-[260px] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-extrabold">TikiTaka Impro</h3>
                  <p className="mt-2 text-sm text-zinc-600">{dateLabel} • {timeLabel}</p>
                  <p className="mt-2 text-sm font-semibold text-zinc-800">Kadıköy Kılçık Mekan</p>
                  <div className="mt-5">
                    <span className="flex w-full items-center justify-center rounded-xl bg-[#FFCB00] px-5 py-3 text-sm font-extrabold text-black">BİLETİNİ AL</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── HAKKIMIZDA ── */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">Hakkımızda</h2>
        <div className="relative mt-10 w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "16 / 9" }}>
          <Image src="/aboutus1.jpg" alt="Tiki Taka sahnede" fill className="object-cover" />
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
          <div className="text-zinc-800 leading-8 flex flex-col justify-center">
            <p className="mb-6">
              Tiki Taka, 2021 yılında <strong>Hayal Meal Sahne</strong>{" "}bünyesinde bir araya gelen oyuncular tarafından kuruldu. O günden bu yana aynı sahnede, aynı oyunda ve aynı merakla birlikte doğaçlıyoruz.
            </p>
            <p>Kısa ve uzun form doğaçlama gösterileri üretiyor; her oyunda seyirciyle birlikte, sıfırdan bir dünya kuruyoruz. Yazılı metin yok, tekrar yok, her şey anda.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 min-w-0">
            <div className="relative w-full h-[360px] overflow-hidden rounded-3xl">
              <Image src="/aboutus2.png" alt="Gösteriden bir an" fill className="object-cover object-center" />
            </div>
            <div className="relative w-full h-[360px] overflow-hidden rounded-3xl">
              <Image src="/aboutus3.png" alt="Seyirciyle etkileşim" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* ── REELS ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Sahneden</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            "https://www.instagram.com/reel/DUQ5mS7DBgY/",
            "https://www.instagram.com/reel/DWdnHjoDILE/",
            "https://www.instagram.com/reel/DTYIDyhjMcD/",
          ].map((url) => (
            <div key={url} className="flex justify-center">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                data-instgrm-captioned
                style={{ maxWidth: "100%", minWidth: 0 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERİ ── */}
      <GallerySection />

      {/* ── EĞİTİM ── */}
      <section id="education" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Doğaçlama eğitimleri</h2>
            <p className="text-zinc-600 leading-8 mb-8">
              Tiki Taka, doğaçlama tiyatroyla tanışmak, sahnede özgürleşmek ve birlikte üretmenin yollarını keşfetmek isteyenler için farklı formatlarda eğitimler sunar. Kısa form doğaçlama, uzun form doğaçlama ve doğaçlama atölyeleriyle; oyun, hikâye kurma, dinleme, uyumlanma ve sahnede anda kalma becerilerine odaklanır.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Eğitim içerikleri</p>
            <ul className="flex flex-col divide-y divide-black/10">
              {["Kısa Form Doğaçlama", "Uzun Form Doğaçlama", "Doğaçlama Atölyeleri"].map((item) => (
                <li key={item} className="flex items-center gap-3 py-3 text-zinc-800 font-semibold text-base">
                  <span className="h-[2px] w-4 bg-[#FFCB00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "4 / 3" }}>
            <Image src="/aboutus4.jpg" alt="Tiki Taka eğitim" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── KURUMSAL ── */}
      <section id="corporate" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="relative w-full overflow-hidden rounded-3xl order-last md:order-first" style={{ aspectRatio: "4 / 3" }}>
            <Image src="/aboutus4.jpg" alt="Tiki Taka kurumsal" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Kurumsal çalışmalar</h2>
            <p className="text-zinc-600 leading-8 mb-8">
              Tiki Taka, kurumlara özel tasarlanan oyunlar ve uygulamalı eğitimlerle ekiplerin iletişim, yaratıcılık, uyumlanma ve birlikte düşünme becerilerini destekler. Her buluşma, kurumun ihtiyacına göre şekillenen; katılımcı, deneyim odaklı ve enerjisi yüksek bir içerik olarak kurgulanır.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Kurumsal içerikler</p>
            <ul className="flex flex-col divide-y divide-black/10">
              {["Kurumsal Oyunlar", "Kurumsal Eğitimler", "Ekibe Özel Workshop Tasarımları"].map((item) => (
                <li key={item} className="flex items-center gap-3 py-3 text-zinc-800 font-semibold text-base">
                  <span className="h-[2px] w-4 bg-[#FFCB00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── İLETİŞİM ── */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center">İletişim</h2>
        <div className="flex flex-col items-center gap-16 mt-10">
          <div className="flex flex-col items-center gap-3 text-zinc-700">
            <p>
              Instagram:{" "}
              <a className="underline font-semibold" href={IG_URL} target="_blank" rel="noreferrer">
                @tikitakaimpro
              </a>
            </p>
            <p>
              E-posta:{" "}
              <a className="underline font-semibold" href="mailto:info@tikitakaimpro.com">
                info@tikitakaimpro.com
              </a>
            </p>
          </div>

        <p className="text-zinc-600 text-center max-w-xl">
            Bizimle iletişime geçmek, eğitimler ve kurumsal çalışmalar hakkında bilgi almak için formu doldurabilirsiniz.
          </p>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
            <input
              name="from_name"
              type="text"
              required
              placeholder="Ad Soyad"
              className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition"
            />
            <input
              name="from_email"
              type="email"
              required
              placeholder="E-posta"
              className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Telefon"
              className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition"
            />
            <select
              name="subject"
              required
              defaultValue=""
              className="rounded-2xl border border-black/10 px-5 py-4 text-base text-zinc-700 outline-none focus:border-[#FFCB00] transition bg-white"
            >
              <option value="" disabled>Konu seçin</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Kurumsal">Kurumsal</option>
              <option value="Diğer">Diğer</option>
            </select>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Mesajınız"
              className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition resize-none"
            />
            <button
              type="submit"
              disabled={formState === "sending"}
              className="rounded-full bg-[#FFCB00] px-8 py-4 text-base font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {formState === "sending" ? "Gönderiliyor..." : "Gönder"}
            </button>
            {formState === "success" && (
              <p className="text-center text-sm font-semibold text-green-600">Mesajınız iletildi, en kısa sürede dönüş yapacağız!</p>
            )}
            {formState === "error" && (
              <p className="text-center text-sm font-semibold text-red-500">Bir hata oluştu, lütfen tekrar deneyin.</p>
            )}
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/10 py-10 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} TikiTaka Impro
      </footer>

    </main>
  );
}