"use client";

import { useState } from "react";

const TT_WORDS = [
  "ÇAMAŞIR MAKİNESİ",
  "KAYINVALİDE",
  "ASANSÖR",
  "DENİZ FENERİ",
  "PAZARTESİ SABAHI",
  "KOMBİ",
  "BALKON",
  "OTOBÜS DURAĞI",
  "DÜĞÜN SALONU",
  "KAYIP ÇORAP",
];

export default function WordBox() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1 + Math.floor(Math.random() * (TT_WORDS.length - 1))) % TT_WORDS.length);
  return (
    <div className="wordbox">
      <span className="mono" style={{ color: "var(--tt-sis)" }}>Seyirciden gelen kelime</span>
      <span className="w">{TT_WORDS[i]}</span>
      <p className="mono" style={{ color: "var(--tt-sis)", letterSpacing: "var(--ls-label-tight)" }}>Oyun buradan başlıyor.</p>
      <button className="shuffle" onClick={next}>Başka kelime</button>
    </div>
  );
}
