"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Wrap,
  Btn,
  Label,
  SectionHead,
  NoteBlock,
  Sticker,
  TICKET_URL,
  TICKET_ALT_URL,
  IG_URL,
  MAIL,
} from "@/components/ds";

const EMAILJS_SERVICE = "service_r5nfslt";
const EMAILJS_TEMPLATE = "template_8rlm4b7";
const EMAILJS_KEY = "A2YS30u-Pv8tSCZ-V";

const KONULAR = ["Kurumsal program", "Eğitim başvurusu", "Gösteri ve bilet", "Basın", "Diğer"];
const KISI = ["10 kişiye kadar", "10–25 kişi", "25–50 kişi", "50+ kişi"];

export default function IletisimPage() {
  const [konu, setKonu] = useState(KONULAR[0]);
  const [kurum, setKurum] = useState("");
  const [kisi, setKisi] = useState(KISI[0]);
  const [ad, setAd] = useState("");
  const [eposta, setEposta] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [onay, setOnay] = useState(false);
  const [durum, setDurum] = useState<"idle" | "sending" | "success" | "error">("idle");

  const kurumsal = konu === "Kurumsal program";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDurum("sending");
    const ekler = [
      kurumsal && kurum ? `Kurum: ${kurum}` : "",
      kurumsal ? `Katılımcı sayısı: ${kisi}` : "",
      `Duyuru izni: ${onay ? "Evet" : "Hayır"}`,
    ].filter(Boolean);
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: ad,
          from_email: eposta,
          phone: "",
          subject: konu,
          message: [mesaj, ekler.join("\n")].filter(Boolean).join("\n\n"),
        },
        EMAILJS_KEY,
      );
      setDurum("success");
      setAd("");
      setEposta("");
      setMesaj("");
      setKurum("");
      setOnay(false);
    } catch {
      setDurum("error");
    }
  };

  return (
    <main>
      <section className="hero tex-grid rel" style={{ borderBottom: "2px solid var(--tt-siyah)" }}>
        <Sticker tone="yesil" className="sticker-abs" style={{ right: "28px", top: "20px" }}>İki iş günü</Sticker>
        <div className="hero-in" style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="stack">
            <Label>İletişim</Label>
            <h1>Bizimle iletişime geçebilirsiniz.</h1>
            <p className="lede b2" style={{ maxWidth: "46ch" }}>
              Bilet, eğitim başvurusu, kurumsal program ya da merak edilen her şey için aynı form kullanılıyor.
            </p>
          </div>
          <div className="stack" style={{ gap: "var(--s4)" }}>
            <NoteBlock title="Yanıt süresi">İki iş günü içinde dönüş yapılıyor.</NoteBlock>
            <NoteBlock title="Konular">Bilet, eğitim, kurumsal program ve basın.</NoteBlock>
          </div>
        </div>
      </section>

      <section className="sec">
        <Wrap
          className="grid g-collapse"
          style={{ gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)", gap: "var(--s7)", alignItems: "start" }}
        >
          <form className="stack" style={{ gap: "var(--s4)" }} onSubmit={handleSubmit}>
            <SectionHead kicker="Form" title="Konu nedir?" />

            <label className="field">
              <span className="dslabel">Konu</span>
              <select value={konu} onChange={(e) => setKonu(e.target.value)}>
                {KONULAR.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </label>

            <div className="grid g2" style={{ gap: "var(--s4)" }}>
              <label className="field">
                <span className="dslabel">Ad Soyad</span>
                <input type="text" placeholder="Adınız" required value={ad} onChange={(e) => setAd(e.target.value)} />
              </label>
              <label className="field">
                <span className="dslabel">E-posta</span>
                <input type="email" placeholder="ornek@kurum.com" required value={eposta} onChange={(e) => setEposta(e.target.value)} />
              </label>
            </div>

            {kurumsal ? (
              <div className="grid g2" style={{ gap: "var(--s4)" }}>
                <label className="field">
                  <span className="dslabel">Kurum</span>
                  <input type="text" placeholder="Şirket adı" value={kurum} onChange={(e) => setKurum(e.target.value)} />
                </label>
                <label className="field">
                  <span className="dslabel">Katılımcı sayısı</span>
                  <select value={kisi} onChange={(e) => setKisi(e.target.value)}>
                    {KISI.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </label>
              </div>
            ) : null}

            <label className="field">
              <span className="dslabel">Mesaj</span>
              <textarea rows={5} placeholder="Nasıl yardımcı olabiliriz?" value={mesaj} onChange={(e) => setMesaj(e.target.value)} />
            </label>

            <label className="check">
              <input type="checkbox" checked={onay} onChange={(e) => setOnay(e.target.checked)} />
              <span>Gösteri ve program duyurularını e-posta ile almak istiyorum.</span>
            </label>

            <div className="row">
              <button type="submit" className="btn btn-lg" disabled={durum === "sending"}>
                {durum === "sending" ? "Gönderiliyor…" : durum === "success" ? "Alındı, teşekkürler" : "Gönder"}
              </button>
              {durum === "success" ? (
                <span className="mono" style={{ color: "var(--text-2)" }}>İki iş günü içinde dönüş yapılıyor.</span>
              ) : null}
            </div>
            {durum === "error" ? (
              <p className="formnote formnote-err">Bir hata oluştu, lütfen tekrar deneyin veya {MAIL} adresine yazın.</p>
            ) : null}
          </form>

          <div className="stack" style={{ gap: "var(--s5)" }}>
            <div className="plate plate-sh stack" style={{ gap: "var(--s3)" }}>
              <Label>Doğrudan</Label>
              <div className="stack" style={{ gap: "var(--s2)" }}>
                <a
                  href={`mailto:${MAIL}`}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-display)",
                    fontSize: "20px",
                    letterSpacing: "-0.02em",
                    color: "var(--text-body)",
                    wordBreak: "break-word",
                  }}
                >
                  {MAIL}
                </a>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="mono">@tikitakaimpro</a>
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mono">Biletinial · bilet satış</a>
                <a href={TICKET_ALT_URL} target="_blank" rel="noopener noreferrer" className="mono">Bubilet · bilet satış</a>
              </div>
            </div>
            <div className="plate plate-sh stack grad-y tex-dots-y" style={{ gap: "var(--s3)" }}>
              <Label tone="deep">Kurumsal</Label>
              <h3 className="h2big">Teklif <span className="marker-mor marker">iki iş günü</span> içinde hazırlanıyor.</h3>
              <p className="b2">
                Ön görüşmede hedef, süre ve katılımcı sayısı konuşuluyor; program buna göre kurgulanıyor.
              </p>
              <div><Btn size="sm" variant="dark" href="/kurumsal">Kurumsal programlar</Btn></div>
            </div>
          </div>
        </Wrap>
      </section>
    </main>
  );
}
