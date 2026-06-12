// audit.js — Audit page backend.
// "Run audit" compiles the current technical-audit / SEO / plan docs into a versioned
// report stored in the DB (history kept; only the latest is downloadable as md + pdf).
// Rate-limited to once per 24h; status surfaces the ~2h expectation per the spec.
import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';
import { markdownToPdfBuffer } from './pdf.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.join(__dirname, '..', 'docs');
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const RUN_NOTE = 'A full live audit + SEO pass takes ~2 hours to complete. Review the available report before generating a new one. The button unlocks again the next day.';

async function readDir(sub) {
  const dir = path.join(DOCS, sub);
  let names = [];
  try { names = (await fs.readdir(dir)).filter(n => n.endsWith('.md')).sort(); } catch { return { md: '', count: 0 }; }
  const blocks = [];
  for (const n of names) {
    try {
      const body = await fs.readFile(path.join(dir, n), 'utf8');
      blocks.push(`\n\n---\n\n${body.trim()}`);
    } catch { /* skip */ }
  }
  return { md: blocks.join('\n'), count: names.length };
}

async function readPlan() {
  const order = ['action_summary.md', 'findings.md', 'todo.md', 'gap.md'];
  const blocks = [];
  for (const n of order) {
    try {
      const body = await fs.readFile(path.join(DOCS, 'plan', n), 'utf8');
      blocks.push(`\n\n---\n\n${body.trim()}`);
    } catch { /* skip */ }
  }
  return blocks.join('\n');
}

async function compileReport() {
  const stamp = new Date().toISOString().slice(0, 10);
  const audits = await readDir('audits');
  const seo = await readDir('seo');
  const plan = await readPlan();
  const audit_md = `# Gaia Nexus — Technical Audit Report\n**Compiled:** ${stamp} · **Sites:** ${audits.count}\n${audits.md}`;
  const seo_md = `# Gaia Nexus — SEO Analysis Report\n**Compiled:** ${stamp} · **Sites:** ${seo.count}\n${seo.md}`;
  const plan_md = `# Gaia Nexus — Execution Plan\n**Compiled:** ${stamp}\n${plan}`;
  return { audit_md, seo_md, plan_md, site_count: audits.count };
}

const KINDS = {
  audit: { col: 'audit_md', title: 'Gaia Nexus Technical Audit Report', file: 'nexus-audit' },
  seo: { col: 'seo_md', title: 'Gaia Nexus SEO Analysis Report', file: 'nexus-seo' },
  plan: { col: 'plan_md', title: 'Gaia Nexus Execution Plan', file: 'nexus-plan' },
};

async function latestRun(pool) {
  const { rows } = await pool.query(
    "SELECT * FROM audit_runs WHERE status='completed' ORDER BY started_at DESC LIMIT 1");
  return rows[0] || null;
}

export function registerAuditRoutes(app, pool) {
  app.get('/api/audit/status', async (_req, res) => {
    try {
      const { rows } = await pool.query('SELECT id, started_at, completed_at, status, site_count FROM audit_runs ORDER BY started_at DESC LIMIT 1');
      const last = rows[0] || null;
      const latest = await latestRun(pool);
      let canRun = true, nextAvailable = null;
      if (last) {
        const elapsed = Date.now() - new Date(last.started_at).getTime();
        if (elapsed < COOLDOWN_MS) { canRun = false; nextAvailable = new Date(new Date(last.started_at).getTime() + COOLDOWN_MS).toISOString(); }
      }
      res.json({
        lastRun: last ? { startedAt: last.started_at, completedAt: last.completed_at, status: last.status, siteCount: last.site_count } : null,
        canRun, nextAvailable, note: RUN_NOTE,
        reportAvailable: !!latest,
        reportSiteCount: latest?.site_count ?? null,
        reportDate: latest?.completed_at || latest?.started_at || null,
      });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post('/api/audit/run', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT started_at FROM audit_runs ORDER BY started_at DESC LIMIT 1');
      if (rows[0]) {
        const elapsed = Date.now() - new Date(rows[0].started_at).getTime();
        if (elapsed < COOLDOWN_MS) {
          const nextAvailable = new Date(new Date(rows[0].started_at).getTime() + COOLDOWN_MS).toISOString();
          return res.status(429).json({ error: 'Audit already run in the last 24 hours. Try again tomorrow.', nextAvailable, note: RUN_NOTE });
        }
      }
      const compiled = await compileReport();
      const ins = await pool.query(
        `INSERT INTO audit_runs (status, completed_at, site_count, audit_md, seo_md, plan_md, triggered_by)
         VALUES ('completed', now(), $1, $2, $3, $4, $5) RETURNING id, started_at, completed_at`,
        [compiled.site_count, compiled.audit_md, compiled.seo_md, compiled.plan_md, (req.body?.user || 'operator')]);
      res.json({ ok: true, run: ins.rows[0], siteCount: compiled.site_count, note: RUN_NOTE });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // /api/audit/download/audit.md , seo.pdf , plan.md , ...
  app.get('/api/audit/download/:name', async (req, res) => {
    const m = (req.params.name || '').match(/^(audit|seo|plan)\.(md|pdf)$/);
    if (!m) return res.status(400).json({ error: 'Bad request. Use audit|seo|plan . md|pdf' });
    const [, kind, fmt] = m;
    const spec = KINDS[kind];
    try {
      const run = await latestRun(pool);
      if (!run) return res.status(404).json({ error: 'No report available yet. Run an audit first.' });
      const md = run[spec.col] || `# ${spec.title}\n\n(No content compiled.)`;
      const stamp = new Date(run.completed_at || run.started_at).toISOString().slice(0, 10);
      const fname = `${spec.file}-${stamp}.${fmt}`;
      if (fmt === 'md') {
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${fname}"`);
        return res.send(md);
      }
      const pdf = await markdownToPdfBuffer(md, spec.title);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fname}"`);
      return res.send(pdf);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });
}
