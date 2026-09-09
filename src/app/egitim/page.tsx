import type { Metadata } from "next";
import {
  Wrap,
  Btn,
  Label,
  Tag,
  SectionHead,
  NoteBlock,
  Marquee,
  Sticker,
  PhotoBox,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "Eğitim — TikiTaka Impro",
  description:
    "Üç program: kısa form eğitimi, uzun form eğitimi ve tek günlük açık atölyeler. Uygulama ağırlıklı, tiyatro geçmişi gerekmiyor.",
};

const TT_EGITIM = [
  {
    ad: "Kısa Form Eğitimi",
    tip: "Dönemlik",
    sure: "8 hafta · Salı 19:30",
    ozet: "Doğaçlamanın temelleri ve kısa sahneler üzerine kurulu program.",
    icerik: ["Evet, ve… prensibi", "Dinleme ve teklif alma", "Karakter ve ilişki", "Kısa form sahneleri"],
  },
  {
    ad: "Uzun Form Eğitimi",
    tip: "Dönemlik",
    sure: "10 hafta · Perşembe 19:30",
    ozet: "Tek bir hikayeyi baştan sona sahnede kurma üzerine ileri program.",
    icerik: ["Hikaye kurma", "Sahne geçişleri ve tempo", "Grup zihni", "Uzun form format çalışması"],
  },
  {
    ad: "Açık Atölye",
    tip: "Tek gün",
    sure: "4 saat",
    ozet: "Doğaçlamayı ilk kez denemek isteyenler için tek günlük buluşma.",
    icerik: ["Isınma oyunları", "İlk sahne deneyimi", "Grup egzersizleri", "Kısa doğaçlama turları"],
  },
];

export default function EgitimPage() {
  return (
    <main>
      <section className="hero band-y grad-y tex-dots-y rel">
        <Sticker tone="mor" className="sticker-abs" style={{ right: "28px", top: "22px" }}>Başvurular açık</Sticker>
        <div className="hero-in" style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="stack">
            <Label tone="deep">Eğitim · Kadıköy</Label>
            <h1>Doğaçlama, sahnede uygulanarak öğreniliyor.</h1>
            <p className="lede b2" style={{ maxWidth: "48ch" }}>
              Üç program: kısa form eğitimi, uzun form eğitimi ve tek günlük açık atölyeler. Programlarımız
              uygulama ağırlıklı, tiyatro geçmişi gerekmiyor.
            </p>
            <div className="row">
              <Btn size="lg" href="/iletisim">Başvuru formu</Btn>
              <Btn size="lg" variant="ghost" href="#programlar">Programlar</Btn>
            </div>
          </div>
          <PhotoBox slot="eg-hero" alt="Eğitim çalışmasından" ratio="1 / 1" tilt="tilt-alt" priority />
        </div>
      </section>

      <Marquee text="EVET, VE… · DİNLE · TEKLİF VER · SAHNEDE DENE · " tone="stripe" />
      <Marquee text="8 HAFTA · 10 HAFTA · TEK GÜN · " tone="mor" reverse skew />

      <section className="sec tex-dots" id="programlar">
        <Wrap className="stack tape">
          <SectionHead kicker="Programlar" title="Üç program" note="İçerikler sahnede uygulanarak işleniyor." />
          <div className="grid g3">
            {TT_EGITIM.map((p) => (
              <div key={p.ad} className="step hoverable" style={{ boxShadow: "var(--block-shadow)" }}>
                <div className="step-top mono">
                  <span>{p.tip}</span>
                  <span>{p.sure.split(" · ")[0]}</span>
                </div>
                <div className="step-body">
                  <h3 style={{ fontSize: "26px", lineHeight: 1.08 }}>{p.ad}</h3>
                  <Label>{p.sure}</Label>
                  <p className="b2">{p.ozet}</p>
                  <ul className="b2" style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "var(--s1)" }}>
                    {p.icerik.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <div style={{ marginTop: "auto", paddingTop: "var(--s3)" }}>
                    <Btn size="sm" variant="ghost" href="/iletisim">Başvuru formu</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <div className="grad-strip grad-strip-alt"></div>

      <section className="band-s sec grad-s tex-grid">
        <Wrap className="grid g2" style={{ alignItems: "center" }}>
          <div className="stack measure">
            <SectionHead kicker="Nasıl işliyor" title="Uygulama ağırlıklı bir program" />
            <p className="b2">
              Her buluşmada bir prensip alınıyor, egzersizlerle deneniyor ve sahnede uygulanıyor. Zamanın
              büyük bölümü sahnede geçiyor; teorik anlatım kısa tutuluyor.
            </p>
            <div className="grid g2" style={{ gap: "var(--s4)" }}>
              <NoteBlock title="Format">Uygulama ağırlıklı, grup çalışması.</NoteBlock>
              <NoteBlock title="Süre" tone="mor">Dönemlik programlar 8–10 hafta.</NoteBlock>
              <NoteBlock title="Deneyim">Tiyatro geçmişi gerekmiyor.</NoteBlock>
              <NoteBlock title="Başvuru" tone="siyah">İletişim formu üzerinden alınıyor.</NoteBlock>
            </div>
          </div>
          <PhotoBox slot="eg-1" alt="Atölyeden bir an" ratio="4 / 3" tilt="tilt" />
        </Wrap>
      </section>

      <section className="sec">
        <Wrap
          className="plate plate-sh grad-y tex-dots-y g-collapse"
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "var(--s6)", alignItems: "center", padding: "var(--s7)" }}
        >
          <div className="stack" style={{ gap: "var(--s2)" }}>
            <div><Tag tone="alt">Başvurular açık</Tag></div>
            <h3 className="d1">Yeni dönem için <span className="marker-mor marker">başvurular</span> alınıyor.</h3>
            <p className="b2">
              Form üzerinden ulaşıldığında kısa bir görüşme yapılıyor; hangi programın uygun olduğu birlikte
              konuşuluyor.
            </p>
          </div>
          <Btn size="lg" href="/iletisim">Başvuru formu</Btn>
        </Wrap>
      </section>
    </main>
  );
}
