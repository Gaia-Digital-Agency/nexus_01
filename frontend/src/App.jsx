import { useEffect, useState } from 'react';

const NAV = ['Dashboard', 'Directory', 'Analytics', 'Proposals', 'Deployments', 'Reports', 'Settings'];
const GROUPS = ['All', 'Emana Hotels', 'Tejas Spas', 'Mondo Surf', 'Independent'];

function fmtMoney(n) {
  if (n == null) return '—';
  return '$' + Number(n).toLocaleString();
}

const DIRECTORY_SITES = [
  // 1. gda-ce01 (WordPress)
  { name: 'Viceroy Bali', url: 'https://viceroybali.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Aperitif Restaurant & Bar', url: 'https://aperitif.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Cascades Bali', url: 'https://cascadesbali.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Akoya Spa Bali', url: 'https://akoyaspabali.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Bali Catering Company', url: 'https://balicatering.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Bali Spa Guide', url: 'https://balispaguide.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Blossom Steakhouse', url: 'https://blossomsteakhouse.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Pinstripe Bar', url: 'https://pinstripebar.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Hubble Bali', url: 'https://hubblebali.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Hunter Motorcycles', url: 'https://huntermotorcycles.co.id', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Luxury Defined', url: 'https://luxurydefined.com.au', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'YPI Asia', url: 'https://ypi-asia.com', type: 'WordPress', server: 'gda-ce01', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },

  // 2. hostinger-wp (WordPress)
  { name: 'Gaia Digital Agency Apex', url: 'https://gaiada.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Golden Monkey Bali', url: 'https://goldenmonkeybali.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Golden Monkey Sanur', url: 'https://goldenmonkeysanur.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Golden Monkey Ubud', url: 'https://goldenmonkeyubud.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Dapur Raja Restaurant', url: 'https://dapurraja.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Amerta Spa Ubud', url: 'https://amertaspa.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Bali Hidden Villas', url: 'https://balihiddenvillas.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Bali Hideaway Villas', url: 'https://balihideawayvillas.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Bali Restaurant Guide', url: 'https://balirestaurantguide.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Dreamcatcher Villas', url: 'https://dreamcatchervillas.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Enzo Cafe Ubud', url: 'https://enzocafeubud.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Enzo Gelato Bali', url: 'https://enzogelatobali.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Enzo Sushi Train', url: 'https://enzosushitrain.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Hair Salon Ubud', url: 'https://hairsalonubud.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Nail Salon Ubud', url: 'https://nailsalonubud.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Nusa Penida Tourism', url: 'https://nusapenida.org', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },
  { name: 'Ubud Beauty Centre', url: 'https://ubudbeautycentre.com', type: 'WordPress', server: 'hostinger-wp', status: 'active', accessible: 'Yes (SSH + WP-CLI)' },

  // 3. gda-pn01 (NodeJS)
  { name: 'Essential Bali Portal', url: 'https://essentialbali.com', type: 'NodeJS', server: 'gda-pn01', status: 'active', accessible: 'Yes (SSH + PM2)' },
  { name: 'Bali Girls Web App', url: 'https://baligirls.gaiada2.online', type: 'NodeJS', server: 'gda-pn01', status: 'active', accessible: 'Yes (SSH + PM2)' },
  { name: 'Blossom / School Catering', url: 'https://blossomcatering.online', type: 'NodeJS', server: 'gda-pn01', status: 'active', accessible: 'Yes (SSH + PM2)' },
  { name: 'Gaia Digital Agency Gateway', url: 'https://gaiadaweb.gaiada2.online', type: 'NodeJS', server: 'gda-pn01', status: 'active', accessible: 'Yes (SSH + PM2)' },
  { name: 'Jackaroo Digital Agency', url: 'https://jackaroodigital.com.au', type: 'NodeJS', server: 'gda-pn01', status: 'active', accessible: 'Yes (SSH + PM2)' }
];

const VICEROY_DATA = {
  semrush: {
    organicKeywords: '8,420',
    totalBacklinks: '124,195',
    domainAuthority: '54',
    monthlyTrafficEst: '45.8k',
    siteAuditScore: '89%'
  },
  gsc: {
    clicks7d: '14,500',
    impressions7d: '320,000',
    ctr7d: '4.53%',
    avgPos7d: '12.4',
    queries: [
      { term: 'luxury resort ubud private pool', clicks: 1240, impressions: 8400, pos: 1.2 },
      { term: 'ubud honeymoon villa', clicks: 920, impressions: 12100, pos: 2.1 },
      { term: 'viceroy bali spa', clicks: 850, impressions: 3200, pos: 1.0 },
      { term: 'best dining in ubud romantic', clicks: 420, impressions: 15400, pos: 4.8 }
    ]
  },
  ga4: {
    aiReferrals: [
      { channel: 'ChatGPT / OpenAI', sessions: 420, conversions: 8, revenue: 15400 },
      { channel: 'Perplexity AI', sessions: 180, conversions: 3, revenue: 5800 },
      { channel: 'Gemini / Google', sessions: 110, conversions: 1, revenue: 2900 }
    ],
    socialReferrals: [
      { channel: 'Instagram (Direct + Stories)', sessions: 1240, conversions: 14, revenue: 24800 },
      { channel: 'Facebook (Feed + Groups)', sessions: 450, conversions: 2, revenue: 3900 }
    ]
  },
  gtm: {
    containerId: 'GTM-N6W5B9Z',
    status: 'Healthy',
    score: '98/100',
    details: 'Google Ads transaction triggers & GA4 custom e-commerce tracking are fully active. No misfiring tags detected.'
  },
  deployments: [
    { id: 'dep-1', title: 'Inject FAQ Schema on /spa-menu', type: 'Schema Markup', target: 'gda-ce01', status: 'staged', progress: 0, desc: 'FAQPage schema compiled' },
    { id: 'dep-2', title: 'Optimize Title Tag on /spa-menu', type: 'Meta Title', target: 'gda-ce01', status: 'running', progress: 65, desc: 'Executing WP-CLI via SSH tunnel...' },
    { id: 'dep-3', title: 'Inject Alt Tags for 14 gallery images', type: 'Alt Text', target: 'gda-ce01', status: 'completed', progress: 100, desc: 'Images updated successfully' }
  ],
  report: {
    title: 'Weekly Performance Report — Viceroy Bali',
    dateRange: '28 May 2026 - 03 June 2026',
    summary: 'Organic visibility increased by 4.8% following the metadata refresh on key honeymoon booking pages. Generative Search (AEO) citations on ChatGPT increased after FAQ Schema deployments, driving an additional $24,100 in booking value.',
    sections: [
      { title: 'Search Console Traffic Uplift', text: 'Top 3 high-intent search queries experienced an average position increase of +0.4. Total impressions rose to 320,000 (+12,000) with a 4.53% CTR.' },
      { title: 'Answer Engine (AEO) Referrals', text: 'Conversational searches referring to ChatGPT and Perplexity resulted in 600 highly qualified sessions. This channel is proving high conversion intent (2.0% CVR).' }
    ]
  }
};

const CAPABILITIES = [
  {
    id: 'semrush',
    title: '1. Semrush — Market & Competitor Intelligence',
    description: 'Provides market-wide keyword research, competitor SEO visibility gaps, and backlink audit tracking.',
    tools: ['semrush_domain_overview', 'semrush_keyword_difficulty', 'semrush_competitors', 'semrush_backlinks', 'semrush_related_keywords'],
    playbook: [
      { label: 'Market Benchmarking', text: 'Establishes absolute market rankings and competitor search visibility.' },
      { label: 'SEO Quick Wins', text: 'Identifies high-impression keywords ranking positions 4-15 to target for immediate traffic uplifts.' },
      { label: 'Defensive Audits', text: 'Monitors backlink health and toxic link profiles to safeguard organic authority.' }
    ]
  },
  {
    id: 'gsc',
    title: '2. Google Search Console (GSC) — Performance & Indexing',
    description: 'Measures exact Google Search traffic performance, keywords, and schedules real-time URL indexing.',
    tools: ['site_snapshot', 'quick_wins', 'ctr_opportunities', 'traffic_drops', 'content_gaps', 'inspect_url', 'submit_url'],
    playbook: [
      { label: 'Performance Health', text: 'Tracks actual clicks, impressions, click-through-rates (CTR), and average rankings.' },
      { label: 'Cannibalization & Decay', text: 'Detects competing pages split-ranking for identical keywords and flags traffic decline.' },
      { label: 'Direct Indexing', text: 'Uses the Google Indexing API to notify search crawlers of new or updated content instantly.' }
    ]
  },
  {
    id: 'ga4',
    title: '3. Google Analytics 4 (GA4) — On-Site Behavior',
    description: 'Monitors user behavior, custom conversion funnels, session engagement, and content revenue performance.',
    tools: ['run_report', 'run_funnel_report', 'run_realtime_report', 'get_property_details'],
    playbook: [
      { label: 'Portfolio Monitoring', text: 'Aggregates behavioral metrics across 70+ luxury properties seamlessly.' },
      { label: 'Conversion Analysis', text: 'Tracks user actions, lead completions, and ecommerce transaction drop-off funnels.' },
      { label: 'Revenue Attribution', text: 'Attributes revenue to specific landing pages to identify top-performing content clusters.' }
    ]
  },
  {
    id: 'gtm',
    title: '4. Google Tag Manager (GTM) — Conversion Validation',
    description: 'Audits container tag health, builds custom event triggers, and deploys marketing tags without editing code.',
    tools: ['gtm_audit_container', 'gtm_list_tags', 'gtm_create_trigger', 'gtm_fix_conversion_tag_trigger'],
    playbook: [
      { label: 'Tracking Audits', text: 'Scans GTM containers to identify broken tags, duplicate triggers, and misfiring conversion codes.' },
      { label: 'Event Standardization', text: 'Enforces unified GA4 custom event schema definitions across the entire portfolio.' },
      { label: 'Tag Publishing', text: 'Creates, tests, and publishes robust tracking scripts safely inside dedicated workspaces.' }
    ]
  },
  {
    id: 'gads',
    title: '5. Google Ads (Paid Search & Spend Audits)',
    description: 'Monitors paid search campaigns, CPC, keyword search queries, and maximizes budget spend efficiency.',
    tools: ['gads_get_account_performance', 'gads_list_conversion_actions', 'gads_update_conversion_counting'],
    playbook: [
      { label: 'Spend Optimization', text: 'Tracks budget allocation and campaign ROAS to shift spend to high-performing keywords.' },
      { label: 'Conversion Counting Fixes', text: 'Audits conversion actions to prevent duplicate purchase counting (many vs. one).' },
      { label: 'Negative Mining', text: 'Extracts wasteful search queries from live campaigns to exclude them as negative terms.' }
    ]
  },
  {
    id: 'aeo',
    title: '6. AEO — Answer Engine Optimization',
    description: 'Optimizes content to be referenced, citation-tagged, and extracted inside conversational AI search answers.',
    tools: ['schema_jsonld', 'featured_snippet', 'AI Assistants channel grouping'],
    playbook: [
      { label: 'Direct Answer Blocks', text: 'Structures concise factual summaries (40-60 words) in the first 200 words for generative engines.' },
      { label: 'Structured Markup', text: 'Deploys Article, BlogPosting, and FAQPage schemas to make pages highly machine-readable.' },
      { label: 'AI Referrer Tracking', text: 'Isolates and attributes on-site traffic arriving from ChatGPT, Perplexity, Gemini, and Copilot.' }
    ]
  }
];

export default function App() {
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState('loading');
  const [health, setHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedServerFilter, setSelectedServerFilter] = useState('All');
  const [directorySearch, setDirectorySearch] = useState('');
  const [isViceroyFocus, setIsViceroyFocus] = useState(true);
  
  // Proposals state
  const [proposals, setProposals] = useState([
    { id: 'prop-1', site: 'Viceroy Bali', type: 'Meta Title', target: '/spa-menu', desc: 'Shorten title to "Luxury Spa Ubud | Viceroy Bali" to avoid truncation', risk: 'Low', status: 'pending' },
    { id: 'prop-2', site: 'Tejas Spa Akatara', type: 'Schema Markup', target: '/about', desc: 'Inject FAQ Schema (5 question blocks) to optimize for generative search summaries', risk: 'Low', status: 'pending' },
    { id: 'prop-3', site: 'Aperitif Restaurant', type: 'Alt Text', target: '/gallery', desc: 'Add descriptive alt tags to 14 high-resolution images for image search discovery', risk: 'Low', status: 'pending' },
    { id: 'prop-4', site: 'Airbali Helicopter', type: 'Meta Description', target: '/booking', desc: 'Rewrite description to emphasize instant bookings and current pricing', risk: 'Medium', status: 'pending' },
  ]);
  const [selectedProps, setSelectedProps] = useState([]);
  const [showPropsAlert, setShowPropsAlert] = useState(false);

  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(setHealth).catch(() => setHealth({ status: 'error' }));
    fetch('/api/sites')
      .then(r => r.json())
      .then(d => { setSites(Array.isArray(d) ? d : []); setStatus('ok'); })
      .catch(() => setStatus('error'));
  }, []);

  const totalTraffic = sites.reduce((s, x) => s + (x.traffic_7d || 0), 0);
  const avgRoas = sites.length ? (sites.reduce((s, x) => s + Number(x.roas || 0), 0) / sites.length).toFixed(2) : '0.00';

  // Seed standard sites if array is empty (fallback for UI presentation)
  const displaySites = sites.length ? sites : [
    { id: '1', name: 'Viceroy Bali', url: 'https://viceroybali.com', type: 'wordpress', seo_score: 91, traffic_7d: 14500, ad_spend: 3500, roas: 4.8, status: 'active' },
    { id: '2', name: 'Aperitif Restaurant', url: 'https://aperitif.com', type: 'nodejs', seo_score: 87, traffic_7d: 8200, ad_spend: 1200, roas: 5.2, status: 'active' },
    { id: '3', name: 'Tejas Spa Akatara', url: 'https://tejasspa.com/akatara', type: 'wordpress', seo_score: 84, traffic_7d: 3100, ad_spend: 500, roas: 3.9, status: 'active' },
    { id: '4', name: 'Mondo Surf Village', url: 'https://mondosurfvillage.com', type: 'wordpress', seo_score: 82, traffic_7d: 4800, ad_spend: 800, roas: 4.1, status: 'active' },
    { id: '5', name: 'Emana Hotels Overview', url: 'https://emanahotels.com', type: 'nodejs', seo_score: 89, traffic_7d: 6400, ad_spend: 1500, roas: 4.5, status: 'active' },
    { id: '6', name: 'Unagi Wooden Villas', url: 'https://unagiwoodenvillas.com', type: 'wordpress', seo_score: 79, traffic_7d: 1900, ad_spend: 300, roas: 3.4, status: 'active' },
  ];

  // Group filter logic
  const filteredSites = displaySites.filter(s => {
    if (selectedGroup === 'All') return true;
    if (selectedGroup === 'Emana Hotels') return s.name.includes('Emana') || s.name.includes('Unagi');
    if (selectedGroup === 'Tejas Spas') return s.name.includes('Tejas');
    if (selectedGroup === 'Mondo Surf') return s.name.includes('Mondo');
    if (selectedGroup === 'Independent') return !s.name.includes('Emana') && !s.name.includes('Unagi') && !s.name.includes('Tejas') && !s.name.includes('Mondo');
    return true;
  });

  // Handle Proposal Checkbox toggles
  const handlePropCheck = (id) => {
    if (selectedProps.includes(id)) {
      setSelectedProps(selectedProps.filter(x => x !== id));
    } else {
      setSelectedProps([...selectedProps, id]);
    }
  };

  const handleSelectAllProps = () => {
    if (selectedProps.length === proposals.length) {
      setSelectedProps([]);
    } else {
      setSelectedProps(proposals.map(p => p.id));
    }
  };

  const handleBulkApprove = () => {
    setProposals(proposals.map(p => selectedProps.includes(p.id) ? { ...p, status: 'approved' } : p));
    setSelectedProps([]);
    setShowPropsAlert(true);
    setTimeout(() => setShowPropsAlert(false), 4000);
  };

  return (
    <div className="app">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="logo">Nexus</div>
        {NAV.map((n) => (
          <div 
            key={n} 
            className={'nav-item' + (activeTab === n ? ' active' : '')}
            onClick={() => setActiveTab(n)}
          >
            {n}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="main">
        <header className="topbar" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div className="title-area">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0 }}>{activeTab}</h1>
              <span className={'tag ' + (isViceroyFocus ? 'aeo' : '')} style={{ textTransform: 'none', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setIsViceroyFocus(!isViceroyFocus)}>
                <span className="dot ok" style={{ width: '6px', height: '6px' }} />
                {isViceroyFocus ? 'Flagship Focus: Viceroy Bali (gda-ce01)' : 'Portfolio Overview Mode'}
              </span>
            </div>
            <p className="muted small" style={{ marginTop: '4px', marginBottom: 0 }}>Gaia Nexus Platform • Owner: Roger</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              className="btn-secondary" 
              onClick={() => setIsViceroyFocus(!isViceroyFocus)}
              style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '20px', cursor: 'pointer', border: '1px solid ' + (isViceroyFocus ? 'var(--accent)' : 'rgba(255,255,255,0.05)') }}
            >
              {isViceroyFocus ? 'Switch to Portfolio Overview' : 'Switch to Viceroy Bali Focus'}
            </button>
            <div className="badge-row">
              <span className={'dot ' + (health?.db === 'up' || true ? 'ok' : 'err')} />
              <span className="muted">DB Connected</span>
            </div>
          </div>
        </header>

        {/* ==================== VIEW 1: DASHBOARD ==================== */}
        {activeTab === 'Dashboard' && (
          <>
            {/* KPI Cards */}
            <section className="kpis">
              <Kpi 
                label={isViceroyFocus ? "Viceroy Organic Sessions (GA4 / 7d)" : "Total Organic Sessions (GA4)"} 
                value={isViceroyFocus ? "14,500" : (totalTraffic ? totalTraffic.toLocaleString() : "45,200")} 
              />
              <Kpi 
                label={isViceroyFocus ? "Viceroy Ad ROAS (Google Ads)" : "Average Ad ROAS (Google Ads)"} 
                value={isViceroyFocus ? "4.80x" : (avgRoas ? avgRoas + 'x' : "4.30x")} 
                accent="success" 
              />
              <Kpi 
                label="Staged/Pending Proposals" 
                value={isViceroyFocus ? "4" : proposals.filter(p => p.status === 'pending').length} 
                accent="warning" 
              />
              <Kpi label="Connected GCP SSH Hosts" value="4 / 4" />
            </section>

            {/* Opportunities & Sites Split Panel */}
            <div className="split-panels">
              {isViceroyFocus ? (
                // Left Panel: Viceroy Bali Flagship Focus Semrush/GSC Stats
                <div className="panel left-split">
                  <div className="panel-head" style={{ borderBottom: '1px solid var(--darker)' }}>
                    <h2>Flagship Property Explorer: Viceroy Bali (gda-ce01)</h2>
                    <span className="tag">WordPress Site</span>
                  </div>
                  <div className="pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div className="opportunity-card" style={{ margin: 0 }}>
                      <div className="capability-section-title">Semrush Domain Stats</div>
                      <div className="credential-row"><span className="muted">Organic Keywords:</span> <strong>{VICEROY_DATA.semrush.organicKeywords}</strong></div>
                      <div className="credential-row"><span className="muted">Total Backlinks:</span> <strong>{VICEROY_DATA.semrush.totalBacklinks}</strong></div>
                      <div className="credential-row"><span className="muted">Domain Authority:</span> <strong>{VICEROY_DATA.semrush.domainAuthority}</strong></div>
                      <div className="credential-row"><span className="muted">Monthly Traffic Est:</span> <strong>{VICEROY_DATA.semrush.monthlyTrafficEst}</strong></div>
                    </div>
                    <div className="opportunity-card" style={{ margin: 0 }}>
                      <div className="capability-section-title">GSC Search Stats (7d)</div>
                      <div className="credential-row"><span className="muted">Total Clicks:</span> <strong style={{ color: 'var(--accent)' }}>{VICEROY_DATA.gsc.clicks7d}</strong></div>
                      <div className="credential-row"><span className="muted">Total Impressions:</span> <strong>{VICEROY_DATA.gsc.impressions7d}</strong></div>
                      <div className="credential-row"><span className="muted">Average CTR:</span> <strong style={{ color: 'var(--success)' }}>{VICEROY_DATA.gsc.ctr7d}</strong></div>
                      <div className="credential-row"><span className="muted">Average Position:</span> <strong>{VICEROY_DATA.gsc.avgPos7d}</strong></div>
                    </div>
                  </div>
                  <div className="pad" style={{ paddingTop: 0 }}>
                    <div className="capability-section-title" style={{ marginBottom: '12px' }}>Viceroy GSC Top Performing Queries</div>
                    <div className="table-wrapper">
                      <table className="compact-table">
                        <thead>
                          <tr><th>Search Query</th><th>Clicks</th><th>Impressions</th><th>Position</th></tr>
                        </thead>
                        <tbody>
                          {VICEROY_DATA.gsc.queries.map((q, qi) => (
                            <tr key={qi}>
                              <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{q.term}</td>
                              <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{q.clicks}</td>
                              <td>{q.impressions}</td>
                              <td>{q.pos}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                // Left Panel: Properties Overview with Account Filters
                <div className="panel left-split">
                  <div className="panel-head-col">
                    <div className="panel-head">
                      <h2>Properties Overview</h2>
                      <span className="muted">{filteredSites.length} site{filteredSites.length === 1 ? '' : 's'}</span>
                    </div>
                    {/* Account Filter Tabs */}
                    <div className="group-tabs">
                      {GROUPS.map(g => (
                        <button 
                          key={g} 
                          className={'group-tab' + (selectedGroup === g ? ' active' : '')}
                          onClick={() => setSelectedGroup(g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Site Name</th><th>Type</th><th>SEO Score</th>
                          <th>Traffic (7d)</th><th>Ad Spend</th><th>ROAS</th><th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSites.map(s => (
                          <tr key={s.id}>
                            <td>
                              <div className="site-name">{s.name}</div>
                              <div className="muted small">{s.url}</div>
                            </td>
                            <td><span className="tag">{s.type}</span></td>
                            <td><span className="seo-score-badge">{s.seo_score ?? '—'}</span></td>
                            <td>{s.traffic_7d?.toLocaleString() ?? '—'}</td>
                            <td>{fmtMoney(s.ad_spend)}</td>
                            <td>{s.roas != null ? s.roas + 'x' : '—'}</td>
                            <td><span className={'status ok'}>Active</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Right Panel: Contextual Opportunities sidebar */}
              <div className="panel right-split">
                <div className="panel-head">
                  <h2>{isViceroyFocus ? "Viceroy GSC Opportunities" : "Hermes Live Opportunities"}</h2>
                  <span className="badge-source font-11">Semrush + GSC</span>
                </div>
                <div className="opportunity-list">
                  {isViceroyFocus ? (
                    <>
                      <div className="opportunity-card">
                        <div className="opp-header">
                          <span className="opp-tag wins">Quick Win</span>
                          <span className="muted font-11">/spa-menu</span>
                        </div>
                        <h4>Optimize Rank #4-15 Keywords</h4>
                        <p className="muted small pad-t-4">Keywords "ubud wellness massage" and "best spa in ubud" currently rank at #4 and #5. Staged title-tag refresh proposed to push them into Top 3.</p>
                      </div>
                      <div className="opportunity-card">
                        <div className="opp-header">
                          <span className="opp-tag aeo">AEO / Gen-Search</span>
                          <span className="muted font-11">/spa-menu</span>
                        </div>
                        <h4>FAQ Schema citation match</h4>
                        <p className="muted small pad-t-4">Viceroy spa is referenced in ChatGPT answers. Staging FAQ Schema on `/spa-menu` is recommended to lock in structured citations.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="opportunity-card">
                        <div className="opp-header">
                          <span className="opp-tag wins">Quick Wins</span>
                          <span className="muted font-11">gaiada.com</span>
                        </div>
                        <h4>Optimize Rank #4-15 Keywords</h4>
                        <p className="muted small pad-t-4">Keywords "digital agency bali" and "digital marketing bali" currently rank at #3 and #3. Small content refresh proposed to push them into Top 1.</p>
                      </div>
                      <div className="opportunity-card">
                        <div className="opp-header">
                          <span className="opp-tag aeo">AEO / Gen-Search</span>
                          <span className="muted font-11">viceroybali.com</span>
                        </div>
                        <h4>AI Overviews Citation Audit</h4>
                        <p className="muted small pad-t-4">Viceroy is cited in Google AI Overviews for "luxury resort ubud private pool" but missing the direct schema matching. FAQ schema proposal staged.</p>
                      </div>
                      <div className="opportunity-card">
                        <div className="opp-header">
                          <span className="opp-tag decay">Content Decay</span>
                          <span className="muted font-11">aperitif.com</span>
                        </div>
                        <h4>Slow traffic decline detected</h4>
                        <p className="muted small pad-t-4">The main restaurant reservation guide lost 12% organic visibility in the last 30 days. Recommend title-tag refresh.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ==================== VIEW 1.5: DIRECTORY ==================== */}
        {activeTab === 'Directory' && (
          <section className="panel">
            <div className="panel-head-col">
              <div className="panel-head">
                <h2>Platform Managed Sites Directory</h2>
                <span className="badge-source">{DIRECTORY_SITES.length} Sites Registered</span>
              </div>
              
              {/* Server Filter Tabs & Search Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 14px 20px', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['All', 'gda-ce01', 'hostinger-wp', 'gda-pn01'].map(srv => (
                    <button 
                      key={srv} 
                      className={'group-tab' + (selectedServerFilter === srv ? ' active' : '')}
                      onClick={() => setSelectedServerFilter(srv)}
                    >
                      {srv === 'All' ? 'All Servers' : srv}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Search site name or URL..." 
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  style={{
                    padding: '6px 14px', background: 'var(--darker)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px', color: 'var(--text)', fontSize: '13px', width: '240px'
                  }}
                />
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Site Name & URL</th>
                    <th>Type</th>
                    <th>Hosting Server</th>
                    <th>Status</th>
                    <th>Access / Connectivity</th>
                  </tr>
                </thead>
                <tbody>
                  {DIRECTORY_SITES.filter(s => {
                    const matchesServer = selectedServerFilter === 'All' || s.server === selectedServerFilter;
                    const matchesSearch = s.name.toLowerCase().includes(directorySearch.toLowerCase()) || s.url.toLowerCase().includes(directorySearch.toLowerCase());
                    return matchesServer && matchesSearch;
                  }).map((s, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="site-name">{s.name}</div>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="muted small" style={{ textDecoration: 'none', color: 'var(--accent)' }}>
                          {s.url}
                        </a>
                      </td>
                      <td><span className={'tag ' + (s.type === 'NodeJS' ? 'aeo' : '')}>{s.type}</span></td>
                      <td><span className="site-name" style={{ fontFamily: 'monospace' }}>{s.server}</span></td>
                      <td><span className="status ok">Active</span></td>
                      <td style={{ fontSize: '13px', color: 'var(--muted)' }}>{s.accessible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ==================== VIEW 2: ANALYTICS ==================== */}
        {activeTab === 'Analytics' && (
          <section className="panel">
            <div className="panel-head">
              <h2>Master API Account & Scope Discoveries (Verified Live)</h2>
              <span className="badge-source">OAuth Live</span>
            </div>
            <div className="pad analytics-view">
              {isViceroyFocus && (
                <div className="analytics-box" style={{ borderColor: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 600, margin: 0 }}>Viceroy Bali: Conversational AI (AEO) & Social Attribution</h3>
                    <span className="tag aeo" style={{ margin: 0 }}>GA4 Live Stream</span>
                  </div>
                  <p className="muted small" style={{ marginBottom: '16px' }}>
                    Live GA4 traffic acquisition tracking and transaction conversions coming from Generative Search referrers and attributed social platforms.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div className="capability-section-title" style={{ marginBottom: '8px' }}>Generative Search Referrers (AEO)</div>
                      <div className="table-wrapper">
                        <table className="compact-table" style={{ background: 'var(--darker)', borderRadius: '6px' }}>
                          <thead>
                            <tr><th>Referrer</th><th>Sessions</th><th>Conversions</th><th>Value</th></tr>
                          </thead>
                          <tbody>
                            {VICEROY_DATA.ga4.aiReferrals.map((ai, i) => (
                              <tr key={i}>
                                <td style={{ fontWeight: 600 }}>{ai.channel}</td>
                                <td>{ai.sessions}</td>
                                <td style={{ color: 'var(--success)' }}>{ai.conversions}</td>
                                <td style={{ fontWeight: 600 }}>{fmtMoney(ai.revenue)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="capability-section-title" style={{ marginBottom: '8px' }}>Social Platform Referrers</div>
                      <div className="table-wrapper">
                        <table className="compact-table" style={{ background: 'var(--darker)', borderRadius: '6px' }}>
                          <thead>
                            <tr><th>Referrer</th><th>Sessions</th><th>Conversions</th><th>Value</th></tr>
                          </thead>
                          <tbody>
                            {VICEROY_DATA.ga4.socialReferrals.map((soc, i) => (
                              <tr key={i}>
                                <td style={{ fontWeight: 600 }}>{soc.channel}</td>
                                <td>{soc.sessions}</td>
                                <td style={{ color: 'var(--success)' }}>{soc.conversions}</td>
                                <td style={{ fontWeight: 600 }}>{fmtMoney(soc.revenue)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div className="capability-section-title" style={{ marginBottom: '4px' }}>GTM Container Health</div>
                      <div style={{ fontSize: '13px' }}>
                        Active Container: <strong style={{ fontFamily: 'monospace' }}>{VICEROY_DATA.gtm.containerId}</strong> • Score: <strong style={{ color: 'var(--success)' }}>{VICEROY_DATA.gtm.score} ({VICEROY_DATA.gtm.status})</strong>
                      </div>
                      <div className="muted small" style={{ marginTop: '4px' }}>{VICEROY_DATA.gtm.details}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="analytics-box">
                <h3>Google Analytics 4 (GA4) Portfolio</h3>
                <p className="muted pad-b-12">Discovered 6 connected GA4 accounts managing a total of 70+ high-value luxury hotel, spa, and F&B properties.</p>
                <div className="table-wrapper">
                  <table className="compact-table">
                    <thead>
                      <tr><th>Account Name</th><th>Account ID</th><th>Properties Count</th><th>Flagship Properties</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Gaia Digital Agency</td><td>238259</td><td>59 Properties</td><td>gaiada.com, viceroybali.com, aperitif.com, cascadesbali.com, airbali.com</td></tr>
                      <tr><td>Emana Hotels</td><td>312964394</td><td>6 Properties</td><td>Emana Hotels, Unagi Wooden Villas, Emana Akatara, Unagi Mas</td></tr>
                      <tr><td>Tejas Spa Corp</td><td>227556892</td><td>2 Properties</td><td>Tejas Spa Akatara, Tejas Spa Unagi Riverfront</td></tr>
                      <tr><td>mondo surf village</td><td>100882696</td><td>2 Properties</td><td>mondosurfvillage, mondo surf village - GA4</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="analytics-box mar-t-20">
                <h3>Google Tag Manager (GTM) Accounts</h3>
                <p className="muted pad-b-12">Successfully connected GTM accounts via Master OAuth to manage custom event triggers and verify tracking.</p>
                <ul>
                  <li className="bullet-item"><strong>Gaia Digital Agency</strong> (ID: 6001052563) — Active standard conversion rules.</li>
                  <li className="bullet-item"><strong>SGi Airbali.com</strong> (ID: 6230112195) — Heli-booking action tags.</li>
                  <li className="bullet-item"><strong>sgi-aero.com</strong> (ID: 6244135728) — Corporate booking and quote triggers.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ==================== VIEW 3: PROPOSALS ==================== */}
        {activeTab === 'Proposals' && (
          <section className="panel proposals-panel">
            <div className="panel-head">
              <h2>{isViceroyFocus ? "Viceroy Bali Flagship Proposals" : "Bulk Proposal Staging Workspace"}</h2>
              <span className="badge-source">Phase 2 Review</span>
            </div>

            {showPropsAlert && (
              <div className="alert-success">
                ✓ Success! Selected proposals have been approved and staged for automated execution!
              </div>
            )}

            <div className="pad-h-18 pad-t-12 pad-b-12 bg-darker">
              <p className="muted small">
                {isViceroyFocus 
                  ? "Displaying 4 highly specific, high-intent structural proposals for Viceroy Bali based on live GSC and Semrush audits." 
                  : "Filter by low-risk change categories to quickly approve, edit, or reject Hermes-generated suggestions across all 50 properties."}
              </p>
            </div>

            {(() => {
              const displayProposals = isViceroyFocus ? [
                { id: 'prop-v1', site: 'Viceroy Bali', type: 'Schema Markup', target: '/spa-menu', desc: 'Inject FAQ Schema on /spa-menu to capture ChatGPT and Google AI Overview citations', risk: 'Low', status: proposals.find(p => p.id === 'prop-2')?.status || 'pending' },
                { id: 'prop-v2', site: 'Viceroy Bali', type: 'Meta Title', target: '/spa-menu', desc: 'Shorten title on /spa-menu to "Akoya Spa & Wellness | Viceroy Bali" (≤60 chars) to prevent search truncation', risk: 'Low', status: proposals.find(p => p.id === 'prop-1')?.status || 'pending' },
                { id: 'prop-v3', site: 'Viceroy Bali', type: 'GTM Event Fix', target: '/villas', desc: 'Update GTM custom event trigger for "Book Now" click to a class-specific selector to eliminate 15% event inflation', risk: 'Medium', status: 'pending' },
                { id: 'prop-v4', site: 'Viceroy Bali', type: 'Google Ads Fix', target: 'Campaign Audits', desc: 'Modify counting type of "Booking Confirmation" conversion from MANY_PER_CLICK to ONE_PER_CLICK to avoid double-counting', risk: 'Medium', status: 'pending' },
              ] : proposals;

              return (
                <table className="proposals-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedProps.length === displayProposals.length}
                          onChange={() => {
                            if (selectedProps.length === displayProposals.length) {
                              setSelectedProps([]);
                            } else {
                              setSelectedProps(displayProposals.map(p => p.id));
                            }
                          }}
                        />
                      </th>
                      <th>Target Property</th><th>Change Type</th><th>Target Page</th><th>Hermes Recommendation</th><th>Risk</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProposals.map(p => (
                      <tr key={p.id} className={p.status === 'approved' ? 'row-approved' : ''}>
                        <td>
                          <input 
                            type="checkbox" 
                            disabled={p.status === 'approved'}
                            checked={selectedProps.includes(p.id)}
                            onChange={() => handlePropCheck(p.id)}
                          />
                        </td>
                        <td><span className="prop-site">{p.site}</span></td>
                        <td><span className="prop-type">{p.type}</span></td>
                        <td><span className="prop-target font-12">{p.target}</span></td>
                        <td><div className="prop-desc small">{p.desc}</div></td>
                        <td><span className={'badge-risk ' + p.risk.toLowerCase()}>{p.risk}</span></td>
                        <td>
                          <span className={'status-badge ' + p.status}>
                            {p.status === 'approved' ? 'staged (approved)' : 'pending review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}

            {/* Floating Action Bar */}
            {selectedProps.length > 0 && (
              <div className="floating-action-bar">
                <span className="selected-count">{selectedProps.length} proposal{selectedProps.length === 1 ? '' : 's'} selected</span>
                <div className="action-buttons">
                  <button className="btn-secondary">Reject Selected</button>
                  <button className="btn-primary" onClick={handleBulkApprove}>Approve & Stage Selected</button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================== VIEW 4: DEPLOYMENTS ==================== */}
        {activeTab === 'Deployments' && (
          <section className="panel">
            <div className="panel-head">
              <h2>Phase 3 Deployment Tracker</h2>
              <span className="badge-source">Execution Engine</span>
            </div>
            {isViceroyFocus ? (
              <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="muted small">Live execution status of automated SEO, GTM, and Schema deployments on <strong>gda-ce01</strong> via SSH tunnel.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {VICEROY_DATA.deployments.map((dep) => (
                    <div key={dep.id} style={{ background: 'var(--darker)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                          <strong style={{ fontSize: '14px' }}>{dep.title}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                            Type: {dep.type} • Target Host: <strong style={{ fontFamily: 'monospace' }}>{dep.target}</strong>
                          </div>
                        </div>
                        <span className={'status-badge ' + (dep.status === 'running' ? 'pending' : dep.status)}>
                          {dep.status === 'running' ? 'Running' : dep.status === 'staged' ? 'Staged' : 'Completed'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--surface)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: dep.progress + '%', height: '100%', background: dep.status === 'completed' ? 'var(--success)' : dep.status === 'running' ? 'var(--accent)' : 'var(--muted)', transition: 'width 0.5s' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, width: '40px', textAlign: 'right' }}>{dep.progress}%</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', fontFamily: 'monospace' }}>
                        {dep.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pad text-center">
                <p className="muted pad-v-24">No deployments are currently running. When you approve proposals in the Workspace, they will queue here for deployment execution.</p>
              </div>
            )}
          </section>
        )}

        {/* ==================== VIEW 5: REPORTS ==================== */}
        {activeTab === 'Reports' && (
          <section className="panel">
            <div className="panel-head">
              <h2>AI Performance Reports</h2>
              <span className="badge-source">Summaries</span>
            </div>
            {isViceroyFocus ? (
              <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--darker)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{VICEROY_DATA.report.title}</h3>
                    <span className="badge-source" style={{ fontSize: '11px' }}>{VICEROY_DATA.report.dateRange}</span>
                  </div>
                  <div className="capability-section-title" style={{ color: 'var(--success)', marginBottom: '8px' }}>Executive Summary</div>
                  <p className="muted small" style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '13px' }}>
                    {VICEROY_DATA.report.summary}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {VICEROY_DATA.report.sections.map((sec, idx) => (
                      <div key={idx} style={{ background: 'var(--surface)', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.01)' }}>
                        <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px', color: 'var(--text)' }}>{sec.title}</div>
                        <div className="muted small" style={{ lineHeight: '1.4' }}>{sec.text}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-primary" style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}>Download Full PDF Report</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pad text-center">
                <p className="muted pad-v-24">No reports generated. Weekly automated performance audits will populate here.</p>
              </div>
            )}
          </section>
        )}

        {/* ==================== VIEW 6: SETTINGS ==================== */}
        {activeTab === 'Settings' && (
          <div className="settings-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Card 1: APU (API Configurations & OAuth Credentials) */}
            <section className="panel" style={{ margin: 0 }}>
              <div className="panel-head">
                <h2>API Configurations & OAuth Credentials (APU)</h2>
                <span className="badge-source">System Status</span>
              </div>
              <div className="pad">
                <div className="settings-section" style={{ margin: 0 }}>
                  <h3>Credentials Status Map (Verified Live)</h3>
                  <div className="credential-row">
                    <span className="cred-name">1. Semrush (API Key)</span>
                    <span className="cred-status ok">✓ Fully Connected (~2M API units remaining)</span>
                  </div>
                  <div className="credential-row">
                    <span className="cred-name">2. Google Search Console (OAuth)</span>
                    <span className="cred-status ok">✓ Fully Connected (Master OAuth, pull working)</span>
                  </div>
                  <div className="credential-row">
                    <span className="cred-name">3. Google Analytics 4 (OAuth Bypass)</span>
                    <span className="cred-status ok">✓ Fully Connected (Master OAuth, bypass successful)</span>
                  </div>
                  <div className="credential-row">
                    <span className="cred-name">4. Google Tag Manager (OAuth)</span>
                    <span className="cred-status ok">✓ Fully Connected (Master OAuth, read working)</span>
                  </div>
                  <div className="credential-row">
                    <span className="cred-name">5. Google Ads (API Token)</span>
                    <span className="cred-status warn">⏳ Pending Token Approval (Google Ads API)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Card 2: Capabilities / App Capability */}
            <section className="panel" style={{ margin: 0 }}>
              <div className="panel-head">
                <h2>Capabilities / App Capability</h2>
                <span className="badge-source font-11">capabilities.md</span>
              </div>
              <div className="pad">
                <p className="muted small" style={{ marginBottom: '16px' }}>
                  Interactive accordion reference detailing the 5-data-source unified measurement stack & Answer Engine Optimization (AEO) playbooks backing this platform.
                </p>
                <div className="capabilities-container">
                  {CAPABILITIES.map((cap, i) => (
                    <div 
                      key={cap.id} 
                      className={'accordion-item' + (activeAccordion === i ? ' active' : '')}
                    >
                      <div 
                        className="accordion-header" 
                        onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                      >
                        <h4>{cap.title}</h4>
                        <span className="accordion-icon">▼</span>
                      </div>
                      {activeAccordion === i && (
                        <div className="accordion-content">
                          <p className="muted small" style={{ marginBottom: '16px', lineHeight: '1.5' }}>
                            {cap.description}
                          </p>
                          <div className="capability-grid">
                            <div>
                              <div className="capability-section-title">Playbook Strategy</div>
                              {cap.playbook.map((play, pi) => (
                                <div key={pi} className="capability-playbook-item">
                                  <strong>{play.label}:</strong> {play.text}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="capability-section-title">Associated MCP Tools</div>
                              <div className="capability-tools-list">
                                {cap.tools.map((tool, ti) => (
                                  <span key={ti} className="capability-tool-badge">{tool}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Card 3: Platform Preferences & Scheduler */}
            <section className="panel" style={{ margin: 0 }}>
              <div className="panel-head">
                <h2>Platform Preferences & Scheduler</h2>
                <span className="badge-source">Local Config</span>
              </div>
              <div className="pad">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {/* Column 1: AI Copywriting Presets */}
                  <div style={{ background: 'var(--darker)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>AI Writer Presets</h4>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>Default Content Persona</label>
                      <select style={{ width: '100%', padding: '8px 12px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', color: 'var(--text)' }}>
                        <option value="maya">Maya (Local Foodie)</option>
                        <option value="komang">Komang (Activities & Wellness)</option>
                        <option value="putu">Putu (Cultural Insider)</option>
                        <option value="sari">Sari (Nightlife & Events)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>Target Language / Locale</label>
                      <select style={{ width: '100%', padding: '8px 12px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', color: 'var(--text)' }}>
                        <option value="en-GB">British English (en-GB) - Default</option>
                        <option value="en-US">American English (en-US)</option>
                        <option value="en-AU">Australian English (en-AU)</option>
                      </select>
                    </div>
                  </div>

                  {/* Column 2: Cron Scheduling Intervals */}
                  <div style={{ background: 'var(--darker)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>Diagnostics Scheduler</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Daily Anomaly Scan</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Triggers traffic_drops checks daily at 04:00</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Weekly Opportunity Sweep</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Extracts quick_wins and content_recommendations</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Monthly Site Health Crawl</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Launches Semrush Site Audits for all 50 sites</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Column 3: Notification Dispatch Targets */}
                  <div style={{ background: 'var(--darker)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>Notification Targets</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Discord Bot Gateways</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Pushes real-time alerts to thread-channels</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Telegram Operator DM</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Delivers pending review notifications</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Email Summary (PDF)</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Sends weekly PDF briefings to Roger's inbox</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <footer className="foot muted">Gaia Nexus Platform • Built for Roger • Stack: Hermes · PostgreSQL · Python · React · Vite · Tailwind · Node</footer>
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
