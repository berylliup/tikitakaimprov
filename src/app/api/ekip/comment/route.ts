import { NextRequest, NextResponse } from "next/server";
import { getEkipUser } from "@/lib/ekip";
import { addComment, deleteComment } from "@/lib/ekip-store";

export async function POST(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const { game, text } = await req.json().catch(() => ({}));
  if (typeof game !== "string" || !game || game.length > 100) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
  const trimmed = typeof text === "string" ? text.trim() : "";
  if (!trimmed || trimmed.length > 2000) {
    return NextResponse.json({ error: "Yorum boş olamaz (en fazla 2000 karakter)" }, { status: 400 });
  }

  const comment = await addComment(game, user.name, trimmed);
  return NextResponse.json({ ok: true, comment });
}

export async function DELETE(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const ok = await deleteComment(id, user.name);
  if (!ok) return NextResponse.json({ error: "Yorum bulunamadı" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
