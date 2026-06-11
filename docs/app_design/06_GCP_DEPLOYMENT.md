# Gaia Nexus: GCP Deployment Guide

## Overview

This guide covers provisioning and configuring the three GCP VMs required for Gaia Nexus: the Production VM (WordPress + Node.js sites), the Hermes Agent VM, and the Nexus Platform VM. It assumes familiarity with GCP.

---

## Prerequisites

- GCP project created (`gaia-nexus` or equivalent)
- `gcloud` CLI installed and authenticated
- Domain names configured and pointing to GCP external IPs
- API credentials ready: Semrush, Google APIs (OAuth 2.0), Anthropic Claude API key

---

## VM Provisioning

### 1. Production VM(s) — Sites

```bash
gcloud compute instances create gaia-production-vm \
  --zone=asia-southeast2-a \
  --machine-type=e2-standard-4 \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=100GB \
  --tags=http-server,https-server
```

**Install stack:**
```bash
# NGINX
sudo apt update && sudo apt install -y nginx

# PHP-FPM (WordPress)
sudo apt install -y php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring

# MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Node.js (via NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

# PM2 (Node.js process manager)
npm install -g pm2
```

---

### 2. Hermes Agent VM

```bash
gcloud compute instances create gaia-hermes-vm \
  --zone=asia-southeast2-a \
  --machine-type=e2-standard-2 \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB
```

**Install stack:**
```bash
# Python 3.11+
sudo apt update && sudo apt install -y python3.11 python3-pip python3-venv

# Node.js (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20

# SSH key generation for production VM access
ssh-keygen -t ed25519 -C "hermes-agent" -f ~/.ssh/hermes_key
# Add hermes_key.pub to production VM authorized_keys
```

---

### 3. Nexus Platform VM

```bash
gcloud compute instances create gaia-nexus-vm \
  --zone=asia-southeast2-a \
  --machine-type=e2-standard-2 \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB \
  --tags=http-server,https-server
```

**Install stack:**
```bash
sudo apt update && sudo apt install -y nginx
nvm install 20 && nvm use 20
npm install -g pm2
```

---

## Cloud SQL (PostgreSQL)

```bash
gcloud sql instances create gaia-nexus-db \
  --database-version=POSTGRES_15 \
  --tier=db-n1-standard-2 \
  --region=asia-southeast2 \
  --no-assign-ip \
  --network=default
```

Create database and user:
```sql
CREATE DATABASE gaia_nexus;
CREATE USER nexus_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE gaia_nexus TO nexus_user;
```

---

## NGINX Configuration

### PHP-FPM (WordPress) + Node.js Coexistence

```nginx
# /etc/nginx/sites-available/wordpress-site
server {
    listen 80;
    server_name example-wordpress-site.com;
    root /var/www/example-wordpress-site;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }
}

# /etc/nginx/sites-available/nodejs-site
server {
    listen 80;
    server_name example-nodejs-site.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## GCP Secret Manager

Store all credentials in Secret Manager, not in `.env` files on disk:

```bash
# Store Anthropic API key
echo -n "your-claude-api-key" | \
  gcloud secrets create claude-api-key --data-file=-

# Store Semrush API key
echo -n "your-semrush-key" | \
  gcloud secrets create semrush-api-key --data-file=-

# Store DB password
echo -n "your-db-password" | \
  gcloud secrets create nexus-db-password --data-file=-
```

Access in Python/Node.js at runtime using the Secret Manager SDK.

---

## Firewall Rules

```bash
# Allow HTTP and HTTPS
gcloud compute firewall-rules create allow-http-https \
  --allow tcp:80,tcp:443 \
  --target-tags http-server,https-server

# Internal VM communication only
gcloud compute firewall-rules create allow-internal \
  --allow all \
  --source-ranges 10.128.0.0/9
```

---

## SSL / HTTPS

```bash
# Install Certbot on Nexus Platform VM and Production VM
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-nexus-domain.com
```

---

## PM2 Process Management

```bash
# Start Nexus backend
pm2 start dist/server.js --name gaia-nexus-backend

# Start Hermes agent scheduler
pm2 start hermes/main.py --interpreter python3 --name hermes-agent

# Save and enable on reboot
pm2 save
pm2 startup
```

---

## Go-Live Checklist

- [ ] All three VMs provisioned and accessible via SSH
- [ ] Cloud SQL instance created and schema migrated
- [ ] NGINX configured for all WordPress and Node.js sites
- [ ] SSL certificates installed on all domains
- [ ] GCP Secret Manager populated with all API credentials
- [ ] Hermes SSH key added to production VM `authorized_keys`
- [ ] PM2 processes running and persisted on reboot
- [ ] Firewall rules validated
- [ ] Daily cron job for Hermes data pull tested
- [ ] Dashboard accessible and pulling live data
