"use client";

import Image from "next/image";
import { useState } from "react";

const GALLERY = Array.from({ length: 9 }, (_, i) => `/gallery${i + 1}.png`);

function GallerySection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <h2 className="text-3xl font-bold mb-10">Galeri</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {GALLERY.map((src) => (
          <button
            key={src}
            onClick={() => setActive(src)}
            className="relative overflow-hidden rounded-2xl focus:outline-none group min-h-[44px]"
            style={{ aspectRatio: "3 / 2" }}
          >
            <Image src={src} alt="TikiTaka Impro" fill className="object-cover transition duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4" onClick={() => setActive(null)}>
          <div className="relative max-w-4xl w-full" style={{ aspectRatio: "3 / 2" }} onClick={(e) => e.stopPropagation()}>
            <Image src={active} alt="TikiTaka Impro" fill className="object-contain rounded-2xl" />
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 h-11 w-11 flex items-center justify-center rounded-full bg-black/60 text-white text-lg font-bold hover:bg-black transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold">Hakkımızda</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2 items-center">
          <div className="text-zinc-800 leading-8 flex flex-col justify-center">
            <p className="mb-6">
              Tiki Taka, 2021 yılında <strong>Hayal Meal Sahne</strong>{" "}bünyesinde bir araya gelen oyuncular tarafından kuruldu. O günden bu yana aynı sahnede, aynı oyunda ve aynı merakla birlikte doğaçlıyoruz.
            </p>
            <p>Kısa ve uzun form doğaçlama gösterileri üretiyor; her oyunda seyirciyle birlikte, sıfırdan bir dünya kuruyoruz. Yazılı metin yok, tekrar yok, her şey anda.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 min-w-0">
            <div className="relative w-full h-[240px] sm:h-[360px] overflow-hidden rounded-3xl">
              <Image src="/aboutus2.png" alt="Gösteriden bir an" fill className="object-cover object-center" />
            </div>
            <div className="relative w-full h-[240px] sm:h-[360px] overflow-hidden rounded-3xl">
              <Image src="/aboutus3.png" alt="Seyirciyle etkileşim" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

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

      <GallerySection />

    </main>
  );
}
