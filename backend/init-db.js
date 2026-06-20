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

    -- Content Studio: AI-generated images + their light suitability check.
    CREATE TABLE IF NOT EXISTS content_images (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      prompt      text NOT NULL,
      url         text NOT NULL,
      mime        varchar(40),
      suitability varchar(20),
      suggestion  text,
      used        boolean NOT NULL DEFAULT false,
      created_at  timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS content_images_created_idx ON content_images (created_at DESC);

    -- Content Studio: article submissions + copywriting stage-gate verdict.
    CREATE TABLE IF NOT EXISTS content_submissions (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title      text NOT NULL,
      body       text NOT NULL,
      topic      text,
      voice      text,
      image_url  text,
      verdict    varchar(20) NOT NULL,
      scores     jsonb,
      result     jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS content_submissions_created_idx ON content_submissions (created_at DESC);

    -- Content Studio: a guided creation project (article + optional image + gate state).
    CREATE TABLE IF NOT EXISTS content_projects (
      id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title          text NOT NULL DEFAULT 'Untitled project',
      with_image     boolean NOT NULL DEFAULT true,
      brief          text,
      voice          text,
      body           text,
      article_locked boolean NOT NULL DEFAULT false,
      image_id       uuid,
      image_url      text,
      image_locked   boolean NOT NULL DEFAULT false,
      verdict        varchar(20),
      gate           jsonb,
      step           integer NOT NULL DEFAULT 0,
      status         varchar(20) NOT NULL DEFAULT 'draft',
      created_at     timestamptz NOT NULL DEFAULT now(),
      updated_at     timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS content_projects_updated_idx ON content_projects (updated_at DESC);
    ALTER TABLE content_projects ADD COLUMN IF NOT EXISTS fix_count  integer NOT NULL DEFAULT 0;
    ALTER TABLE content_projects ADD COLUMN IF NOT EXISTS gate_count integer NOT NULL DEFAULT 0;
  `);
}

// Delete chat rows older than 30 days. Called opportunistically on chat reads/writes.
export async function purgeOldChat(pool) {
  try {
    await pool.query("DELETE FROM chat_history WHERE created_at < now() - interval '30 days'");
  } catch (_) { /* non-fatal */ }
}
