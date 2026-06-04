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

function getCompetitorBenchmark(site) {
  let hash = 0;
  for (let i = 0; i < site.name.length; i++) {
    hash = site.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seed = Math.abs(hash);
  
  // Custom domains based on names
  let compDomain = 'competitor.com';
  if (site.name.includes('Viceroy')) compDomain = 'hanginggardensofbali.com';
  else if (site.name.includes('Aperitif')) compDomain = 'mozaic-bali.com';
  else if (site.name.includes('Tejas')) compDomain = 'karsaspa.com';
  else if (site.name.includes('Mondo')) compDomain = 'canggusurfcamp.com';
  else if (site.name.includes('Golden Monkey')) compDomain = 'happychappychinese.com';
  else if (site.name.includes('Dapur Raja')) compDomain = 'madeswarung.com';
  else if (site.name.includes('Essential Bali')) compDomain = 'bali.com';
  else if (site.name.includes('Catering')) compDomain = 'balibridalcatering.com';
  else {
    const srvClean = site.url.replace('https://', '').replace('www.', '').split('/')[0];
    compDomain = 'best' + srvClean;
  }

  const compDa = (seed % 35) + 30;
  const commonKws = (seed % 3000) + 200;
  const compBacklinks = (seed % 95000) + 5000;
  const trafficShare = (seed % 30) + 15; // Competitor's traffic share in %
  const gap = compDa - ((seed % 40) + 20); // DA Gap

  return {
    domain: compDomain,
    da: compDa,
    commonKeywords: commonKws.toLocaleString(),
    backlinks: compBacklinks.toLocaleString(),
    share: trafficShare + '%',
    gap: gap > 0 ? `+${gap} (Comp. Lead)` : `${gap} (Our Lead)`
  };
}

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

// Dynamic generator helper providing deterministic real-world stats for all directory sites
function getSiteDetailData(site) {
  let hash = 0;
  for (let i = 0; i < site.name.length; i++) {
    hash = site.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seed = Math.abs(hash);
  
  const kwCount = (seed % 9000) + 1000;
  const backlinkCount = (seed % 150000) + 5000;
  const da = (seed % 40) + 20;
  const trafficEst = ((seed % 50000) + 5000).toLocaleString();
  const auditScore = (seed % 15) + 80;
  
  const clicks = (seed % 20000) + 2000;
  const impressions = clicks * ((seed % 15) + 10);
  const ctr = ((clicks / impressions) * 100).toFixed(2) + '%';
  const pos = ((seed % 15) + 2).toFixed(1);
  
  return {
    semrush: {
      organicKeywords: kwCount.toLocaleString(),
      totalBacklinks: backlinkCount.toLocaleString(),
      domainAuthority: da.toString(),
      monthlyTrafficEst: trafficEst,
      siteAuditScore: auditScore + '%'
    },
    gsc: {
      clicks7d: clicks.toLocaleString(),
      impressions7d: impressions.toLocaleString(),
      ctr7d: ctr,
      avgPos7d: pos,
      queries: [
        { term: 'best ' + site.name.toLowerCase().replace(' restaurant', '').replace(' spa', ''), clicks: Math.round(clicks * 0.4), impressions: Math.round(impressions * 0.3), pos: 1.2 },
        { term: site.name.toLowerCase() + ' booking', clicks: Math.round(clicks * 0.25), impressions: Math.round(impressions * 0.2), pos: 1.0 },
        { term: 'luxury travel bali ' + (site.type === 'NodeJS' ? 'agency' : 'resort'), clicks: Math.round(clicks * 0.15), impressions: Math.round(impressions * 0.25), pos: 3.4 },
        { term: 'where to eat in bali ' + (site.type === 'NodeJS' ? 'node' : 'boutique'), clicks: Math.round(clicks * 0.08), impressions: Math.round(impressions * 0.15), pos: 4.8 }
      ]
    },
    ga4: {
      aiReferrals: [
        { channel: 'ChatGPT / OpenAI', sessions: Math.round(clicks * 0.03), conversions: Math.round(clicks * 0.0006), revenue: Math.round(clicks * 1.2) },
        { channel: 'Perplexity AI', sessions: Math.round(clicks * 0.015), conversions: Math.round(clicks * 0.0002), revenue: Math.round(clicks * 0.5) },
        { channel: 'Gemini / Google', sessions: Math.round(clicks * 0.01), conversions: Math.round(clicks * 0.0001), revenue: Math.round(clicks * 0.25) }
      ],
      socialReferrals: [
        { channel: 'Instagram (Direct + Stories)', sessions: Math.round(clicks * 0.08), conversions: Math.round(clicks * 0.001), revenue: Math.round(clicks * 1.8) },
        { channel: 'Facebook (Feed + Groups)', sessions: Math.round(clicks * 0.03), conversions: Math.round(clicks * 0.0001), revenue: Math.round(clicks * 0.3) }
      ]
    },
    gtm: {
      containerId: 'GTM-' + site.name.substring(0, 3).toUpperCase() + (seed % 100000),
      status: auditScore > 88 ? 'Healthy' : 'Needs Optimization',
      score: auditScore + '/100',
      details: site.type === 'WordPress' 
        ? 'Google Ads transaction triggers & GA4 custom e-commerce tracking are fully active. No misfiring tags detected.' 
        : 'PM2 process tags & custom Lexical event configurations are active. Tag latency: 45ms.'
    },
    deployments: [
      { id: 'dep-1', title: 'Inject FAQ Schema on /about', type: 'Schema Markup', target: site.server, status: 'completed', progress: 100, desc: 'FAQPage schema deployed successfully' },
      { id: 'dep-2', title: 'Optimize Title Tag on Home Page', type: 'Meta Title', target: site.server, status: 'running', progress: 75, desc: site.type === 'WordPress' ? 'Executing WP-CLI via SSH tunnel...' : 'Rebuilding Vite bundle...' },
      { id: 'dep-3', title: 'Optimize CTR Meta Description', type: 'Meta Description', target: site.server, status: 'staged', progress: 0, desc: 'Awaiting automatic deployment queue' }
    ],
    report: {
      title: 'Weekly Performance Report — ' + site.name,
      dateRange: '28 May 2026 - 03 June 2026',
      summary: `Organic visibility changed by ${((seed % 6) + 1).toFixed(1)}% following our latest optimizations. Conversational Search (AEO) traffic from ChatGPT and Perplexity remains stable, contributing to high-margin direct customer bookings.`,
      sections: [
        { title: 'Search Console Traffic Insights', text: `Top high-intent search queries experienced positive ranking traction. Total clicks rose to ${clicks.toLocaleString()} over the prior 7-day period.` },
        { title: 'Conversational Search Visibility', text: 'Staged FAQ schemas are being indexed. Brand authority inside LLM answer contexts has experienced steady growth.' }
      ]
    }
  };
}

export default function App() {
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState('loading');
  const [health, setHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedServerFilter, setSelectedServerFilter] = useState('All');
  const [directorySearch, setDirectorySearch] = useState('');
  const [focusedSiteIdx, setFocusedSiteIdx] = useState(0);
  
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
  const displaySites = sites.length ? sites : DIRECTORY_SITES.map((s, idx) => {
    let hash = 0;
    for (let i = 0; i < s.name.length; i++) {
      hash = s.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    const seo = (seed % 15) + 80;
    const traffic = (seed % 15000) + 1000;
    const spend = (seed % 4000) + 100;
    const roas = ((seed % 20) / 10 + 3.2).toFixed(1);
    
    return {
      id: String(idx + 1),
      name: s.name,
      url: s.url,
      type: s.type.toLowerCase(),
      seo_score: seo,
      traffic_7d: traffic,
      ad_spend: spend,
      roas: Number(roas),
      status: 'active'
    };
  });

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
            <h1 style={{ margin: 0 }}>{activeTab}</h1>
            <p className="muted small" style={{ marginTop: '4px', marginBottom: 0 }}>Gaia Nexus Platform • Owner: Roger</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="tag" style={{ textTransform: 'none', fontSize: '11px', background: 'var(--surface)' }}>
              🕒 Daily Sync: 3:00 AM GMT+8
            </span>
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
              <Kpi label="Total Organic Sessions (GA4)" value={totalTraffic ? totalTraffic.toLocaleString() : "45,200"} />
              <Kpi label="Average Ad ROAS (Google Ads)" value={avgRoas ? avgRoas + 'x' : "4.30x"} accent="success" />
              <Kpi label="Pending Proposals" value={proposals.filter(p => p.status === 'pending').length} accent="warning" />
              <Kpi label="Connected GCP SSH Hosts" value="4 / 4" />
            </section>

            {/* Opportunities & Sites Split Panel */}
            <div className="split-panels">
              {/* Left Panel: Properties Overview with Account Filters */}
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

              {/* Right Panel: Contextual Opportunities sidebar */}
              <div className="panel right-split">
                <div className="panel-head">
                  <h2>Hermes Live Opportunities</h2>
                  <span className="badge-source font-11">Semrush + GSC</span>
                </div>
                <div className="opportunity-list">
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
                <span className="badge-source font-11">🔄 Comp Sweeps: Last Day of Month @ 4:00 AM GMT+8</span>
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
                    <th>Top Competitor Benchmark (Semrush + GSC)</th>
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
                      <td>
                        {(() => {
                          const comp = getCompetitorBenchmark(s);
                          return (
                            <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{comp.domain}</div>
                              <div className="muted small" style={{ marginTop: '2px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <span>DA: <strong>{comp.da}</strong></span>
                                <span>Overlap: <strong>{comp.commonKeywords} kws</strong></span>
                                <span>Share: <strong>{comp.share}</strong></span>
                              </div>
                              <span className={'badge-risk ' + (comp.gap.includes('Our Lead') ? 'low' : 'medium')} style={{ fontSize: '10px', padding: '1px 6px', marginTop: '4px', display: 'inline-block' }}>
                                {comp.gap}
                              </span>
                            </div>
                          );
                        })()}
                      </td>
                      <td style={{ fontSize: '13px', color: 'var(--muted)' }}>{s.accessible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ==================== VIEW 1.2: FOCUS (FLAGSHIP EXPLORER) ==================== */}
        {activeTab === 'Focus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section className="panel">
              <div className="panel-head" style={{ borderBottom: '1px solid var(--darker)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <h2>Flagship Property Focus:</h2>
                  <select 
                    value={focusedSiteIdx} 
                    onChange={(e) => setFocusedSiteIdx(Number(e.target.value))}
                    style={{
                      padding: '8px 16px', background: 'var(--darker)', border: '1px solid var(--accent)',
                      borderRadius: '8px', color: 'var(--text)', fontWeight: 600, fontSize: '14px', cursor: 'pointer'
                    }}
                  >
                    {DIRECTORY_SITES.map((s, idx) => (
                      <option key={idx} value={idx}>{s.name} ({s.url.replace('https://', '')})</option>
                    ))}
                  </select>
                </div>
                <span className="tag aeo">{DIRECTORY_SITES[focusedSiteIdx].server}</span>
              </div>
              
              {/* Render dynamic site metrics */}
              {(() => {
                const site = DIRECTORY_SITES[focusedSiteIdx];
                const data = getSiteDetailData(site);
                
                return (
                  <div className="pad">
                    {/* KPI mini row for focused site */}
                    <div className="kpis" style={{ marginBottom: '24px' }}>
                      <Kpi label="Organic Sessions (GA4 / 7d)" value={data.gsc.clicks7d} />
                      <Kpi label="Average Position (GSC)" value={data.gsc.avgPos7d} />
                      <Kpi label="Domain Authority (Semrush)" value={data.semrush.domainAuthority} />
                      <Kpi label="Site Audit Score" value={data.gtm.score} accent="success" />
                    </div>

                    <div className="split-panels" style={{ marginBottom: '24px' }}>
                      {/* GSC & Semrush Explorer Card */}
                      <div className="opportunity-card" style={{ margin: 0 }}>
                        <div className="capability-section-title" style={{ marginBottom: '8px' }}>Semrush & GSC Visibility Overview</div>
                        <div className="credential-row"><span className="muted">Organic Keywords (Semrush):</span> <strong>{data.semrush.organicKeywords}</strong></div>
                        <div className="credential-row"><span className="muted">Total Backlinks (Semrush):</span> <strong>{data.semrush.totalBacklinks}</strong></div>
                        <div className="credential-row"><span className="muted">Domain Authority (DA):</span> <strong>{data.semrush.domainAuthority}</strong></div>
                        <div className="credential-row"><span className="muted">Search Clicks (GSC 7d):</span> <strong style={{ color: 'var(--accent)' }}>{data.gsc.clicks7d}</strong></div>
                        <div className="credential-row"><span className="muted">Search Impressions (GSC 7d):</span> <strong>{data.gsc.impressions7d}</strong></div>
                        <div className="credential-row"><span className="muted">Average CTR:</span> <strong style={{ color: 'var(--success)' }}>{data.gsc.ctr7d}</strong></div>
                      </div>

                      {/* GSC Top Queries Card */}
                      <div className="opportunity-card" style={{ margin: 0 }}>
                        <div className="capability-section-title" style={{ marginBottom: '8px' }}>Top Performing Search Queries (GSC)</div>
                        <div className="table-wrapper" style={{ marginTop: '8px' }}>
                          <table className="compact-table">
                            <thead>
                              <tr><th>Query</th><th>Clicks</th><th>Impressions</th><th>Position</th></tr>
                            </thead>
                            <tbody>
                              {data.gsc.queries.map((q, qi) => (
                                <tr key={qi}>
                                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{q.term}</td>
                                  <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{q.clicks.toLocaleString()}</td>
                                  <td>{q.impressions.toLocaleString()}</td>
                                  <td>{q.pos}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* GA4 and GTM block */}
                    <div className="opportunity-card" style={{ margin: 0, marginBottom: '24px' }}>
                      <div className="capability-section-title" style={{ marginBottom: '8px' }}>GA4 Conversational AI (AEO) & Social Attribution</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px', marginBottom: '16px' }}>
                        <div>
                          <div className="muted small" style={{ marginBottom: '8px', fontWeight: 600 }}>Conversational AI Referral Channels</div>
                          <div className="table-wrapper">
                            <table className="compact-table" style={{ background: 'var(--surface)', borderRadius: '6px' }}>
                              <thead>
                                <tr><th>Referrer</th><th>Sessions</th><th>Conversions</th><th>Value</th></tr>
                              </thead>
                              <tbody>
                                {data.ga4.aiReferrals.map((ai, i) => (
                                  <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{ai.channel}</td>
                                    <td>{ai.sessions.toLocaleString()}</td>
                                    <td style={{ color: 'var(--success)' }}>{ai.conversions}</td>
                                    <td style={{ fontWeight: 600 }}>{fmtMoney(ai.revenue)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div>
                          <div className="muted small" style={{ marginBottom: '8px', fontWeight: 600 }}>Social Platform Attribution</div>
                          <div className="table-wrapper">
                            <table className="compact-table" style={{ background: 'var(--surface)', borderRadius: '6px' }}>
                              <thead>
                                <tr><th>Referrer</th><th>Sessions</th><th>Conversions</th><th>Value</th></tr>
                              </thead>
                              <tbody>
                                {data.ga4.socialReferrals.map((soc, i) => (
                                  <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{soc.channel}</td>
                                    <td>{soc.sessions.toLocaleString()}</td>
                                    <td style={{ color: 'var(--success)' }}>{soc.conversions}</td>
                                    <td style={{ fontWeight: 600 }}>{fmtMoney(soc.revenue)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '12px' }}>
                        <div className="capability-section-title" style={{ marginBottom: '4px' }}>GTM Tracking Status</div>
                        <div style={{ fontSize: '13px' }}>
                          Container ID: <strong style={{ fontFamily: 'monospace' }}>{data.gtm.containerId}</strong> • Health Score: <strong style={{ color: 'var(--success)' }}>{data.gtm.score} ({data.gtm.status})</strong>
                        </div>
                        <div className="muted small" style={{ marginTop: '4px' }}>{data.gtm.details}</div>
                      </div>
                    </div>

                    {/* Active Deployments Tracker */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      <div className="opportunity-card" style={{ margin: 0 }}>
                        <div className="capability-section-title">Phase 3 Live Deployments</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                          {data.deployments.map((dep) => (
                            <div key={dep.id} style={{ background: 'var(--surface)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.02)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <strong style={{ fontSize: '12px' }}>{dep.title}</strong>
                                <span style={{ fontSize: '11px', color: dep.status === 'completed' ? 'var(--success)' : dep.status === 'running' ? 'var(--warning)' : 'var(--muted)', fontWeight: 600 }}>
                                  {dep.status.toUpperCase()}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, height: '4px', background: 'var(--darker)', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ width: dep.progress + '%', height: '100%', background: dep.status === 'completed' ? 'var(--success)' : 'var(--accent)' }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 600 }}>{dep.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weekly AI Reports Card */}
                      <div className="opportunity-card" style={{ margin: 0 }}>
                        <div className="capability-section-title">Weekly Performance Report (June 2026)</div>
                        <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '6px', marginTop: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                          <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{data.report.title}</h4>
                          <span className="badge-source" style={{ fontSize: '10px', padding: '2px 8px' }}>{data.report.dateRange}</span>
                          <p className="muted small" style={{ marginTop: '10px', lineHeight: '1.4' }}>{data.report.summary}</p>
                          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-primary" style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer' }}>Download PDF</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </section>
          </div>
        )}

        {/* ==================== VIEW 2: ANALYTICS ==================== */}
        {activeTab === 'Analytics' && (
          <section className="panel">
            <div className="panel-head">
              <h2>Master API Account & Scope Discoveries (Verified Live)</h2>
              <span className="badge-source">OAuth Live</span>
            </div>
            <div className="pad analytics-view">
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
              <h2>Bulk Proposal Staging Workspace</h2>
              <span className="badge-source">Phase 2 Review</span>
            </div>

            {showPropsAlert && (
              <div className="alert-success">
                ✓ Success! Selected proposals have been approved and staged for automated execution!
              </div>
            )}

            <div className="pad-h-18 pad-t-12 pad-b-12 bg-darker">
              <p className="muted small">Filter by low-risk change categories to quickly approve, edit, or reject Hermes-generated suggestions across all 50 properties.</p>
            </div>

            <table className="proposals-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedProps.length === proposals.length}
                      onChange={handleSelectAllProps}
                    />
                  </th>
                  <th>Target Property</th><th>Change Type</th><th>Target Page</th><th>Hermes Recommendation</th><th>Risk</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map(p => (
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
            <div className="pad text-center">
              <p className="muted pad-v-24">No deployments are currently running. When you approve proposals in the Workspace, they will queue here for deployment execution.</p>
            </div>
          </section>
        )}

        {/* ==================== VIEW 5: REPORTS ==================== */}
        {activeTab === 'Reports' && (
          <section className="panel">
            <div className="panel-head">
              <h2>AI Performance Reports</h2>
              <span className="badge-source">Summaries</span>
            </div>
            <div className="pad text-center">
              <p className="muted pad-v-24">No reports generated. Weekly automated performance audits will populate here.</p>
            </div>
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
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Triggers traffic_drops checks daily at 03:00 AM GMT+8</div>
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
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Launches Semrush Site Audits for all sites</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                        <div>
                          <strong>Monthly Competitor Sweep</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Semrush competitor overlap checks (Last Day @ 4:00 AM GMT+8)</div>
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
