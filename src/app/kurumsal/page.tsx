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
  title: "Kurumsal — TikiTaka Impro",
  description:
    "Ekiplere özel doğaçlama programları: altı çekirdek program, iki özel format. 3, 6 ve 12 saatlik kademeler.",
};

const TT_NEDEN: [string, string][] = [
  ["Dinleme ve iş birliği", "Ekip üyeleri birbirinin fikrini kesmeden geliştirmeyi pratikle öğreniyor."],
  ["Belirsizlikte karar", "Eksik bilgiyle hareket etme refleksi, güvenli bir ortamda tekrar tekrar deneniyor."],
  ["Net anlatım", "Fikir, hazırlıksız anlarda bile dinleyicinin takip edebileceği biçimde aktarılıyor."],
];

const TT_KADEME: [string, string, string][] = [
  ["3 Saat", "Fark Et", "Katılımcı kendi reflekslerini ve davranış kalıplarını fark ediyor."],
  ["6 Saat", "Dene ve Uygula", "Yeni davranışı yapılandırılmış egzersizlerle deniyor, gerçek bir iş problemine uyguluyor."],
  ["12 Saat · 2 Gün", "Kendi İşine Taşı", "Öğrenilen beceriyi somut bir çıktıyla kendi iş bağlamına taşıyor."],
];

const TT_PROGRAM = [
  { ad: "Takım Çalışması ve Güven", hedef: "Aktif dinleme, güven ve birlikte hareket etme becerilerini güçlendirmek.", kim: "Yeni kurulan ve yeniden yapılanan ekipler", cikti: "Ekibin birlikte yazdığı Takım Çalışma Anlaşması." },
  { ad: "Hikaye Anlatıcılığı", hedef: "Fikirleri ve projeleri dinleyicinin takip edebileceği hikayelere dönüştürmek.", kim: "Liderler, satış ve pazarlama ekipleri", cikti: "Prova edilmiş bir iş hikayesi ya da sunumu." },
  { ad: "Hazırlıksız İletişim ve Sunum", hedef: "Beklenmedik durumlarda düşünmeye devam etmek, hazırlıksız konuşmak.", kim: "Yöneticiler, müşteri ilişkileri, sunum yoğun ekipler", cikti: "Katılımcı başına öncesi–sonrası performans karşılaştırması." },
  { ad: "Yaratıcı Problem Çözme ve Birlikte Üretme", hedef: "Çok sayıda alternatif üretmek ve başkasının fikrini geliştirmek.", kim: "Ürün, teknoloji, yenilik ve strateji ekipleri", cikti: "Seçilen bir problem için 2–3 uygulanabilir çözüm önerisi." },
  { ad: "Değişime Uyum ve Belirsizlikte Liderlik", hedef: "Eksik bilgi ve değişen koşullar altında karar alma refleksini geliştirmek.", kim: "Takım liderleri, proje yöneticileri", cikti: "Kişiye özel liderlik ve belirsizlik refleksleri geri bildirimi." },
  { ad: "İletişim, Empati ve Zor Konuşmalar", hedef: "Söylenenin ötesini dinlemek, gerilimli iletişim anlarını yönetmek.", kim: "Tüm ekipler, yönetici–çalışan ilişkisi", cikti: "Katılımcıların kendi zor konuşmalarının prova edilmesi." },
];

const TT_KANIT: [string, string, string][] = [
  ["İş birliği ve yenilikçilik", "Doğaçlama teknikleriyle çalışan takımlarda anlaşma, farkındalık ve iş birliği ölçülebilir biçimde artıyor.", "Vera ve Crossan · Organization Studies (2004)"],
  ["İkna edicilik", "Aynı mesaj hikayeyle anlatıldığında dinleyici karşı argüman üretmeyi bırakıyor; mesaj belirgin biçimde daha ikna edici oluyor.", "Green ve Brock · J. of Personality and Social Psychology (2000)"],
  ["Sunum stresi", "Doğaçlama eğitimi alan katılımcılar, topluluk önünde konuşma içeren stres testinde daha düşük stres tepkisi veriyor.", "Felsman, Seifert ve Himle (2019)"],
  ["Yaratıcı çözüm sayısı", "Doğaçlama deneyimi ıraksak düşünmeyi artırıyor: aynı ekip aynı problem için daha fazla ve birbirinden daha farklı çözüm üretiyor.", "Felsman, Gunawardena ve Seifert · Thinking Skills and Creativity (2020)"],
  ["Empati", "Tek bir doğaçlama oturumu bile empati puanlarında belirgin artış sağlıyor; etki ilk günden ölçülebiliyor.", "Int. J. of Environmental Research and Public Health"],
  ["Belirsizlik toleransı", "Doğaçlama çalışan ekiplerde belirsizlik toleransı artıyor; plan değiştiğinde ekip donmak yerine hareket ediyor.", "Felsman, Gunawardena ve Seifert (2020)"],
];

const TT_MIX: [string, number, string][] = [
  ["Hazırlıksız İletişim", 30, "var(--tt-sari)"],
  ["Belirsizlikte Liderlik", 30, "var(--tt-siyah)"],
  ["İletişim ve Empati", 25, "var(--tt-yesil)"],
  ["Takım Çalışması ve Güven", 15, "var(--tt-mor)"],
];

const TT_NICIN: [string, string][] = [
  ["Sahne Deneyimi", "2018'den beri sahnede olan, 2021'den beri Kadıköy'de düzenli oynayan bir doğaçlama ekibi."],
  ["Uygulamalı Format", "Anlatım değil deneme: her oturum egzersiz, uygulama ve geri bildirim üzerine kurulu."],
  ["Uyarlanmış İçerik", "Egzersizler kurumun gerçek problemleri ve ekibin günlük iş bağlamıyla eşleştiriliyor."],
  ["Deneyimli Eğitmen Kadrosu", "Grubun enerjisini okuyan, katılımı zorlamadan açan eğitmenler."],
];

const TT_ADIM: [string, string][] = [
  ["Görüşme", "Hedef kitle, beklenti ve zaman planını konuşuyoruz."],
  ["İhtiyaç Analizi", "Hangi davranışın değişmesi gerektiğini netleştiriyoruz."],
  ["Atölye Tasarımı", "Modülleri süre ve hedefe göre birleştiriyoruz."],
  ["Uygulama", "Atölyeyi kurumda ya da dış mekanda yürütüyoruz."],
  ["Geri Bildirim", "Gözlem ve çıktıları kurumla birlikte değerlendiriyoruz."],
];

export default function KurumsalPage() {
  return (
    <main>
      <section className="hero band-y grad-y tex-dots-y rel">
        <Sticker tone="mor" className="sticker-abs" style={{ right: "28px", top: "22px" }}>3 · 6 · 12 saat</Sticker>
        <div className="hero-in" style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="stack">
            <Label tone="deep">Kurumsal programlar · 2026</Label>
            <h1>Sahnede öğrenilen, toplantıda işe yarıyor.</h1>
            <p className="lede b2" style={{ maxWidth: "50ch" }}>
              Doğaçlama bir oyun değil, çalışılabilir bir beceri seti. Belirsizlik altında dinlemeyi, karar
              almayı ve birlikte üretmeyi tekrar edilebilir egzersizlerle öğretiyoruz.
            </p>
            <div className="row">
              <Btn size="lg" href="/iletisim">Teklif formu</Btn>
              <Btn size="lg" variant="ghost" href="#programlar">Programları gör</Btn>
            </div>
          </div>
          <div className="stack" style={{ gap: "var(--s3)" }}>
            <div className="plate plate-sh" style={{ background: "var(--tt-siyah)", color: "var(--text-on-dark)" }}>
              <span className="mono" style={{ color: "var(--tt-sari)" }}>Format</span>
              <p className="b2" style={{ marginTop: "var(--s2)" }}>
                6 çekirdek program<br />2 özel format<br />3 · 6 · 12 saat kademeleri
              </p>
            </div>
            <PhotoBox slot="ku-hero" alt="Kurumsal atölyeden" ratio="4 / 3" tilt="tilt" priority />
          </div>
        </div>
      </section>

      <Marquee text="EVET, VE… · DİNLE · TEKLİF VER · BİRLİKTE KUR · " tone="stripe" />
      <Marquee text="BELİRSİZLİKTE KARAR · HAZIRLIKSIZ ANLATIM · " tone="mor" reverse skew />

      <section className="sec">
        <Wrap className="stack">
          <SectionHead kicker="Neden doğaçlama" title="Üç davranış, üç egzersiz seti" note="Her programın altında aynı üç refleks var." />
          <div className="grid g3">
            {TT_NEDEN.map(([b, m], i) => (
              <div key={b} className={"plate plate-sh stack " + (i === 1 ? "plate-mor tex-stripe-k wig" : "hoverable")} style={{ gap: "var(--s2)" }}>
                <span className="num" style={i === 1 ? { color: "var(--tt-mor-acik)" } : undefined}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{b}</h3>
                <p className="b2">{m}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="band-k sec grad-k tex-stripe-k">
        <Wrap className="stack">
          <div className="stack" style={{ gap: "var(--s3)" }}>
            <Label tone="brand">Metodoloji</Label>
            <h2 className="d1" style={{ color: "var(--text-on-dark)" }}>Üç kademeli çerçeve</h2>
            <p className="b2" style={{ maxWidth: "52ch" }}>
              Tüm programlarda geçerli. Süre uzadıkça içerik değişmiyor; derinlik ve çıktı değişiyor.
            </p>
          </div>
          <div className="grid g3">
            {TT_KADEME.map(([s, ad, m], i) => (
              <div key={ad} className="stack" style={{ gap: "var(--s3)", borderTop: "2px solid var(--tt-sari)", paddingTop: "var(--s4)" }}>
                <span className="mono" style={{ color: "var(--tt-sari)" }}>{String(i + 1).padStart(2, "0")} · {s}</span>
                <h3 style={{ color: "var(--text-on-dark)", fontSize: "26px" }}>{ad}</h3>
                <p className="b2">{m}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <div className="grad-strip"></div>

      <section className="sec" id="programlar">
        <Wrap className="stack">
          <SectionHead
            kicker="Programlar"
            title="Altı çekirdek program"
            note="Her biri 3, 6 ve 12 saat olarak kurgulanıyor. İçerik ekibin gerçek işiyle eşleştiriliyor."
          />
          <div className="grid g3">
            {TT_PROGRAM.map((p, i) => (
              <div key={p.ad} className="step hoverable" style={{ boxShadow: "var(--block-shadow)" }}>
                <div className="step-top mono">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>3 · 6 · 12 Saat</span>
                </div>
                <div className="step-body">
                  <h3 style={{ fontSize: "22px", lineHeight: 1.15 }}>{p.ad}</h3>
                  <p className="b2">{p.hedef}</p>
                  <div>
                    <span className="mono" style={{ color: "var(--text-2)" }}>İdeal alan</span>
                    <p className="b2" style={{ marginTop: "var(--s1)" }}>{p.kim}</p>
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: "var(--s3)", borderTop: "1px solid var(--line)" }}>
                    <span className="mono" style={{ color: "var(--text-2)" }}>12 saat çıktısı</span>
                    <p className="b2" style={{ marginTop: "var(--s1)", color: "var(--text-body)" }}>{p.cikti}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid g2" style={{ marginTop: "var(--s5)" }}>
            <div className="plate plate-sh hoverable stack grad-y tex-dots-y" style={{ gap: "var(--s3)" }}>
              <div><Tag tone="line">Özel format · Ekip etkinliği</Tag></div>
              <h3 className="h2big">Ekip Deneyimi</h3>
              <p className="b2">
                Çalışanların alışılmış rollerinin dışında birlikte eğlenmesi ve ortak bir yaratıcı deneyim
                yaşaması için tasarlanmış etkinlik formatı.
              </p>
              <div className="rows" style={{ borderTopColor: "var(--tt-siyah)" }}>
                <div className="rowitem" style={{ borderBottomColor: "rgba(28,27,21,.25)" }}>
                  <span className="n">01</span><h3 style={{ fontSize: "18px" }}>Kısa Deneyim</h3><span className="mono">90 dakika</span>
                </div>
                <div className="rowitem" style={{ borderBottom: "none" }}>
                  <span className="n">02</span><h3 style={{ fontSize: "18px" }}>Tam Deneyim</h3><span className="mono">2–3 saat</span>
                </div>
              </div>
              <p className="b2">Şirket dışı buluşmalar, yıl sonu etkinlikleri ve yeni ekiplerin kaynaşması için.</p>
            </div>
            <div className="plate plate-sh hoverable stack" style={{ gap: "var(--s3)" }}>
              <div><Tag tone="alt">Özel format · Uzun dönem</Tag></div>
              <h3 className="h2big">Doğaçlama Tiyatro Programı</h3>
              <p className="b2">
                Kurum içinde sürdürülebilir bir doğaçlama topluluğu. İsteyen kurumlarda dönem sonu
                gösterisiyle bitiyor.
              </p>
              <div className="rows">
                <div className="rowitem"><span className="n">01</span><h3 style={{ fontSize: "18px" }}>Başlangıç</h3><span className="mono">8–12 saat</span></div>
                <div className="rowitem"><span className="n">02</span><h3 style={{ fontSize: "18px" }}>Gelişim</h3><span className="mono">16–24 saat</span></div>
                <div className="rowitem" style={{ borderBottom: "none" }}><span className="n">03</span><h3 style={{ fontSize: "18px" }}>Performans</h3><span className="mono">Dönemlik</span></div>
              </div>
              <p className="b2">Çalışan bağlılığı programları, şirket kulüpleri ve iyi oluş programları için.</p>
            </div>
          </div>
        </Wrap>
      </section>

      <section className="band-s sec grad-s tex-grid">
        <Wrap className="grid g2" style={{ alignItems: "start" }}>
          <div className="stack measure">
            <Label>Şirkete özel karma program</Label>
            <h2 className="d1">İhtiyacınıza göre tasarlayalım.</h2>
            <p className="b2">
              Ön görüşmede hedef kitleyi, problemi, süreyi ve beklenen davranış değişimini birlikte
              netleştiriyoruz. Ardından programların modüllerini tek bir akışta birleştiriyoruz.
            </p>
            <NoteBlock title="Gelen talep">
              &quot;Yeni terfi eden 15 yöneticimiz var. Toplantılarda daha iyi iletişim kursunlar, zor sorular
              karşısında donmasınlar, ekiplerine alan açsınlar.&quot;
            </NoteBlock>
          </div>
          <div className="plate plate-sh stack" style={{ gap: "var(--s4)" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <Label>Liderlik programı</Label>
              <span className="mono">12 saat · 2 gün</span>
            </div>
            <div className="bar">
              {TT_MIX.map(([ad, p, c]) => <i key={ad} style={{ width: p + "%", background: c }} title={`${ad} %${p}`}></i>)}
            </div>
            <div className="stack" style={{ gap: "var(--s2)" }}>
              {TT_MIX.map(([ad, p, c]) => (
                <div key={ad} className="row" style={{ justifyContent: "space-between", gap: "var(--s3)" }}>
                  <span className="b2" style={{ color: "var(--text-body)", display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                    <i style={{ width: "12px", height: "12px", background: c, border: "1px solid var(--tt-siyah)", display: "block" }}></i>
                    {ad}
                  </span>
                  <span className="mono">%{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      <section className="sec">
        <Wrap className="stack">
          <SectionHead kicker="Neden TikiTaka" title="Eğitmenler sahnede oynuyor" />
          <div className="grid g4">
            {TT_NICIN.map(([b, m], i) => (
              <div key={b} className="stack" style={{ gap: "var(--s2)", borderTop: "2px solid var(--tt-siyah)", paddingTop: "var(--s4)" }}>
                <span className="mono" style={{ color: "var(--text-2)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: "var(--fs-d3)" }}>{b}</h3>
                <p className="b2">{m}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="band-k sec grad-k tex-stripe-k">
        <Wrap className="stack">
          <div className="stack" style={{ gap: "var(--s3)" }}>
            <Label tone="brand">Nasıl çalışıyoruz</Label>
            <h2 className="d1" style={{ color: "var(--text-on-dark)" }}>Beş adım</h2>
          </div>
          <div className="grid g5" style={{ gridTemplateColumns: "repeat(5,minmax(0,1fr))" }}>
            {TT_ADIM.map(([b, m], i) => (
              <div key={b} className="stack" style={{ gap: "var(--s2)", borderTop: "2px solid var(--tt-sari)", paddingTop: "var(--s4)" }}>
                <span className="mono" style={{ color: "var(--tt-sari)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ color: "var(--text-on-dark)", fontSize: "var(--fs-d3)" }}>{b}</h3>
                <p className="b2">{m}</p>
              </div>
            ))}
          </div>
          <p className="mono" style={{ color: "var(--tt-duman)", marginTop: "var(--s5)", letterSpacing: "var(--ls-label-tight)" }}>
            Her adımda kurumla birlikte çalışılıyor.
          </p>
        </Wrap>
      </section>

      <section className="band-s sec grad-s tex-grid">
        <Wrap className="stack">
          <SectionHead kicker="Neye dayanıyor" title="Doğaçlamanın ölçülmüş etkileri" note="Programların arkasındaki bulgular ve kaynakları." />
          <div className="grid g3">
            {TT_KANIT.map(([b, m, k]) => (
              <div key={b} className="plate plate-sh hoverable stack" style={{ gap: "var(--s2)" }}>
                <h3 style={{ fontSize: "var(--fs-d3)" }}>{b}</h3>
                <p className="b2">{m}</p>
                <div style={{ marginTop: "auto", paddingTop: "var(--s3)", borderTop: "1px solid var(--line)" }}>
                  <span className="mono" style={{ color: "var(--text-2)", letterSpacing: "var(--ls-label-tight)" }}>{k}</span>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="sec-sm">
        <Wrap className="stack" style={{ gap: "var(--s3)" }}>
          <Label>Daha önce çalıştığımız kurumlar</Label>
          <div className="grid g4" style={{ alignItems: "start" }}>
            <PhotoBox slot="hk-logo-1" alt="Acıbadem" ratio="3 / 2" />
          </div>
        </Wrap>
      </section>

      <section className="sec">
        <Wrap
          className="plate plate-sh grad-y tex-dots-y g-collapse"
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "var(--s6)", alignItems: "center", padding: "var(--s7)" }}
        >
          <div className="stack" style={{ gap: "var(--s2)" }}>
            <Label tone="deep">Konuşalım</Label>
            <h3 className="d1">Ekibinize özel bir program <span className="marker-mor marker">tasarlayalım</span>.</h3>
            <p className="b2">
              Kısa bir ön görüşme yeterli; hedef ve süre konuşulduktan sonra teklif iki iş günü içinde
              iletiliyor.
            </p>
          </div>
          <Btn size="lg" variant="dark" href="/iletisim">Teklif formu</Btn>
        </Wrap>
      </section>
    </main>
  );
}
