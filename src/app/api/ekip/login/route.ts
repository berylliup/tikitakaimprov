import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession, COOKIE_NAME, EKIP_UYELERI } from "@/lib/ekip";

export async function POST(req: NextRequest) {
  const { name, password } = await req.json().catch(() => ({}));

  if (!(EKIP_UYELERI as readonly string[]).includes(name)) {
    return NextResponse.json({ error: "Listeden adını seç" }, { status: 400 });
  }
  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "Şifre yanlış" }, { status: 401 });
  }

  const session = createSession(name);
  const res = NextResponse.json({ ok: true, name });
  res.cookies.set(COOKIE_NAME, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });
  return res;
}
