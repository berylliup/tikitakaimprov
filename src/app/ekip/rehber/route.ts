import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getEkipUser } from "@/lib/ekip";

// Rehber HTML'i public/ yerine content/ altında durur ve sadece giriş yapmış
// ekip üyelerine bu route üzerinden servis edilir.

export const dynamic = "force-dynamic";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

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

  // Ekip alanının üst barı rehberde de dursun ki geri dönmek kolay olsun.
  const topbar =
    `<div class="ek-topbar">` +
    `<a href="/ekip"><img src="/logo-negatif.png" alt="Tiki Taka Impro"></a>` +
    `<span class="lnk">` +
    `<a href="/ekip#panel">Panel</a>` +
    `<a href="/ekip#havuz"><span class="tam">Oyun Havuzu</span><span class="kisa">Havuz</span></a>` +
    `<a href="/ekip#plan"><span class="tam">Bugün Ne Oynayalım</span><span class="kisa">Plan</span></a>` +
    `<a class="on" href="/ekip/rehber">Rehber</a>` +
    `</span>` +
    `<span class="kim">${escapeHtml(user.name)}<a href="/ekip">Ekip alanı</a></span>` +
    `</div>`;

  const withBar = html.includes("<body>")
    ? html.replace("<body>", `<body>${topbar}`)
    : topbar + html;

  const out = withBar.includes("</body>")
    ? withBar.replace("</body>", `${inject}</body>`)
    : withBar + inject;

  return new NextResponse(out, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
