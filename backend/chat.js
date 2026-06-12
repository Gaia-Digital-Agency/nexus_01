// chat.js — read-only AI assistant over the Nexus app/DB data, powered by Gemini.
// Questions <= 1550 chars; answers capped at 150 chars; info-only (never executes actions).
import { purgeOldChat } from './init-db.js';

const Q_MAX = 1550;
const A_MAX = 150;
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const SYSTEM = `You are "Nexus Assistant", a strictly read-only information assistant inside the Gaia Nexus control plane (a dashboard managing a portfolio of ~63 websites for SEO/AEO/SEM).
RULES:
- Answer ONLY questions about information available in the Nexus app and database, using the CONTEXT provided below.
- You PROVIDE INFORMATION ONLY. You never execute commands, change anything, run audits, deploy, or take any action. If asked to do/perform/run/change something, reply that you can only provide information.
- Be direct and factual. Your answer MUST be 150 characters or fewer. No preamble, no markdown, one short sentence.
- If the requested information is not in the context, say it isn't available in the current data.`;

// Build a compact, token-bounded snapshot of the app's data for the model.
async function buildContext(pool) {
  const parts = [];
  try {
    const agg = await pool.query(`
      SELECT count(*)::int total,
             count(*) FILTER (WHERE status='active')::int active,
             count(*) FILTER (WHERE type ILIKE 'wordpress')::int wordpress,
             count(*) FILTER (WHERE type ILIKE 'nodejs' OR type ILIKE 'node')::int nodejs,
             round(avg(seo_score))::int avg_seo,
             max(seo_score)::int max_seo, min(seo_score)::int min_seo
      FROM sites`);
    const a = agg.rows[0] || {};
    parts.push(`PORTFOLIO: ${a.total} sites (${a.active} active; ${a.wordpress} WordPress, ${a.nodejs} Node.js). SEO score avg ${a.avg_seo}, range ${a.min_seo}-${a.max_seo}.`);

    const top = await pool.query(`SELECT name, seo_score FROM sites WHERE seo_score IS NOT NULL ORDER BY seo_score DESC LIMIT 8`);
    if (top.rows.length) parts.push('TOP SITES BY SEO SCORE: ' + top.rows.map(r => `${r.name} (${r.seo_score})`).join(', ') + '.');

    const sites = await pool.query(`SELECT name, url, type, status, seo_score FROM sites ORDER BY name`);
    parts.push('SITES (name | url | type | status | seo_score):');
    parts.push(sites.rows.map(r => `${r.name} | ${r.url} | ${r.type} | ${r.status} | ${r.seo_score ?? 'n/a'}`).join('\n'));
  } catch (e) {
    parts.push('(site data unavailable: ' + e.message + ')');
  }
  parts.push('APP FEATURES: Dashboard, Directory, Focus, Analytics, Proposals, Deployments, Reports, Lighthouse, Audit (compiles technical/SEO/plan reports), Chat History. Data sources: Semrush (live), GSC/GA4/GTM/Ads. Audit & SEO docs exist per site; plan docs track a 4-wave execution model.');
  return parts.join('\n');
}

async function askGemini(question, context) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not configured');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM + '\n\nCONTEXT:\n' + context }] },
    contents: [{ role: 'user', parts: [{ text: question }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 512, thinkingConfig: { thinkingBudget: 0 } },
  };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  let resp;
  try {
    resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
  } finally { clearTimeout(t); }
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error?.message || `Gemini HTTP ${resp.status}`);
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join(' ').trim();
  if (!text) throw new Error('empty response from model');
  return text;
}

export function registerChatRoutes(app, pool) {
  app.post('/api/chat', async (req, res) => {
    const question = (req.body?.question || '').toString().trim();
    if (!question) return res.status(400).json({ error: 'Question is required.' });
    if (question.length > Q_MAX) return res.status(400).json({ error: `Question exceeds ${Q_MAX} characters.` });
    try {
      const context = await buildContext(pool);
      let answer = await askGemini(question, context);
      if (answer.length > A_MAX) answer = answer.slice(0, A_MAX - 1).trimEnd() + '…';
      await pool.query('INSERT INTO chat_history (question, answer) VALUES ($1, $2)', [question, answer]);
      purgeOldChat(pool);
      res.json({ answer });
    } catch (e) {
      res.status(502).json({ error: 'Assistant unavailable: ' + e.message });
    }
  });

  app.get('/api/chat/history', async (_req, res) => {
    try {
      await purgeOldChat(pool);
      const { rows } = await pool.query('SELECT id, question, answer, created_at FROM chat_history ORDER BY created_at DESC LIMIT 500');
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
