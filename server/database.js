import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
export function openDatabase(
  filename = process.env.DATABASE_PATH || "./data/flow.sqlite",
) {
  if (filename !== ":memory:")
    mkdirSync(dirname(resolve(filename)), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(
    "PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, full_name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, industry TEXT NOT NULL, comments TEXT NOT NULL, crm_status TEXT NOT NULL DEFAULT 'not_configured')",
  );
  return db;
}
export function saveLead(db, lead, id, createdAt) {
  db.prepare(
    "INSERT INTO leads (id,created_at,full_name,phone,email,industry,comments) VALUES (?,?,?,?,?,?,?)",
  ).run(
    id,
    createdAt,
    lead.fullName,
    lead.phone,
    lead.email,
    lead.industry,
    lead.comments,
  );
}
