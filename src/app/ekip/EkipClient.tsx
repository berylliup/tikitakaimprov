"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import "./ekip.css";

type User = { name: string } | null;

type Comment = { id: string; game: string; name: string; text: string; ts: number };
type HavuzOyun = {
  id: string;
  ad: string;
  kisi: string;
  aciklama: string;
  form: "kisa" | "uzun";
  ekleyen: string;
  ts: number;
};
type PlanOyun = { id: string; ad: string; form: "kisa" | "uzun"; kisiler: string[] };
type Plan = { perde: 1 | 2; acts: [PlanOyun[], PlanOyun[]] };
type EkipData = {
  user: { name: string };
  members: string[];
  favs: Record<string, string[]>;
  comments: Comment[];
  havuz: HavuzOyun[];
  plan: Plan;
};

const uid = () => Math.random().toString(36).slice(2, 9);
const planToplam = (p?: Plan) => (p ? p.acts[0].length + p.acts[1].length : 0);

function gameTitle(id: string): string {
  return id
    .replace(/^\d+-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const tarihStr = (ts: number) =>
  new Date(ts).toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });

/* ── giriş ── */
function Gate({ members, onLogin }: { members: string[]; onLogin: (u: { name: string }) => void }) {
  const [kim, setKim] = useState<string | null>(null);
  const [sifre, setSifre] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function gir(e: React.FormEvent) {
    e.preventDefault();
    if (!kim) {
      setErr("Önce kim olduğunu seç.");
      return;
    }
    setBusy(true);
    setErr("");
    const res = await fetch("/api/ekip/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: kim, password: sifre }),
    });
    setBusy(false);
    if (res.ok) {
      onLogin({ name: kim });
    } else {
      const j = await res.json().catch(() => ({}));
      setErr(j.error || "Şifre tutmadı.");
    }
  }

  return (
    <div className="gate">
      <div className="gate-left">
        <Image src="/logo-negatif.png" alt="Tiki Taka Impro" width={57} height={44} unoptimized style={{ height: 44, width: "auto", alignSelf: "flex-start" }} />
        <div className="stack">
          <span className="gate-band">EKİP ALANI</span>
          <h1>Bu kapı<br />sahne arkasına<br />açılıyor.</h1>
          <p className="b2" style={{ color: "var(--tt-sis)", maxWidth: "34ch" }}>
            Rehber ve oyun havuzu burada. Sadece Tiki Taka ekibi için.
          </p>
        </div>
        <div className="mono" style={{ color: "var(--tt-duman)" }}>tikitakaimprov.com · ekip</div>
      </div>
      <form className="gate-right" onSubmit={gir}>
        <div className="stack" style={{ gap: "var(--s3)" }}>
          <div className="dslabel dslabel-brand">Kimsin</div>
          <div className="who">
            {members.map((n) => (
              <button
                key={n}
                type="button"
                className={kim === n ? "on" : ""}
                onClick={() => { setKim(n); setErr(""); }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="stack" style={{ gap: "var(--s3)" }}>
          <div className="dslabel dslabel-brand">Ekip şifresi</div>
          <input
            type="password"
            value={sifre}
            autoComplete="current-password"
            onChange={(e) => { setSifre(e.target.value); setErr(""); }}
            placeholder="••••••••"
          />
        </div>
        {err ? <div className="err">{err}</div> : null}
        <button type="submit" className="btn" disabled={busy} style={{ width: "100%" }}>
          {busy ? "Giriliyor…" : "Gir"}
        </button>
      </form>
    </div>
  );
}

/* ── üst bar ── */
function EkipHeader({
  user,
  tab,
  setTab,
  onLogout,
}: {
  user: string;
  tab: string;
  setTab: (t: string) => void;
  onLogout: () => void;
}) {
  const tabs: [string, string][] = [
    ["panel", "Panel"],
    ["havuz", "Oyun Havuzu"],
    ["plan", "Bugün Ne Oynayalım"],
  ];
  return (
    <header className="ek-hdr">
      <div className="ek-hdr-in">
        <Link href="/" style={{ display: "flex" }}>
          <Image src="/logo-negatif.png" alt="Tiki Taka Impro" width={39} height={30} unoptimized style={{ height: 30, width: "auto" }} />
        </Link>
        <div className="ek-tabs">
          {tabs.map(([k, t]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{t}</button>
          ))}
          <a href="/ekip/rehber">Rehber</a>
        </div>
        <div className="ek-user">
          {user}
          <button onClick={onLogout}>Çıkış</button>
        </div>
      </div>
    </header>
  );
}

function Head({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="ek-head">
      <div className="stack" style={{ gap: "var(--s2)" }}>
        <div className="dslabel">{kicker}</div>
        <h2>{title}</h2>
      </div>
      {children ? <div className="row">{children}</div> : null}
    </div>
  );
}

/* ── panel ── */
function Panel({
  user,
  data,
  plan,
  setTab,
}: {
  user: string;
  data: EkipData | null;
  plan: Plan;
  setTab: (t: string) => void;
}) {
  const favList = data
    ? Object.entries(data.favs)
        .filter(([, names]) => names.length > 0)
        .sort((a, b) => b[1].length - a[1].length)
    : [];
  const sonNotlar = data ? [...data.comments].sort((a, b) => b.ts - a.ts).slice(0, 6) : [];
  const bugun = new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });

  return (
    <div className="wrap stack-lg">
      <Head kicker={"Ekip · " + bugun} title={"Selam " + user + "."} />
      <div className="grid g2">
        <a className="ek-card" href="/ekip/rehber">
          <div className="ek-card-top"><span>Rehber</span><span>51 format</span></div>
          <div className="ek-card-body">
            <h3>Long Form Rehberi</h3>
            <p className="b2">
              Kural, yapı şeması, 7 kişiye uyarlama, prova notları. Formatı favorileyebilir ve not
              bırakabilirsin.
            </p>
            <div className="mono" style={{ marginTop: "auto", color: "var(--tt-sari-yanik)" }}>Aç →</div>
          </div>
        </a>
        <button className="ek-card" onClick={() => setTab("havuz")}>
          <div className="ek-card-top"><span>Havuz</span><span>{data ? data.havuz.length + " oyun" : "…"}</span></div>
          <div className="ek-card-body">
            <h3>Oyun Havuzu</h3>
            <p className="b2">
              Oynadığımız her şey tek listede: kısa form ve uzun form. Herkes ekleyebilir.
            </p>
            <div className="mono" style={{ marginTop: "auto", color: "var(--tt-sari-yanik)" }}>Aç →</div>
          </div>
        </button>
        <button className="ek-card" onClick={() => setTab("plan")}>
          <div className="ek-card-top">
            <span>Plan</span>
            <span>{planToplam(plan) ? planToplam(plan) + " oyun" : "boş"}</span>
          </div>
          <div className="ek-card-body">
            <h3>Bugün Ne Oynayalım</h3>
            <p className="b2">
              Gecenin sırası: perde sayısı, oyunlar, kim hangi oyunda. Sürükleyip sırayı değiştir.
            </p>
            <div className="mono" style={{ marginTop: "auto", color: "var(--tt-sari-yanik)" }}>Aç →</div>
          </div>
        </button>
      </div>

      <div className="grid g2">
        <div className="stack" style={{ gap: "var(--s4)" }}>
          <Head kicker="Rehber" title="Ekibin favorileri" />
          {favList.length === 0 ? (
            <div className="perde-bos">Henüz favori yok</div>
          ) : (
            <div className="stack" style={{ gap: "var(--s2)" }}>
              {favList.map(([game, names]) => (
                <a className="fav-satir" key={game} href={`/ekip/rehber#v-${game}`}>
                  <span className="ad">{gameTitle(game)}</span>
                  <span className="kim">★ {names.length} · {names.join(" · ")}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="stack" style={{ gap: "var(--s4)" }}>
          <Head kicker="Rehber" title="Son notlar" />
          {sonNotlar.length === 0 ? (
            <div className="perde-bos">Henüz not yok</div>
          ) : (
            <div className="stack" style={{ gap: "var(--s3)" }}>
              {sonNotlar.map((n) => (
                <a className="not-satir" key={n.id} href={`/ekip/rehber#v-${n.game}`}>
                  <div className="kim">{gameTitle(n.game)} · {n.name} · {tarihStr(n.ts)}</div>
                  <p>{n.text}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── oyun havuzu ── */
function Havuz({
  user,
  havuz,
  setHavuz,
}: {
  user: string;
  havuz: HavuzOyun[];
  setHavuz: (h: HavuzOyun[]) => void;
}) {
  const [ad, setAd] = useState("");
  const [kisi, setKisi] = useState("");
  const [form, setForm] = useState<"kisa" | "uzun">("kisa");
  const [aciklama, setAciklama] = useState("");
  const [q, setQ] = useState("");
  const [filtre, setFiltre] = useState("hepsi");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function ekle(e: React.FormEvent) {
    e.preventDefault();
    if (!ad.trim()) return setErr("Oyun adı gerekli.");
    if (!kisi.trim()) return setErr("Kaç kişilik olduğunu yaz.");
    setBusy(true);
    const res = await fetch("/api/ekip/havuz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ad, kisi, aciklama, form }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j.error || "Eklenemedi.");
      return;
    }
    const { oyun } = await res.json();
    setHavuz([oyun, ...havuz]);
    setAd(""); setKisi(""); setAciklama(""); setErr("");
  }

  async function sil(id: string) {
    const res = await fetch("/api/ekip/havuz", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setHavuz(havuz.filter((x) => x.id !== id));
    else setErr("Sadece kendi eklediğin oyunu silebilirsin.");
  }

  const liste = havuz
    .filter((o) => filtre === "hepsi" || o.form === filtre)
    .filter((o) => (o.ad + " " + (o.aciklama || "")).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="wrap stack-lg">
      <Head kicker={"Havuz · " + havuz.length + " oyun"} title="Oyun Havuzu">
        <div className="segmented">
          {[["hepsi", "Hepsi"], ["kisa", "Kısa form"], ["uzun", "Uzun form"]].map(([k, t]) => (
            <button key={k} className={filtre === k ? "on" : ""} onClick={() => setFiltre(k)}>{t}</button>
          ))}
        </div>
        <input className="ara-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Oyun ara" />
      </Head>

      <form className="ek-card" onSubmit={ekle}>
        <div className="ek-card-top"><span>Havuza oyun ekle</span><span>{user}</span></div>
        <div className="ek-card-body">
          <div className="grid g-collapse" style={{ gridTemplateColumns: "1.1fr .6fr .8fr 1.5fr", alignItems: "end", gap: "var(--s4)" }}>
            <label className="field">
              <span className="dslabel">Oyun adı</span>
              <input value={ad} onChange={(e) => setAd(e.target.value)} placeholder="Freeze Tag" />
            </label>
            <label className="field">
              <span className="dslabel">Kaç kişilik</span>
              <input value={kisi} onChange={(e) => setKisi(e.target.value)} placeholder="2, 3-4, 4+" />
            </label>
            <div className="stack" style={{ gap: "var(--s2)" }}>
              <span className="dslabel">Format</span>
              <div className="segmented">
                <button type="button" className={form === "kisa" ? "on" : ""} onClick={() => setForm("kisa")}>Kısa</button>
                <button type="button" className={form === "uzun" ? "on" : ""} onClick={() => setForm("uzun")}>Uzun</button>
              </div>
            </div>
            <label className="field">
              <span className="dslabel">Kısa açıklama (isteğe bağlı)</span>
              <input value={aciklama} onChange={(e) => setAciklama(e.target.value)} placeholder="Nasıl oynanır, tek cümle." />
            </label>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="mono" style={{ color: err ? "var(--accent)" : "var(--text-2)" }}>
              {err || "Açıklama zorunlu değil."}
            </span>
            <button type="submit" className="btn btn-sm" disabled={busy}>
              {busy ? "Ekleniyor…" : "Havuza ekle"}
            </button>
          </div>
        </div>
      </form>

      {liste.length === 0 ? (
        <div className="perde-bos">Bu aramada oyun yok</div>
      ) : (
        <div className="arsiv-grid">
          {liste.map((o) => (
            <div className="oyun" key={o.id}>
              {o.ekleyen === user ? (
                <button className="sil" title="Sil" onClick={() => sil(o.id)}>×</button>
              ) : null}
              <h4>{o.ad}</h4>
              <div className="row" style={{ gap: "var(--s2)" }}>
                <span className="kisi">{o.kisi} KİŞİ</span>
                <span className={"form-et" + (o.form === "uzun" ? " uzun" : "")}>
                  {o.form === "uzun" ? "uzun form" : "kısa form"}
                </span>
              </div>
              {o.aciklama ? <p>{o.aciklama}</p> : null}
              <div className="kim">{o.ekleyen} · {tarihStr(o.ts)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── havuzdan oyun seçici ── */
function Secici({
  havuz,
  onSec,
  onKapat,
}: {
  havuz: HavuzOyun[];
  onSec: (o: { ad: string; form: "kisa" | "uzun" }) => void;
  onKapat: () => void;
}) {
  const [form, setForm] = useState<"kisa" | "uzun" | null>(null);
  const [q, setQ] = useState("");
  const liste = form
    ? havuz.filter((o) => o.form === form && o.ad.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div className="secici" onMouseDown={(e) => { if (e.target === e.currentTarget) onKapat(); }}>
      <div className="secici-kutu">
        <div className="secici-top">
          <span>Havuzdan oyun ekle</span>
          <button onClick={onKapat}>Kapat ×</button>
        </div>
        <div className="secici-body">
          {!form ? (
            <div className="stack" style={{ gap: "var(--s4)" }}>
              <p className="b2">Hangisinden ekliyoruz?</p>
              <div className="grid g2">
                <button className="btn btn-dark" onClick={() => setForm("kisa")}>Kısa form</button>
                <button className="btn" onClick={() => setForm("uzun")}>Uzun form</button>
              </div>
            </div>
          ) : (
            <div className="stack" style={{ gap: "var(--s4)" }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="mono">{form === "kisa" ? "Kısa form · havuz" : "Uzun form · havuz"}</span>
                <button className="kisi-ekle" onClick={() => { setForm(null); setQ(""); }}>← geri</button>
              </div>
              <input
                className="ara-input"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ara"
                style={{ width: "100%" }}
              />
              {liste.length === 0 ? (
                <div className="perde-bos">
                  {havuz.filter((o) => o.form === form).length === 0
                    ? "Havuzda bu formatta oyun yok. Önce Oyun Havuzu'na ekle."
                    : "Sonuç yok"}
                </div>
              ) : (
                <div className="secim-liste">
                  {liste.map((o) => (
                    <button key={o.id} onClick={() => onSec({ ad: o.ad, form: o.form })}>
                      <span>{o.ad}</span>
                      {o.kisi ? <span className="k">{o.kisi}</span> : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── oyuna kişi ekleme ── */
function KisiEkle({
  secili,
  members,
  onEkle,
}: {
  secili: string[];
  members: string[];
  onEkle: (n: string) => void;
}) {
  const [acik, setAcik] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!acik) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAcik(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [acik]);

  const kalan = members.filter((n) => !secili.includes(n));
  if (secili.includes("Herkes")) return null;

  return (
    <span className="kisi-pop" ref={ref}>
      <button className="kisi-ekle" onClick={() => setAcik(!acik)}>+ kişi</button>
      {acik ? (
        <span className="kisi-menu">
          <button className="hepsi-op" onClick={() => { onEkle("Herkes"); setAcik(false); }}>Herkes</button>
          {kalan.map((n) => (
            <button key={n} onClick={() => { onEkle(n); setAcik(false); }}>{n}</button>
          ))}
          {kalan.length === 0 ? (
            <button disabled style={{ color: "var(--text-2)" }}>Herkes eklendi</button>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

/* ── gece planı ── */
function PlanEkrani({
  plan,
  setPlan,
  havuz,
  members,
  kayit,
}: {
  plan: Plan;
  setPlan: (p: Plan) => void;
  havuz: HavuzOyun[];
  members: string[];
  kayit: "bekliyor" | "kaydedildi" | "hata";
}) {
  const [secici, setSecici] = useState<number | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [suruklenen, setSuruklenen] = useState<string | null>(null);
  const drag = useRef<{ a: number; i: number } | null>(null);

  const setActs = (acts: [PlanOyun[], PlanOyun[]]) => setPlan({ ...plan, acts });

  function perdeSec(n: 1 | 2) {
    if (n === 1 && plan.acts[1].length) {
      setPlan({ perde: 1, acts: [[...plan.acts[0], ...plan.acts[1]], []] });
    } else {
      setPlan({ ...plan, perde: n });
    }
  }
  function ekleOyun(a: number, o: { ad: string; form: "kisa" | "uzun" }) {
    const acts: [PlanOyun[], PlanOyun[]] = [plan.acts[0].slice(), plan.acts[1].slice()];
    acts[a].push({ id: uid(), ad: o.ad, form: o.form, kisiler: [] });
    setActs(acts);
  }
  function guncelle(a: number, i: number, patch: Partial<PlanOyun>) {
    const acts: [PlanOyun[], PlanOyun[]] = [plan.acts[0].slice(), plan.acts[1].slice()];
    acts[a][i] = { ...acts[a][i], ...patch };
    setActs(acts);
  }
  function cikar(a: number, i: number) {
    const acts: [PlanOyun[], PlanOyun[]] = [plan.acts[0].slice(), plan.acts[1].slice()];
    acts[a].splice(i, 1);
    setActs(acts);
  }
  function birak(toA: number, toI: number) {
    const d = drag.current;
    drag.current = null;
    setOver(null);
    setSuruklenen(null);
    if (!d) return;
    const acts: [PlanOyun[], PlanOyun[]] = [plan.acts[0].slice(), plan.acts[1].slice()];
    let idx = toI;
    if (d.a === toA && d.i < toI) idx = toI - 1;
    const [item] = acts[d.a].splice(d.i, 1);
    acts[toA].splice(Math.max(0, Math.min(idx, acts[toA].length)), 0, item);
    setActs(acts);
  }
  function hedef(e: React.DragEvent, i: number) {
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientY > r.top + r.height / 2 ? i + 1 : i;
  }

  const perdeler = plan.perde === 2 ? [0, 1] : [0];
  const bugun = new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });

  return (
    <div className="wrap stack-lg">
      <Head kicker={"Gece planı · " + bugun} title="Bugün ne oynayalım">
        <div className="segmented">
          <button className={plan.perde === 1 ? "on" : ""} onClick={() => perdeSec(1)}>Tek perde</button>
          <button className={plan.perde === 2 ? "on" : ""} onClick={() => perdeSec(2)}>İki perde</button>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={() => setPlan({ perde: plan.perde, acts: [[], []] })}>
          Sırayı temizle
        </button>
        <span className="mono" style={{ color: kayit === "hata" ? "var(--accent)" : "var(--text-2)" }}>
          {kayit === "bekliyor" ? "Kaydediliyor…" : kayit === "hata" ? "Kaydedilemedi" : "Ekiple ortak"}
        </span>
      </Head>

      <div className="stack" style={{ gap: "var(--s5)" }}>
        {perdeler.map((a) => (
          <Fragment key={a}>
            {a === 1 ? <div className="ara-bant">ARA</div> : null}
            <div className="perde">
              <div className="perde-top">
                <span>{plan.perde === 2 ? (a === 0 ? "1. Perde" : "2. Perde") : "Sıra"}</span>
                <span>{plan.acts[a].length} oyun</span>
              </div>
              <div
                className="perde-list"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => birak(a, plan.acts[a].length)}
              >
                {plan.acts[a].length === 0 ? <div className="perde-bos">Henüz oyun yok</div> : null}
                {plan.acts[a].map((it, i) => (
                  <div
                    key={it.id}
                    className={
                      "sira" +
                      (over === a + "-" + i ? " over" : "") +
                      (over === a + "-" + (i + 1) ? " over-alt" : "") +
                      (suruklenen === it.id ? " dragging" : "")
                    }
                    draggable
                    onDragStart={(e) => {
                      drag.current = { a, i };
                      setSuruklenen(it.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => { drag.current = null; setOver(null); setSuruklenen(null); }}
                    onDragOver={(e) => { e.preventDefault(); setOver(a + "-" + hedef(e, i)); }}
                    onDragLeave={() => setOver((o) => (o === a + "-" + i || o === a + "-" + (i + 1) ? null : o))}
                    onDrop={(e) => { e.stopPropagation(); birak(a, hedef(e, i)); }}
                  >
                    <span className="tut">≡</span>
                    <span className="no">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="ad">
                        {it.ad}
                        <span className={"form-et" + (it.form === "uzun" ? " uzun" : "")}>
                          {it.form === "uzun" ? "uzun" : "kısa"}
                        </span>
                      </div>
                      <div className="kisiler">
                        {it.kisiler.map((n) => (
                          <span key={n} className={"kisi-chip" + (n === "Herkes" ? " hepsi" : "")}>
                            {n}
                            <button
                              title="Çıkar"
                              onClick={() => guncelle(a, i, { kisiler: it.kisiler.filter((x) => x !== n) })}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        <KisiEkle
                          secili={it.kisiler}
                          members={members}
                          onEkle={(n) =>
                            guncelle(a, i, { kisiler: n === "Herkes" ? ["Herkes"] : [...it.kisiler, n] })
                          }
                        />
                      </div>
                    </div>
                    <button className="cikar" title="Sıradan çıkar" onClick={() => cikar(a, i)}>×</button>
                  </div>
                ))}
                <div className="row" style={{ marginTop: "var(--s2)" }}>
                  <button className="btn btn-sm btn-dark" onClick={() => setSecici(a)}>Oyun ekle</button>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {secici !== null ? (
        <Secici
          havuz={havuz}
          onKapat={() => setSecici(null)}
          onSec={(o) => { ekleOyun(secici, o); setSecici(null); }}
        />
      ) : null}
    </div>
  );
}

export default function EkipClient({
  initialUser,
  members,
}: {
  initialUser: User;
  members: string[];
}) {
  const [user, setUser] = useState<User>(initialUser);
  // Rehberden "#havuz" gibi bir bağlantıyla gelinebilsin diye sekme hash'te tutulur.
  const [tab, setTab] = useState(() => {
    if (typeof window === "undefined") return "panel";
    const h = window.location.hash.slice(1);
    return ["panel", "havuz", "plan"].includes(h) ? h : "panel";
  });
  const [data, setData] = useState<EkipData | null>(null);
  const [plan, setPlanState] = useState<Plan>({ perde: 1, acts: [[], []] });
  const [kayit, setKayit] = useState<"bekliyor" | "kaydedildi" | "hata">("kaydedildi");
  const planKuyruk = useRef<Plan | null>(null);
  const planZaman = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) return;
    let iptal = false;
    fetch("/api/ekip/data")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: EkipData | null) => {
        if (iptal || !d) return;
        setData(d);
        // Sunucudaki plan yalnızca kullanıcı henüz bir şey değiştirmediyse alınır.
        if (!planKuyruk.current && d.plan) setPlanState(d.plan);
      })
      .catch(() => {});
    return () => { iptal = true; };
  }, [user]);

  useEffect(() => () => { if (planZaman.current) clearTimeout(planZaman.current); }, []);

  useEffect(() => {
    if (!user) return;
    history.replaceState(null, "", "#" + tab);
  }, [tab, user]);

  // Plan ekipçe ortak; her değişiklik kısa bir gecikmeyle sunucuya yazılır.
  function planKaydet(p: Plan) {
    setPlanState(p);
    planKuyruk.current = p;
    setKayit("bekliyor");
    if (planZaman.current) clearTimeout(planZaman.current);
    planZaman.current = setTimeout(async () => {
      const gonder = planKuyruk.current;
      if (!gonder) return;
      try {
        const res = await fetch("/api/ekip/plan", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gonder),
        });
        setKayit(res.ok ? "kaydedildi" : "hata");
      } catch {
        setKayit("hata");
      }
    }, 600);
  }

  async function logout() {
    await fetch("/api/ekip/logout", { method: "POST" });
    setUser(null);
    setData(null);
    setTab("panel");
  }

  if (!user) return <Gate members={members} onLogin={setUser} />;

  return (
    <div className="ek-body">
      <EkipHeader user={user.name} tab={tab} setTab={setTab} onLogout={logout} />
      <main className="ek-main">
        {tab === "panel" ? <Panel user={user.name} data={data} plan={plan} setTab={setTab} /> : null}
        {tab === "havuz" ? (
          <Havuz
            user={user.name}
            havuz={data?.havuz ?? []}
            setHavuz={(h) => setData((d) => (d ? { ...d, havuz: h } : d))}
          />
        ) : null}
        {tab === "plan" ? (
          <PlanEkrani
            plan={plan}
            setPlan={planKaydet}
            havuz={data?.havuz ?? []}
            members={members}
            kayit={kayit}
          />
        ) : null}
      </main>
    </div>
  );
}
