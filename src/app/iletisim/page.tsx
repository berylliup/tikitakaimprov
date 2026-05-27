"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE  = "service_r5nfslt";
const EMAILJS_TEMPLATE = "template_8rlm4b7";
const EMAILJS_KEY      = "A2YS30u-Pv8tSCZ-V";
const IG_URL = "https://instagram.com/tikitakaimpro";

export default function IletisimPage() {
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
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center">İletişim</h2>
        <div className="flex flex-col items-center gap-10 mt-10">
          <div className="flex flex-col items-center gap-3 text-zinc-700">
            <p>
              Instagram:{" "}
              <a className="underline font-semibold" href={IG_URL} target="_blank" rel="noreferrer">
                @tikitakaimpro
              </a>
            </p>
            <p>
              E-posta:{" "}
              <a className="underline font-semibold" href="mailto:info@tikitakaimprov.com">
                info@tikitakaimprov.com
              </a>
            </p>
          </div>
          <p className="text-zinc-600 text-center max-w-xl px-2">
            Bizimle iletişime geçmek, eğitimler ve kurumsal çalışmalar hakkında bilgi almak için formu doldurabilirsiniz.
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
            <input name="from_name" type="text" required placeholder="Ad Soyad" className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition" />
            <input name="from_email" type="email" required placeholder="E-posta" className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition" />
            <input name="phone" type="tel" placeholder="Telefon" className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition" />
            <select name="subject" required defaultValue="" className="rounded-2xl border border-black/10 px-5 py-4 text-base text-zinc-700 outline-none focus:border-[#FFCB00] transition bg-white">
              <option value="" disabled>Konu seçin</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Kurumsal">Kurumsal</option>
              <option value="Diğer">Diğer</option>
            </select>
            <textarea name="message" required rows={5} placeholder="Mesajınız" className="rounded-2xl border border-black/10 px-5 py-4 text-base outline-none focus:border-[#FFCB00] transition resize-none" />
            <button type="submit" disabled={formState === "sending"} className="rounded-full bg-[#FFCB00] px-8 py-4 text-base font-bold hover:opacity-90 transition disabled:opacity-50">
              {formState === "sending" ? "Gönderiliyor..." : "Gönder"}
            </button>
            {formState === "success" && <p className="text-center text-sm font-semibold text-green-600">Mesajınız iletildi, en kısa sürede dönüş yapacağız!</p>}
            {formState === "error" && <p className="text-center text-sm font-semibold text-red-500">Bir hata oluştu, lütfen tekrar deneyin.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
