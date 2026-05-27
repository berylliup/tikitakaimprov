import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tikitakaimprov.com";
  return [
    { url: base,                 lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/egitim`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kurumsal`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/iletisim`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
