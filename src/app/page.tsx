import Image from "next/image";

const TICKET_URL = "https://biletinial.com/tr-tr/tiyatro/tiki-taka-dogaclama-tiyatro";

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
  { name: "BARANSEL", src: "/baransel.png" },
  { name: "BERİL", src: "/beril.png" },
  { name: "HİKMET", src: "/hikmet.png" },
  { name: "SEDAT", src: "/sedat.png" },
  { name: "TOLGA", src: "/tolga.png" },
  { name: "VEYİS", src: "/veyis.png" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* ── HERO ── */}
      <section className="relative w-full bg-black md:h-screen">
        <div className="relative w-full aspect-[16/16] sm:aspect-[16/9] md:h-full md:aspect-auto">
          <Image
            src="/group2.png"
            alt="TikiTaka Impro ekip"
            fill
            priority
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Her an başka. Her an Tiki Taka.
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-white/90">
              Uzun form doğaçlama tiyatro kolektifi. Seyirciyle birlikte anında yazılan oyunlar.
            </p>
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 rounded-full bg-[#FFCB00] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black hover:opacity-90 transition"
            >
              Bilet Al
            </a>
          </div>
        </div>
      </section>

      {/* ── OYUNCULAR ── */}
      <section className="w-full bg-[#FFCB00] py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 sm:mb-14 text-4xl sm:text-5xl font-extrabold uppercase tracking-widest text-black text-center">
            OYUNCULAR
          </h2>
          <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
            <div className="flex w-max min-w-full items-end justify-start lg:justify-center gap-4 sm:gap-5 lg:gap-4 xl:gap-6 flex-nowrap pb-2">
              {PLAYERS.map((p) => (
                <div key={p.name} className="flex shrink-0 flex-col items-center">
                  <div className="relative h-[220px] w-[135px] sm:h-[240px] sm:w-[145px] lg:h-[220px] lg:w-[130px] xl:h-[250px] xl:w-[150px]">
                    <Image src={p.src} alt={p.name} fill className="rounded-[30px] object-cover" />
                  </div>
                  <div className="mt-4 rounded-xl bg-white px-4 py-2">
                    <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-black">
                      {p.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAHNEDEN ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Sahneden</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
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

      {/* ── GÖSTERİLER ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold">Gösteriler</h2>
          <a href={TICKET_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold underline hover:opacity-70 transition">Biletinial →</a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {SHOWS.map((show, i) => {
            const dateLabel = show.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
            const timeLabel = show.date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
            return (
              <a
                key={i}
                href={TICKET_URL}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-black/10 bg-white hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <img src="/poster.jpeg" alt={`TikiTaka - ${dateLabel}`} className="h-[140px] sm:h-[200px] w-full object-cover" />
                <div className="p-3 sm:p-5">
                  <h3 className="text-sm sm:text-lg font-extrabold">TikiTaka Impro</h3>
                  <p className="mt-2 text-[11px] sm:text-sm text-zinc-600">{dateLabel} • {timeLabel}</p>
                  <p className="mt-2 text-[11px] sm:text-sm font-semibold text-zinc-800">Kadıköy Kılçık Mekan</p>
                  <div className="mt-4 sm:mt-5">
                    <span className="flex w-full items-center justify-center rounded-xl bg-[#FFCB00] px-3 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-extrabold text-black">
                      BİLETİNİ AL
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

    </main>
  );
}
