import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { initDb } from './init-db.js';
import { registerChatRoutes } from './chat.js';
import { registerAuditRoutes } from './audit.js';

const { Pool } = pg;
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

// Health — confirms DB connectivity
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch (e) {
    res.status(500).json({ status: 'error', db: 'down', error: e.message });
  }
});

// Portfolio — all sites
app.get('/api/sites', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sites ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Single site
app.get('/api/sites/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sites WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Feature routes: AI Chat (Gemini) + Audit report compiler
registerChatRoutes(app, pool);
registerAuditRoutes(app, pool);

const port = process.env.PORT || 3100;
initDb(pool)
  .then(() => app.listen(port, '127.0.0.1', () => console.log(`Gaia Nexus backend listening on 127.0.0.1:${port}`)))
  .catch((e) => { console.error('DB init failed:', e.message); process.exit(1); });
