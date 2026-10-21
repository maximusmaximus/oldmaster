/** Secrets saved in the private database. Env and bundled values win. */
import type { Sql } from "@/lib/db";

export const SAVED_SECRET_NAMES = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RPI_API_AUTH",
  "RPI_WEBHOOK_SECRET",
  "CRON_SECRET",
] as const;

export type SavedSecretName = (typeof SAVED_SECRET_NAMES)[number];

export async function readSavedSecrets(sql: Sql): Promise<Partial<Record<SavedSecretName, string>>> {
  const rows = await sql.query<{ key: string; value: string }>("select key, value from store_settings where key like 'SECRET_%'");
  const out: Partial<Record<SavedSecretName, string>> = {};
  for (const row of rows) {
    const name = row.key.slice("SECRET_".length) as SavedSecretName;
    if ((SAVED_SECRET_NAMES as readonly string[]).includes(name) && row.value.trim()) out[name] = row.value.trim();
  }
  return out;
}

export async function writeSavedSecrets(sql: Sql, values: Partial<Record<SavedSecretName, string>>): Promise<void> {
  for (const name of SAVED_SECRET_NAMES) {
    const value = values[name]?.trim();
    if (!value) continue;
    await sql.query(
      "insert into store_settings (key, value) values ($1, $2) on conflict (key) do update set value = excluded.value",
      [`SECRET_${name}`, value],
    );
  }
}
