import { NextResponse } from "next/server";
import { getEkipUser, EKIP_UYELERI } from "@/lib/ekip";
import { getFavs, getComments, getHavuz, getPlan } from "@/lib/ekip-store";

export async function GET() {
  const user = await getEkipUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const [favs, comments, havuz, plan] = await Promise.all([
    getFavs(),
    getComments(),
    getHavuz(),
    getPlan(),
  ]);
  return NextResponse.json({ user, members: EKIP_UYELERI, favs, comments, havuz, plan });
}
