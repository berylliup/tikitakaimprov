import { NextResponse } from "next/server";
import { getEkipUser, EKIP_UYELERI } from "@/lib/ekip";
import { getFavs, getComments } from "@/lib/ekip-store";

export async function GET() {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const [favs, comments] = await Promise.all([getFavs(), getComments()]);
  return NextResponse.json({ user, members: EKIP_UYELERI, favs, comments });
}
