// create.js — Content Studio: AI image generation (+ light suitability check),
// a copywriting stage-gate (structured vet), and PDF/HTML export gated behind APPROVED.
// Reuses the existing Gemini AI Studio key (GEMINI_API_KEY) — same one chat.js uses.
// Vetting criteria are ported from the .openclaw-ess content pipeline SKILLS specs
// (copywriter banned-phrase blocklist + persona voice, seo meta rules, imager visual standards).
import express from 'express';
import { randomUUID } from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { markdownToPdfBuffer } from './pdf.js';

const pexecFile = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = path.join(__dirname, 'media');
fs.mkdirSync(MEDIA_DIR, { recursive: true });

const TEXT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

// ── Ported from aidevstaff openclaw-seo/copywriter SKILLS §7 (extended AI-ism blocklist) ──
const BANNED_PHRASES = [
  'delve', 'tapestry', 'hidden gem', 'bustling', 'in the realm of',
  'navigate the landscape', 'unveil', 'embark on a journey', 'testament to',
  'a myriad of', 'it goes without saying', 'game-changer', 'synergy',
  'cutting-edge', "in today's fast-paced world", 'in conclusion',
  'last but not least', 'needless to say', 'plethora', 'meticulously crafted',
  'seamlessly', 'revolutionary', 'paradigm shift',
];

// Per-persona vocabulary bans (SKILLS §3) — injected into the gate when a voice is chosen.
const PERSONA_BANS = {
  maya: ['amazing', 'delicious', 'yummy', 'to-die-for', 'must-try', 'iconic', 'authentic'],
  komang: ['adventure', 'epic', 'bucket-list', 'thrilling', 'ultimate'],
  putu: ['mystical', 'exotic', 'magical', 'spiritual journey', 'ancient wisdom', 'sacred ritual'],
  sari: ['vibes', 'lit', 'fire', 'epic', 'insane', 'unforgettable night'],
};

// Common en-GB vs en-US spelling pairs (SKILLS §8) — flagged when the locale is British.
const US_SPELLINGS = ['color', 'favor', 'organize', 'organization', 'optimize', 'optimization', 'recognize', 'analyze', 'behavior', 'center', 'realize', 'traveling', 'canceled', 'elevator', 'vacation', 'eggplant', 'zucchini', 'cilantro'];

function scanBanned(text) {
  const low = (text || '').toLowerCase();
  return BANNED_PHRASES.filter(p => low.includes(p));
}

function scanUsSpellings(text) {
  const low = (text || '').toLowerCase();
  return US_SPELLINGS.filter(w => new RegExp('\\b' + w + '\\b').test(low));
}

// ── Generic Gemini generateContent caller ──
async function callGemini(model, { parts, system, generationConfig }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not configured');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const body = { contents: [{ role: 'user', parts }] };
  if (system) body.systemInstruction = { parts: [{ text: system }] };
  if (generationConfig) body.generationConfig = generationConfig;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 60000);
  let resp;
  try {
    resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
  } finally { clearTimeout(t); }
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error?.message || `Gemini HTTP ${resp.status}`);
  return data;
}

function firstJson(data) {
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('').trim();
  if (!text) throw new Error('empty response from model');
  try { return JSON.parse(text); } catch { throw new Error('model did not return valid JSON'); }
}

function firstText(data) {
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('').trim();
  if (!text) throw new Error('empty response from model');
  // Strip accidental code fences so the editor gets clean markdown.
  return text.replace(/^```(?:markdown|md)?\s*\n?/i, '').replace(/\n?```\s*$/, '').trim();
}

// Image generation goes through curl, not undici fetch: undici stalls badly on the
// large (multi-MB) image response from this endpoint (~58s+), while curl returns in ~7s.
// The API key is passed via a 0600 curl config file so it never appears in the process args.
async function geminiImageViaCurl(promptText) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not configured');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`;
  const payload = JSON.stringify({ contents: [{ parts: [{ text: promptText }] }], generationConfig: { responseModalities: ['IMAGE'] } });
  const base = path.join(os.tmpdir(), 'nexus-img-' + randomUUID());
  const dataFile = base + '.json', cfgFile = base + '.cfg', outFile = base + '.out';
  fs.writeFileSync(dataFile, payload);
  fs.writeFileSync(cfgFile, [
    `url = "${url}"`,
    `request = "POST"`,
    `header = "Content-Type: application/json"`,
    `header = "x-goog-api-key: ${key}"`,
    `data-binary = "@${dataFile}"`,
    `output = "${outFile}"`,
    `max-time = "120"`,
    `silent`,
  ].join('\n'), { mode: 0o600 });
  try {
    await pexecFile('curl', ['-K', cfgFile], { maxBuffer: 96 * 1024 * 1024 });
    const d = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    if (d?.error) throw new Error(d.error.message || 'Gemini error');
    const parts = d?.candidates?.[0]?.content?.parts || [];
    const img = parts.find(p => p.inlineData?.data);
    if (!img) {
      const txt = parts.map(p => p.text).filter(Boolean).join(' ').trim();
      throw new Error('no image returned' + (txt ? ' — ' + txt.slice(0, 160) : ''));
    }
    return { mime: img.inlineData.mimeType || 'image/png', data: img.inlineData.data };
  } finally {
    for (const f of [dataFile, cfgFile, outFile]) { try { fs.unlinkSync(f); } catch { /* ignore */ } }
  }
}

// ── Image suitability (light check, ported from workspace-imager visual standards) ──
const IMG_VET_SYSTEM = `You are an editorial image reviewer for a portfolio of hospitality/travel websites.
Judge a generated image for publication suitability. Standards (from the house style guide):
- Photographic, editorial — never stock-photo cliché.
- No watermarks, logos, embedded text overlays, or borders.
- No close-up identifiable faces (likeness/IP risk) unless clearly central to the brief.
- Tasteful, brand-safe, on-topic for the prompt.
Return strict JSON only.`;

const IMG_VET_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['suitable', 'review', 'unsuitable'] },
    suggestion: { type: 'string' },
  },
  required: ['verdict', 'suggestion'],
};

async function vetImage(prompt, b64, mime) {
  try {
    const data = await callGemini(TEXT_MODEL, {
      system: IMG_VET_SYSTEM,
      parts: [
        { text: `Prompt used to generate this image: "${prompt}". Assess suitability and give ONE concrete improvement suggestion (<=160 chars).` },
        { inlineData: { mimeType: mime, data: b64 } },
      ],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json', responseSchema: IMG_VET_SCHEMA, thinkingConfig: { thinkingBudget: 0 } },
    });
    const r = firstJson(data);
    return { verdict: r.verdict || 'review', suggestion: (r.suggestion || '').slice(0, 240) };
  } catch (e) {
    return { verdict: 'review', suggestion: 'Auto-check unavailable: ' + e.message };
  }
}

// ── Copywriting stage-gate (ported from copywriter persona-check + seo standards) ──
// Stage gate embeds the openclaw-seo Copywriter SKILLS (aidevstaff): the 22-item on-page
// SEO checklist, E-E-A-T, heading hierarchy, featured-snippet, British English, banned phrases.
const SEO_CHECKLIST = [
  'Title tag — present, ≤60 chars, includes the primary keyword',
  'URL slug — short, readable, kebab-case, keyword-focused, no stop-word filler',
  'Meta description — present, 140–160 chars, attractive for CTR',
  'Primary keyword placement — in title, first 100 words, ≥1 H2, and meta',
  'Heading hierarchy — exactly one H1, H2s top-level, H3 only under H2, no level skips',
  'Natural keyword usage — ~0.8–1.5% density, never stuffed; secondary keywords present',
  'Strong CTA — at least one inline, action-verb opener',
  'Engaging introduction — 50–100 words, hook + value + structure preview',
  'Engaging conclusion — recap + CTA reinforcement',
  'Featured-snippet block — a concise definition/list/steps in the first 200 words',
  'E-E-A-T — author byline, expertise/experience markers woven in, credible',
  'Trusted external citations — links to authoritative sources for claims',
  'Internal linking — relevant internal-link anchors suggested',
  'Image alt text — descriptive alt text for the hero/inline media',
  'Readability — short paragraphs (≤4 sentences / ≤80 words), lists where helpful',
  'British English (en-GB) — spelling, punctuation and vocabulary',
  'Structured data — appropriate Schema.org type (Article/BlogPosting/FAQPage…)',
  'Original, informative, on-topic content matching reader intent',
];

// Checklist items that are CMS/publishing config, not body-copy edits — grouped as "Follow Up",
// kept out of article approval and out of the AI fixes.
const FOLLOW_UP_RE = /(\bURL slug\b|Structured data|Schema\.org|Internal link|Image alt|alt text|canonical|redirect|sitemap|robots|hreflang|breadcrumb|open graph)/i;
const isFollowUpItem = (c) => FOLLOW_UP_RE.test(((c && c.item) || '') + ' ' + ((c && c.note) || ''));

const VET_SYSTEM = `You are "Nexus Copy Gate", a strict on-page SEO + editorial reviewer for a hospitality/travel portfolio, applying the Gaiada Copywriter SKILLS specification. You vet WRITING ONLY (images are handled separately).

Score these four dimensions 0–10:
- topic_suitability: matches the stated brief/voice and reader intent.
- seo: satisfies the on-page SEO checklist below.
- grammar_spelling: correct British English (en-GB) unless told otherwise.
- clarity_meaning: logical flow, no filler, no contradictions, coherent.

Evaluate EVERY item of this on-page SEO checklist and report each as pass / warn / fail with a short note:
${SEO_CHECKLIST.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Publishing follow-ups (configured in the CMS AFTER writing — report their status but DO NOT let them affect the four scores or the verdict): URL slug, Structured data, Internal linking, Image alt text.

Hard rules:
- Banned AI-ism phrases must not appear: ${BANNED_PHRASES.join(', ')}.
- British English (en-GB): flag US spellings (color→colour, optimize→optimise, etc.) and US vocabulary (elevator→lift, vacation→holiday).
- E-E-A-T must be visible (author identity, real experience, credible claims, trusted links).

Verdict rules:
- APPROVED only if every score ≥ 7 AND no banned phrases AND no en-US spellings AND no ARTICLE checklist item is 'fail' AND no Critical issue. (The publishing follow-up items never block approval.)
- REJECT if any score ≤ 3, the meaning is broken, or the piece is off-topic.
- Otherwise NEEDS WORK.

Return strict JSON only, matching the schema. Be specific and actionable — every fail/warn needs a concrete fix.`;

const VET_SCHEMA = {
  type: 'object',
  properties: {
    overall_verdict: { type: 'string', enum: ['APPROVED', 'NEEDS WORK', 'REJECT'] },
    rationale: { type: 'string' },
    scores: {
      type: 'object',
      properties: {
        topic_suitability: { type: 'integer' },
        seo: { type: 'integer' },
        grammar_spelling: { type: 'integer' },
        clarity_meaning: { type: 'integer' },
      },
      required: ['topic_suitability', 'seo', 'grammar_spelling', 'clarity_meaning'],
    },
    seo_checklist: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          item: { type: 'string' },
          status: { type: 'string', enum: ['pass', 'warn', 'fail'] },
          note: { type: 'string' },
        },
        required: ['item', 'status', 'note'],
      },
    },
    banned_phrases_found: { type: 'array', items: { type: 'string' } },
    british_english_issues: { type: 'array', items: { type: 'string' } },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['Critical', 'High', 'Medium', 'Low'] },
          area: { type: 'string' },
          detail: { type: 'string' },
        },
        required: ['severity', 'area', 'detail'],
      },
    },
    fixes: { type: 'array', items: { type: 'string' } },
    meta_title: { type: 'string' },
    meta_description: { type: 'string' },
    primary_keyword: { type: 'string' },
    long_tail_keywords: { type: 'array', items: { type: 'string' } },
  },
  required: ['overall_verdict', 'rationale', 'scores', 'seo_checklist', 'banned_phrases_found', 'issues', 'fixes'],
};

// ── AI draft (write-with-AI) & plain-text → Markdown formatter ──
const VOICE_NOTE = {
  maya: 'Voice: Maya — local foodie. Warm, sensory, names ingredients specifically.',
  komang: 'Voice: Komang — activities & wellness guide. Practical, calm, safety-aware.',
  putu: 'Voice: Putu — cultural insider. Italicise Balinese terms on first use; no exoticisation.',
  sari: 'Voice: Sari — nightlife & events reporter. Energetic, short paragraphs.',
  wayan: 'Voice: Wayan — luxury & resorts concierge. Refined, aspirational, detail-rich; understated, never gushing.',
  dewi: 'Voice: Dewi — family & kids travel. Warm, reassuring, practical; anticipates parents\' questions.',
  ketut: 'Voice: Ketut — adventure & outdoors. Bold, energetic, action-led; vivid verbs, safety always noted.',
  agung: 'Voice: Agung — business & MICE (meetings/conferences). Professional, precise, outcome-focused; crisp and credible.',
  nyoman: 'Voice: Nyoman — budget & backpacker. Friendly and frugal; concrete prices and money-saving tips.',
  raka: 'Voice: Raka — sustainability & eco. Thoughtful, evidence-based, responsible; no greenwashing.',
};

const DRAFT_SYSTEM = `You are a senior travel/hospitality copywriter. Write a complete, publish-ready article in GitHub-flavoured Markdown from the brief.
Rules: British English (en-GB). Lead with the main point; use a clear ## subheading structure, short paragraphs, and "- " bullet lists where helpful. Be specific and concrete — no filler.
Never use these banned phrases: ${BANNED_PHRASES.join(', ')}.
Return ONLY the article body in Markdown (no title line, no code fences, no commentary).`;

const FORMAT_SYSTEM = `Convert the user's text into clean, well-structured GitHub-flavoured Markdown WITHOUT changing the wording, meaning, or order of the content.
You may add: "## " subheadings where the text clearly shifts topic, **bold** for key terms/names, and "- " bullet lists where the text enumerates items.
Do NOT write new sentences, do NOT remove content, do NOT paraphrase.
Return ONLY the Markdown (no code fences, no commentary).`;

// ── Revise to address stage-gate findings (AI fix) ──
const REVISE_SYSTEM = `You are a senior travel/hospitality copywriter revising an existing article to satisfy a copywriting stage-gate.
Apply the task and findings below COMPLETELY and THOROUGHLY: resolve every flagged issue, act on every suggested fix, remove all banned phrases, and use British English (en-GB) throughout. The revision must be good enough to pass a strict re-check — do not leave problems half-fixed.
Preserve the article's intent, facts, structure and voice — improve it, do not rewrite from scratch or change the topic.
Keep clean GitHub-flavoured Markdown: the title is supplied separately (it is the H1), so in the body use "## " as the top-level heading and "### " only beneath a "## " — do NOT add an H1 or repeat the title. Short paragraphs, "- " bullets where helpful. Never use these banned phrases: ${BANNED_PHRASES.join(', ')}.
Return ONLY the revised article body in Markdown (no title line, no code fences, no commentary).`;

// ── Advisory article comments (Step 1, not a pass/fail gate) ──
const COMMENTS_SYSTEM = `You are a friendly senior editor giving quick, advisory feedback on a draft web article (not a pass/fail gate).
Be concise and constructive: note what works, then give specific, actionable suggestions (clarity, structure, SEO, voice, grammar). British English.
Return strict JSON only.`;

const COMMENTS_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    suggestions: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'strengths', 'suggestions'],
};

// ── Project field whitelist for safe partial updates ──
const PROJECT_FIELDS = ['title', 'with_image', 'brief', 'voice', 'body', 'article_locked', 'image_id', 'image_url', 'image_locked', 'verdict', 'gate', 'step', 'status', 'fix_count', 'gate_count'];

// ── HTML export ──
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Minimal, dependency-free markdown -> HTML for the subset our editor produces.
function mdToHtml(md) {
  const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let inList = false;
  const inline = (t) => escapeHtml(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    const b = line.match(/^\s*[-*]\s+(.*)$/);
    if (b) { if (!inList) { out.push('<ul>'); inList = true; } out.push('<li>' + inline(b[1]) + '</li>'); continue; }
    if (inList) { out.push('</ul>'); inList = false; }
    if (h) { const lv = h[1].length; out.push(`<h${lv}>${inline(h[2])}</h${lv}>`); continue; }
    if (line.trim() === '') continue;
    out.push('<p>' + inline(line) + '</p>');
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function buildHtmlDoc({ title, body, imageUrl, origin }) {
  const heroAbs = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : (origin || '') + imageUrl) : '';
  const hero = heroAbs ? `<img class="hero" src="${escapeHtml(heroAbs)}" alt="${escapeHtml(title)}">` : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #1e293b; line-height: 1.7; }
  h1 { font-family: Inter, system-ui, sans-serif; font-size: 2rem; line-height: 1.2; }
  h2,h3,h4 { font-family: Inter, system-ui, sans-serif; margin-top: 1.6em; }
  img.hero { width: 100%; height: auto; border-radius: 12px; margin: 18px 0 28px; }
  code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
  .by { color: #64748b; font-family: Inter, system-ui, sans-serif; font-size: 0.85rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
</style></head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div class="by">Gaia Nexus — Content Studio</div>
  ${hero}
  ${mdToHtml(body)}
</body></html>`;
}

export function registerCreateRoutes(app, pool) {
  // Serve generated images under /api/media (Nginx already proxies /api -> backend).
  app.get('/api/media/:file', (req, res) => {
    const file = path.basename(req.params.file);
    const fp = path.join(MEDIA_DIR, file);
    if (!fp.startsWith(MEDIA_DIR) || !fs.existsSync(fp)) return res.status(404).end();
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(fp);
  });

  // Generate an image from a prompt, then run a light suitability check.
  app.post('/api/create/image', async (req, res) => {
    const prompt = (req.body?.prompt || '').toString().trim();
    if (!prompt) return res.status(400).json({ error: 'A prompt is required.' });
    if (prompt.length > 1000) return res.status(400).json({ error: 'Prompt too long (max 1000 chars).' });
    try {
      const { mime, data } = await geminiImageViaCurl(
        `Editorial, photographic image for a hospitality/travel website. ${prompt}. No text overlays, no watermarks, no logos.`
      );
      const id = randomUUID();
      const ext = mime.includes('jpeg') ? 'jpg' : mime.includes('webp') ? 'webp' : 'png';
      const filename = `${id}.${ext}`;
      fs.writeFileSync(path.join(MEDIA_DIR, filename), Buffer.from(data, 'base64'));
      const url = `/api/media/${filename}`;
      const suit = await vetImage(prompt, data, mime);
      const { rows } = await pool.query(
        `INSERT INTO content_images (id, prompt, url, mime, suitability, suggestion)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [id, prompt, url, mime, suit.verdict, suit.suggestion]
      );
      res.json(rows[0]);
    } catch (e) {
      res.status(502).json({ error: 'Image generation failed: ' + e.message });
    }
  });

  // Upload an image (base64 data URL) — same suitability check as generated ones.
  app.post('/api/create/image-upload', express.json({ limit: '10mb' }), async (req, res) => {
    const dataUrl = (req.body?.dataUrl || '').toString();
    const m = dataUrl.match(/^data:(image\/(png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!m) return res.status(400).json({ error: 'Provide a PNG, JPEG or WebP image.' });
    const mime = m[1] === 'image/jpg' ? 'image/jpeg' : m[1];
    const b64 = m[3];
    if (b64.length > 14 * 1024 * 1024) return res.status(400).json({ error: 'Image too large (max ~10MB).' });
    try {
      const id = randomUUID();
      const ext = mime.includes('jpeg') ? 'jpg' : mime.includes('webp') ? 'webp' : 'png';
      const filename = `${id}.${ext}`;
      fs.writeFileSync(path.join(MEDIA_DIR, filename), Buffer.from(b64, 'base64'));
      const url = `/api/media/${filename}`;
      const suit = await vetImage('(uploaded image)', b64, mime);
      const { rows } = await pool.query(
        `INSERT INTO content_images (id, prompt, url, mime, suitability, suggestion)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [id, 'uploaded', url, mime, suit.verdict, suit.suggestion]
      );
      res.json(rows[0]);
    } catch (e) {
      res.status(502).json({ error: 'Upload failed: ' + e.message });
    }
  });

  app.get('/api/create/images', async (_req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM content_images ORDER BY created_at DESC LIMIT 200');
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.delete('/api/create/images/:id', async (req, res) => {
    try {
      const { rows } = await pool.query('DELETE FROM content_images WHERE id=$1 RETURNING url', [req.params.id]);
      if (rows[0]?.url) {
        const fp = path.join(MEDIA_DIR, path.basename(rows[0].url));
        if (fp.startsWith(MEDIA_DIR) && fs.existsSync(fp)) fs.unlinkSync(fp);
      }
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // Write-with-AI: draft a full markdown article from the brief.
  app.post('/api/create/draft', async (req, res) => {
    const title = (req.body?.title || '').toString().trim();
    const brief = (req.body?.brief || '').toString().trim();
    const voice = (req.body?.voice || '').toString().trim();
    if (!brief && !title) return res.status(400).json({ error: 'Add a title or a brief first.' });
    try {
      const vnote = VOICE_NOTE[voice] || 'Voice: neutral, professional brand voice.';
      const userText = `${vnote}\nWorking title: ${title || '(none yet)'}\nBrief (what the article should be about): ${brief || title}\n\nWrite the article now.`;
      const data = await callGemini(TEXT_MODEL, {
        system: DRAFT_SYSTEM,
        parts: [{ text: userText }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      });
      res.json({ body: firstText(data) });
    } catch (e) {
      res.status(502).json({ error: 'Draft failed: ' + e.message });
    }
  });

  // Convert pasted plain text into predictable Markdown (no rewriting).
  app.post('/api/create/format', async (req, res) => {
    const text = (req.body?.text || '').toString().trim();
    if (!text) return res.status(400).json({ error: 'Nothing to format.' });
    if (text.length > 40000) return res.status(400).json({ error: 'Text too long (max 40k chars).' });
    try {
      const data = await callGemini(TEXT_MODEL, {
        system: FORMAT_SYSTEM,
        parts: [{ text }],
        generationConfig: { temperature: 0, maxOutputTokens: 4096, thinkingConfig: { thinkingBudget: 0 } },
      });
      res.json({ body: firstText(data) });
    } catch (e) {
      res.status(502).json({ error: 'Format failed: ' + e.message });
    }
  });

  // Advisory comments on the draft (Step 1) — not a pass/fail gate.
  app.post('/api/create/comments', async (req, res) => {
    const title = (req.body?.title || '').toString().trim();
    const body = (req.body?.body || '').toString().trim();
    const topic = (req.body?.topic || '').toString().trim();
    const voice = (req.body?.voice || '').toString().trim();
    if (!body) return res.status(400).json({ error: 'Write or paste the article first.' });
    try {
      const userText = `TITLE: ${title || '(none)'}\nINTENDED TOPIC: ${topic || '(unspecified)'}\nVOICE: ${voice || 'neutral'}\n\nARTICLE:\n${body}`;
      const data = await callGemini(TEXT_MODEL, {
        system: COMMENTS_SYSTEM,
        parts: [{ text: userText }],
        generationConfig: { temperature: 0.3, responseMimeType: 'application/json', responseSchema: COMMENTS_SCHEMA, thinkingConfig: { thinkingBudget: 0 } },
      });
      res.json(firstJson(data));
    } catch (e) {
      res.status(502).json({ error: 'Comments unavailable: ' + e.message });
    }
  });

  // AI fix: revise the article to address the stage-gate findings.
  app.post('/api/create/revise', async (req, res) => {
    const title = (req.body?.title || '').toString().trim();
    const body = (req.body?.body || '').toString().trim();
    const topic = (req.body?.topic || '').toString().trim();
    const voice = (req.body?.voice || '').toString().trim();
    const findings = req.body?.findings || {};
    const focus = ['topic', 'seo', 'grammar', 'clarity'].includes((req.body?.focus || '').toString().trim().toLowerCase()) ? req.body.focus.toString().trim().toLowerCase() : 'all';
    if (!body) return res.status(400).json({ error: 'Write or paste the article first.' });
    if (body.length > 40000) return res.status(400).json({ error: 'Article too long (max 40k chars).' });
    try {
      const lines = [];
      if (findings.rationale) lines.push('Overall: ' + findings.rationale);
      if (findings.scores) lines.push(`Current scores /10 — topic ${findings.scores.topic_suitability ?? '?'}, SEO ${findings.scores.seo ?? '?'}, grammar ${findings.scores.grammar_spelling ?? '?'}, clarity ${findings.scores.clarity_meaning ?? '?'}.`);
      if (Array.isArray(findings.issues)) findings.issues.forEach(i => lines.push(`Issue (${i.severity || ''} ${i.area || ''}): ${i.detail || ''}`));
      if (Array.isArray(findings.fixes)) findings.fixes.forEach(x => lines.push('Fix: ' + x));
      // Body-copy SEO items only — never the publishing follow-ups (slug, schema, internal links, alt text).
      if (Array.isArray(findings.seo_checklist)) findings.seo_checklist.filter(c => c.status !== 'pass' && c.category !== 'follow_up' && !isFollowUpItem(c)).forEach(c => lines.push(`SEO ${c.status.toUpperCase()}: ${c.item}${c.note ? ' — ' + c.note : ''}`));
      if (findings.meta_title) lines.push('Use/improve this meta title: ' + findings.meta_title);
      if (findings.meta_description) lines.push('Use/improve this meta description: ' + findings.meta_description);
      if (findings.primary_keyword) lines.push('Primary keyword to feature naturally: ' + findings.primary_keyword);
      if (Array.isArray(findings.banned_phrases_found) && findings.banned_phrases_found.length) lines.push('Remove these banned phrases entirely: ' + findings.banned_phrases_found.join(', '));
      if (Array.isArray(findings.british_english_issues) && findings.british_english_issues.length) lines.push('Fix US spellings (use en-GB): ' + findings.british_english_issues.join(', '));
      const FOCUS_MANDATE = {
        all: 'Resolve EVERY issue and make EVERY body-copy SEO checklist item pass. The revised article must be strong enough to score at least 8/10 on all four dimensions (topic fit, SEO, grammar/en-GB, clarity) and pass the gate (APPROVED). Do not leave any amber or red item unaddressed.',
        topic: 'Concentrate on TOPIC SUITABILITY: make the article clearly match the stated brief, voice and reader intent — adjust framing, coverage and emphasis so it is unmistakably on-topic. Do not weaken the other areas.',
        seo: 'Concentrate on SEO: make every body-copy SEO checklist item pass — feature the primary keyword naturally in the title, first 100 words, at least one H2 and the body; ensure a clean H1/H2/H3 hierarchy, a strong meta-friendly introduction, a featured-snippet block, and credible external citations. Do not weaken the other areas.',
        grammar: 'Concentrate on GRAMMAR & SPELLING: fix all grammar, punctuation and spelling, convert everything to British English (en-GB), and remove every banned phrase. Do not weaken the other areas.',
        clarity: 'Concentrate on CLARITY & MEANING: improve logical flow, remove filler and repetition, resolve contradictions and tighten wording so every paragraph earns its place. Do not weaken the other areas.',
      };
      const vnote = VOICE_NOTE[voice] || 'Voice: neutral, professional brand voice.';
      const userText = `${vnote}\nTITLE: ${title || '(none)'}\nINTENDED TOPIC: ${topic || '(unspecified)'}\n\nYOUR TASK: ${FOCUS_MANDATE[focus]}\n\nSTAGE-GATE FINDINGS:\n${lines.length ? lines.join('\n') : '(no specific findings supplied — improve clarity, SEO and grammar)'}\n\nARTICLE TO REVISE (markdown):\n${body}\n\nReturn the full revised article now.`;
      const data = await callGemini(TEXT_MODEL, {
        system: REVISE_SYSTEM,
        parts: [{ text: userText }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 8192 },
      });
      res.json({ body: firstText(data) });
    } catch (e) {
      res.status(502).json({ error: 'Revise failed: ' + e.message });
    }
  });

  // Copywriting stage-gate.
  app.post('/api/create/vet', async (req, res) => {
    const title = (req.body?.title || '').toString().trim();
    const body = (req.body?.body || '').toString().trim();
    const topic = (req.body?.topic || '').toString().trim();
    const voice = (req.body?.voice || '').toString().trim();
    const imageUrl = (req.body?.imageUrl || '').toString().trim() || null;
    const projectId = (req.body?.projectId || '').toString().trim() || null;
    if (!title || !body) return res.status(400).json({ error: 'Title and article body are required.' });
    if (body.length > 40000) return res.status(400).json({ error: 'Article too long (max 40k chars).' });
    try {
      const personaBans = PERSONA_BANS[voice] || [];
      const personaNote = personaBans.length ? `\n\nThis piece uses the "${voice}" persona — additionally treat these words as banned: ${personaBans.join(', ')}.` : '';
      const userText = `TITLE: ${title}\nBRIEF/TOPIC: ${topic || '(unspecified)'}\nVOICE: ${voice || 'neutral brand voice'}\n\nARTICLE (markdown):\n${body}`;
      const data = await callGemini(TEXT_MODEL, {
        system: VET_SYSTEM + personaNote,
        parts: [{ text: userText }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json', responseSchema: VET_SCHEMA, thinkingConfig: { thinkingBudget: 0 } },
      });
      const result = firstJson(data);
      // Trust local scans over the model for deterministic rules (banned phrases, persona bans, en-GB).
      const haystack = (title + '\n' + body).toLowerCase();
      const localBanned = [...scanBanned(haystack), ...personaBans.filter(p => haystack.includes(p))];
      result.banned_phrases_found = Array.from(new Set([...(result.banned_phrases_found || []), ...localBanned]));
      result.british_english_issues = Array.from(new Set([...(result.british_english_issues || []), ...scanUsSpellings(haystack)]));
      if (Array.isArray(result.seo_checklist)) result.seo_checklist.forEach(c => { c.category = isFollowUpItem(c) ? 'follow_up' : 'article'; });
      const blockers = [];
      if (result.banned_phrases_found.length) blockers.push('banned phrases: ' + result.banned_phrases_found.join(', '));
      if (result.british_english_issues.length) blockers.push('US spellings: ' + result.british_english_issues.join(', '));
      if (blockers.length && result.overall_verdict === 'APPROVED') {
        result.overall_verdict = 'NEEDS WORK';
        result.rationale = 'Auto-checks failed (' + blockers.join('; ') + '). ' + (result.rationale || '');
      }
      const { rows } = await pool.query(
        `INSERT INTO content_submissions (title, body, topic, voice, image_url, verdict, scores, result)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, verdict, created_at`,
        [title, body, topic, voice, imageUrl, result.overall_verdict, JSON.stringify(result.scores || {}), JSON.stringify(result)]
      );
      if (projectId) {
        await pool.query(
          `UPDATE content_projects SET verdict=$1, gate=$2, status=$3, updated_at=now() WHERE id=$4`,
          [result.overall_verdict, JSON.stringify(result), result.overall_verdict === 'APPROVED' ? 'approved' : 'gated', projectId]
        ).catch(() => {});
      }
      res.json({ submissionId: rows[0].id, ...result });
    } catch (e) {
      res.status(502).json({ error: 'Gate unavailable: ' + e.message });
    }
  });

  app.get('/api/create/submissions', async (_req, res) => {
    try {
      const { rows } = await pool.query('SELECT id, title, topic, verdict, created_at FROM content_submissions ORDER BY created_at DESC LIMIT 100');
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // ── Projects CRUD ──
  app.post('/api/create/projects', async (req, res) => {
    try {
      const title = (req.body?.title || 'Untitled project').toString().slice(0, 200);
      const withImage = req.body?.with_image !== false;
      const { rows } = await pool.query(
        'INSERT INTO content_projects (title, with_image) VALUES ($1,$2) RETURNING *',
        [title, withImage]
      );
      res.json(rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/api/create/projects', async (_req, res) => {
    try {
      const { rows } = await pool.query(
        'SELECT id, title, with_image, verdict, status, image_url, article_locked, image_locked, updated_at FROM content_projects ORDER BY updated_at DESC LIMIT 200'
      );
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/api/create/projects/:id', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM content_projects WHERE id=$1', [req.params.id]);
      if (!rows.length) return res.status(404).json({ error: 'not found' });
      res.json(rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.put('/api/create/projects/:id', async (req, res) => {
    const sets = [], vals = [];
    for (const f of PROJECT_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, f)) {
        vals.push(f === 'gate' ? JSON.stringify(req.body[f]) : req.body[f]);
        sets.push(`${f}=$${vals.length}`);
      }
    }
    if (!sets.length) return res.status(400).json({ error: 'no fields to update' });
    vals.push(req.params.id);
    try {
      const { rows } = await pool.query(
        `UPDATE content_projects SET ${sets.join(', ')}, updated_at=now() WHERE id=$${vals.length} RETURNING *`,
        vals
      );
      if (!rows.length) return res.status(404).json({ error: 'not found' });
      res.json(rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.delete('/api/create/projects/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM content_projects WHERE id=$1', [req.params.id]);
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // Export — hard-locked: only an APPROVED project/submission can be exported.
  app.post('/api/create/export', async (req, res) => {
    const projectId = (req.body?.projectId || '').toString().trim();
    const submissionId = (req.body?.submissionId || '').toString().trim();
    const format = (req.body?.format || '').toString().trim().toLowerCase();
    if (!projectId && !submissionId) return res.status(400).json({ error: 'projectId (or submissionId) is required.' });
    if (!['pdf', 'html', 'md'].includes(format)) return res.status(400).json({ error: 'format must be pdf, html, or md.' });
    try {
      let sub;
      if (projectId) {
        const { rows } = await pool.query('SELECT title, body, image_url, verdict, image_locked, with_image FROM content_projects WHERE id=$1', [projectId]);
        sub = rows[0];
        if (!sub) return res.status(404).json({ error: 'project not found.' });
        if (sub.with_image && !sub.image_locked) return res.status(403).json({ error: 'Lock the image before exporting.' });
      } else {
        const { rows } = await pool.query('SELECT title, body, image_url, verdict FROM content_submissions WHERE id=$1', [submissionId]);
        sub = rows[0];
        if (!sub) return res.status(404).json({ error: 'submission not found.' });
      }
      if (sub.verdict !== 'APPROVED') return res.status(403).json({ error: 'Export is locked until the stage gate returns APPROVED.' });
      if (projectId) await pool.query("UPDATE content_projects SET status='exported', updated_at=now() WHERE id=$1", [projectId]).catch(() => {});
      const safe = (sub.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'article';
      if (format === 'md') {
        // Plain Markdown: title as H1 + the article body. The image is downloaded separately by the creator.
        const md = `# ${sub.title || 'Untitled'}\n\n${sub.body || ''}\n`;
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${safe}.md"`);
        return res.send(md);
      }
      if (format === 'html') {
        const origin = `${req.protocol}://${req.get('host')}`;
        const html = buildHtmlDoc({ title: sub.title, body: sub.body, imageUrl: sub.image_url, origin });
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${safe}.html"`);
        return res.send(html);
      }
      // pdf
      let imageBuffer = null;
      if (sub.image_url) {
        const fp = path.join(MEDIA_DIR, path.basename(sub.image_url));
        if (fp.startsWith(MEDIA_DIR) && fs.existsSync(fp)) imageBuffer = fs.readFileSync(fp);
      }
      const pdf = await markdownToPdfBuffer(sub.body, sub.title, { imageBuffer });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safe}.pdf"`);
      return res.send(pdf);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
