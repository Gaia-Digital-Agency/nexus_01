import { useEffect, useState } from 'react';

const NAV = ['Dashboard', 'Analytics', 'Proposals', 'Deployments', 'Reports', 'Settings'];

function fmtMoney(n) {
  if (n == null) return '—';
  return '$' + Number(n).toLocaleString();
}

export default function App() {
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState('loading');
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(setHealth).catch(() => setHealth({ status: 'error' }));
    fetch('/api/sites')
      .then(r => r.json())
      .then(d => { setSites(Array.isArray(d) ? d : []); setStatus('ok'); })
      .catch(() => setStatus('error'));
  }, []);

  const totalTraffic = sites.reduce((s, x) => s + (x.traffic_7d || 0), 0);
  const avgRoas = sites.length ? (sites.reduce((s, x) => s + Number(x.roas || 0), 0) / sites.length).toFixed(2) : '0.00';

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">GN</div>
        {NAV.map((n, i) => (
          <div key={n} className={'nav-item' + (i === 0 ? ' active' : '')}>{n}</div>
        ))}
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Portfolio Dashboard</h1>
          <div className="badge-row">
            <span className={'dot ' + (health?.db === 'up' ? 'ok' : 'err')} />
            <span className="muted">DB {health?.db === 'up' ? 'connected' : 'down'}</span>
            <span className="avatar">SE</span>
          </div>
        </header>

        <section className="kpis">
          <Kpi label="Total Organic Traffic (7d)" value={totalTraffic.toLocaleString()} />
          <Kpi label="Average Ad ROAS" value={avgRoas + 'x'} accent="success" />
          <Kpi label="Pending Proposals" value="0" accent="warning" />
          <Kpi label="Active Deployments" value="0" />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Sites Overview</h2>
            <span className="muted">{sites.length} site{sites.length === 1 ? '' : 's'}</span>
          </div>
          {status === 'loading' && <p className="muted pad">Loading…</p>}
          {status === 'error' && <p className="err pad">Failed to reach API.</p>}
          {status === 'ok' && (
            <table>
              <thead>
                <tr>
                  <th>Site Name</th><th>Type</th><th>SEO Score</th>
                  <th>Traffic (7d)</th><th>Ad Spend</th><th>ROAS</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sites.map(s => (
                  <tr key={s.id}>
                    <td><div className="site-name">{s.name}</div><div className="muted small">{s.url}</div></td>
                    <td><span className="tag">{s.type}</span></td>
                    <td>{s.seo_score ?? '—'}</td>
                    <td>{s.traffic_7d?.toLocaleString() ?? '—'}</td>
                    <td>{fmtMoney(s.ad_spend)}</td>
                    <td>{s.roas != null ? s.roas + 'x' : '—'}</td>
                    <td><span className={'status ' + (s.status === 'active' ? 'ok' : 'warn')}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <footer className="foot muted">Gaia Nexus · placeholder · PRVTN stack (PostgreSQL · Python · React · Vite · Node)</footer>
      </main>
    </div>
  );
}

function Kpi({ label, value, accent }) {
  return (
    <div className="kpi">
      <div className="kpi-label muted">{label}</div>
      <div className={'kpi-value ' + (accent || '')}>{value}</div>
    </div>
  );
}
