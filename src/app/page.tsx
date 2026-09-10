import WordBox from "@/components/WordBox";
import {
  Wrap,
  Label,
  Tag,
  SectionHead,
  Quote,
  NoteBlock,
  EventCard,
  Marquee,
  Sticker,
  DivX,
  PhotoBox,
  TICKET_URL,
} from "@/components/ds";

const SHOWS = [
  {
    title: "TikiTaka Impro",
    when: "25 Eylül Cuma · 20:00 · Kılçık Mekan",
    venue: "Kadıköy",
  },
];

const PLAYERS = [
  "Arzu",
  "Baransel",
  "Beril",
  "Hikmet",
  "Sedat",
  "Tolga",
  "Veyis",
];

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero band-y grad-y tex-dots-y rel">
        <Sticker tone="mor" className="sticker-abs" style={{ right: "28px", top: "22px" }}>Senaryo yok</Sticker>
        <div className="hero-in" style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="stack">
            <Label tone="deep">Kısa ve uzun form doğaçlama · Kadıköy · 2018&apos;den beri</Label>
            <h1>Bu akşam ne olacağını kimse bilmiyor.</h1>
            <p className="lede b2" style={{ maxWidth: "46ch" }}>
              Ezberlenmiş metin yok. Oyun seyirciden gelen tek bir kelimeyle başlıyor, iki saat boyunca
              sahnede kuruluyor. İki gösteri hiçbir zaman aynı değil.
            </p>
            <div className="row">
              <a className="btn btn-lg" href={TICKET_URL} target="_blank" rel="noopener noreferrer">Bilet Al</a>
              <a className="btn btn-lg btn-ghost" href="#program">Oyun takvimi</a>
            </div>
          </div>
          <WordBox />
        </div>
      </section>

      <Marquee text="HER AN BAŞKA · HER AN TİKİ TAKA · SENARYO YOK · " tone="stripe" />
      <Marquee text="TEK KELİMEYLE BAŞLIYORUZ · İKİ SAAT · GERİ DÖNÜŞ YOK · " tone="mor" reverse skew />

      <div className="grad-strip"></div>

      {/* ── PROGRAM ── */}
      <section className="sec tex-dots" id="program">
        <Wrap className="stack tape">
          <SectionHead kicker="Program" title="Yaklaşan Oyunlar" />
          <div className="grid g3">
            {SHOWS.map((s, i) => (
              <EventCard
                key={i}
                venue={s.venue}
                title={s.title}
                when={s.when}
                tilt={i % 4 === 2}
              />
            ))}
          </div>
        </Wrap>
      </section>

      {/* ── NASIL GEÇİYOR ── */}
      <section className="band-k sec grad-k tex-stripe-k">
        <Wrap className="stack">
          <div className="stack" style={{ gap: "var(--s3)" }}>
            <Label tone="brand">Bir gösteri nasıl geçiyor</Label>
            <Quote className="accent" tilt cite="Slogan">Her an başka.<br />Her an Tiki Taka.</Quote>
          </div>
          <div className="grid g3" style={{ marginTop: "var(--s5)" }}>
            {[
              ["Seyirci bir kelime veriyor", "Gösteri, salondan gelen tek bir kelime, anı ya da cümleyle açılıyor. Öncesinde hiçbir şey yazılmıyor."],
              ["Sahnede kuruluyor", "Kısa form gecelerde birbirinden bağımsız sahneler, uzun form gecelerde tek bir hikaye çıkıyor."],
              ["İki saat sonra bitiyor", "Ortaya çıkan oyun o akşama ait. Aynısı bir daha oynanmıyor, kaydı da satılmıyor."],
            ].map(([b, m], i) => (
              <div key={b} className="stack" style={{ gap: "var(--s2)", borderTop: "2px solid var(--tt-sari)", paddingTop: "var(--s4)" }}>
                <span className="mono" style={{ color: "var(--tt-sari)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ color: "var(--text-on-dark)", fontSize: "var(--fs-d3)" }}>{b}</h3>
                <p className="b2">{m}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--s5)" }}><DivX dark label="× · + · ×" /></div>
          <div className="grid g2">
            <NoteBlock dark title="Adımız nereden geliyor" style={{ color: "var(--text-on-dark)" }}>
              Bir araya gelen iki yaka: Tiki Taka. 2018&apos;den beri doğaçlama yapıyoruz, 2021&apos;den beri bu adla.
            </NoteBlock>
            <NoteBlock dark title="Neler yapıyoruz" style={{ color: "var(--text-on-dark)" }}>
              Kadıköy&apos;de aylık gösteriler, eğitim programları ve kurumlara özel atölyeler.
            </NoteBlock>
          </div>
        </Wrap>
      </section>

      {/* ── EKİP ── */}
      <section className="sec">
        <Wrap className="stack">
          <SectionHead kicker="Ekip" title="Yedi kişi, tek grup zihni" />
          <div className="grid g4">
            {PLAYERS.map((ad, i) => (
              <div key={ad} className="stack" style={{ gap: "var(--s3)" }}>
                <PhotoBox slot={`oyuncu-${i}`} alt={ad} ratio="1 / 1" tilt={i % 2 ? "tilt-alt" : "tilt"} />
                <div>
                  <h3 style={{ fontSize: "var(--fs-d3)", lineHeight: "var(--lh-d3)" }}>{ad}</h3>
                </div>
              </div>
            ))}
            <div className="plate plate-sh wig grad-y tex-dots-y" style={{ display: "flex", flexDirection: "column", gap: "var(--s3)", justifyContent: "center" }}>
              <Label tone="deep">Sekizinci oyuncu</Label>
              <h3 style={{ fontSize: "var(--fs-d3)" }}>Seyirci.</h3>
              <p className="b2">Başlangıç noktamızı seyirciden alıyoruz. <span className="marker-mor marker">Oyun sizin cümleniz ile dönüyor.</span></p>
            </div>
          </div>
        </Wrap>
      </section>

      <div className="grad-strip grad-strip-alt"></div>

      {/* ── SAHNEDEN ── */}
      <section className="band-s sec grad-s tex-grid rel">
        <Sticker tone="yesil" className="sticker-abs" style={{ left: "24px", top: "-14px" }}>Arşiv</Sticker>
        <Wrap className="stack">
          <SectionHead kicker="Sahneden" title="Geçen ay bunlar oldu" />
          <div className="grid g3">
            <PhotoBox slot="sahne-1" alt="Sahneden bir an" ratio="4 / 3" />
            <PhotoBox slot="sahne-2" alt="Sahneden bir an" ratio="4 / 3" tilt="tilt-alt" />
            <PhotoBox slot="sahne-3" alt="Sahneden bir an" ratio="4 / 3" />
          </div>
        </Wrap>
      </section>

      {/* ── EĞİTİM / KURUMSAL ── */}
      <section className="sec">
        <Wrap className="grid g2">
          <div className="plate plate-sh hoverable stack" style={{ gap: "var(--s3)" }}>
            <div><Tag tone="alt">Eğitim</Tag></div>
            <h3 className="h2big">Doğaçlama, <span className="marker">uygulamayla</span> öğreniliyor.</h3>
            <p className="b2">Kısa form eğitimi, uzun form eğitimi ve tek günlük açık atölye. Programlar uygulama ağırlıklı; tiyatro geçmişi gerekmiyor.</p>
            <div style={{ marginTop: "var(--s2)" }}>
              <a className="btn btn-sm btn-ghost" href="/egitim">Eğitim programları</a>
            </div>
          </div>
          <div className="plate plate-sh hoverable stack plate-mor tex-stripe-k" style={{ gap: "var(--s3)" }}>
            <div><Tag>Kurumsal</Tag></div>
            <h3 className="h2big">Ekiplere özel doğaçlama programları.</h3>
            <p className="b2">Doğaçlamanın araçları kurumun gerçek ihtiyaçlarıyla eşleştiriliyor: iletişim, birlikte düşünme, sahnede rahatlık.</p>
            <div style={{ marginTop: "var(--s2)" }}>
              <a className="btn btn-sm" href="/kurumsal">Kurumsal programlar</a>
            </div>
          </div>
        </Wrap>
      </section>
    </main>
  );
}
