import type { Metadata } from "next";
import {
  Wrap,
  Btn,
  Label,
  SectionHead,
  Quote,
  NoteBlock,
  Sticker,
  PhotoBox,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "Hakkımızda — TikiTaka Impro",
  description:
    "Tiki Taka, Kadıköy merkezli bir doğaçlama tiyatro kolektifi. 2018'den beri sahnedeyiz, 2021'den beri Tiki Taka Impro olarak sahne alıyoruz.",
};

const TT_ZAMAN: [string, string][] = [
  ["2018", "Doğaçlamaya başladık. O zamandan beri sahnedeyiz."],
  ["2021", "Tiki Taka Impro olarak sahne almaya başladık."],
  ["2026", "Eğitim programları ve kurumsal atölyeler açıldı."],
];

const EKIP = [
  "Arzu Su Gülveren",
  "Baransel Dursun",
  "Beril Lüleci",
  "Hikmet Tokgöz",
  "Sedat Ulusoy",
  "Tolga Tuna",
  "Veyis Özkan",
];

export default function HakkimizdaPage() {
  return (
    <main>
      <section className="hero tex-grid rel" style={{ borderBottom: "2px solid var(--tt-siyah)" }}>
        <Sticker className="sticker-abs" style={{ right: "28px", top: "20px" }}>2018&apos;den beri</Sticker>
        <div className="hero-in" style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="stack">
            <Label>Hakkımızda</Label>
            <h1>Yedi kişi, doğaçlama, yazılı metin yok.</h1>
            <p className="lede b2" style={{ maxWidth: "52ch" }}>
              Tiki Taka, Kadıköy merkezli bir doğaçlama tiyatro kolektifi. 2018&apos;den beri sahnedeyiz,
              2021&apos;den beri Tiki Taka Impro olarak sahne alıyoruz.
            </p>
            <div className="row">
              <Btn size="lg" href="/">Oyun takvimi</Btn>
              <Btn size="lg" variant="ghost" href="/egitim">Eğitim programları</Btn>
            </div>
          </div>
          <PhotoBox slot="hk-ekip" alt="Tiki Taka ekibi" ratio="3 / 4" tilt="tilt" priority />
        </div>
      </section>

      <section className="sec">
        <Wrap className="grid g2" style={{ alignItems: "start" }}>
          <div className="stack measure">
            <SectionHead kicker="Kısaca" title="Kısa form ve uzun form" />
            <p>
              İki formatta oynuyoruz. Kısa formda seyirciden gelen tekliflerle birbirinden bağımsız sahneler
              kuruyoruz; uzun formda tek bir hikayeyi baştan sona birlikte götürüyoruz.
            </p>
            <p className="b2">
              Bir gösteri yaklaşık iki saat sürüyor. Sahnede olan şey o akşama ait; aynı oyunu ikinci kez
              izlemek mümkün değil.
            </p>
            <NoteBlock title="Ekip" tone="mor">
              {EKIP.map((ad, i) => (
                <span key={ad}>
                  {ad}
                  {i < EKIP.length - 1 ? <br /> : null}
                </span>
              ))}
            </NoteBlock>
          </div>
          <div className="stack">
            <PhotoBox slot="hk-kisa" alt="Kısa form gecesinden" ratio="4 / 3" />
            <PhotoBox slot="hk-uzun" alt="Uzun form gecesinden" ratio="4 / 3" tilt="tilt-alt" />
          </div>
        </Wrap>
      </section>

      <section className="band-k sec grad-k tex-stripe-k">
        <Wrap className="stack">
          <Quote tilt>Sahnede olan şey bir daha olmuyor. Biz de bu yüzden geliyoruz.</Quote>
          <div className="grid g3" style={{ marginTop: "var(--s5)" }}>
            {TT_ZAMAN.map(([y, t]) => (
              <div key={y} className="stack" style={{ gap: "var(--s2)", borderTop: "2px solid var(--tt-sari)", paddingTop: "var(--s4)" }}>
                <span className="mono" style={{ color: "var(--tt-sari)" }}>{y}</span>
                <p className="b2">{t}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="sec tex-dots">
        <Wrap className="stack tape">
          <SectionHead kicker="Arşiv" title="Sahne, kulis, kurumsal oyunlar" />
          <div className="grid g3">
            <PhotoBox slot="hk-1" alt="Arşivden" ratio="4 / 5" />
            <PhotoBox slot="hk-2" alt="Arşivden" ratio="4 / 5" tilt="tilt-alt" />
            <PhotoBox slot="hk-3" alt="Arşivden" ratio="4 / 5" />
          </div>
          <div className="grid g3" style={{ marginTop: "var(--s3)" }}>
            <PhotoBox slot="hk-4" alt="Arşivden" ratio="4 / 3" tilt="tilt" />
            <PhotoBox slot="hk-5" alt="Arşivden" ratio="4 / 3" />
            <PhotoBox slot="hk-6" alt="Arşivden" ratio="4 / 3" tilt="tilt-alt" />
          </div>
        </Wrap>
      </section>

      <div className="grad-strip"></div>

      <section className="band-s sec grad-s tex-grid">
        <Wrap className="grid g2" style={{ alignItems: "center" }}>
          <div className="stack measure">
            <Label>Kurumsal</Label>
            <h2 className="d1">Kurumsal oyunlar ve <span className="marker">atölyeler</span>.</h2>
            <p className="b2">Kuruma özel yazılmış gösteriler ve doğaçlama temelli atölyeler.</p>
            <div className="row">
              <Btn variant="dark" href="/kurumsal">Kurumsal programlar</Btn>
            </div>
          </div>
          <div className="stack" style={{ gap: "var(--s3)" }}>
            <Label>Daha önce çalıştığımız kurumlar</Label>
            <div className="grid g2" style={{ alignItems: "start" }}>
              <PhotoBox slot="hk-logo-1" alt="Acıbadem" ratio="3 / 2" />
            </div>
          </div>
        </Wrap>
      </section>
    </main>
  );
}
