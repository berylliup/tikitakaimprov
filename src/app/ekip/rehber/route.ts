import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getEkipUser } from "@/lib/ekip";

// Rehber HTML'i public/ yerine content/ altında durur ve sadece giriş yapmış
// ekip üyelerine bu route üzerinden servis edilir.

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getEkipUser();
  if (!user) {
    return NextResponse.redirect(new URL("/ekip", req.url), 307);
  }

  const dir = path.join(process.cwd(), "content");
  const [html, ds, css, js] = await Promise.all([
    fs.readFile(path.join(dir, "rehber.html"), "utf8"),
    fs.readFile(path.join(dir, "rehber-ds.css"), "utf8"),
    fs.readFile(path.join(dir, "rehber-extras.css"), "utf8"),
    fs.readFile(path.join(dir, "rehber-extras.js"), "utf8"),
  ]);

  const inject =
    `<style>${ds}</style>` +
    `<style>${css}</style>` +
    `<script>window.__EKIP__=${JSON.stringify({ name: user.name })};</script>` +
    `<script>${js}</script>`;

  const out = html.includes("</body>")
    ? html.replace("</body>", `${inject}</body>`)
    : html + inject;

  return new NextResponse(out, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
