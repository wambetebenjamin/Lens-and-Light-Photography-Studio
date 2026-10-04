import fs from "fs";
import path from "path";

/**
 * Lightweight persistence abstraction.
 *
 * In production this should be swapped for Vercel KV
 * (`@vercel/kv`'s `kv.get` / `kv.lpush`) — the calling code in the API
 * routes already isolates all reads/writes behind this module, so wiring
 * up real KV is a one-file change. Until `KV_REST_API_URL` is configured,
 * data is persisted to a local JSON file so the app is fully functional
 * in development and in this environment.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(key: string) {
  return path.join(DATA_DIR, `${key}.json`);
}

export async function listAppend<T>(key: string, value: T): Promise<void> {
  ensureDir();
  const file = filePath(key);
  const existing: T[] = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : [];
  existing.push(value);
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
}

export async function listAll<T>(key: string): Promise<T[]> {
  ensureDir();
  const file = filePath(key);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
