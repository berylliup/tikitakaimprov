import { promises as fs } from "fs";
import path from "path";

// Depolama: Vercel'de Upstash Redis (KV_REST_API_URL / UPSTASH_REDIS_REST_URL
// env değişkenleri varsa), lokalde .data/ekip.json dosyası.

export type Comment = {
  id: string;
  game: string;
  name: string;
  text: string;
  ts: number;
};

export type HavuzOyun = {
  id: string;
  ad: string;
  kisi: string;
  aciklama: string;
  form: "kisa" | "uzun";
  ekleyen: string;
  ts: number;
};

export type PlanOyun = {
  id: string;
  ad: string;
  form: "kisa" | "uzun";
  kisiler: string[];
  // Tiyatro sporu modunda kısa form oyunlar iki tarafa bölünür.
  tiki?: string[];
  taka?: string[];
};
// Gecenin iki takımı; aynı kişi iki takımda birden olabilir.
export type Ekipler = { tiki: string[]; taka: string[] };
// Gece planı ekipçe ortak: tek kayıt, son yazan kazanır.
export type Plan = {
  perde: 1 | 2;
  acts: [PlanOyun[], PlanOyun[]];
  spor: boolean;
  ekipler: Ekipler;
};

export const BOS_PLAN: Plan = {
  perde: 1,
  acts: [[], []],
  spor: false,
  ekipler: { tiki: [], taka: [] },
};

const FAVS_KEY = "ekip:favs"; // hash: "<game>|<name>" -> "1"
const COMMENTS_KEY = "ekip:comments"; // hash: "<id>" -> JSON
const HAVUZ_KEY = "ekip:havuz"; // hash: "<id>" -> JSON
const PLAN_KEY = "ekip:plan"; // string: JSON

// ---------- Redis (Upstash REST) ----------

function redisEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: (string | number)[]): Promise<unknown> {
  const env = redisEnv()!;
  const res = await fetch(env.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.token}` },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const j = await res.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

// HGETALL REST sonucu düz dizi döner: [field, value, field, value, ...]
function pairsToRecord(flat: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < flat.length; i += 2) out[flat[i]] = flat[i + 1];
  return out;
}

// ---------- Lokal dosya (sadece dev) ----------

type FileData = {
  favs: Record<string, string>;
  comments: Record<string, string>;
  havuz?: Record<string, string>;
  plan?: string;
};
const FILE = path.join(process.cwd(), ".data", "ekip.json");

async function fileRead(): Promise<FileData> {
  try {
    const data = JSON.parse(await fs.readFile(FILE, "utf8")) as FileData;
    data.havuz ||= {};
    return data;
  } catch {
    return { favs: {}, comments: {}, havuz: {} };
  }
}

async function fileWrite(data: FileData): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

// ---------- Ortak API ----------

export async function getFavs(): Promise<Record<string, string[]>> {
  let fields: Record<string, string>;
  if (redisEnv()) {
    fields = pairsToRecord(((await redis(["HGETALL", FAVS_KEY])) as string[]) || []);
  } else {
    fields = (await fileRead()).favs;
  }
  const out: Record<string, string[]> = {};
  for (const key of Object.keys(fields)) {
    const [game, name] = key.split("|");
    if (!game || !name) continue;
    (out[game] ||= []).push(name);
  }
  return out;
}

export async function setFav(game: string, name: string, on: boolean): Promise<void> {
  const field = `${game}|${name}`;
  if (redisEnv()) {
    if (on) await redis(["HSET", FAVS_KEY, field, "1"]);
    else await redis(["HDEL", FAVS_KEY, field]);
  } else {
    const data = await fileRead();
    if (on) data.favs[field] = "1";
    else delete data.favs[field];
    await fileWrite(data);
  }
}

export async function getComments(): Promise<Comment[]> {
  let fields: Record<string, string>;
  if (redisEnv()) {
    fields = pairsToRecord(((await redis(["HGETALL", COMMENTS_KEY])) as string[]) || []);
  } else {
    fields = (await fileRead()).comments;
  }
  const out: Comment[] = [];
  for (const [id, json] of Object.entries(fields)) {
    try {
      out.push({ ...(JSON.parse(json) as Omit<Comment, "id">), id });
    } catch {
      // bozuk kayıt atlanır
    }
  }
  out.sort((a, b) => a.ts - b.ts);
  return out;
}

export async function addComment(game: string, name: string, text: string): Promise<Comment> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const comment: Comment = { id, game, name, text, ts: Date.now() };
  const json = JSON.stringify({ game, name, text, ts: comment.ts });
  if (redisEnv()) {
    await redis(["HSET", COMMENTS_KEY, id, json]);
  } else {
    const data = await fileRead();
    data.comments[id] = json;
    await fileWrite(data);
  }
  return comment;
}

export async function getHavuz(): Promise<HavuzOyun[]> {
  let fields: Record<string, string>;
  if (redisEnv()) {
    fields = pairsToRecord(((await redis(["HGETALL", HAVUZ_KEY])) as string[]) || []);
  } else {
    fields = (await fileRead()).havuz ?? {};
  }
  const out: HavuzOyun[] = [];
  for (const [id, json] of Object.entries(fields)) {
    try {
      out.push({ ...(JSON.parse(json) as Omit<HavuzOyun, "id">), id });
    } catch {
      // bozuk kayıt atlanır
    }
  }
  out.sort((a, b) => b.ts - a.ts);
  return out;
}

export async function addHavuz(
  oyun: Omit<HavuzOyun, "id" | "ts">,
): Promise<HavuzOyun> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const kayit: HavuzOyun = { ...oyun, id, ts: Date.now() };
  const { id: _drop, ...rest } = kayit;
  void _drop;
  const json = JSON.stringify(rest);
  if (redisEnv()) {
    await redis(["HSET", HAVUZ_KEY, id, json]);
  } else {
    const data = await fileRead();
    (data.havuz ||= {})[id] = json;
    await fileWrite(data);
  }
  return kayit;
}

export async function deleteHavuz(id: string, name: string): Promise<boolean> {
  if (redisEnv()) {
    const json = (await redis(["HGET", HAVUZ_KEY, id])) as string | null;
    if (!json) return false;
    if ((JSON.parse(json) as HavuzOyun).ekleyen !== name) return false;
    await redis(["HDEL", HAVUZ_KEY, id]);
    return true;
  }
  const data = await fileRead();
  const json = (data.havuz ||= {})[id];
  if (!json) return false;
  if ((JSON.parse(json) as HavuzOyun).ekleyen !== name) return false;
  delete data.havuz[id];
  await fileWrite(data);
  return true;
}

export async function getPlan(): Promise<Plan> {
  let json: string | null;
  if (redisEnv()) {
    json = (await redis(["GET", PLAN_KEY])) as string | null;
  } else {
    json = (await fileRead()).plan ?? null;
  }
  if (!json) return BOS_PLAN;
  try {
    const p = JSON.parse(json) as Plan;
    if (p.perde !== 1 && p.perde !== 2) return BOS_PLAN;
    if (!Array.isArray(p.acts) || p.acts.length !== 2) return BOS_PLAN;
    // Eski kayitlarda spor/ekipler alanlari yok.
    return {
      ...p,
      spor: p.spor === true,
      ekipler: {
        tiki: Array.isArray(p.ekipler?.tiki) ? p.ekipler.tiki : [],
        taka: Array.isArray(p.ekipler?.taka) ? p.ekipler.taka : [],
      },
    };
  } catch {
    return BOS_PLAN;
  }
}

export async function setPlan(plan: Plan): Promise<void> {
  const json = JSON.stringify(plan);
  if (redisEnv()) {
    await redis(["SET", PLAN_KEY, json]);
  } else {
    const data = await fileRead();
    data.plan = json;
    await fileWrite(data);
  }
}

export async function deleteComment(id: string, name: string): Promise<boolean> {
  if (redisEnv()) {
    const json = (await redis(["HGET", COMMENTS_KEY, id])) as string | null;
    if (!json) return false;
    if ((JSON.parse(json) as Comment).name !== name) return false;
    await redis(["HDEL", COMMENTS_KEY, id]);
    return true;
  }
  const data = await fileRead();
  const json = data.comments[id];
  if (!json) return false;
  if ((JSON.parse(json) as Comment).name !== name) return false;
  delete data.comments[id];
  await fileWrite(data);
  return true;
}
