import { NextRequest, NextResponse } from "next/server";
import { getEkipUser } from "@/lib/ekip";
import { setFav } from "@/lib/ekip-store";

export async function POST(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const { game, on } = await req.json().catch(() => ({}));
  if (typeof game !== "string" || !game || game.length > 100 || typeof on !== "boolean") {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  await setFav(game, user.name, on);
  return NextResponse.json({ ok: true });
}
