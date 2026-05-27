import Image from "next/image";

export default function KurumsalPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-10 md:gap-16 md:grid-cols-2 items-center">
          <div className="relative w-full overflow-hidden rounded-3xl order-first" style={{ aspectRatio: "4 / 3" }}>
            <Image src="/aboutus5.png" alt="Tiki Taka kurumsal" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Kurumsal çalışmalar</h2>
            <p className="text-zinc-600 leading-8 mb-8">
              Tiki Taka, kurumlara özel tasarlanan oyunlar ve uygulamalı eğitimlerle ekiplerin iletişim, yaratıcılık, uyumlanma ve birlikte düşünme becerilerini destekler. Her buluşma, kurumun ihtiyacına göre şekillenen; katılımcı, deneyim odaklı ve enerjisi yüksek bir içerik olarak kurgulanır.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Kurumsal içerikler</p>
            <ul className="flex flex-col divide-y divide-black/10">
              {["Kurumsal Oyunlar", "Kurumsal Eğitimler", "Ekibe Özel Workshop Tasarımları"].map((item) => (
                <li key={item} className="flex items-center gap-3 py-3 text-zinc-800 font-semibold text-base">
                  <span className="h-[2px] w-4 bg-[#FFCB00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
