import Image from "next/image";

export default function EgitimPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-10 md:gap-16 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Doğaçlama eğitimleri</h2>
            <p className="text-zinc-600 leading-8 mb-8">
              Tiki Taka, doğaçlama tiyatroyla tanışmak, sahnede özgürleşmek ve birlikte üretmenin yollarını keşfetmek isteyenler için farklı formatlarda eğitimler sunar. Kısa form doğaçlama, uzun form doğaçlama ve doğaçlama atölyeleriyle; oyun, hikâye kurma, dinleme, uyumlanma ve sahnede anda kalma becerilerine odaklanır.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Eğitim içerikleri</p>
            <ul className="flex flex-col divide-y divide-black/10">
              {["Kısa Form Doğaçlama", "Uzun Form Doğaçlama", "Doğaçlama Atölyeleri"].map((item) => (
                <li key={item} className="flex items-center gap-3 py-3 text-zinc-800 font-semibold text-base">
                  <span className="h-[2px] w-4 bg-[#FFCB00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full overflow-hidden rounded-3xl order-first md:order-last" style={{ aspectRatio: "4 / 3" }}>
            <Image src="/aboutus4.jpg" alt="Tiki Taka eğitim" fill className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
