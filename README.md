# Help Digi School - Frontend

<div align="center">

![Help Digi School](https://img.shields.io/badge/Help_Digi_School-v1.0.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

**Plateforme SaaS de gestion scolaire pour les écoles primaires et secondaires du Cameroun**

[Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Déploiement](#-déploiement)

</div>

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Structure du projet](#-structure-du-projet)
- [Technologies](#-technologies)
- [Configuration](#-configuration)
- [Commandes Makefile](#-commandes-makefile)
- [Environnements](#-environnements)
- [Infrastructure](#-infrastructure)
- [Monitoring](#-monitoring)
- [PM2 (Process Manager)](#-pm2-process-manager)
- [Tests (Vitest)](#-tests-vitest)
- [API Routes](#-api-routes)
- [Authentification](#-authentification)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)

---

## 🎯 Aperçu

Help Digi School est une plateforme complète de gestion scolaire permettant aux établissements de :

- **Gérer les élèves** - Inscriptions, dossiers, suivi académique
- **Suivre les notes** - Saisie, bulletins, moyennes automatiques
- **Gérer les paiements** - Frais de scolarité, rapports financiers
- **Communiquer** - Messages, notifications SMS/email
- **Planifier** - Emploi du temps, cours, absences

### Multi-rôles

| Rôle | Accès | Dashboard |
|------|-------|-----------|
| **Admin** | Gestion globale | `/dashboard/admin` |
| **Directeur** | Établissement complet | `/dashboard/director` |
| **Enseignant** | Notes, cours, élèves | `/dashboard/teacher` |
| **Secrétaire** | Inscriptions, paiements | `/dashboard/secretary` |
| **Parent** | Suivi enfants, bulletins | `/dashboard/parent` |
| **Élève** | Notes, emploi du temps | `/dashboard/student` |

---

## 🚀 Quick Start

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x (ou yarn/bun)
- **Docker** >= 20.x (optionnel)
- **Make** (optionnel)

### Installation en 3 étapes

```bash
# 1. Cloner le repository
git clone https://github.com/helpdigischool/frontend.git
cd helpdigischool

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Configurer et lancer
cp .env.example .env.local
npm run dev
```

L'application est accessible sur **http://localhost:3000**

### Avec Docker

```bash
# Développement
make up-dev

# Production
make deploy-prod
```

---

## 🏗 Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js 16)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  App Router  │  │  Components  │  │    Hooks     │  │    Types     │     │
│  │  (src/app)   │  │  (shadcn/ui) │  │  (custom)    │  │ (TypeScript) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                    │                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Auth Context (Mock / API Client)                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                              ┌──────┴──────┐
                              │   Traefik   │  (Reverse Proxy + SSL)
                              └──────┬──────┘
                                     │
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (Spring Boot)                            │
│                              (À développer)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Auth Service   │       │ School Service  │       │ Grade Service   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Architecture Docker

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DOCKER INFRASTRUCTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│  │  Frontend   │     │  Frontend   │     │  Frontend   │                    │
│  │    (Dev)    │     │  (Preprod)  │     │   (Prod)    │                    │
│  │  Port 3000  │     │ Port 32031  │     │  Port 3000  │                    │
│  └─────────────┘     └─────────────┘     └─────────────┘                    │
│         │                   │                   │                            │
│         └───────────────────┼───────────────────┘                            │
│                             │                                                │
│                    ┌────────┴────────┐                                       │
│                    │     Traefik     │  (Load Balancer + SSL)                │
│                    │   Ports 80/443  │                                       │
│                    └────────┬────────┘                                       │
│                             │                                                │
│  ┌──────────────────────────┴──────────────────────────┐                    │
│  │              MONITORING STACK                        │                    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │                    │
│  │  │  Grafana │  │   Loki   │  │     Promtail     │   │                    │
│  │  │  :3001   │  │  :3100   │  │  (Log Collector) │   │                    │
│  │  └──────────┘  └──────────┘  └──────────────────┘   │                    │
│  └─────────────────────────────────────────────────────┘                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Structure du projet

```
helpdigischool/
├── docker/                          # 🐳 Configuration Docker
│   ├── Dockerfile                   # Multi-stage (legacy)
│   ├── Dockerfile.dev               # Développement
│   ├── Dockerfile.preprod           # Pre-production
│   ├── Dockerfile.prod              # Production
│   ├── compose/                     # Docker Compose files
│   │   ├── docker-compose.yml       # Base commune
│   │   ├── docker-compose.dev.yml   # Override dev
│   │   ├── docker-compose.preprod.yml
│   │   └── docker-compose.prod.yml
│   ├── scripts/                     # Scripts utilitaires
│   │   ├── healthcheck.sh
│   │   ├── entrypoint.sh
│   │   ├── wait-for-it.sh
│   │   └── validate-infra.sh
│   └── README.md
│
├── infrastructure/                  # 🏭 Infrastructure
│   ├── traefik/                     # Reverse Proxy
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.preprod.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── traefik.yml              # Config statique
│   │   └── config/
│   │       └── dynamic/             # Config dynamique
│   │           └── middlewares.yml
│   ├── monitoring/                  # Stack Monitoring
│   │   ├── docker-compose.yml
│   │   ├── loki/
│   │   │   └── loki-config.yml
│   │   ├── promtail/
│   │   │   └── promtail-config.yml
│   │   └── grafana/
│   │       └── provisioning/
│   │           ├── datasources/
│   │           └── dashboards/
│   └── README.md
│
├── src/                             # 📦 Code source
│   ├── app/                         # App Router (Next.js)
│   │   ├── (auth)/                  # Routes authentification
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (marketing)/             # Pages marketing
│   │   │   ├── about/
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── contact/
│   │   ├── api/                     # API Routes
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── grades/
│   │   │   ├── payments/
│   │   │   └── health/
│   │   └── dashboard/               # Dashboards par rôle
│   │       ├── admin/
│   │       ├── director/
│   │       ├── teacher/
│   │       ├── secretary/
│   │       ├── parent/
│   │       └── student/
│   ├── components/                  # Composants React
│   │   ├── ui/                      # shadcn/ui
│   │   ├── dashboard/               # Composants dashboard
│   │   │   ├── shared/              # TopBar, Sidebar, etc.
│   │   │   ├── admin/
│   │   │   ├── director/
│   │   │   ├── teacher/
│   │   │   ├── secretary/
│   │   │   ├── parent/
│   │   │   └── student/
│   │   ├── landing/                 # Landing page
│   │   └── layout/                  # Navbar, Footer
│   ├── lib/                         # Utilitaires
│   │   ├── api/                     # Client API
│   │   ├── auth/                    # Contexte auth
│   │   └── i18n/                    # Internationalisation
│   ├── types/                       # Types TypeScript
│   ├── constants/                   # Constantes
│   ├── schemas/                     # Schémas Zod
│   └── services/                    # Services
│
├── logs/                            # 📊 Logs (PM2/Docker)
│   └── pm2/
│
├── .gitlab/                         # 🔄 CI/CD GitLab
│   ├── gitlab-ci-preprod.yml
│   └── gitlab-ci-prod.yml
│
├── .env.example                     # Variables d'environnement
├── .env.preprod.example
├── .env.production.example
├── .gitlab-ci.yml                   # Pipeline CI/CD
├── Makefile                         # Commandes DevOps
├── ecosystem.config.cjs             # Config PM2 (CommonJS)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                      # Config Vercel
```

### Fichiers de configuration (racine)

| Fichier | À quoi ça sert ? |
|---------|------------------|
| **Makefile** | Centralise toutes les commandes DevOps (build, deploy, logs, etc.) en raccourcis simples (`make up-dev`) |
| **package.json** | Liste les dépendances npm, scripts de build/dev, et métadonnées du projet |
| **next.config.js** | Configure Next.js : redirections, rewrites, optimisation images, variables d'environnement |
| **tailwind.config.ts** | Configure TailwindCSS : couleurs personnalisées, breakpoints, plugins |
| **tsconfig.json** | Configure TypeScript : chemins d'import (`@/`), options de compilation, fichiers à inclure |
| **eslint.config.js** | Configure ESLint : règles de linting, plugins (React, TypeScript), fichiers à ignorer |
| **postcss.config.js** | Configure PostCSS : TailwindCSS et Autoprefixer pour la compatibilité navigateurs |
| **ecosystem.config.cjs** | Configure PM2 : nom de l'app, mode cluster, variables d'environnement, logs (CommonJS car PM2 ne supporte pas ES modules) |
| **vercel.json** | Configure Vercel : redirections, headers de sécurité, régions de déploiement |
| **.lintstagedrc.mjs** | Configure lint-staged : quels fichiers linter avant chaque commit |
| **.gitignore** | Liste les fichiers à ignorer par Git (node_modules, .env.local, .next) |

### Dossiers principaux

| Dossier | À quoi ça sert ? |
|---------|------------------|
| **src/app/** | Pages et routes de l'application (Next.js App Router). Chaque dossier = une route |
| **src/components/** | Composants React réutilisables (UI, dashboard, landing, layout) |
| **src/lib/** | Utilitaires partagés : client API, contexte auth, fonctions i18n |
| **src/types/** | Types TypeScript pour typer les données (User, Student, Grade, etc.) |
| **src/schemas/** | Schémas Zod pour valider les formulaires et données API |
| **src/constants/** | Constantes : rôles utilisateur, statuts, configurations fixes |
| **docker/** | Dockerfiles et docker-compose pour conteneuriser l'application |
| **infrastructure/** | Configuration Traefik (reverse proxy) et Monitoring (Grafana/Loki) |
| **logs/** | Stockage des logs PM2 (stdout, stderr) pour le debugging |
| **.husky/** | Hooks Git : scripts exécutés avant commit (lint, format) |

---

## 🛠 Technologies

### Frontend

| Technologie | Version | À quoi ça sert ? |
|-------------|---------|------------------|
| **Next.js** | 16.x | Framework React full-stack. Gère le routing, le SSR (Server-Side Rendering), les API routes, et l'optimisation automatique des performances |
| **React** | 19.x | Bibliothèque pour créer des interfaces utilisateur avec des composants réutilisables |
| **TypeScript** | 5.x | Ajoute le typage statique à JavaScript pour détecter les erreurs à la compilation et améliorer l'autocomplétion |
| **TailwindCSS** | 3.4.x | Framework CSS utility-first pour styliser rapidement sans écrire de CSS personnalisé |
| **Radix UI** | Latest | Composants UI accessibles (modals, dropdowns, etc.) sans style par défaut, personnalisables |
| **shadcn/ui** | Latest | Collection de composants React basés sur Radix UI, pré-stylisés avec TailwindCSS |
| **React Query** | 5.x | Gère les requêtes API, le cache, la synchronisation et les états de chargement automatiquement |
| **React Hook Form** | 7.x | Gère les formulaires avec validation, sans re-render inutiles, performant |
| **Zod** | 3.x | Valide les données (formulaires, API) avec des schémas TypeScript-first |
| **Recharts** | 2.x | Crée des graphiques (barres, lignes, camemberts) pour les dashboards |
| **Lucide React** | Latest | Bibliothèque d'icônes SVG légères et personnalisables |

### Infrastructure

| Outil | À quoi ça sert ? |
|-------|------------------|
| **Docker** | Conteneurise l'application pour qu'elle fonctionne de manière identique partout (dev, prod, CI) |
| **Docker Compose** | Orchestre plusieurs containers (frontend, monitoring) avec une seule commande |
| **Traefik** | Reverse proxy qui route le trafic, gère le HTTPS automatique avec Let's Encrypt, et load balance |
| **Loki** | Stocke et indexe les logs de tous les containers pour les rechercher facilement |
| **Grafana** | Interface web pour visualiser les logs (Loki) et créer des dashboards de monitoring |
| **Promtail** | Agent qui collecte les logs des containers Docker et les envoie à Loki |
| **Node Exporter** | Expose les métriques système (CPU, RAM, disque) pour le monitoring |
| **PM2** | Process manager Node.js pour garder l'app en vie, gérer les logs et le clustering |
| **GitLab CI** | Pipeline CI/CD pour automatiser les tests, builds et déploiements |
| **Vercel** | Plateforme de déploiement optimisée pour Next.js avec CDN global |
| **Husky** | Exécute des scripts avant les commits Git (lint, tests) pour garantir la qualité du code |
| **ESLint** | Analyse le code JavaScript/TypeScript pour détecter les erreurs et appliquer des conventions |
| **Prettier** | Formate automatiquement le code pour un style cohérent dans tout le projet |

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_APP_NAME` | Nom de l'application | Help Digi School |
| `NEXT_PUBLIC_APP_URL` | URL de l'application | http://localhost:3000 |
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | http://localhost:8080/api/v1 |
| `NEXT_PUBLIC_ENVIRONMENT` | Environnement | development |
| `FRONTEND_PORT` | Port du frontend | 3000 |
| `DEBUG_PORT` | Port de debug Node.js | 9229 |

### Fichiers d'environnement

```
.env.example          # Template (à copier vers .env.local)
.env.local            # Développement local
.env.preprod          # Pre-production
.env.production       # Production
```

### Configuration rapide

```bash
# Développement
cp .env.example .env.local

# Pre-production
cp .env.preprod.example .env.preprod

# Production
cp .env.production.example .env.production
```

---

## 🎮 Commandes Makefile

Le projet utilise un **Makefile** pour simplifier toutes les opérations DevOps.

```bash
make help              # Afficher toutes les commandes
```

### Développement

| Commande | Description |
|----------|-------------|
| `make dev` | Démarrer en local (sans Docker) |
| `make install` | Installer les dépendances |
| `make lint` | Lancer ESLint |
| `make typecheck` | Vérifier les types TypeScript |
| `make test` | Lancer les tests |

### Docker - Développement

| Commande | Description |
|----------|-------------|
| `make build-dev` | Build image développement |
| `make up-dev` | Démarrer container (http://localhost:3000) |
| `make down-dev` | Arrêter container |
| `make logs-dev` | Afficher les logs |
| `make shell-dev` | Shell dans le container |

### Docker - Pre-Production

| Commande | Description |
|----------|-------------|
| `make build-preprod` | Build image preprod |
| `make up-preprod` | Démarrer (http://localhost:32031) |
| `make deploy-preprod` | Déploiement complet |

### Docker - Production

| Commande | Description |
|----------|-------------|
| `make build-prod` | Build image production |
| `make up-prod` | Démarrer container |
| `make deploy-prod` | Déploiement complet |

### Validation & Monitoring

| Commande | Description |
|----------|-------------|
| `make validate` | Valider toute la configuration |
| `make status` | État des containers |
| `make status-all` | État de tous les environnements |
| `make health` | Vérifier la santé |

### Infrastructure

| Commande | Description |
|----------|-------------|
| `make infra-up` | Démarrer Traefik + Monitoring |
| `make infra-down` | Arrêter l'infrastructure |
| `make monitoring-up` | Démarrer Grafana/Loki |

---

## 🌍 Environnements

| Environnement | Port | URL | Dockerfile | Traefik Host |
|---------------|------|-----|------------|--------------|
| **Dev** | 3000 | http://localhost:3000 | Dockerfile.dev | helpdigischool.localhost |
| **Preprod** | 32031 | http://localhost:32031 | Dockerfile.preprod | preprod.helpdigischool.com |
| **Prod** | 3000 | - | Dockerfile.prod | helpdigischool.com |

### Workflow de déploiement

```bash
# 1. Développement local
make dev

# 2. Test avec Docker
make up-dev

# 3. Déploiement pre-production
make deploy-preprod

# 4. Vérification
make logs-preprod
make health-check URL=http://localhost:32031/api/health

# 5. Déploiement production
make deploy-prod
```

---

## 🏭 Infrastructure

### Traefik (Reverse Proxy)

Traefik gère :
- Load balancing
- SSL/TLS avec Let's Encrypt
- Routage par domaine
- Middlewares de sécurité

```bash
# Démarrer Traefik
make traefik-up

# Dashboard
http://localhost:8083  (dev)
https://traefik.helpdigischool.com  (prod)
```

### Configuration Traefik

```yaml
# infrastructure/traefik/traefik.yml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
```

---

## 📊 Monitoring

### Stack complète

| Service | Version | Port | URL | Credentials |
|---------|---------|------|-----|-------------|
| Grafana | 10.2.0 | 3001 | http://localhost:3001 | admin / admin |
| Loki | 3.3.2 | 3100 | http://localhost:3100 | - |
| Promtail | 3.3.2 | - | - | - |
| Node Exporter | 1.6.1 | 9100 | http://localhost:9100 | - |

### Démarrage

```bash
# Démarrer le monitoring
make monitoring-up

# Démarrer toute l'infrastructure (Traefik + Monitoring)
make infra-up
```

### Utilisation de Grafana

1. Ouvrir http://localhost:3001
2. Login: `admin` / `admin`
3. Aller dans **Explore** → Sélectionner **Loki**
4. Utiliser les requêtes LogQL ci-dessous

### Requêtes LogQL utiles

```logql
# Tous les logs
{container=~".+"}

# Logs du frontend
{container="helpdigischool-frontend-dev"}

# Recherche d'erreurs
{container=~".+"} |= "error"

# Logs par service
{service="loki"}
{service="grafana"}
```

### Logs collectés

Promtail collecte automatiquement :
- **Docker containers** : Tous les containers avec label `service`
- **PM2 logs** : Logs stdout/stderr de l'app Next.js

### Rétention

- **Durée** : 30 jours
- **Compaction** : Toutes les 10 minutes

---

## 🔄 PM2 (Process Manager)

### Qu'est-ce que PM2 ?

**PM2** (Process Manager 2) est un gestionnaire de processus pour applications Node.js en production. Il permet de :

- **Garder l'application en vie** : Redémarre automatiquement en cas de crash
- **Load balancing** : Distribue la charge sur plusieurs CPU (mode cluster)
- **Zero-downtime reload** : Mise à jour sans interruption de service
- **Gestion des logs** : Centralise stdout/stderr avec rotation automatique
- **Monitoring** : CPU, mémoire, restarts en temps réel
- **Startup scripts** : Démarre automatiquement au boot du serveur

### Pourquoi utiliser PM2 ?

| Cas d'usage | Solution |
|-------------|----------|
| **Développement local** | `npm run dev` (hot reload) |
| **Production sans Docker** | **PM2** (recommandé) |
| **Production avec Docker** | Docker + Traefik |
| **Serverless** | Vercel |

PM2 est idéal pour un déploiement sur un VPS ou serveur dédié sans Docker.

### Installation

```bash
# Installation globale
npm install -g pm2

# Vérifier l'installation
pm2 --version
```

### Configuration

Le fichier `ecosystem.config.cjs` configure PM2 :

```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'helpdigischool',           // Nom de l'app
    script: 'node_modules/next/dist/bin/next',
    args: 'start',                     // Commande: next start
    instances: 'max',                  // Utilise tous les CPUs
    exec_mode: 'cluster',              // Mode cluster
    autorestart: true,                 // Redémarre si crash
    max_memory_restart: '1G',          // Redémarre si > 1GB RAM
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### Commandes essentielles

```bash
# ═══════════════════════════════════════════════════════════════
# DÉMARRAGE
# ═══════════════════════════════════════════════════════════════

# Prérequis : builder l'application
npm run build

# Démarrer avec PM2 (développement)
pm2 start ecosystem.config.cjs

# Démarrer en mode production
pm2 start ecosystem.config.cjs --env production

# ═══════════════════════════════════════════════════════════════
# GESTION DES PROCESSUS
# ═══════════════════════════════════════════════════════════════

# Voir le statut
pm2 status

# Arrêter l'application
pm2 stop helpdigischool

# Redémarrer
pm2 restart helpdigischool

# Recharger sans downtime (zero-downtime reload)
pm2 reload helpdigischool

# Supprimer du gestionnaire PM2
pm2 delete helpdigischool

# Arrêter tous les processus
pm2 stop all

# ═══════════════════════════════════════════════════════════════
# LOGS
# ═══════════════════════════════════════════════════════════════

# Voir les logs en temps réel
pm2 logs helpdigischool

# Voir les 100 dernières lignes
pm2 logs helpdigischool --lines 100

# Vider les logs
pm2 flush

# ═══════════════════════════════════════════════════════════════
# MONITORING
# ═══════════════════════════════════════════════════════════════

# Dashboard interactif (CPU, RAM, etc.)
pm2 monit

# Infos détaillées
pm2 show helpdigischool

# Métriques JSON
pm2 jlist

# ═══════════════════════════════════════════════════════════════
# DÉMARRAGE AUTOMATIQUE
# ═══════════════════════════════════════════════════════════════

# Sauvegarder la liste des processus actifs
pm2 save

# Générer le script de démarrage automatique
pm2 startup

# Suivre les instructions affichées (sudo ...)
```

### Workflow de déploiement avec PM2

```bash
# 1. Build de l'application
npm run build

# 2. Démarrer avec PM2
pm2 start ecosystem.config.cjs --env production

# 3. Vérifier que tout fonctionne
pm2 status
curl http://localhost:3000

# 4. Sauvegarder pour le redémarrage automatique
pm2 save
pm2 startup
```

### Mise à jour de l'application (Zero-downtime)

```bash
# 1. Récupérer les changements
git pull origin main

# 2. Installer les dépendances (si changées)
npm install --legacy-peer-deps

# 3. Rebuilder
npm run build

# 4. Recharger sans interruption
pm2 reload helpdigischool
```

### Logs PM2

Les logs sont stockés dans `./logs/pm2/` :

| Fichier | Contenu |
|---------|---------|
| `out.log` | Sortie standard (console.log) |
| `error.log` | Erreurs (console.error, exceptions) |

### Dépannage PM2

```bash
# L'app crash en boucle ?
pm2 logs helpdigischool --err --lines 50

# Port 3000 déjà utilisé ?
lsof -i :3000
# Tuer le processus
kill -9 <PID>

# Problème de mémoire ?
pm2 show helpdigischool
# Vérifier "heap size" et "memory"

# Reset complet
pm2 delete all
pm2 start ecosystem.config.cjs --env production
```

### PM2 vs Docker

| Critère | PM2 | Docker |
|---------|-----|--------|
| **Complexité** | Simple | Plus complexe |
| **Isolation** | Processus Node.js | Container complet |
| **Ressources** | Léger | Plus lourd |
| **Portabilité** | Dépend du serveur | Identique partout |
| **Scaling** | Cluster sur 1 serveur | Multi-serveurs |
| **Cas d'usage** | VPS simple | Production avancée |

**Recommandation** : Utilisez PM2 pour un déploiement simple sur VPS, Docker + Traefik pour une infrastructure plus complexe.

---

## 🧪 Tests (Vitest)

### Qu'est-ce que Vitest ?

**Vitest** est un framework de test moderne pour JavaScript/TypeScript, conçu pour être rapide et compatible avec Vite. C'est l'alternative recommandée à Jest pour les projets modernes.

### Pourquoi Vitest ?

| Avantage | Description |
|----------|-------------|
| **Rapide** | Exécution instantanée grâce au HMR de Vite |
| **Compatible Jest** | Même API (describe, it, expect) - migration facile |
| **TypeScript natif** | Pas de configuration supplémentaire |
| **Interface UI** | Visualisation des tests dans le navigateur |
| **Watch mode** | Relance automatique des tests modifiés |
| **Coverage intégré** | Rapport de couverture avec v8 |

### Stack de tests

| Outil | Version | À quoi ça sert ? |
|-------|---------|------------------|
| **Vitest** | 3.x | Framework de test principal - exécute les tests, assertions, mocks |
| **React Testing Library** | 16.x | Teste les composants React comme un utilisateur (clics, saisie, etc.) |
| **jsdom** | 26.x | Simule un navigateur (DOM, window, document) pour les tests |
| **@vitest/coverage-v8** | 3.x | Mesure quelle partie du code est testée (% de couverture) |
| **@vitest/ui** | 3.x | Interface web pour voir les tests en temps réel |
| **@testing-library/jest-dom** | 6.x | Matchers personnalisés (toBeInTheDocument, toHaveClass, etc.) |

### Structure des tests

```
src/__tests__/
├── setup.ts                    # Configuration globale (mocks)
├── utils/
│   └── test-utils.tsx          # Render personnalisé avec providers
├── components/
│   └── Button.test.tsx         # Tests de composants UI
└── schemas/
    └── auth.schema.test.ts     # Tests de validation Zod
```

### Commandes Make

| Commande | Description |
|----------|-------------|
| `make test` | Lancer les tests en mode watch (développement) |
| `make test-run` | Lancer les tests une seule fois |
| `make test-coverage` | Lancer les tests avec rapport de couverture |
| `make test-ui` | Ouvrir l'interface graphique Vitest |

### Commandes npm

```bash
# Mode watch (développement)
npm run test

# Exécuter une fois
npm run test:run

# Avec couverture
npm run test:coverage

# Interface graphique
npm run test:ui
```

### Écrire un test

#### Test de composant

```typescript
// src/__tests__/components/MyComponent.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../utils/test-utils'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Hello</MyComponent>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<MyComponent onClick={handleClick}>Click me</MyComponent>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### Test de schéma Zod

```typescript
// src/__tests__/schemas/user.schema.test.ts
import { describe, it, expect } from 'vitest'
import { userSchema } from '@/schemas/user.schema'

describe('userSchema', () => {
  it('validates correct data', () => {
    const validData = {
      email: 'test@example.com',
      name: 'John Doe'
    }

    const result = userSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      name: 'John Doe'
    }

    const result = userSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
```

### Configuration

Le fichier `vitest.config.ts` configure Vitest :

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',           // Simule le navigateur
    globals: true,                   // describe, it, expect globaux
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Mocks configurés

Le fichier `setup.ts` configure les mocks globaux :

- **Next.js Router** : `useRouter`, `usePathname`, `useSearchParams`
- **next/image** : Composant Image mockée
- **localStorage / sessionStorage** : Storage mockés
- **matchMedia** : Pour les tests de responsive design
- **ResizeObserver / IntersectionObserver** : Pour les animations et lazy loading

### Bonnes pratiques

1. **Nommer les fichiers** : `*.test.ts` ou `*.test.tsx`
2. **Placer les tests** : Dans `src/__tests__/` organisés par type
3. **Utiliser `render`** : Du fichier `test-utils.tsx` (inclut les providers)
4. **Tester le comportement** : Pas l'implémentation
5. **Éviter les snapshots** : Préférer les assertions explicites

### Couverture de code

Après `make test-coverage`, le rapport est généré dans `./coverage/` :

- `coverage/index.html` : Rapport HTML interactif
- `coverage/lcov.info` : Pour intégration CI/CD

---

## 🔌 API Routes

### Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/register` | Inscription école |
| POST | `/api/auth/logout` | Déconnexion |
| GET | `/api/auth/me` | Utilisateur courant |
| GET | `/api/students` | Liste des élèves |
| GET | `/api/teachers` | Liste des enseignants |
| GET | `/api/classes` | Liste des classes |
| GET | `/api/grades` | Liste des notes |
| GET | `/api/payments` | Liste des paiements |
| GET | `/api/health` | Health check |

### Client API (`src/lib/api/client.ts`)

Le projet utilise un **client HTTP personnalisé** basé sur Fetch API avec des fonctionnalités avancées.

#### Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **Injection automatique du token** | Ajoute `Authorization: Bearer <token>` à chaque requête |
| **Retry automatique** | Retente les requêtes en cas d'erreur réseau ou serveur |
| **Backoff exponentiel** | Délai croissant entre les retries (1s, 2s, 4s...) |
| **Timeout configurable** | 30 secondes par défaut |
| **Gestion des erreurs** | Toast notifications + redirection sur 401 |
| **Upload/Download** | Support des fichiers (FormData, Blob) |

#### Architecture des intercepteurs

```
FLUX DE REQUÊTE:
┌─────────────────────────────────────────────────────────────┐
│  1. Appel API (get, post, put, patch, delete)               │
│                     ↓                                        │
│  2. Intercepteur Headers                                    │
│     → Ajoute Content-Type: application/json                 │
│     → Ajoute Authorization: Bearer <token>                  │
│                     ↓                                        │
│  3. fetchWithRetry (jusqu'à 3 tentatives)                   │
│     → Retry sur erreurs réseau                              │
│     → Retry sur 429, 500, 502, 503, 504                     │
│     → Backoff: 1s → 2s → 4s (+ jitter ±25%)                │
│                     ↓                                        │
│  4. Intercepteur Erreurs                                    │
│     → Parse la réponse JSON                                 │
│     → Affiche toast notification                            │
│     → 401: déconnexion + redirection /login                 │
│                     ↓                                        │
│  5. Retourne les données JSON                               │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration du retry

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| `retries` | 3 | Nombre maximum de tentatives |
| `retryDelay` | 1000ms | Délai de base entre les retries |
| `timeout` | 30000ms | Timeout par requête |

#### Codes HTTP avec retry automatique

| Code | Retry | Raison |
|------|-------|--------|
| 429 | ✓ | Rate limiting (trop de requêtes) |
| 500 | ✓ | Internal Server Error |
| 502 | ✓ | Bad Gateway |
| 503 | ✓ | Service Unavailable |
| 504 | ✓ | Gateway Timeout |
| 4xx | ✗ | Erreurs client (non récupérables) |

#### Utilisation

```typescript
import { apiClient } from '@/lib/api/client';

// GET
const users = await apiClient.get<User[]>('/users');

// POST
const newUser = await apiClient.post<User>('/users', { name: 'John' });

// PUT
const updated = await apiClient.put<User>('/users/1', { name: 'Jane' });

// PATCH
const patched = await apiClient.patch<User>('/users/1', { name: 'Jane' });

// DELETE
await apiClient.delete('/users/1');

// Upload fichier
const result = await apiClient.upload<FileResponse>('/files/upload', file);

// Download fichier
await apiClient.download('/files/1/download', 'document.pdf');
```

#### Gestion des erreurs

```typescript
try {
  const data = await apiClient.get('/protected-resource');
} catch (error) {
  // error.status: 401, 404, 500, etc.
  // error.message: Message d'erreur du serveur
  // error.errors: Erreurs de validation (optionnel)
}
```

---

## 🔐 Authentification

### Mode Mock (développement)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@helpdigischool.com | admin123 |
| Directeur | directeur@ecole.cm | directeur123 |
| Enseignant | enseignant@ecole.cm | enseignant123 |
| Secrétaire | secretaire@ecole.cm | secretaire123 |
| Parent | parent@email.cm | parent123 |
| Élève | eleve@ecole.cm | eleve123 |

### Internationalisation

Le projet supporte FR/EN :
- Changement de langue dans la navbar
- Persistance dans localStorage

---

## 📦 Déploiement

### Option 1: Vercel (Recommandé pour le frontend)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Option 2: Docker

```bash
# Build et déploiement production
make deploy-prod

# Avec Traefik
make infra-up
make deploy-prod
```

### Option 3: PM2

```bash
# Build
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.cjs --env production

# Monitoring
pm2 monit
```

Voir la [section PM2](#-pm2-process-manager) pour plus de détails.

---

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/ma-feature

# 2. Commiter
git commit -m "feat: description"

# 3. Push et MR
git push origin feature/ma-feature
```

### Convention de commits

| Préfixe | Description |
|---------|-------------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `docs:` | Documentation |
| `style:` | Formatage |
| `refactor:` | Refactorisation |
| `test:` | Tests |
| `chore:` | Maintenance |

---

## 👥 Équipe

| Nom | Rôle |
|-----|------|
| **IVANA YOH** | Lead Developer Frontend |

---

## 📄 Licence

Ce projet est propriétaire. Tous droits réservés.

---

<div align="center">

**Help Digi School** - Plateforme de gestion scolaire moderne

Made with ❤️ au Cameroun

</div>