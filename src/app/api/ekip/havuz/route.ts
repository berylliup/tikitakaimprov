import { NextRequest, NextResponse } from "next/server";
import { getEkipUser } from "@/lib/ekip";
import { addHavuz, deleteHavuz } from "@/lib/ekip-store";

export async function POST(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const ad = typeof body.ad === "string" ? body.ad.trim() : "";
  const kisi = typeof body.kisi === "string" ? body.kisi.trim() : "";
  const aciklama = typeof body.aciklama === "string" ? body.aciklama.trim() : "";
  const form = body.form === "uzun" ? "uzun" : "kisa";

  if (!ad || ad.length > 80) return NextResponse.json({ error: "Oyun adı gerekli" }, { status: 400 });
  if (!kisi || kisi.length > 20) return NextResponse.json({ error: "Kaç kişilik olduğunu yaz" }, { status: 400 });
  if (aciklama.length > 300) return NextResponse.json({ error: "Açıklama çok uzun" }, { status: 400 });

  const oyun = await addHavuz({ ad, kisi, aciklama, form, ekleyen: user.name });
  return NextResponse.json({ ok: true, oyun });
}

export async function DELETE(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const ok = await deleteHavuz(id, user.name);
  if (!ok) return NextResponse.json({ error: "Silinemedi" }, { status: 403 });
  return NextResponse.json({ ok: true });
}
