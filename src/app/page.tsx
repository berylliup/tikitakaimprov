import Image from "next/image";

const TICKET_URL = "https://biletinial.com/tr-tr/mekan/kilcik-mekan";
const IG_URL = "https://instagram.com/tikitakaimpro";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* TOP MENU */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-3">
          {/* LOGO */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TikiTaka Impro"
              width={56}
              height={56}
              priority
            />
            <span className="text-xl font-extrabold tracking-tight">
              TikiTaka Impro
            </span>
          </a>

          {/* MENU (desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-extrabold uppercase tracking-wide">

            <a href="#shows" className="hover:opacity-70 transition">
              GÖSTERİLER
            </a>
            <a href="#about" className="hover:opacity-70 transition">
              Hakkımızda
            </a>
            <a href="#education" className="hover:opacity-70 transition">
              EĞİTİM
            </a>
            <a href="#corporate" className="hover:opacity-70 transition">
              Kurumsal
            </a>
            <a href="#contact" className="hover:opacity-70 transition">
              İLETİŞİM
            </a>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* INSTAGRAM */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-70 transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7.5a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm4.75-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                />
              </svg>
            </a>

            {/* CTA */}
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FFCB00] px-5 py-2 text-base font-bold hover:opacity-90 transition"
            >
              Bilet Al
            </a>
          </div>
        </div>

        {/* ACCENT LINE */}
        <div className="h-[2px] bg-[#FFCB00]" />
      </header>

      {/* HERO (FULL SCREEN IMAGE + TEXT OVERLAY) */}
      <section className="relative h-screen w-full">
        <Image
          src="/group.png"
          alt="TikiTaka Impro ekip"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Her an başka. Her an Tiki Taka.
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/90">
            Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında
            yazılan oyunlar.
          </p>

          <a
            href={TICKET_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 rounded-full bg-[#FFCB00] px-10 py-4 text-lg font-semibold text-black hover:opacity-90 transition"
          >
            Bilet Al
          </a>
        </div>
      </section>
{/* OYUNCULAR STRIP */}
<section className="w-full bg-[#FFCB00] py-16">
  <div className="mx-auto flex max-w-none flex-col items-center px-10">
    
    {/* Title – BIG, CENTER, NO BOX */}
    <h2 className="mb-14 text-4xl sm:text-5xl font-extrabold uppercase tracking-widest text-black">
      OYUNCULAR
    </h2>

    {/* Players – single row, no visible scrollbar */}
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-center gap-14">
        {[
          { name: "ARZU", src: "/arzu.png" },
          { name: "BERİL", src: "/beril.png" },
          { name: "BARANSEL", src: "/baransel.png" },
          { name: "HİKMET", src: "/hikmet.png" },
          { name: "VEYİS", src: "/veyis.png" },
        ].map((p) => (
          <div key={p.name} className="flex flex-col items-center">
            
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.name}
              className="h-[420px] w-[240px] rounded-[40px] object-cover"
            />

            {/* Name – KEEP AS IS */}
            <div className="mt-6 rounded-xl bg-white px-10 py-2">
              <span className="text-xl font-extrabold uppercase tracking-wide text-black">
                {p.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>


      {/* SHOWS (EVENT CARD) */}
<section id="shows" className="mx-auto max-w-6xl px-6 py-20">
  <div className="flex items-end justify-between gap-6">
    <h2 className="text-3xl font-bold">Gösteriler</h2>
    <a
      href={TICKET_URL}
      target="_blank"
      rel="noreferrer"
      className="text-sm font-semibold underline hover:opacity-70 transition"
    >
      Biletinial →
    </a>
  </div>

  <div className="mt-10">
    <a
      href={TICKET_URL}
      target="_blank"
      rel="noreferrer"
      className="group block w-full max-w-[360px] overflow-hidden rounded-2xl border border-black/10 bg-white hover:-translate-y-0.5 hover:shadow-lg transition"
      aria-label="Bilet Al"
    >
      {/* Poster */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster.jpeg"
        alt="TikiTaka - 29 Ocak"
        className="h-[320px] w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-extrabold leading-snug">
          TikiTaka Impro
        </h3>

        <p className="mt-2 text-sm text-zinc-600">
          Ocak - 29 • 20:00
        </p>

        <p className="mt-2 text-sm font-semibold text-zinc-800">
          Tiyatro Sporu
        </p>

        <div className="mt-5">
          <span className="inline-flex items-center justify-center rounded-xl bg-[#FFCB00] px-5 py-3 text-sm font-extrabold text-black group-hover:opacity-90 transition">
            BİLETİNİ AL
          </span>
        </div>
      </div>
    </a>

    <p className="mt-4 text-sm text-zinc-600">
      Mekan: <span className="font-semibold">Kılçık Mekan, Kadıköy</span>
    </p>
  </div>
</section>


 {/* ABOUT */}
<section id="about" className="mx-auto max-w-6xl px-6 py-20">
  {/* Title */}
  <h2 className="text-3xl font-bold">Hakkımızda</h2>

  

  {/* Hero image – aboutus1 (16:9 yatay) */}
  <div
    className="relative mt-10 w-full overflow-hidden rounded-3xl"
    style={{ aspectRatio: "16 / 9" }}
  >
    <Image
      src="/aboutus1.jpg"
      alt="Tiki Taka sahnede"
      fill
      className="object-cover"
    />
  </div>

{/* Story + images */}
<div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
  {/* Text – DİKEY ORTALI */}
  <div className="text-zinc-800 leading-8 flex flex-col justify-center">
    <p className="mb-6">
      Tiki Taka, 2021 yılında <strong>Hayal Meal Sahne</strong> bünyesinde bir
      araya gelen oyuncular tarafından kuruldu. O günden bu yana aynı sahnede,
      aynı oyunda ve aynı merakla birlikte doğaçlıyoruz.
    </p>
    <p>
      Kısa ve uzun form doğaçlama gösterileri üretiyor; her oyunda seyirciyle
      birlikte, sıfırdan bir dünya kuruyoruz. Yazılı metin yok, tekrar yok,
      her şey anda.
    </p>
  </div>

{/* Images – square, clean, no crop drama */}
<div className="grid grid-cols-2 gap-6 min-w-0">
  <div className="relative w-full h-[360px] overflow-hidden rounded-3xl">
    <Image
      src="/aboutus2.png"
      alt="Gösteriden bir an"
      fill
      className="object-cover object-center"
    />
  </div>

  <div className="relative w-full h-[360px] overflow-hidden rounded-3xl">
    <Image
      src="/aboutus3.png"
      alt="Seyirciyle etkileşim"
      fill
      className="object-cover object-center"
    />
  </div>
</div>




</div>

   
  

  {/* Education & Corporate */}
  <div
    id="education"
    className="mt-20 rounded-3xl bg-zinc-100 p-10 md:p-12 grid gap-10 md:grid-cols-2 items-center"
  >
    {/* Text */}
    <div id="corporate" className="text-zinc-800 leading-8">
      <h3 className="mb-4 text-2xl font-bold">
        Eğitim & Kurumsal Çalışmalar
      </h3>
      <p className="mb-4">
        Tiki Taka, doğaçlama tiyatronun temel prensiplerini kurumlara ve
        gruplara özel olarak tasarlanan workshop ve eğitimlerle aktarır.
      </p>
      <p>
        İletişim, ekip çalışması, yaratıcılık, uyumlanma ve belirsizlikle baş
        etme gibi başlıklarda; deneyim odaklı, katılımcı ve uygulamalı
        programlar sunar.
      </p>
    </div>

    {/* Image – aboutus4 (3:2 yatay) */}
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "3 / 2" }}
    >
      <Image
        src="/aboutus4.jpg"
        alt="Tiki Taka workshop"
        fill
        className="object-cover"
      />
    </div>
  </div>
</section>



      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">İletişim</h2>

        <div className="mt-8 grid gap-3 text-zinc-700">
          <p>
            Instagram:{" "}
            <a
              className="underline font-semibold"
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
            >
              @tikitakaimpro
            </a>
          </p>

          <p>
            E-posta:{" "}
            <a className="underline font-semibold" href="mailto:hello@tikitakaimpro.com">
              info@tikitakaimpro.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-10 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} TikiTaka Impro
      </footer>
    </main>
  );
}
