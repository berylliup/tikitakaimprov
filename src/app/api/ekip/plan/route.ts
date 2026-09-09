import { NextRequest, NextResponse } from "next/server";
import { getEkipUser, EKIP_UYELERI } from "@/lib/ekip";
import { setPlan, type Plan, type PlanOyun } from "@/lib/ekip-store";

const UYELER = EKIP_UYELERI as readonly string[];

function temizleOyun(x: unknown): PlanOyun | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.slice(0, 40) : "";
  const ad = typeof o.ad === "string" ? o.ad.trim().slice(0, 80) : "";
  if (!id || !ad) return null;
  const kisiler = Array.isArray(o.kisiler)
    ? o.kisiler
        .filter((n): n is string => typeof n === "string")
        .filter((n) => n === "Herkes" || UYELER.includes(n))
        .slice(0, 12)
    : [];
  return { id, ad, form: o.form === "uzun" ? "uzun" : "kisa", kisiler };
}

function temizleAct(x: unknown): PlanOyun[] {
  if (!Array.isArray(x)) return [];
  return x.map(temizleOyun).filter((o): o is PlanOyun => o !== null).slice(0, 60);
}

export async function PUT(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;
  const acts = Array.isArray(raw.acts) ? raw.acts : [];
  const plan: Plan = {
    perde: raw.perde === 2 ? 2 : 1,
    acts: [temizleAct(acts[0]), temizleAct(acts[1])],
  };

  await setPlan(plan);
  return NextResponse.json({ ok: true, plan });
}
