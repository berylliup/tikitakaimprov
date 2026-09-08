"use client";

import { useEffect, useState } from "react";

type User = { name: string } | null;

type Comment = { id: string; game: string; name: string; text: string; ts: number };
type EkipData = {
  user: { name: string };
  members: string[];
  favs: Record<string, string[]>;
  comments: Comment[];
};

function gameTitle(id: string): string {
  // "01-armando" -> "Armando"
  return id
    .replace(/^\d+-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function LoginForm({ members, onLogin }: { members: string[]; onLogin: (u: { name: string }) => void }) {
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) {
      setError("Önce adını seç");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch("/api/ekip/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    setBusy(false);
    if (res.ok) {
      onLogin({ name });
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Bir şeyler ters gitti");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-24">
      <h1 className="text-3xl font-bold">Ekip Alanı</h1>
      <p className="mt-2 text-zinc-600">Sadece TikiTaka ekibi içindir.</p>
      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-3">Kimsin?</div>
          <div className="grid grid-cols-2 gap-2">
            {members.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setName(m)}
                className={`rounded-xl border px-4 py-3 text-left font-medium transition min-h-[44px] ${
                  name === m
                    ? "border-black bg-black text-white"
                    : "border-black/15 hover:border-black/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-3">Ekip şifresi</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/15 px-4 py-3 focus:border-black focus:outline-none"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {busy ? "Giriliyor…" : "Gir"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ user, onLogout }: { user: { name: string }; onLogout: () => void }) {
  const [data, setData] = useState<EkipData | null>(null);

  useEffect(() => {
    fetch("/api/ekip/data")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {});
  }, []);

  const favEntries = data
    ? Object.entries(data.favs)
        .filter(([, names]) => names.length > 0)
        .sort((a, b) => b[1].length - a[1].length)
    : [];
  const recentComments = data ? [...data.comments].sort((a, b) => b.ts - a.ts).slice(0, 8) : [];

  async function logout() {
    await fetch("/api/ekip/logout", { method: "POST" });
    onLogout();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Selam, {user.name} 👋</h1>
        <button onClick={logout} className="text-sm text-zinc-500 underline hover:text-black">
          Çıkış yap
        </button>
      </div>

      <a
        href="/ekip/rehber"
        className="mt-8 block rounded-2xl border border-black/10 p-6 shadow-sm transition hover:shadow-md"
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Rehber</div>
        <div className="mt-1 text-2xl font-bold">Long Form Rehberi →</div>
        <p className="mt-2 text-zinc-600">
          51 format: kural, örnek akış, ipuçları. Oyunları favorileyebilir ve yorum yazabilirsin.
        </p>
      </a>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-lg font-bold">Ekibin favorileri</h2>
          {favEntries.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              Henüz favori yok — rehberde bir oyunu ♥ ile işaretle.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {favEntries.map(([game, names]) => (
                <li key={game}>
                  <a
                    href={`/ekip/rehber#v-${game}`}
                    className="flex items-baseline justify-between rounded-xl border border-black/10 px-4 py-2.5 no-underline transition hover:border-black/30"
                  >
                    <span className="font-medium text-black">{gameTitle(game)}</span>
                    <span className="text-xs text-zinc-500">
                      ♥ {names.length} · {names.join(", ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold">Son yorumlar</h2>
          {recentComments.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">Henüz yorum yok.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {recentComments.map((c) => (
                <li key={c.id} className="rounded-xl border border-black/10 px-4 py-3">
                  <a href={`/ekip/rehber#v-${c.game}`} className="text-xs font-semibold text-zinc-500 no-underline hover:underline">
                    {gameTitle(c.game)}
                  </a>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">{c.name}:</span> {c.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
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

  return (
    <main className="min-h-screen bg-white text-black">
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <LoginForm members={members} onLogin={setUser} />
      )}
    </main>
  );
}
