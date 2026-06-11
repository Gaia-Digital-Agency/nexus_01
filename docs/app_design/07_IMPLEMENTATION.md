# Gaia Nexus: Implementation Guide

## Overview

This document covers the technical implementation of the Hermes agent backend: the Python data pipeline, API integrations for all five data sources, Claude API integration, and deployment automation.

---

## Python Environment Setup

```bash
cd hermes/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**requirements.txt:**
```
anthropic>=0.25.0
google-analytics-data>=0.18.0
google-auth>=2.29.0
google-ads>=23.0.0
semrush-client>=1.0.0
paramiko>=3.4.0
psycopg2-binary>=2.9.9
python-dotenv>=1.0.0
schedule>=1.2.0
requests>=2.31.0
google-cloud-secret-manager>=2.20.0
```

---

## Configuration

```python
# hermes/config/settings.py
import os
from google.cloud import secretmanager

def get_secret(secret_id: str) -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{os.environ['GCP_PROJECT_ID']}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

CLAUDE_API_KEY = get_secret("claude-api-key")
SEMRUSH_API_KEY = get_secret("semrush-api-key")
DB_PASSWORD = get_secret("nexus-db-password")

DATABASE_URL = (
    f"postgresql://nexus_user:{DB_PASSWORD}@"
    f"{os.environ['DB_HOST']}/gaia_nexus"
)
```

---

## Data Collectors

### Google Analytics 4

```python
# hermes/collectors/ga4_collector.py
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Metric, Dimension

class GA4Collector:
    def __init__(self, property_id: str, credentials):
        self.property_id = property_id
        self.client = BetaAnalyticsDataClient(credentials=credentials)

    def collect(self, start_date: str, end_date: str) -> dict:
        request = RunReportRequest(
            property=f"properties/{self.property_id}",
            date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
            metrics=[
                Metric(name="sessions"),
                Metric(name="totalUsers"),
                Metric(name="conversions"),
                Metric(name="totalRevenue"),
            ],
            dimensions=[Dimension(name="date")],
        )
        response = self.client.run_report(request)
        return self._parse_response(response)

    def _parse_response(self, response) -> dict:
        rows = []
        for row in response.rows:
            rows.append({
                "date": row.dimension_values[0].value,
                "sessions": int(row.metric_values[0].value),
                "users": int(row.metric_values[1].value),
                "conversions": float(row.metric_values[2].value),
                "revenue": float(row.metric_values[3].value),
            })
        return {"source": "ga4", "data": rows}
```

### Google Search Console

```python
# hermes/collectors/gsc_collector.py
from googleapiclient.discovery import build

class GSCCollector:
    def __init__(self, site_url: str, credentials):
        self.site_url = site_url
        self.service = build("searchconsole", "v1", credentials=credentials)

    def collect(self, start_date: str, end_date: str) -> dict:
        body = {
            "startDate": start_date,
            "endDate": end_date,
            "dimensions": ["query", "page"],
            "rowLimit": 1000,
        }
        response = self.service.searchanalytics().query(
            siteUrl=self.site_url, body=body
        ).execute()
        return {"source": "gsc", "data": response.get("rows", [])}
```

### Semrush

```python
# hermes/collectors/semrush_collector.py
import requests

class SemrushCollector:
    BASE_URL = "https://api.semrush.com"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def collect_domain_overview(self, domain: str) -> dict:
        params = {
            "type": "domain_ranks",
            "key": self.api_key,
            "export_columns": "Dn,Rk,Or,Ot,Oc,Ad,At,Ac",
            "domain": domain,
            "database": "us",
        }
        response = requests.get(self.BASE_URL, params=params)
        return {"source": "semrush", "domain": domain, "data": response.text}

    def collect_keywords(self, domain: str) -> dict:
        params = {
            "type": "domain_organic",
            "key": self.api_key,
            "export_columns": "Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td",
            "domain": domain,
            "database": "us",
            "display_limit": 100,
        }
        response = requests.get(self.BASE_URL, params=params)
        return {"source": "semrush_keywords", "domain": domain, "data": response.text}
```

### Google Ads

```python
# hermes/collectors/google_ads_collector.py
from google.ads.googleads.client import GoogleAdsClient

class GoogleAdsCollector:
    def __init__(self, customer_id: str, credentials_path: str):
        self.customer_id = customer_id
        self.client = GoogleAdsClient.load_from_storage(credentials_path)

    def collect_campaign_performance(self) -> dict:
        ga_service = self.client.get_service("GoogleAdsService")
        query = """
            SELECT
              campaign.id,
              campaign.name,
              campaign.status,
              metrics.impressions,
              metrics.clicks,
              metrics.cost_micros,
              metrics.conversions,
              metrics.all_conversions_value
            FROM campaign
            WHERE segments.date DURING LAST_7_DAYS
        """
        response = ga_service.search(customer_id=self.customer_id, query=query)
        results = []
        for row in response:
            results.append({
                "campaign_id": row.campaign.id,
                "name": row.campaign.name,
                "impressions": row.metrics.impressions,
                "clicks": row.metrics.clicks,
                "cost": row.metrics.cost_micros / 1_000_000,
                "conversions": row.metrics.conversions,
                "conversion_value": row.metrics.all_conversions_value,
            })
        return {"source": "google_ads", "data": results}
```

---

## Claude API Integration

```python
# hermes/agent/claude_client.py
import anthropic
from config.settings import CLAUDE_API_KEY

class ClaudeClient:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)
        self.model = "claude-opus-4-6-20251101"

    def analyze_site_metrics(self, site: dict, metrics: dict) -> dict:
        prompt = f"""
You are Hermes, an AI SEO and advertising optimization agent.

Analyze the following metrics for site: {site['name']} ({site['url']})

Metrics Data:
{metrics}

Generate optimization proposals. Return a JSON array of proposals. Each proposal must include:
- type: one of [ad_copy, blog, seo_fix, image, campaign]
- title: short description
- content: the actual proposal content or instructions
- reasoning: why this change will improve performance
- priority: high | medium | low

Return ONLY valid JSON. No preamble or markdown.
        """
        message = self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text

    def generate_blog_content(self, topic: str, keywords: list, site_context: dict) -> str:
        prompt = f"""
Write a well-structured SEO blog article for {site_context['name']}.

Topic: {topic}
Target Keywords: {', '.join(keywords)}
Site Context: {site_context.get('description', '')}

Requirements:
- 800-1200 words
- Include target keywords naturally
- Use H2 and H3 headings
- Include a meta description at the top
- Tone: professional but accessible

Return the article in Markdown format.
        """
        message = self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text
```

---

## Proposal Engine

```python
# hermes/agent/proposal_engine.py
import json
from db.connection import get_connection
from agent.claude_client import ClaudeClient

class ProposalEngine:
    def __init__(self):
        self.claude = ClaudeClient()

    def run(self, site: dict, metrics: dict):
        raw = self.claude.analyze_site_metrics(site, metrics)
        proposals = json.loads(raw)
        self._store_proposals(site["id"], proposals)
        return proposals

    def _store_proposals(self, site_id: str, proposals: list):
        conn = get_connection()
        cur = conn.cursor()
        for p in proposals:
            cur.execute("""
                INSERT INTO proposals (site_id, type, status, content, ai_reasoning)
                VALUES (%s, %s, 'pending', %s, %s)
            """, (site_id, p["type"], json.dumps(p["content"]), p["reasoning"]))
        conn.commit()
        cur.close()
        conn.close()
```

---

## Deployment Runner (SSH)

```python
# hermes/agent/deployment_runner.py
import paramiko
from db.connection import get_connection

class DeploymentRunner:
    def __init__(self, ssh_key_path: str):
        self.ssh_key_path = ssh_key_path

    def deploy_wordpress(self, site: dict, proposal: dict):
        ssh = self._connect(site["server_ip"], site["ssh_user"])
        if proposal["type"] == "blog":
            content = proposal["content"]
            cmd = (
                f"wp post create --post_title='{content['title']}' "
                f"--post_content='{content['body']}' --post_status=publish "
                f"--path=/var/www/{site['name']} --allow-root"
            )
            stdin, stdout, stderr = ssh.exec_command(cmd)
        ssh.close()
        self._log_deployment(proposal["id"], site["id"], "completed")

    def deploy_nodejs(self, site: dict, proposal: dict):
        ssh = self._connect(site["server_ip"], site["ssh_user"])
        # Execute deployment via site's internal API or direct file mutation
        cmd = f"curl -X POST http://localhost:{site['port']}/internal/deploy -d '{proposal['content']}'"
        ssh.exec_command(cmd)
        ssh.close()
        self._log_deployment(proposal["id"], site["id"], "completed")

    def _connect(self, host: str, user: str) -> paramiko.SSHClient:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        key = paramiko.Ed25519Key.from_private_key_file(self.ssh_key_path)
        ssh.connect(hostname=host, username=user, pkey=key)
        return ssh

    def _log_deployment(self, proposal_id: str, site_id: str, status: str):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO deployments (proposal_id, site_id, status, deployed_by)
            VALUES (%s, %s, %s, 'hermes')
        """, (proposal_id, site_id, status))
        conn.commit()
        cur.close()
        conn.close()
```

---

## Scheduler

```python
# hermes/scheduler.py
import schedule
import time
from collectors.ga4_collector import GA4Collector
from collectors.semrush_collector import SemrushCollector
from collectors.gsc_collector import GSCCollector
from collectors.google_ads_collector import GoogleAdsCollector
from agent.proposal_engine import ProposalEngine
from db.queries import get_all_sites, store_metrics_snapshot

def daily_pipeline():
    sites = get_all_sites()
    for site in sites:
        metrics = {}
        metrics["semrush"] = SemrushCollector(...).collect_domain_overview(site["url"])
        metrics["ga4"] = GA4Collector(...).collect("7daysAgo", "today")
        metrics["gsc"] = GSCCollector(...).collect("7daysAgo", "today")
        metrics["ads"] = GoogleAdsCollector(...).collect_campaign_performance()
        store_metrics_snapshot(site["id"], metrics)
        ProposalEngine().run(site, metrics)

schedule.every().day.at("02:00").do(daily_pipeline)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(60)
```
