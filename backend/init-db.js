// init-db.js — idempotent schema bootstrap for the new Chat + Audit features.
export async function initDb(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_history (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      question   text NOT NULL,
      answer     text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS chat_history_created_idx ON chat_history (created_at DESC);

    CREATE TABLE IF NOT EXISTS audit_runs (
      id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      started_at   timestamptz NOT NULL DEFAULT now(),
      completed_at timestamptz,
      status       varchar(20) NOT NULL DEFAULT 'running',
      site_count   integer,
      audit_md     text,
      seo_md       text,
      plan_md      text,
      triggered_by varchar(120)
    );
    CREATE INDEX IF NOT EXISTS audit_runs_started_idx ON audit_runs (started_at DESC);
  `);
}

// Delete chat rows older than 30 days. Called opportunistically on chat reads/writes.
export async function purgeOldChat(pool) {
  try {
    await pool.query("DELETE FROM chat_history WHERE created_at < now() - interval '30 days'");
  } catch (_) { /* non-fatal */ }
}
