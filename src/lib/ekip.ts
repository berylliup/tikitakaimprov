import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// Ekip üyeleri — yeni üye eklemek için bu listeye ad eklemek yeterli.
export const EKIP_UYELERI = [
  "Arzu",
  "Baransel",
  "Beril",
  "Hikmet",
  "Sedat",
  "Tolga",
  "Veyis",
] as const;

export const COOKIE_NAME = "ekip_session";
const SESSION_DAYS = 180;

function secret(): string {
  const s = process.env.EKIP_SECRET || process.env.EKIP_SIFRE;
  if (!s) throw new Error("EKIP_SIFRE env değişkeni tanımlı değil");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function checkPassword(password: string): boolean {
  const expected = process.env.EKIP_SIFRE;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createSession(name: string): { value: string; maxAge: number } {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ name, exp })).toString("base64url");
  return {
    value: `${payload}.${sign(payload)}`,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export function verifySession(token: string | undefined): { name: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.name !== "string" || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;
    if (!(EKIP_UYELERI as readonly string[]).includes(data.name)) return null;
    return { name: data.name };
  } catch {
    return null;
  }
}

export async function getEkipUser(): Promise<{ name: string } | null> {
  const jar = await cookies();
  return verifySession(jar.get(COOKIE_NAME)?.value);
}
